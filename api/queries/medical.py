from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class MedicalIn(BaseModel):
    description: str
    veterinarian: str
    prescription: Optional[str]
    date: date
    pet_id: int


class MedicalOut(BaseModel):
    id: int
    description: str
    veterinarian: str
    prescription: Optional[str]
    date: date
    pet_id: int


class MedicalRepository:
    def update(
        self, medical_id: int, medical: MedicalIn
    ) -> Union[MedicalOut, Error]:
        try:
            # connect to the database
            with pool.connection as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our UPDATE statement
                    db.execute(
                        """
                        UPDATE medical
                        SET description = %s
                        , veterinarian = %s
                        , prescription = %s
                        , date = %s
                        , pet_id = %s
                        WHERE id = %s
                        """,
                        [
                            medical.description,
                            medical.veterinarian,
                            medical.prescription,
                            medical.date,
                            medical.pet_id,
                            medical_id,
                        ],
                    )
                    # old_data = medical.dict()
                    # return MedicalOut(id=id, **old_data)
                    return self.medical_in_to_out(medical_id, medical)
        except Exception as e:
            print(e)
            return {"message": "could not get all records"}

    def get_all(self) -> Union[List[MedicalOut], Error]:
        try:
            # connect to the database
            with pool.connection as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT
                            id,
                            description,
                            veterinarian,
                            prescription,
                            date,
                            pet_id
                        FROM medical
                        ORDER BY date;
                        """
                    )

                    # ============= using list comprehension  =============#
                    # ============ to create a list of records ============#

                    result = [
                        MedicalOut(
                            id=record[0],
                            description=record[1],
                            veterinarian=record[2],
                            prescription=record[3],
                            date=record[4],
                            pet_id=record[5],
                        )
                        for record in db
                    ]
                    return result
        except Exception as e:
            print(e)
            return {"message": "could not get all records"}

    def create(self, medical: MedicalIn) -> MedicalOut:
        try:
            # connect to the database
            with pool.connection as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO medical
                            (
                                description,
                                veterinarian,
                                prescription,
                                date,
                                pet_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            medical.description,
                            medical.veterinarian,
                            medical.prescription,
                            medical.date,
                            medical.pet_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.medical_in_to_out(id, medical)
        except Exception:
            return {"message": "could not create record"}

    def medical_in_to_out(self, id: int, medical: MedicalIn):
        old_data = medical.dict()
        return MedicalOut(id=id, **old_data)
