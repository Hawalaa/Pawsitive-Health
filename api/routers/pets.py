from fastapi import APIRouter, Response, Depends
from typing import Optional, Union
from queries.pets import PetOut, PetRepository, Error, PetIn


router = APIRouter()


# GET route to show pet profile
@router.get("/user/{user_id}/pet/{pet_id}", response_model=Optional[PetOut])
def get_pet_profile(
    pet_id: int,
    response: Response,
    repo: PetRepository = Depends(),
) -> PetOut:
    record = repo.get_one(pet_id)
    if record is None:
        response.status_code = 404
    return record


# PUT route to update pet profile
@router.put(
        "/user/{user_id}/pet/{pet_id}",
        response_model=Union[PetOut, Error]
        )
def update_pet_profile(
    pet_id: int,
    pet: PetIn,
    repo: PetRepository = Depends(),
) -> Union[PetOut, Error]:
    return repo.update(pet_id, pet)
