from fastapi import APIRouter, Depends
from typing import List, Union
from queries.user_profile import Error, UserOut, UserRepository

router = APIRouter()


@router.get(
    "/user",
    response_model=Union[List[UserOut], Error]
)
def get_all(
    repo: UserRepository = Depends(),
):
    return repo.get_all()
