from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel, Field


class Resource(BaseModel):
    name: str
    url: str
    color: Optional[str] = None


class Estimate(BaseModel):
    chemo: Optional[int] = None
    radiation: Optional[int] = None
    surgery: Optional[int] = None


class Summary(BaseModel):
    intro: str = Field(..., description="Short paragraph intro for the state context")
    bullets: List[str] = Field(default_factory=list, description="Key bullet points")
    next_steps: List[str] = Field(default_factory=list, description="Actionable next steps")


class CostEstimateResponse(BaseModel):
    state: str
    estimate: Estimate
    resources: List[Resource]
    summary: Summary
    used_ai: bool = False


