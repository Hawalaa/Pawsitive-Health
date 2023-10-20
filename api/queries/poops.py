from pydantic import BaseModel
from typing import List, Union
from datetime import date, time
from queries.pool import pool


class Error(BaseModel):
    message: str


class PoopIn(BaseModel):
    date: date
    time: time
    consistency: str
    pet_id: int


class PoopOut(BaseModel):
    id: int
    date: date
    time: time
    consistency: str
    pet_id: int


class PoopRepository:
    def delete(self, poop_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM poop
                        WHERE id = %s
                        """,
                        [poop_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, poop_id: int, poop: PoopIn) -> Union[PoopOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "SELECT COUNT(*) FROM poop WHERE id = %s", [poop_id]
                    )
                    poop_count = db.fetchone()[0]
                    if poop_count == 0:
                        return {"message": "Pet does not exist."}
                    db.execute(
                        """
                        UPDATE poop
                        SET date = %s
                            , time = %s
                            , consistency= %s
                            , pet_id = %s
                        WHERE id = %s
                        """,
                        [
                            poop.date,
                            poop.time,
                            poop.consistency,
                            poop.pet_id,
                            poop_id,
                        ],
                    )
                    return self.poop_in_to_out(poop_id, poop)
        except Exception as e:
            print(e)
            return {"message": "Could not update that poop"}

    def get_all(self) -> Union[Error, List[PoopOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, date, time, consistency, pet_id
                        FROM poop
                        ORDER BY date DESC
                        """
                    )

                    return [
                        PoopOut(
                            id=record[0],
                            date=record[1],
                            time=record[2],
                            consistency=record[3],
                            pet_id=record[4],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all poops"}

    def create(self, poop: PoopIn, pet_id: int) -> PoopOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "SELECT COUNT(*) FROM pet WHERE id = %s", [pet_id]
                    )
                    pet_count = db.fetchone()[0]
                    if pet_count == 0:
                        return {"message": "Pet does not exist."}

                    result = db.execute(
                        """
                        INSERT INTO poop
                            (
                                date,
                                time,
                                consistency,
                                pet_id
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [poop.date, poop.time, poop.consistency, poop.pet_id],
                    )
                    id = result.fetchone()[0]
                    return self.poop_in_to_out(id, poop)
        except Exception as e:
            print(e)
            return {"message": "error!"}

    def get_one(self, poop_id: int):
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
                            , consistency
                            , pet_id
                        FROM poop
                        WHERE id = %s
                        """,
                        [poop_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_poop_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve poop"}

    def record_to_poop_out(self, record):
        return PoopOut(
            id=record[0],
            date=record[1],
            time=record[2],
            consistency=record[3],
            pet_id=record[4],
        )

    def poop_in_to_out(self, id: int, poop: PoopIn):
        old_data = poop.dict()
        return PoopOut(id=id, **old_data)
