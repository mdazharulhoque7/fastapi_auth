import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.services.auth import generate_role
from app.config import db

origins = [
    "http://localhost:3000"
]


def init_app():
    db.init()

    app = FastAPI(
        title='Fast Api Login',
        description='An Smart ERP solution for Business',
        version='1.0.0'
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    @app.on_event('startup')
    async def startup():
        await db.create_all()
        await generate_role()

    @app.on_event('shutdown')
    async def shutdown():
        await db.close()

    # Adding Api Routers
    from app.controllers.auth import router as auth_router
    from app.controllers.auth.user import router as user_router

    app.include_router(auth_router)
    app.include_router(user_router)
    return app


app = init_app()


def start():
    """Lounched with 'poetry run start' at root"""
    uvicorn.run('app.main:app', host='localhost', port=8000, reload=True)
