from flask import Flask, Blueprint, request
from pydantic import BaseModel, Field, ValidationError
from typing import Dict, Any
from app.services.ai import summarize_costs
import asyncio
from app.services.scrape import search_sources, extract_costs_from
from app.models import CostEstimateResponse, Estimate as EstimateModel, Resource as ResourceModel

api = Blueprint("api", __name__, url_prefix="/api")


class EstimateRequest(BaseModel):
    state: str = Field(..., min_length=2, max_length=2, description="Two-letter state code")


def compute_placeholder_estimate(state: str) -> Dict[str, Any]:
    base = 1000
    factor = (ord(state[0]) + ord(state[1])) % 5
    return {
        "chemo": base + 200 * factor,
        "radiation": base + 300 * factor,
        "surgery": base + 500 * factor,
    }


@api.get("/cost-estimate")
def get_cost_estimate_get():
    state = (request.args.get("state", "") or "").upper()
    if len(state) != 2:
        return {"error": "Provide 2-letter state code via ?state=CA"}, 400
    # try web sources
    try:
        resources = asyncio.run(search_sources(state))
    except Exception:
        resources = []
    estimates = {}
    for r in resources[:3]:
        try:
            data = asyncio.run(extract_costs_from(r["url"]))
        except Exception:
            data = {}
        estimates.update({k: v for k, v in data.items() if k not in estimates})
    if not estimates:
        estimates = compute_placeholder_estimate(state)
    # always include canonical links at end (Medicare and Medicaid distinct)
    resources += [
        {"name": "Medicare Coverage", "url": "https://www.medicare.gov/coverage"},
        {"name": "State Medicaid Info", "url": f"https://www.medicaid.gov/state-overviews/stateprofile.html?state={state}"},
        {"name": "ACS Cost & Insurance", "url": "https://www.cancer.org/treatment/finding-and-paying-for-treatment.html"},
    ]
    # assign simple colors for client badges
    palette = ["#8fb3ff", "#7dd3fc", "#86efac", "#fbbf24"]
    for idx, r in enumerate(resources):
        r.setdefault("color", palette[idx % len(palette)])
    summary = summarize_costs(state, resources)
    # coerce to unified response model
    resp = CostEstimateResponse(
        state=state,
        estimate=EstimateModel(**estimates),
        resources=[ResourceModel(**r) for r in resources],
        summary=summary["summary"],
        used_ai=summary.get("used_ai", False),
    )
    return resp.model_dump()


@api.post("/cost-estimate")
def get_cost_estimate_post():
    try:
        payload = EstimateRequest.model_validate(request.get_json(force=True))
    except ValidationError as e:
        return {"error": e.errors()}, 400

    state = payload.state.upper()
    estimates = compute_placeholder_estimate(state)
    resources = [
        {
            "name": "State Medicaid Info",
            "url": f"https://www.medicaid.gov/state-overviews/stateprofile.html?state={state}",
        },
        {
            "name": "ACS Cost & Insurance",
            "url": "https://www.cancer.org/treatment/finding-and-paying-for-treatment.html",
        },
    ]
    summary = summarize_costs(state, resources)
    resp = CostEstimateResponse(
        state=state,
        estimate=EstimateModel(**estimates),
        resources=[ResourceModel(**r) for r in resources],
        summary=summary["summary"],
        used_ai=summary.get("used_ai", False),
    )
    return resp.model_dump()


def register_routes(app: Flask) -> None:
    app.register_blueprint(api)


