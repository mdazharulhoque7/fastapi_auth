from typing import List
from app.repositories import BaseRepository
from app.models.auth.role import AuthRole
from sqlalchemy.future import select
from app.config import db, commit_rollback


class AuthRoleRepository(BaseRepository):
    model = AuthRole

    @staticmethod
    async def find_by_role_name(name: str):
        query = select(AuthRole).where(AuthRole.name == name)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def find_by_role_name_list(name_list: List[str]):
        query = select(AuthRole).where(AuthRole.name.in_(name_list))
        return (await db.execute(query)).scalars.all()

    @staticmethod
    async def create_list(role_list: List[AuthRole]):
        db.add_all(role_list)
        await commit_rollback()
