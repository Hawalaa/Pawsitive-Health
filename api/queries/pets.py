from pydantic import BaseModel
from queries.pool import pool


class PetOut(BaseModel):
    pet_name: str
    breed: str
    gender: str
    age: int
    weight: float


class PetRepository:
    def get_one(self, pet_id: int):
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                            , pet_name
                            , breed
                            , gender
                            , age
                            , weight
                        FROM pet
                        WHERE id = %s
                        """,
                        [pet_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_pet_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve pet"}

    def record_to_pet_out(self, record):
        return PetOut(
            id=record[0],
            pet_name=record[1],
            breed=record[2],
            gender=record[3],
            age=record[4],
            weight=record[5],
        )
