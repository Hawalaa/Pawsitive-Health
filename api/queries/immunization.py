from pydantic import BaseModel
from typing import List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class ImmunizationIn(BaseModel):
    vaccination: str
    date: date
    date_valid_until: date
    pet_id: int


class ImmunizationOut(BaseModel):
    id: int
    vaccination: str
    date: date
    date_valid_until: date
    pet_id: int


class ImmunizationRepository(BaseModel):
    def update(
        self, immunization_id: int, immunization: ImmunizationIn
    ) -> Union[ImmunizationOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our UPDATE statement
                    db.execute(
                        """
                        UPDATE immunization
                        SET vaccination = %s
                        , date = %s
                        , date_valid_until = %s
                        , pet_id = %s
                        WHERE id = %s
                        """,
                        [
                            immunization.vaccination,
                            immunization.date,
                            immunization.date_valid_until,
                            immunization.pet_id,
                            immunization_id,
                        ],
                    )
            return self.immunization_in_to_out(immunization_id, immunization)
        except Exception as e:
            print(e)
            return {"message": "Could not update that immunizations"}

    def get_all(self) -> Union[Error, List[ImmunizationOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, vaccination, date, date_valid_until, pet_id
                        FROM immunization
                        ORDERED BY date;
                        """
                    )

                    # ============= using list comprehension  =============#
                    # ============ to create a list of records ============#
                    result = [
                        ImmunizationOut(
                            id=record[0],
                            vaccination=record[1],
                            date=record[2],
                            date_valid_until=record[3],
                            pet_id=record[4],
                        )
                        for record in db
                    ]
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all immunizations"}

    def create(self, immunization: ImmunizationIn) -> ImmunizationOut:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO immunization
                        (vaccination, date, date_valid_until, pet_id)
                        VALUES
                        (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            immunization.vaccination,
                            immunization.date,
                            immunization.date_valid_until,
                            immunization.pet_id,
                        ],
                    )
            id = result.fetchone()[0]
            return self.immunization_in_to_out(id, immunization)
        except Exception:
            return {"message": "Could not create"}

    def immunization_in_to_out(self, id: int, immunization: ImmunizationIn):
        old_data = immunization.dict()
        return ImmunizationOut(id=id, **old_data)
