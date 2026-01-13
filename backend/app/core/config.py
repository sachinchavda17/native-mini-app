import os
from dotenv import load_dotenv

load_dotenv()


def must_get_env(key: str) -> str:
    value = os.getenv(key)
    if not value:
        raise ValueError(f"Environment variable {key} is not set")
    return value


MONGO_URI = must_get_env("MONGO_URI")
DB_NAME = must_get_env("DB_NAME")
JWT_SECRET = must_get_env("JWT_SECRET")
JWT_EXPIRE = int(eval(must_get_env("JWT_EXPIRE")))
JWT_ALGORITHM = must_get_env("JWT_ALGORITHM")
