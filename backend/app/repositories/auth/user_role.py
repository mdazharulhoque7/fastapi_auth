from app.repositories import BaseRepository
from app.models.auth.user_role import UserRole


class UserRoleRepository(BaseRepository):
    model = UserRole
