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


@router.get("/immunization", response_model=List[ImmunizationOut])
def get_all(
    repo: ImmunizationRepository = Depends(),
):
    return repo.get_all();
                                                     