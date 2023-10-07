from app.repositories import BaseRepository
from app.models.person import Person


class PersonRepository(BaseRepository):
    model = Person
