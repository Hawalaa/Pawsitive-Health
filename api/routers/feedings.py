from authenticator import authenticator
from fastapi import APIRouter, Depends
from typing import List, Union
from queries.feedings import Error, FeedingIn, FeedingOut, FeedingRepository


router = APIRouter()


@router.post(
    "/pet/{pet_id}/feedings",
    response_model=Union[FeedingOut, Error],
)
def create_feeding(
    pet_id: int,
    feeding: FeedingIn,
    repo: FeedingRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(feeding, pet_id)


@router.get(
    "/user/{user_id}/pet/{pet_id}/feedings",
    response_model=Union[List[FeedingOut], Error],
)
def get_all(
    repo: FeedingRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put(
    "/pet/{pet_id}/feedings/{feeding_id}",
    response_model=Union[FeedingOut, Error],
)
def update_feeding(
    feeding_id: int,
    feeding: FeedingIn,
    repo: FeedingRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[FeedingOut, Error]:
    return repo.update(feeding_id, feeding)


@router.delete("/feedings/{feeding_id}", response_model=bool)
def delete_feeding(
    feeding_id: int,
    repo: FeedingRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(feeding_id)
