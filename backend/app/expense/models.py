from datetime import datetime
from typing import Optional, Dict, Any


def expense_document(
    *,
    user_id: str,
    local_id: str,
    amount: float,
    category: str,
    note: Optional[str],
    date: datetime,
    updated_at: datetime,
) -> Dict[str, Any]:
    now = datetime.utcnow()

    return {
        "user_id": user_id,
        "local_id": local_id,
        "amount": amount,
        "category": category,
        "note": note,
        "date": date,
        "created_at": now,
        "updated_at": updated_at,
        "is_deleted": False,
    }
