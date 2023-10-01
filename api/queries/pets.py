from pydantic import BaseModel
from queries.pool import pool
from typing import Union


class Error(BaseModel):
    message: str


class PetOut(BaseModel):
    pet_name: str
    breed: str
    gender: str
    age: int
    weight: float


class PetIn(BaseModel):
    pet_name: str
    breed: str
    gender: str
    age: int
    weight: float


class PetRepository:
    def get_one(self, pet_id: int):
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                            , pet_name
                            , breed
                            , gender
                            , age
                            , weight
                        FROM pet
                        WHERE id = %s
                        """,
                        [pet_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_pet_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve pet"}

    def record_to_pet_out(self, record):
        return PetOut(
            id=record[0],
            pet_name=record[1],
            breed=record[2],
            gender=record[3],
            age=record[4],
            weight=record[5],
        )

    def pet_in_to_out(self, id: int, pet: PetIn):
        old_data = pet.dict()
        return PetOut(id=id, **old_data)

    def update(self, pet_id: int, pet: PetIn) -> Union[PetOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Check if the pet_id exists before updating
                    db.execute(
                        "SELECT COUNT(*) FROM pet WHERE id = %s",
                        [pet_id]
                        )
                    pet_count = db.fetchone()[0]
                    if pet_count == 0:
                        return {
                            "message": "Pet does not exist."
                            }

                    db.execute(
                        """
                        UPDATE pet
                        SET pet_name = %s
                            , breed = %s
                            , gender = %s
                            , age = %s
                            , weight = %s
                        WHERE id = %s
                        """,
                        [
                            pet.pet_name,
                            pet.breed,
                            pet.gender,
                            pet.age,
                            pet.weight,
                            pet_id
                        ]
                    )
                    return self.pet_in_to_out(pet_id, pet)
        except Exception as e:
            print(e)
            return {"message": "Could not update that pet"}
