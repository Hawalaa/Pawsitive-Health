from .pool import pool
from typing import List, Dict
from pydantic import BaseModel
from .walks import WalkOut


class DashboardResponse(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    pets: List[Dict]


class DashboardRepo:
    def get_all_users(self) -> List[Dict]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM users
                        """
                    )
                    user_results = db.fetchall()

                    users = [
                        {
                            "id": row[0],
                            "username": row[1],
                            "first_name": row[2],
                            "last_name": row[3],
                            "email": row[4],
                            "pets": [],
                        }
                        for row in user_results
                    ]

                    return users
        except Exception as e:
            print("Error in get_all_accounts:", e)
            return []

    def get_all_pets(self) -> Dict[int, List[Dict]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM pet
                        LEFT JOIN users
                        ON pet.user_id = users.id
                        """
                    )
                    pet_results = db.fetchall()

                    pets_dict = (
                        {}
                    )  # Create a dictionary to store pets by user ID

                    for row in pet_results:
                        user_id = row[7]
                        pet_data = {
                            "id": row[0],
                            "pet_name": row[1],
                            "breed": row[2],
                            "gender": row[3],
                            "age": row[4],
                            "weight": row[5],
                            "pet_pic": row[6],
                            "walks": [],  # Initialize an empty list for walks
                        }

                        if user_id in pets_dict:
                            pets_dict[user_id].append(pet_data)
                        else:
                            # Create a new entry for the user's pets
                            pets_dict[user_id] = [pet_data]

                    return pets_dict  # Return the dictionary

        except Exception as e:
            print("Error in get_all_pets:", e)
            return {}

    def get_all_walks(self) -> List[WalkOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM walk
                        """
                    )
                    walk_results = db.fetchall()

                    walks = [
                        WalkOut(
                            id=row[0],
                            date=row[1],
                            time=row[2],
                            duration=row[3],
                            pet_id=row[4],
                        )
                        for row in walk_results
                    ]

                    return walks

        except Exception as e:
            print("Error in get_all_walks:", e)
            return []
