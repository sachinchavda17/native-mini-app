from pymongo.collection import Collection
from app.expense.schemas import ExpenseUpsertSchema
from app.expense.models import expense_document


def upsert_expense(
    *,
    collection: Collection,
    user_id: str,
    expense: ExpenseUpsertSchema,
):
    existing = collection.find_one(
        {
            "user_id": user_id,
            "local_id": expense.local_id,
        }
    )

    if existing:
        # Update existing expense
        collection.update_one(
            {"_id": existing["_id"]},
            {
                "$set": {
                    "amount": expense.amount,
                    "category": expense.category,
                    "note": expense.note,
                    "date": expense.date,
                    "updated_at": expense.updated_at,
                    "is_deleted": False,
                }
            },
        )
        return "updated"

    # Create new expense
    doc = expense_document(
        user_id=user_id,
        local_id=expense.local_id,
        amount=expense.amount,
        category=expense.category,
        note=expense.note,
        date=expense.date,
        updated_at=expense.updated_at,
    )

    collection.insert_one(doc)
    return "created"
