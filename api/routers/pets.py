from authenticator import authenticator
from fastapi import APIRouter, Response, Depends
from typing import Optional, Union
from queries.pets import PetOut, PetRepository, Error, PetIn


router = APIRouter()


@router.post(
    "/user/{user_id}/pet",
    response_model=Union[PetOut, Error],
)
def create_pet(
    pet: PetIn,
    repo: PetRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.create(pet)


# GET route to show pet profile
@router.get("/user/{user_id}/pet/{pet_id}", response_model=Optional[PetOut])
def get_pet_profile(
    pet_id: int,
    response: Response,
    repo: PetRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
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
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> Union[PetOut, Error]:
    return repo.update(pet_id, pet)


@router.delete(
    "/user/{user_id}/pet/{pet_id}", response_model=bool
)
def delete_pet(
    pet_id: int,
    repo: PetRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> bool:
    return repo.delete(pet_id)
