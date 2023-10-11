from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.feedings import Error, FeedingIn, FeedingOut, FeedingRepository


router = APIRouter()


@router.post(
        "/user/{user_id}/pet/{pet_id}/feedings",
        response_model=Union[FeedingOut, Error]
        )
def create_feeding(
    pet_id: int,
    feeding: FeedingIn,
    response: Response,
    repo: FeedingRepository = Depends()
):
    record = repo.get_one(pet_id)
    if record is None:
        response.status_code = 404
    return repo.create(feeding, pet_id)


@router.get(
        "/user/{user_id}/pet/{pet_id}/feedings",
        response_model=Union[List[FeedingOut], Error]
        )
def get_all(
    repo: FeedingRepository = Depends(),
):
    return repo.get_all()


@router.put(
        "/user/{user_id}/pet/{pet_id}/feedings/{feeding_id}",
        response_model=Union[FeedingOut, Error]
        )
def update_feeding(
    feeding_id: int,
    feeding: FeedingIn,
    repo: FeedingRepository = Depends(),
) -> Union[FeedingOut, Error]:
    return repo.update(feeding_id, feeding)


@router.delete(
        "/user/{user_id}/pet/{pet_id}/feedings/{feeding_id}",
        response_model=bool
        )
def delete_feeding(
    feeding_id: int,
    repo: FeedingRepository = Depends(),
) -> bool:
    return repo.delete(feeding_id)
