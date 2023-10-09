import re
import logging
from typing import TypeVar
from fastapi import HTTPException
from pydantic import BaseModel, validator
from app.models.person import Gender

# Get Rool Logger
logger = logging.getLogger(__name__)


class UserRegisterSchema(BaseModel):
    username: str
    email: str
    name: str
    password: str
    phone_number: str
    birth: str
    gender: Gender
    profile: str = 'base64'

    # phone_number validation
    @validator('phone_number')
    def phone_validator(cls, v):
        logger.debug(f'phone in 2 validation : {v}')
        # regex phone number
        regex = r"^[\+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,6}$"
        if v and not re.search(regex, v, re.I):
            raise HTTPException(
                status_code=400, detail="Invalid input phone number!")
        return v

    # Gender validation
    @validator("gender")
    def sex_validation(cls, v):
        if hasattr(Gender, v) is False:
            raise HTTPException(status_code=400, detail="Invalid input gender")


class LoginSchema(BaseModel):
    username: str
    password: str


class ForgotPasswordSchema(BaseModel):
    email: str
    new_password: str
