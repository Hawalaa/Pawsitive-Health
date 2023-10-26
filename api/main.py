from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
from routers import immunization
import os
from routers import (
    walks,
    accounts,
    user_profile,
    pets,
    immunization,
    medical,
    dashboard,
    feedings,
    poops,
    sleep,
    activities,
    records,
)

app = FastAPI()
<<<<<<< HEAD
app.include_router(immunization.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(pets.router)
=======
app.include_router(accounts.router, tags=["Account"])
app.include_router(authenticator.router, tags=["Authentication"])
app.include_router(user_profile.router, tags=["User Profile"])
app.include_router(dashboard.router, tags=["Dashboard"])
app.include_router(pets.router, tags=["Pets"])
app.include_router(activities.router, tags=["Activities"])
app.include_router(feedings.router, tags=["Feedings"])
app.include_router(poops.router, tags=["Poops"])
app.include_router(sleep.router, tags=["Sleep"])
app.include_router(walks.router, tags=["Walks"])
app.include_router(immunization.router, tags=["Immunization"])
app.include_router(medical.router, tags=["Medical"])
app.include_router(records.router, tags=["Records"])

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]
>>>>>>> main

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}
