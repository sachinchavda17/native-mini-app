from app.auth.schemas import UserRegister, UserLogin
from app.auth.models import user_collection
from fastapi import HTTPException, status
from pymongo.errors import PyMongoError
from app.core.security import create_access_token, verify_password, hash_password


def create_user(user: UserRegister):
    try:
        exists = user_collection.find_one({"email": user.email})
        if exists:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="User already exists"
            )

        hashed_password = hash_password(user.password)

        user_collection.insert_one(
            {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "password": hashed_password,
            }
        )
        return {"message": "User registered successfully"}

    except PyMongoError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error while creating user",
        )


def login_user(data: UserLogin):
    try:
        user = user_collection.find_one({"email": data.email})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        if not verify_password(data.password, user["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        user["_id"] = str(user["_id"])
        token = create_access_token(
            data={
                "user_id": str(user["_id"]),
                "email": user["email"],
            }
        )

        return {"token": token, "message": "Login successful"}

    except PyMongoError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error while creating user",
        )
