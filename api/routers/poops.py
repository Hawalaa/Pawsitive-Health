from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.poops import Error, PoopIn, PoopRepository, PoopOut


router = APIRouter()


@router.post(
        "/user/{user_id}/pet/{pet_id}/poops",
        response_model=Union[PoopOut, Error]
        )
def create_poop(
    pet_id: int,
    poop: PoopIn,
    response: Response,
    repo: PoopRepository = Depends()
):
    record = repo.get_one(pet_id)
    if record is None:
        response.status_code = 404
    return repo.create(poop, pet_id)


@router.get(
        "/user/{user_id}/pet/{pet_id}/poops",
        response_model=Union[List[PoopOut], Error]
        )
def get_all(
    repo: PoopRepository = Depends(),
):
    return repo.get_all()


@router.put(
        "/user/{user_id}/pet/{pet_id}/poops/{poop_id}",
        response_model=Union[PoopOut, Error]
        )
def update_poop(
    poop_id: int,
    poop: PoopIn,
    repo: PoopRepository = Depends(),
) -> Union[PoopOut, Error]:
    return repo.update(poop_id, poop)


@router.delete(
        "/user/{user_id}/pet/{pet_id}/poops/{poop_id}",
        response_model=bool
        )
def delete_poop(
    poop_id: int,
    repo: PoopRepository = Depends(),
) -> bool:
    return repo.delete(poop_id)
