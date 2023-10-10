from fastapi import APIRouter, Depends
from typing import List
from queries.dashboard import DashboardRepo, DashboardResponse

router = APIRouter()


@router.get("/dashboard", response_model=List[DashboardResponse])
def get_all(
    repo: DashboardRepo = Depends(),
):
    users = repo.get_all_users()
    pets_dict = repo.get_all_pets()
    walks = repo.get_all_walks()

    combined = []

    for user in users:
        account_data = dict(user)
        user_id = user["id"]

        if user_id in pets_dict:
            account_data["pets"] = pets_dict[user_id]
        else:
            account_data["pets"] = []  # No pets for this user

        combined.append(account_data)

    for walk in walks:
        walk_data = walk.dict()
        pet_id = walk_data["pet_id"]

        for user in combined:
            for pet in user["pets"]:
                if pet["id"] == pet_id:
                    if "walks" not in pet:
                        pet["walks"] = []
                    pet["walks"].append(walk_data)
                    break
    return combined
