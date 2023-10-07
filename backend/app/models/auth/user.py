from typing import Optional, List
from sqlalchemy import Column, String, table
from sqlmodel import SQLModel, Field, Relationship
from app.models.mixins import TimeMixin
from app.models.auth.user_role import UserRole


class User(SQLModel, TimeMixin, table=True):
    __tablename__ = 'users'

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    username: str = Field(sa_column=Column('username', String, unique=True))
    email: str = Field(sa_column=Column('email', String, unique=True))
    password: str

    person_id: Optional[str] = Field(default=None, foreign_key='persons.id')
    person: Optional['Person'] = Relationship(back_populates='user')

    roles: List = Relationship(back_populates='users', link_model=UserRole)
