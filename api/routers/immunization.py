from fastapi import APIRouter, Depends
from typing import Union, List
from authenticator import authenticator
from queries.immunization import (
    Error,
    ImmunizationIn,
    ImmunizationRepository,
    ImmunizationOut,
)

router = APIRouter()


@router.post(
    "/pet/{pet_id}/immunization",
    response_model=Union[ImmunizationOut, Error],
)
def create_immunization(
    immunization: ImmunizationIn,
    repo: ImmunizationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(immunization)


@router.get(
    "/user/{user_id}/pet/{pet_id}/immunization",
    response_model=Union[List[ImmunizationOut], Error],
)
def get_all(
    repo: ImmunizationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put(
    "/pet/{pet_id}/immunization/{immunization_id}",
    response_model=Union[ImmunizationOut, Error],
)
def update_immunization(
    immunization_id: int,
    immunization: ImmunizationIn,
    repo: ImmunizationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, ImmunizationOut]:
    return repo.update(immunization_id, immunization)


@router.delete(
    "/immunization/{immunization_id}",
    response_model=bool,
)
def delete_immunization(
    immunization_id: int,
    repo: ImmunizationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(immunization_id)
