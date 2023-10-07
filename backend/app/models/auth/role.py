from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from app.models.mixins import TimeMixin
from app.models.auth.user_role import UserRole


class AuthRole(SQLModel, TimeMixin, table=True):
    __tablename__ = 'auth_roles'

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    name: str

    users: List['Users'] = Relationship(
        back_populates='roles', link_model=UserRole)
