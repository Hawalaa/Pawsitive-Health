<<<<<<< HEAD
from typing import List, Union
from pydantic import BaseModel
from datetime import date
from queries.pool import pool

=======
from pydantic import BaseModel
from typing import List, Union
from datetime import date
from queries.pool import pool


>>>>>>> main
class Error(BaseModel):
    message: str


class ImmunizationIn(BaseModel):
<<<<<<< HEAD
    pet_id: int
    vaccination: str
    date: date
    date_valid_until: date
=======
    vaccination: str
    date: date
    date_valid_until: date
    pet_id: int
>>>>>>> main


class ImmunizationOut(BaseModel):
    id: int
<<<<<<< HEAD
    pet_id: int
    vaccination: str
    date: date
    date_valid_until: date   
=======
    vaccination: str
    date: date
    date_valid_until: date
    pet_id: int
    # pet_pic: Optional[str]
>>>>>>> main


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
<<<<<<< HEAD
            # connect to the database
=======
            # connect the database
>>>>>>> main
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
<<<<<<< HEAD
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



=======
                        """
                        SELECT i.id,
                        i.vaccination,
                        i.date,
                        i.date_valid_until,
                        i.pet_id,
                        p.pet_pic
                        FROM immunization i
                        LEFT JOIN pet p ON(i.pet_id = p.id)
                        ORDER BY date;
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
                            pet_pic=record[5],
                        )
                        for record in db
                    ]
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all immunizations"}

    def get_one(self, immunization_id: int):
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                            , vaccination
                            , date
                            , date_valid_until
                            , pet_id
                        FROM immunization
                        WHERE id = %s
                        """,
                        [immunization_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_immunization_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve immunization"}

    def record_to_immunization_out(self, record):
        return ImmunizationOut(
            id=record[0],
            vaccination=record[1],
            date=record[2],
            date_valid_until=record[3],
            pet_id=record[4],
        )

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
>>>>>>> main
