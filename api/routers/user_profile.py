from fastapi import APIRouter, Depends
from typing import List, Union
from queries.user_profile import Error, UserOut, UserRepository
from authenticator import authenticator

router = APIRouter()


@router.get(
    "/user",
    response_model=Union[List[UserOut], Error]
)
def get_all(
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get_all()
