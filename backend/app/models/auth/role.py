from typing import List, Optional
from sqlalchemy import table
from sqlmodel import Relationship, SQLModel, Field
from app.models.mixins import TimeMixin
from app.models.auth.user_role import UserRole


class AuthRole(SQLModel, TimeMixin, table=True):
    __tablename__ = "auth_roles"

    id: Optional[str] = Field(None, primary_key=True, nullable=True)
    name: str

    users: List["User"] = Relationship(
        back_populates="roles", link_model=UserRole)
