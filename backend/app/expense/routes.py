from fastapi import APIRouter, Depends
from app.expense.schemas import ExpenseSchema
from app.expense.model import expense_collection
from bson.objectid import ObjectId
from app.auth.dependencies import get_current_user

router = APIRouter()


@router.post("/expense", Depends(get_current_user))
async def add_expense(expense: ExpenseSchema):
    if not expense.amount or not expense.category or not expense.date:
        return {"message": "All fields are required"}
    expense_collection.insert_one(expense.model_dump())
    return {"message": "Expense added successfully"}


@router.get("/expense")
async def get_expenses():
    expenses = []
    for expense in expense_collection.find():
        expense["_id"] = str(expense["_id"])
        expenses.append(expense)
    return expenses


@router.get("/expense/{id}")
async def get_expense(id: str):
    expense = expense_collection.find_one({"_id": ObjectId(id)})
    if not expense:
        return {"message": "Expense not found"}
    expense["_id"] = str(expense["_id"])
    return expense


@router.put("/expense/{id}")
async def update_expense(id: str, expense: ExpenseSchema):
    existing_expense = expense_collection.find_one({"_id": ObjectId(id)})
    if not existing_expense:
        return {"message": "Expense not found"}
    expense_collection.update_one({"_id": ObjectId(id)}, {"$set": expense.model_dump()})
    return {"message": "Expense updated successfully"}


@router.delete("/expense/{id}")
async def delete_expense(id: str):
    expense = expense_collection.find_one({"_id": ObjectId(id)})
    if not expense:
        return {"message": "Expense not found"}
    expense_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "Expense deleted successfully"}
