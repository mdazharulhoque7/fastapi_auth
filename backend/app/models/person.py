from typing import Optional
from datetime import date
from sqlalchemy import Enum
from sqlmodel import SQLModel, Field, Relationship
from app.models.mixins import TimeMixin


class Gender(str, Enum):
    MALE = 'MALE'
    FEMALE = 'FEMALE'


class Person(SQLModel, TimeMixin, table=True):
    __tablename__ = 'persons'

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    name: str
    birth: date
    gender: Gender
    profile: str
    phone_number: str

    user: Optional['User'] = Relationship(sa_relationship_kwargs={
        'uselist': False}, back_populates='person')
