from fastapi import APIRouter, Depends, Response
from typing import Union, List
from authenticator import authenticator
from queries.medical import (
    Error,
    MedicalIn,
    MedicalRepository,
    MedicalOut,
)

router = APIRouter()


@router.post(
    "/user/{user_id}/pet/{pet_id}/medical",
    response_model=Union[MedicalOut, Error],
)
def create_medical(
    pet_id: int,
    medical: MedicalIn,
    response: Response,
    repo: MedicalRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = repo.get_one(pet_id)
    if record is None:
        response.status_code = 400  # Bad Request
    return repo.create(medical)


@router.get(
    "/user/{user_id}/pet/{pet_id}/medical",
    response_model=Union[List[MedicalOut], Error],
)
def get_all(
    repo: MedicalRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put(
    "/user/{user_id}/pet/{pet_id}/medical/{medical_id}",
    response_model=Union[MedicalOut, Error],
)
def update_medical(
    medical_id: int,
    medical: MedicalIn,
    repo: MedicalRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[MedicalOut, Error]:
    return repo.update(medical_id, medical)


@router.delete(
    "/user/{user_id}/pet/{pet_id}/medical/{medical_id}",
    response_model=bool,
)
def delete_medical(
    medical_id: int,
    repo: MedicalRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(medical_id)
