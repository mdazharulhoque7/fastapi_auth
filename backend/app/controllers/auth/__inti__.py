from fastapi import APIRouter
from app.schemas import ResponseSchema
from app.schemas.auth.schemas import (UserRegisterSchema,
                                      LoginSchema,
                                      ForgotPasswordSchema)
from app.services.auth import AuthService


router = APIRouter(prefix="auth", tags=["Authentication"])


@router.post("/register", response_model=ResponseSchema, response_model_exclude_none=True)
async def register(request_body: UserRegisterSchema):
    person = await AuthService.register_service(request_body)
    return ResponseSchema(detail=f"{person.name} is registerd successfully")


@router.post("/login", response_model=ResponseSchema)
async def login(request_body: LoginSchema):
    token = await AuthService.login_service(request_body)
    return ResponseSchema(detail="Logged in Successfully", result={"token_type": "Bearer", "access_token": token})


@router.post("/forget_password", response_model=ResponseSchema, response_model_exclude_none=True)
async def forget_password(request_body: ForgotPasswordSchema):
    await AuthService.forget_password_service(request_body)
    return ResponseSchema(detail="Password updated successfully!")
