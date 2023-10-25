from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.poops import Error, PoopIn, PoopRepository, PoopOut
from authenticator import authenticator

router = APIRouter()


@router.post(
        "/pet/{pet_id}/poops",
        response_model=Union[PoopOut, Error]
        )
def create_poop(
    pet_id: int,
    poop: PoopIn,
    response: Response,
    repo: PoopRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(poop, pet_id)


@router.get(
    "/user/{user_id}/pet/{pet_id}/poops",
    response_model=Union[List[PoopOut], Error],
)
def get_all(
    repo: PoopRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put(
    "/pet/{pet_id}/poops/{poop_id}",
    response_model=Union[PoopOut, Error],
)
def update_poop(
    poop_id: int,
    poop: PoopIn,
    repo: PoopRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[PoopOut, Error]:
    return repo.update(poop_id, poop)


@router.delete(
        "/poops/{poop_id}",
        response_model=bool
        )
def delete_poop(
    poop_id: int,
    repo: PoopRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(poop_id)
