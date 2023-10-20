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
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserRepository = Depends(),
):
    return repo.get_all(id=account_data["id"])
