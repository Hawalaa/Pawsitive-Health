from typing import List, Union
from pydantic import BaseModel
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str


class ImmunizationIn(BaseModel):
    pet_id: int
    vaccination: str
    date: date
    date_valid_until: date


class ImmunizationOut(BaseModel):
    id: int
    pet_id: int
    vaccination: str
    date: date
    date_valid_until: date   


class ImmunizationRepository(BaseModel):
    def delete(self, immunization_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM immunization
                        WHERE id = %s
                        """,
                        [immunization_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

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
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                    """
                    SELECT pet_id, vaccination, date, date_valid_until
                    FROM immunization
                    ORDER BY date; 
                    """
                    )
                    result = []
              
                    return [
                        immunization = ImmunizationOut(
                            id=record[0],
                            pet_id=record[1],
                            vaccination=record[2],
                            date=record[3],
                            date_valid_until=record[4],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all immunizations" }


    def create(self, immunization: ImmunizationIn) -> ImmunizationOut:
        # connect to the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO immunization
                        (pet_id, vaccination, date, date_valid_until)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        immunization.pet_id, 
                        immunization.vaccination, 
                        immunization.date, 
                        immunization.date_valid_until
                    ]   
                )
                id=result.fetchone()[0]
                # Return new data
                old_data = immunization.dict()
                return{"message": "error!"}
                return ImmunizationOut(id=id, **old_data)



