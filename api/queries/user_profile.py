from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class PetInfo(BaseModel):
    pet_id: int
    pet_name: str
    pet_pic: Optional[str]


class UserOut(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    username: str
    email: str
    pets: Optional[List[PetInfo]]


class UserRepository:
    def get_all(self, id: int) -> Union[List[UserOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT u.id as user_id,
                            u.username,
                            u.first_name,
                            u.last_name,
                            u.email,
                            p.id as pet_id,
                            p.pet_name,
                            p.pet_pic
                        FROM users u
                        LEFT JOIN pet p ON(u.id = p.user_id)
                        WHERE u.id = %s
                        """,
                        [id],
                    )

                    users = {}  # Use a dictionary to group pets by user_id

                    for record in db:
                        (
                            user_id,
                            username,
                            first_name,
                            last_name,
                            email,
                            pet_id,
                            pet_name,
                            pet_pic
                        ) = record
                        if user_id not in users:
                            # Create a new user entry if it doesn't exist
                            user = UserOut(
                                user_id=user_id,
                                username=username,
                                first_name=first_name,
                                last_name=last_name,
                                email=email,
                                pets=[],
                            )
                            users[user_id] = user
                        # Append pet data to the user's pets list
                        if pet_id is not None and pet_name is not None:
                            users[user_id].pets.append(
                                PetInfo(
                                    pet_id=pet_id,
                                    pet_name=pet_name,
                                    pet_pic=pet_pic
                                    )
                                )
                        else:
                            users[user_id].pets = None

                    return list(users.values())
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}
