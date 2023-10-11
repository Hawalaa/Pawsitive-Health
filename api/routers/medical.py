from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.medical import (
    Error,
    MedicalIn,
    MedicalRepository,
    MedicalOut,
)

router = APIRouter()


@router.post(
        "/user/{user_id}/pet/{pet_id}/medical",
        response_model=Union[MedicalOut, Error]
)
def create_medical(
    medical: MedicalIn,
    response: Response,
    repo: MedicalRepository = Depends(),
):
    response.status_code = 400  # Bad Request
    return repo.create(medical)


@router.get(
        "/user/{user_id}/pet/{pet_id}/medical",
        response_model=Union[List[MedicalOut], Error]
)
def get_all(
    repo: MedicalRepository = Depends(),
):
    return repo.get_all()


@router.put(
        "/user/{user_id}/pet/{pet_id}/medical/{medical_id}",
        response_model=Union[MedicalOut, Error]
)
def update_medical(
    medical_id: int,
    medical: MedicalIn,
    repo: MedicalRepository = Depends(),
) -> Union[MedicalOut, Error]:
    return repo.update(medical_id, medical)
