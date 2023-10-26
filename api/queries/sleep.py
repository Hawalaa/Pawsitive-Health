from pydantic import BaseModel
from typing import List, Union
from datetime import date, time
from queries.pool import pool


class Error(BaseModel):
    message: str


class SleepIn(BaseModel):
    date: date
    time: time
    duration: int
    pet_id: int


class SleepOut(BaseModel):
    id: int
    date: date
    time: time
    duration: int
    pet_id: int


class SleepRepository:
    def delete(self, sleep_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM sleep
                        WHERE id = %s
                        """,
                        [sleep_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, sleep_id: int, sleep: SleepIn) -> Union[SleepOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "SELECT COUNT(*) FROM sleep WHERE id = %s", [sleep_id]
                    )
                    sleep_count = db.fetchone()[0]
                    if sleep_count == 0:
                        return {"message": "Sleep does not exist."}
                    db.execute(
                        """
                        UPDATE sleep
                        SET date = %s
                            , time = %s
                            , duration= %s
                            , pet_id = %s
                        WHERE id = %s
                        """,
                        [
                            sleep.date,
                            sleep.time,
                            sleep.duration,
                            sleep.pet_id,
                            sleep_id,
                        ],
                    )
                    return self.sleep_in_to_out(sleep_id, sleep)
        except Exception as e:
            print(e)
            return {"message": "Could not update that sleep"}

    def get_all(self) -> Union[List[SleepOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, date, time, duration, pet_id
                        FROM sleep
                        ORDER BY date;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     sleep = SleepOut(
                    #         id=record[0],
                    #         date=record[1],
                    #         time=record[2],
                    #         duration=record[3],
                    #         pet_id=record[4]
                    #     )
                    #     result.append(sleep)
                    # return result

                    return [
                        SleepOut(
                            id=record[0],
                            date=record[1],
                            time=record[2],
                            duration=record[3],
                            pet_id=record[4],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all sleeps"}

    def create(self, sleep: SleepIn) -> SleepOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO sleep
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
                        [sleep.date, sleep.time, sleep.duration, sleep.pet_id],
                    )
                    id = result.fetchone()[0]
                    return self.sleep_in_to_out(id, sleep)
        except Exception as e:
            print(e)
            return {"message": "error!"}

    def sleep_in_to_out(self, id: int, sleep: SleepIn):
        old_data = sleep.dict()
        return SleepOut(id=id, **old_data)
