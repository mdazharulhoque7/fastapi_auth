from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials
from app.schemas import ResponseSchema
from app.repositories.auth import JWTBearer, JWTRepository
from app.services.auth.user import UserService


router = APIRouter("/user", tags=["User"],
                   dependencies=[Depends(JWTBearer)])


@router.get("/", response_model=ResponseSchema)
async def get_all_user():
    return "Should Return Paginated Users"


@router.get("/profile", response_model=ResponseSchema)
async def get_user_profile(credentials: HTTPAuthorizationCredentials):
    extracted_token = await JWTRepository.extract_token(credentials.credentials)
    user = UserService.get_user_profile(extracted_token.get('username'))
    return ResponseSchema(result=user)
