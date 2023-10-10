from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.feedings import Error, FeedingIn, FeedingOut, FeedingRepository


router = APIRouter()


@router.post(
        "/user/{user_id}/pet/{pet_id}/feedings",
        response_model=Union[FeedingOut, Error]
        )
def create_feeding(
    feeding: FeedingIn,
    response: Response,
    repo: FeedingRepository = Depends()
):
    response.status_code = 400
    return repo.create(feeding)


@router.get(
        "/user/{user_id}/pet/{pet_id}/feedings",
        response_model=Union[List[FeedingOut], Error]
        )
def get_all(
    repo: FeedingRepository = Depends(),
):
    return repo.get_all()


@router.put(
        "/user/{user_id}/pet/{pet_id}/feedings/{feed_id}",
        response_model=Union[FeedOut, Error]
        )
def update_feeding(
    feed_id: int,
    feeding: FeedIn,
    repo: WalkRepository = Depends(),
) -> Union[WalkOut, Error]:
    return repo.update(walk_id, walk)


@router.delete(
        "/user/{user_id}/pet/{pet_id}/walks/{walk_id}",
        response_model=bool
        )
def delete_walk(
    walk_id: int,
    repo: WalkRepository = Depends(),
) -> bool:
    return repo.delete(walk_id)
