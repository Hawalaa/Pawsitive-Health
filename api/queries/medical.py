from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class MedicalIn(BaseModel):
    description: str
    veterinarian: str
    prescriptions: Optional[str]
    date: date
    pet_id: int


class MedicalOut(BaseModel):
    id: int
    description: str
    veterinarian: str
    prescriptions: Optional[str]
    date: date
    pet_id: int
    pet_pic: str


class MedicalRepository(BaseModel):
    def delete(self, medical_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM medical
                        WHERE id = %s
                        """,
                        [medical_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, medical_id: int, medical: MedicalIn
    ) -> Union[MedicalOut, Error]:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our UPDATE statement
                    db.execute(
                        """
                        UPDATE medical
                        SET description = %s
                        , veterinarian = %s
                        , prescriptions = %s
                        , date = %s
                        , pet_id = %s
                        WHERE id = %s
                        """,
                        [
                            medical.description,
                            medical.veterinarian,
                            medical.prescriptions,
                            medical.date,
                            medical.pet_id,
                            medical_id,
                        ],
                    )
                    return self.medical_in_to_out(medical_id, medical)
        except Exception as e:
            print(e)
            return {"message": "could not get all records"}

    def get_all(self) -> Union[List[MedicalOut], Error]:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT
                            i.id,
                            i.description,
                            i.veterinarian,
                            i.prescriptions,
                            i.date,
                            i.pet_id,
                            p.pet_pic
                        FROM medical i
                        LEFT JOIN pet p ON(i.pet_id = p.id)
                        ORDER BY date DESC
                        """
                    )

                    # ============= using list comprehension  =============#
                    # ============ to create a list of records ============#

                    result = [
                        MedicalOut(
                            id=record[0],
                            description=record[1],
                            veterinarian=record[2],
                            prescriptions=record[3],
                            date=record[4],
                            pet_id=record[5],
                            pet_pic=record[6],
                        )
                        for record in db
                    ]
                    return result
        except Exception as e:
            print(e)
            return {"message": "could not get all records"}

    def get_one(self, medical_id: int):
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                            , description
                            , veterinarian
                            , prescriptions
                            , date
                            , pet_id
                        FROM medical
                        WHERE id = %s
                        """,
                        [medical_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_medical_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve medical"}

    def record_to_medical_out(self, record):
        return MedicalOut(
            id=record[0],
            description=record[1],
            veterinarian=record[2],
            prescriptions=record[3],
            date=record[4],
            pet_id=record[5],
        )

    def create(self, medical: MedicalIn) -> MedicalOut:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO medical
                            (
                                description,
                                veterinarian,
                                prescriptions,
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
                            medical.prescriptions,
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
