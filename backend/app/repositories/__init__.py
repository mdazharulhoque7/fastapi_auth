from typing import Generic, TypeVar
from sqlalchemy import update as sql_update, delete as sql_delete
from sqlalchemy.future import select
from app.config import db, commit_rollback

T = TypeVar('T')


class BaseRepository:
    model = Generic(T)

    @classmethod
    async def create(cls, **kwargs):
        model = cls.model(**kwargs)
        db.add(model)
        await commit_rollback()
        return model

    @classmethod
    async def get_all(cls):
        query = select(cls.model)
        return (await db.execute(query)).scalars().all()

    @classmethod
    async def get_by_id(cls, id: str):
        query = select(cls.model).where(cls.model.id == id)
        return (await db.execute(query)).scalar_one_or_none()

    @classmethod
    async def update(cls, id: str, **kwargs):
        query = sql_update(cls.model).where(cls.model.id == id).values(
            **kwargs).execution_options(synchronize_session='fetch')

        await db.execute(query)
        await commit_rollback()

    @classmethod
    async def delete(cls, id: str):
        query = sql_delete(cls.model).where(cls.model.id == id)
        await db.execute(query)
        await commit_rollback()
