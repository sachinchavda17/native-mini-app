from fastapi import APIRouter, status, Depends
from app.auth.schemas import UserRegister, UserLogin
from app.auth.services import create_user, login_user
from app.core.dependancy import get_current_user

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserRegister):
    return create_user(user)


@router.post("/login", status_code=status.HTTP_200_OK)
def login(user: UserLogin):
    return login_user(user)


@router.get("/me", status_code=status.HTTP_200_OK)
def me(current_user=Depends(get_current_user)):
    return current_user
