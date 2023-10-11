from fastapi import APIRouter, Depends
from typing import List
from queries.records import RecordsRepo, RecordsResponse

router = APIRouter()


@router.get(
    "/user/{user_id}/pet/{pet_id}/records",
    response_model=List[RecordsResponse],
)
def get_all(
    repo: RecordsRepo = Depends(),
):
    users = repo.get_all_users()
    pets_dict = repo.get_all_pets()
    medical = repo.get_all_medical()
    immunizations = repo.get_all_immunizations()

    combined = []

    for user in users:
        account_data = dict(user)
        user_id = user["id"]

        if user_id in pets_dict:
            account_data["pets"] = pets_dict[user_id]
        else:
            account_data["pets"] = []  # No pets for this user

        combined.append(account_data)

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
    return combined
