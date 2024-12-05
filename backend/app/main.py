"""FastAPI app."""

from fastapi import FastAPI

from app.schemas import Message

app = FastAPI()


@app.get("/", response_model=Message)
def read_root():
    """Root path."""
    return {"message": "Hello World"}
