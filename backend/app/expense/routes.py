from fastapi import APIRouter, Depends, Query
from typing import List
from datetime import datetime
from app.core.dependancy import get_current_user
from app.expense.schemas import ExpenseUpsertSchema, ExpenseResponseSchema
from app.expense.services import upsert_expense
from app.expense.collection import expense_collection

router = APIRouter()


@router.post("/expenses")
def create_or_update_expense(
    expense: ExpenseUpsertSchema,
    current_user=Depends(get_current_user),
):
    result = upsert_expense(
        collection=expense_collection,
        user_id=current_user["user_id"],
        expense=expense,
    )

    return {"status": result}


@router.get("/expenses", response_model=List[ExpenseResponseSchema])
def get_expenses(
    since: datetime | None = Query(default=None),
    current_user=Depends(get_current_user),
):
    query = {"user_id": current_user["user_id"]}

    if since:
        query["updated_at"] = {"$gt": since}

    expenses = []

    for doc in expense_collection.find(query):
        expenses.append(
            {
                "local_id": doc["local_id"],
                "amount": doc["amount"],
                "category": doc["category"],
                "note": doc.get("note"),
                "date": doc["date"],
                "updated_at": doc["updated_at"],
                "is_deleted": doc["is_deleted"],
            }
        )

    return expenses


@router.delete("/expenses/{local_id}")
def delete_expense(
    local_id: str,
    current_user=Depends(get_current_user),
):
    expense_collection.update_one(
        {
            "user_id": current_user["user_id"],
            "local_id": local_id,
        },
        {
            "$set": {
                "is_deleted": True,
                "updated_at": datetime.utcnow(),
            }
        },
    )

    return {"status": "deleted"}
