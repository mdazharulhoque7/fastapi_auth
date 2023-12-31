from typing import TypeVar, Optional
from pydantic import BaseModel

T = TypeVar('T')


class DetailSchema(BaseModel):
    status: str
    message: str
    result: Optional[T] = None


class ResponseSchema(BaseModel):
    detail: str
    result: Optional[T] = None
