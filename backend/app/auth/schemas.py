from pydantic import BaseModel, Field,EmailStr

class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str = Field(min_length=6, max_length=64)


class UserLogin(BaseModel):
    email : EmailStr
    password : str 