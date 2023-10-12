from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
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
app.include_router(walks.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(pets.router)
app.include_router(immunization.router)
app.include_router(medical.router)
app.include_router(user_profile.router)
app.include_router(dashboard.router)
app.include_router(feedings.router)
app.include_router(poops.router)
app.include_router(sleep.router)
app.include_router(activities.router)
app.include_router(records.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
