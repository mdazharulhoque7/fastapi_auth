from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials
from app.schemas import ResponseSchema
from app.repositories.auth import JWTBearer, JWTRepository
from app.services.auth.user import UserService


router = APIRouter(prefix="/user", tags=["User"],
                   dependencies=[Depends(JWTBearer())])


@router.get("/", response_model=ResponseSchema)
async def get_all_user():
    return ResponseSchema(detail="Should Return Paginated Users")


@router.get("/profile", response_model=ResponseSchema)
async def get_user_profile(credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    extracted_token = JWTRepository.extract_token(credentials)
    user = await UserService.get_user_profile(extracted_token.get('username'))
    return ResponseSchema(detail="Successfully fetch data!", result=user)
