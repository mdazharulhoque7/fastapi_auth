from datetime import datetime
from pydantic import BaseModel
from sqlalchemy import Column, DateTime
from sqlmodel import Field


class TimeMixin(BaseModel):
    """Mixin for datetime values of when the entity was created and when it was last updated"""

    created_at: datetime = Field(default_factory=datetime.now)
    modified_at: datetime = Column(
        DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
