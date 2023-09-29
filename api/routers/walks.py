from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.walks import Error, WalkIn, WalkRepository, WalkOut


router = APIRouter()


@router.post(
        "/user/{user_id}/pet/{pet_id}/walks",
        response_model=Union[WalkOut, Error]
        )
def create_walk(
    walk: WalkIn,
    response: Response,
    repo: WalkRepository = Depends()
):
    # response.status_code = 400
    return repo.create(walk)


@router.get(
        "/user/{user_id}/pet/{pet_id}/walks",
        response_model=Union[List[WalkOut], Error]
        )
def get_all(
    repo: WalkRepository = Depends(),
):
    return repo.get_all()


@router.put(
        "/user/{user_id}/pet/{pet_id}/walks/{walk_id}",
        response_model=Union[WalkOut, Error]
        )
def update_walk(
    walk_id: int,
    walk: WalkIn,
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
