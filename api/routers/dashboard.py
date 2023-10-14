from fastapi import APIRouter, Depends

from authenticator import authenticator
from typing import List
from queries.dashboard import DashboardRepo, DashboardResponse

router = APIRouter()


@router.get("/dashboard", response_model=List[DashboardResponse])
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DashboardRepo = Depends(),
):
    users = repo.get_all_users()
    pets_dict = repo.get_all_pets()
    walks = repo.get_all_walks()
    medical = repo.get_all_medical()
    immunizations = repo.get_all_immunizations()
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

    for record in medical:
        pet_id = record.pet_id
        medical_info = {
            "id": record.id,
            "description": record.description,
            "veterinarian": record.veterinarian,
            "prescription": record.prescriptions,
            "date": record.date,
        }

        for user in combined:
            for pet in user["pets"]:
                if pet["id"] == pet_id:
                    if "medical" not in pet:
                        pet["medical"] = []
                    pet["medical"].append(medical_info)
                    break

    for record in immunizations:
        pet_id = record.pet_id
        immunization_info = {
            "id": record.id,
            "vaccination": record.vaccination,
            "date": record.date,
            "date_valid_until": record.date_valid_until,
        }

        for user in combined:
            for pet in user["pets"]:
                if pet["id"] == pet_id:
                    if "immunizations" not in pet:
                        pet["immunizations"] = []
                    pet["immunizations"].append(immunization_info)
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
