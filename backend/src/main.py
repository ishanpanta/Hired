from fastapi import FastAPI

from .routers import (user, authentication, google_authentication,
                      email_verification, seeker, employer, experience, preference)
from . import database
from starlette.middleware.sessions import SessionMiddleware
from fastapi.staticfiles import StaticFiles

# uvicorn src.main:app --reload
app = FastAPI()

database.Base.metadata.create_all(database.engine)

SECRET_KEY = "KWn54X_xI9xAOc1c6AWDAwD-JMURBTutRDt3aNbA"

# middleware
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

# exposes our static folder to our users
# http://127.0.0.1:8000/src/static/cv/cv-professional.pdf
app.mount("/src/static", StaticFiles(directory="src/static"), name="static")


app.include_router(authentication.router)
app.include_router(google_authentication.router)
app.include_router(user.router)
app.include_router(email_verification.router)
app.include_router(seeker.router)
app.include_router(employer.router)
app.include_router(experience.router)
app.include_router(preference.router)