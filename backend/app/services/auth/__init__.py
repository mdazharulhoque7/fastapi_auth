import base64
import datetime
import traceback
from uuid import uuid4
from fastapi import HTTPException
from passlib.context import CryptContext
from app.schemas.auth.schemas import (UserRegisterSchema,
                                      LoginSchema,
                                      ForgotPasswordSchema)
from app.models.auth.user import User
from app.models.person import Person
from app.models.auth.user_role import UserRole
from app.models.auth.role import AuthRole
from app.repositories.auth import JWTRepository
from app.repositories.auth.role import AuthRoleRepository
from app.repositories.auth.user import UserRepository
from app.repositories.auth.user_role import UserRoleRepository
from app.repositories.person import PersonRepository

# Encript Password Context
pwd_context = CryptContext(schemes="bcrypt", deprecated="auto")


class AuthService:

    @staticmethod
    async def register_service(register: UserRegisterSchema):

        # create uuid
        _person_id = str(uuid4())
        _user_id = str(uuid4())

        # convert birth_date type from submitted str to date
        birth_date = datetime.datetime.strftime(register.birth, '%d-%m-%Y')

        # Open default profile image to string base 64 format
        with open("./media/profile.png", "rb") as f:
            image_str = base64.b64decode(f.read())
        image_str = "data:image/png;base64,"+image_str.decode("utf-8")

        # Mapping submitted data to the class entity table
        _person = Person(
            id=_person_id,
            name=register.name,
            birth=birth_date,
            gender=register.gender,
            phone_number=register.phone_number,
            profile=image_str
        )

        _user = User(
            id=_user_id,
            username=register.username,
            email=register.email,
            password=pwd_context.hash(register.password),
            person_id=_person_id
        )

        # Every user will be set to defaulf user role while register
        _role = AuthRoleRepository.find_by_role_name('user')

        # Prepare UserRole Model with default 'user' Role
        _user_role = UserRole(user_id=_user_id, role_id=_role.id)

        # Validate against same username
        _user_exist = UserRepository.find_by_username(register.username)
        if _user_exist:
            raise HTTPException(
                status_code=400,
                detail="username aleady exists!"
            )

        # Validate against same email
        _user_exist = UserRepository.find_by_email(register.email)
        if _user_exist:
            raise HTTPException(
                status_code=400,
                detail="email already exists!"
            )

        # save data into the physical database tables
        try:
            person_model = await PersonRepository.create(**_person.dict())
            user_model = await UserRepository.create(**_user.dict())
            user_role_model = await UserRoleRepository.create(**_user_role.dict())
            return person_model
        except Exception:
            print(traceback.format_exc())

    @staticmethod
    async def login_service(login: LoginSchema):
        _user = UserRepository.find_by_username(login.username)
        if _user is not None:
            if not pwd_context.verify(login.password, _user.password):
                raise HTTPException(
                    status_code=400, detail="Invalid Password!")
            return JWTRepository(data={"username": _user.username}).generate_token()
        raise HTTPException(status_code=400, detail="User doesn't exists!")

    async def forget_password_service(forget_password: ForgotPasswordSchema):
        _user = UserRepository.find_by_email(forget_password.email)

        if _user is None:
            raise HTTPException(status_code=400, detail="User doesn't exists!")
        user = await UserRepository.update_password(forget_password.email, pwd_context.hash(forget_password.new_password))
        return user


# Generate roles manually
async def generate_role():
    _role = await RoleRepository.find_by_list_role_name(["admin", "user"])
    if not _role:
        await AuthRoleRepository.create_list(
            [AuthRole(id=str(uuid4()), role_name="admin"), AuthRole(id=str(uuid4()), role_name="user")])
