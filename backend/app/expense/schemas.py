from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# What MOBILE sends to backend
class ExpenseUpsertSchema(BaseModel):
    local_id: str
    amount: float
    category: str
    note: Optional[str] = None
    date: datetime
    updated_at: datetime


class ExpenseInDB(BaseModel):
    local_id: str
    user_id: str
    amount: float
    category: str
    note: str | None
    date: datetime
    created_at: datetime
    updated_at: datetime
    is_deleted: bool = False


class ExpenseResponseSchema(BaseModel):
    local_id: str
    amount: float
    category: str
    note: Optional[str]
    date: datetime
    updated_at: datetime
    is_deleted: bool
