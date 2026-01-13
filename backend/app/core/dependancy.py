from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from app.core.config import JWT_SECRET, JWT_ALGORITHM
from jose import jwt
from app.auth.models import user_collection
from bson.objectid import ObjectId
from fastapi import status
from jose.exceptions import JWTError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")

        print("payload", payload)

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid Token")

        user = user_collection.find_one({"_id": ObjectId(user_id)})

        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        user["user_id"] = str(user["_id"])
        user.pop("password", None)
        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )
