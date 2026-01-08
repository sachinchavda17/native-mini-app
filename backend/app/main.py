from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth.routes import router as auth_router

app = FastAPI(title="Native Mini App", version="1.0.1")

@app.get("/")
def read_root():
    return {"status":"Native Mini App Server is live 🚀"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)