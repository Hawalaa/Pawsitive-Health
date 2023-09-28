from pydantic import BaseModel
from typing import List, Union
from datetime import date, time
from queries.pool import pool


class Error(BaseModel):
    message: str


class WalkIn(BaseModel):
    date: date
    time: time
    duration: str
    pet_id: int


class WalkOut(BaseModel):
    id: int
    date: date
    time: time
    duration: str
    pet_id: int


class WalkRepository:
    def delete(self, walk_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM walk
                        WHERE id = %s
                        """,
                        [walk_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, walk_id: int, walk: WalkIn) -> Union[WalkOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE walk
                        SET date = %s
                            , time = %s
                            , duration= %s
                            , pet_id = %s
                        WHERE id = %s
                        """,
                        [
                            walk.date,
                            walk.time,
                            walk.duration,
                            walk.pet_id,
                            walk_id
                        ]
                    )
                    return self.walk_in_to_out(walk_id, walk)
        except Exception as e:
            print(e)
            return {"message": "Could not update that walk"}

    def get_all(self) -> Union[Error, List[WalkOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, date, time, duration, pet_id
                        FROM walk
                        ORDER BY date;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     walk = WalkOut(
                    #         id=record[0],
                    #         date=record[1],
                    #         time=record[2],
                    #         duration=record[3],
                    #         pet_id=record[4]
                    #     )
                    #     result.append(walk)
                    # return result

                    return [
                        WalkOut(
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
            return {"message": "Could not get all walks"}

    def create(self, walk: WalkIn) -> WalkOut:
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
