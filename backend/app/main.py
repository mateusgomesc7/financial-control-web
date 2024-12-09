"""FastAPI app."""

from fastapi import FastAPI

from app.routers import auth, users
from app.schemas import Message

app = FastAPI()

app.include_router(users.router)
app.include_router(auth.router)


@app.get("/", response_model=Message)
def read_root():
    """Root path."""
    return {"message": "Hello World"}
