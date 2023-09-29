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


class ImmunizationRepository:
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



