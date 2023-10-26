from fastapi import APIRouter, Depends
from typing import List, Union
from queries.walks import Error, WalkIn, WalkRepository, WalkOut
from authenticator import authenticator

router = APIRouter()


@router.post("/pet/{pet_id}/walks", response_model=Union[WalkOut, Error])
def create_walk(
    pet_id: int,
    walk: WalkIn,
    repo: WalkRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(walk, pet_id)


@router.get(
    "/user/{user_id}/pet/{pet_id}/walks",
    response_model=Union[List[WalkOut], Error],
)
def get_all(
    repo: WalkRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put(
    "/pet/{pet_id}/walks/{walk_id}", response_model=Union[WalkOut, Error]
)
def update_walk(
    walk_id: int,
    walk: WalkIn,
    repo: WalkRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[WalkOut, Error]:
    return repo.update(walk_id, walk)


@router.delete("/walks/{walk_id}", response_model=bool)
def delete_walk(
    walk_id: int,
    repo: WalkRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(walk_id)
