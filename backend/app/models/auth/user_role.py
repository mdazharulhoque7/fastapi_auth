from typing import Optional
from sqlmodel import SQLModel, Field
from app.models.mixins import TimeMixin


class UserRole(SQLModel, TimeMixin, table=True):
    __tablename__ = 'userroles'

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    user_id: Optional[str] = Field(default=None, foreign_key='users.id')
    role_id: Optional[str] = Field(default=None, foreign_key='auth_roles.id')
