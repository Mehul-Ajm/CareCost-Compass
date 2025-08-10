from __future__ import annotations

from typing import Iterable

from openai import OpenAI

from app.config import settings
from app.models import Summary


def summarize_costs(state: str, resources: Iterable[dict]) -> dict:
    """Return structured summary (Summary model) with consistent fields."""
    if not settings.openai_api_key:
        return {
            "summary": Summary(
                intro=(
                    f"Estimated costs for common treatments in {state} vary by treatment type, insurance, and facility."
                ),
                bullets=[
                    "Verify insurance coverage details including copays and deductibles.",
                    "Ask for written, itemized estimates from providers.",
                    "Explore financial assistance via hospital programs and nonprofits.",
                ],
                next_steps=[
                    "Contact your insurer and provider billing office.",
                    "Check state Medicaid eligibility and enrollment windows.",
                    "Discuss alternatives and second opinions with your care team.",
                ],
            ).model_dump(),
            "used_ai": False,
        }

    try:
        client = OpenAI(api_key=settings.openai_api_key)
        prompt = (
            "Summarize treatment cost considerations for a cancer patient in "
            f"{state}. Focus on clarity and practical next steps in under 120 words."
        )
        completion = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt,
        )
        text = (completion.output_text or "").strip()
        # very light parsing into bullets by splitting on numbered or starred lines
        lines = [ln.strip("- *") for ln in text.splitlines() if ln.strip()]
        intro = lines[0] if lines else ""
        rest = lines[1:]
        bullets = rest[:4]
        next_steps = rest[4:7]
        return {"summary": Summary(intro=intro, bullets=bullets, next_steps=next_steps).model_dump(), "used_ai": True}
    except Exception:
        return {
            "summary": Summary(
                intro=(
                    f"Estimated costs for common treatments in {state} vary by treatment type, insurance, and facility."
                ),
                bullets=[
                    "Verify insurance coverage details including copays and deductibles.",
                    "Ask for written, itemized estimates from providers.",
                    "Explore financial assistance via hospital programs and nonprofits.",
                ],
                next_steps=[
                    "Contact your insurer and provider billing office.",
                    "Check state Medicaid eligibility and enrollment windows.",
                    "Discuss alternatives and second opinions with your care team.",
                ],
            ).model_dump(),
            "used_ai": False,
        }


