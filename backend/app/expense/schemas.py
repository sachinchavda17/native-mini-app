from pydantic import BaseModel


class ExpenseSchema(BaseModel):
    amount: float
    category: str
    note: str
    date: str
    user_id: str
