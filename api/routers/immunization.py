from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.immunization import (
    Error,
    ImmunizationIn,
    ImmunizationRepository,
    ImmunizationOut,
)

router = APIRouter()


@router.post(
    "/user/{user_id}/pet/{pet_id}/immunization",
    response_model=Union[ImmunizationOut, Error],
)
def create_immunization(
    pet_id: int,
    immunization: ImmunizationIn,
    response: Response,
    repo: ImmunizationRepository = Depends(),
):
    record = repo.get_one(pet_id)
    if record is None:
        response.status_code = 400  # bad request
    return repo.create(immunization)


@router.get(
    "/user/{user_id}/pet/{pet_id}/immunization",
    response_model=Union[List[ImmunizationOut], Error],
)
def get_all(
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
) -> Union[Error, ImmunizationOut]:
    return repo.update(immunization_id, immunization)
