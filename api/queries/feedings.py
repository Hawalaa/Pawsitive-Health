from pydantic import BaseModel
from typing import List, Union
from datetime import date, time
from queries.pool import pool


class Error(BaseModel):
    message: str


class FeedingIn(BaseModel):
    date: date
    time: time
    food_type: str
    amount: str
    pet_id: int


class FeedingOut(BaseModel):
    id: int
    date: date
    time: time
    food_type: str
    amount: str
    pet_id: int


class FeedingRepository:
    def delete(self, feeding_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM feeding
                        WHERE id = %s
                        """,
                        [feeding_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
            self,
            feeding_id: int,
            feeding: FeedingIn
            ) -> Union[FeedingOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "SELECT COUNT(*) FROM feeding WHERE id = %s",
                        [feeding_id]
                        )
                    feeding_count = db.fetchone()[0]
                    if feeding_count == 0:
                        return {
                            "message": "Feeding id does not exist."
                            }
                    db.execute(
                        """
                        UPDATE feeding
                        SET date = %s
                            , time = %s
                            , food_type = %s
                            , amount = %s
                            , pet_id = %s
                        WHERE id = %s
                        """,
                        [
                            feeding.date,
                            feeding.time,
                            feeding.food_type,
                            feeding.amount,
                            feeding.pet_id,
                            feeding_id
                        ]
                    )
                    return self.feeding_in_to_out(feeding_id, feeding)
        except Exception as e:
            print(e)
            return {"message": "Could not update feeding"}

    def get_all(self) -> Union[Error, List[FeedingOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, date, time, food_type, amount, pet_id
                        FROM feeding
                        ORDER BY date;
                        """
                    )
                    return [
                        FeedingOut(
                            id=record[0],
                            date=record[1],
                            time=record[2],
                            food_type=record[3],
                            amount=record[4],
                            pet_id=record[5]
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all feedings"}

    def create(self, feeding: FeedingIn, feeding_id: int) -> FeedingOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # check to see if id exists
                    db.execute(
                        "SELECT COUNT(*) FROM feeding WHERE id = %s",
                        [feeding_id]
                        )
                    feeding_count = db.fetchone()[0]
                    if feeding_count == 0:
                        return {
                            "message": "Feeding id does not exist."
                            }
                    result = db.execute(
                        """
                        INSERT INTO feeding
                            (
                                date,
                                time,
                                food_type,
                                amount,
                                pet_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            feeding.date,
                            feeding.time,
                            feeding.food_type,
                            feeding.amount,
                            feeding.pet_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.feeding_in_to_out(id, feeding)
        except Exception as e:
            print(e)
            return {"message": "error!"}

    def feeding_in_to_out(self, id: int, feeding: FeedingIn):
        old_data = feeding.dict()
        return FeedingOut(id=id, **old_data)

    def get_one(self, feeding_id: int):
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                            , date
                            , time
                            , food_type
                            , amount
                            , pet_id
                        FROM feeding
                        WHERE id = %s
                        """,
                        [feeding_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_feeding_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get feeding id"}

    def record_to_feeding_out(self, record):
        return FeedingOut(
            id=record[0],
            date=record[1],
            time=record[2],
            food_type=record[3],
            amount=record[4],
            pet_id=record[5]
        )
