from sqlalchemy.future import select
from app.models.auth.user import User
from app.models.person import Person
from app.config import db


class UserService:

    @staticmethod
    async def get_user_profile(username: str):
        query = select(User.username,
                       User.email,
                       Person.name,
                       Person.birth,
                       Person.gender,
                       Person.profile,
                       Person.phone_number).join_from(User, Person).where(User.username == username)
        return (await db.execute(query)).mappings().one()
