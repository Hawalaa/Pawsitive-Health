from pydantic import BaseModel
from typing import List, Union
from datetime import date, time
from queries.pool import pool


class Error(BaseModel):
    message: str


class FeedingIn(BaseModel):
    type_of_food: str
    amount: str
    date: date
    time: time
    duration: str
    pet_id: int


class FeedingOut(BaseModel):
    id: int
    type_of_food: str
    amount: str
    date: date
    time: time
    duration: str
    pet_id: int


class FeedingRepository:
    def delete(self, feeding_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM walk
                        WHERE id = %s
                        """,
                        [feeding_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, feeding_id: int, feeding: FeedingIn) -> Union[FeedingOut, Error]:
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
                        SET type_of_food = %s
                            , amount = %s
                            , date = %s
                            , time = %s
                            , duration= %s
                            , pet_id = %s
                        WHERE id = %s
                        """,
                        [
                            feeding.type_of_food,
                            feeding.amount,
                            feeding.date,
                            feeding.time,
                            feeding.duration,
                            feeding.pet_id,
                            feeding_id
                        ]
                    )
                    return self.walk_in_to_out(feeding_id, feeding)
        except Exception as e:
            print(e)
            return {"message": "Could not update that walk"}

    def get_all(self) -> Union[Error, List[FeedingOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, date, time, duration, pet_id
                        FROM feeding
                        ORDER BY date;
                        """
                    )
                    return [
                        FeedingOut(
                            id=record[0],
                            date=record[1],
                            time=record[2],
                            duration=record[3],
                            pet_id=record[4]
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all feedings"}

    def create(self, feeding: FeedingIn, ) -> FeedingOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO walk
                            (
                                date,
                                time,
                                duration,
                                pet_id
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            walk.date,
                            walk.time,
                            walk.duration,
                            walk.pet_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.walk_in_to_out(id, walk)
        except Exception as e:
            print(e)
            return {"message": "error!"}

    def walk_in_to_out(self, id: int, walk: WalkIn):
        old_data = walk.dict()
        return WalkOut(id=id, **old_data)
