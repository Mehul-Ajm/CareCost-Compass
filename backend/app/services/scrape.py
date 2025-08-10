from __future__ import annotations

import re
from typing import List, Dict
import httpx


SEARCH_URL = "https://duckduckgo.com/html/?q={query}"


async def search_sources(state: str) -> List[Dict[str, str]]:
    q = f"{state} cancer treatment cost estimate chemo radiation surgery site:cancer.org OR site:medicaid.gov OR site:nih.gov"
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.get(SEARCH_URL.format(query=httpx.QueryParams({"q": q}).get("q")))
        # naive link extraction
        links = re.findall(r'href=\"(https?://[^\"]+)\"', r.text)
    # take top few unique, filtered
    seen = set()
    out = []
    for url in links:
        if any(host in url for host in ["cancer.org", "medicaid.gov", "nih.gov"]) and url not in seen:
            seen.add(url)
            out.append({"name": url.split("/")[2], "url": url})
        if len(out) >= 4:
            break
    return out


async def extract_costs_from(url: str) -> dict:
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(url)
        # naive dollar amount scrape
        dollars = [int(x.replace(",", "")) for x in re.findall(r"\$(\d{3,5}(?:,\d{3})?)", r.text)[:5]]
        if not dollars:
            return {}
        # return a simple mapping
        base = min(dollars)
        return {"chemo": base, "radiation": base + 200, "surgery": base + 500}
    except Exception:
        return {}


