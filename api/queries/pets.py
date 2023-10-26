from pydantic import BaseModel
from queries.pool import pool
from typing import Union, Optional


class Error(BaseModel):
    message: str


class PetOut(BaseModel):
    id: int
    pet_name: str
    breed: str
    gender: str
    age: int
    weight: float
    pet_pic: Optional[str]


class PetIn(BaseModel):
    pet_name: str
    breed: str
    gender: str
    age: int
    weight: float
    pet_pic: Optional[str]
    user_id: int


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
                            , pet_pic
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
            pet_pic=record[6],
        )

    def pet_in_to_out(self, id: int, pet: PetIn):
        old_data = pet.dict()
        return PetOut(id=id, **old_data)

    def create(self, pet: PetIn) -> PetOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO pet
                            (
                                pet_name,
                                breed,
                                gender,
                                age,
                                weight,
                                pet_pic,
                                user_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            pet.pet_name,
                            pet.breed,
                            pet.gender,
                            pet.age,
                            pet.weight,
                            pet.pet_pic,
                            pet.user_id
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.pet_in_to_out(id, pet)
        except Exception as e:
            print(e)
            return {"message": "error!"}

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
                            , pet_pic = %s
                        WHERE id = %s
                        """,
                        [
                            pet.pet_name,
                            pet.breed,
                            pet.gender,
                            pet.age,
                            pet.weight,
                            pet.pet_pic,
                            pet_id
                        ]
                    )
                    return self.pet_in_to_out(pet_id, pet)
        except Exception as e:
            print(e)
            return {"message": "Could not update that pet"}

    def delete(self, pet_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM pet
                        WHERE id = %s
                        """,
                        [pet_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
