from fastapi import APIRouter, Depends
from typing import List
from queries.activities import ActivitiesRepo, ActivitiesResponse

router = APIRouter()


@router.get(
    "/user/{user_id}/pet/{pet_id}/activities",
    response_model=List[ActivitiesResponse],
)
def get_all(
    repo: ActivitiesRepo = Depends(),
):
    users = repo.get_all_users()
    pets_dict = repo.get_all_pets()
    walks = repo.get_all_walks()
    feedings = repo.get_all_feedings()
    sleeps = repo.get_all_sleeps()
    poops = repo.get_all_poops()

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

    for feeding in feedings:
        feeding_data = feeding.dict()
        pet_id = feeding_data["pet_id"]

        for user in combined:
            for pet in user["pets"]:
                if pet["id"] == pet_id:
                    if "feedings" not in pet:
                        pet["feedings"] = []
                    pet["feedings"].append(feeding_data)
                    break

    for sleep in sleeps:
        sleep_data = sleep.dict()
        pet_id = sleep_data["pet_id"]

        for user in combined:
            for pet in user["pets"]:
                if pet["id"] == pet_id:
                    if "sleeps" not in pet:
                        pet["sleeps"] = []
                    pet["sleeps"].append(sleep_data)
                    break

    for poop in poops:
        poop_data = poop.dict()
        pet_id = poop_data["pet_id"]

        for user in combined:
            for pet in user["pets"]:
                if pet["id"] == pet_id:
                    if "poops" not in pet:
                        pet["poops"] = []
                    pet["poops"].append(poop_data)
                    break

    return combined
