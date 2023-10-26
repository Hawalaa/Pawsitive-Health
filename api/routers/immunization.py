<<<<<<< HEAD
from fastapi import APIRouter, Depends, Response
from typing import List, Union 
from queries.immunization import (
    Error,
    ImmunizationIn, 
    ImmunizationRepository, 
=======
from fastapi import APIRouter, Depends
from typing import Union, List
from authenticator import authenticator
from queries.immunization import (
    Error,
    ImmunizationIn,
    ImmunizationRepository,
>>>>>>> main
    ImmunizationOut,
)

router = APIRouter()


<<<<<<< HEAD
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
=======
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
>>>>>>> main
):
    return repo.get_all()


@router.put(
<<<<<<< HEAD
    "/user/{user_id}/pet/{pet_id}/immunization/{immunization_id}",
=======
    "/pet/{pet_id}/immunization/{immunization_id}",
>>>>>>> main
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
<<<<<<< HEAD
    "/user/{user_id}/pet/{pet_id}/immunization/{immunization_id}",
=======
    "/immunization/{immunization_id}",
>>>>>>> main
    response_model=bool,
)
def delete_immunization(
    immunization_id: int,
    repo: ImmunizationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(immunization_id)
