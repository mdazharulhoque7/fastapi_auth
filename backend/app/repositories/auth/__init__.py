from datetime import datetime, timedelta
from typing import Any, Coroutine, Optional
from jose import jwt
from jose.exceptions import ExpiredSignatureError
from fastapi import Request, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_IN_MINUTES


class JWTRepository:

    def __init__(self, data: dict = {}, token: str = None) -> None:
        self.data = data
        self.token = token

    def generate_token(self, expires_delta: Optional[timedelta] = None):
        to_encode = self.data.copy()

        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_IN_MINUTES)

        to_encode.update({'exp': expire})
        encoded_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_token

    def decode_token(self):
        try:
            decoded_token = jwt.decode(
                self.token, SECRET_KEY, algorithms=[ALGORITHM])
            return decoded_token if decoded_token['expires'] >= datetime.time() else None
        except:
            return {}

    @staticmethod
    def extract_token(token: str):
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])


class JWTBearer(HTTPBearer):

    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):

        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == 'Bearer':
                raise HTTPException(
                    status_code=403,
                    detail=dict(status='Forbidden!',
                                message='Invalid Authentication Schema')
                )
            if not self.verify_token(credentials.credentials):
                raise HTTPException(
                    status_code=403,
                    detail=dict(
                        status='Forbidden!', message='Invalid token or token has been expired.')
                )
            return credentials.credentials

        else:
            raise HTTPException(
                status_code=403,
                detail=dict(status='Forbidden!',
                            message='Invalid Authorization Code.')
            )

    @staticmethod
    def verify_token(token: str):
        try:
            return True if jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) is not None else False
        except ExpiredSignatureError as exp:
            raise HTTPException(
                status_code=403,
                detail=dict(status='Forbidden!',
                            message=str(exp)))

        return False
