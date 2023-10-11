from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.sleep import Error, SleepIn, SleepRepository, SleepOut


router = APIRouter()


@router.post(
    "/user/{user_id}/pet/{pet_id}/sleeps",
    response_model=Union[SleepOut, Error],
)
def create_sleep(
    sleep: SleepIn, response: Response, repo: SleepRepository = Depends()
):
    # response.status_code = 400
    return repo.create(sleep)


@router.get(
    "/user/{user_id}/pet/{pet_id}/sleeps",
    response_model=Union[List[SleepOut], Error],
)
def get_all(
    repo: SleepRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/user/{user_id}/pet/{pet_id}/sleeps/{sleep_id}",
    response_model=Union[SleepOut, Error],
)
def update_sleep(
    sleep_id: int,
    sleep: SleepIn,
    repo: SleepRepository = Depends(),
) -> Union[SleepOut, Error]:
    return repo.update(sleep_id, sleep)


@router.delete(
    "/user/{user_id}/pet/{pet_id}/sleeps/{sleep_id}", response_model=bool
)
def delete_sleep(
    sleep_id: int,
    repo: SleepRepository = Depends(),
) -> bool:
    return repo.delete(sleep_id)
