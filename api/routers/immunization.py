from fastapi import APIRouter, Depends, Response
from typing import List, Union 
from queries.immunization import (
    Error,
    ImmunizationIn, 
    ImmunizationRepository, 
    ImmunizationOut,
)

router = APIRouter()


@router.post("/immunization", response_model=Union[ImmunizationOut, Error])
def create_immunization(
    immunization: ImmunizationIn,
    response: Response, 
    repo: ImmunizationRepository=Depends()
):
    response.status_code=400
    return repo.create(immunization)


@router.get("/immunization", response_model=Union[ImmunizationOut, Error])
def get_all():
    repo: ImmunizationRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/user/{user_id}/pet/{pet_id}/immunization/{immunization_id}",
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
    "/user/{user_id}/pet/{pet_id}/immunization/{immunization_id}",
    response_model=bool,
)
def delete_immunization(
    immunization_id: int,
    repo: ImmunizationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(immunization_id)
