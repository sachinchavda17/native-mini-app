from datetime import datetime, timedelta
from app.core.config import JWT_EXPIRE, JWT_SECRET, JWT_ALGORITHM
from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    password = password.strip().encode("utf-8")[:72]
    return pwd_context.hash(password)

def verify_password(password, hashed):
    password = password.strip().encode("utf-8")[:72]
    return pwd_context.verify(password, hashed)

# Create access token
def create_access_token(data):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE)
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt