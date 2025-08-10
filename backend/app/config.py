import os
from dataclasses import dataclass
from dotenv import load_dotenv


# Load environment variables from a local .env if present
load_dotenv()


@dataclass
class Settings:
    openai_api_key: str | None = os.getenv("OPENAI_API_KEY")


settings = Settings()


