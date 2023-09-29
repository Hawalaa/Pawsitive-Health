from pydantic import BaseModel
from .pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        # with pool.connection() as conn:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE username = %s
                    """,
                    [username],
                )
                user = result.fetchone()
                return AccountOutWithPassword(
                    id=user[0],
                    username=user[1],
                    first_name=user[2],
                    last_name=user[3],
                    email=user[4],
                    hashed_password=user[5],
                )

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (
                            username,
                            first_name,
                            last_name,
                            email,
                            hashed_password
                        )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        info.first_name,
                        info.last_name,
                        info.email,
                        hashed_password,
                    ],
                )
                id = result.fetchone()[0]
                old_data = info.dict()
                return AccountOut(user_id=id, id=id, **old_data)
