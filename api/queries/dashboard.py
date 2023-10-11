from .pool import pool
from typing import List, Dict
from pydantic import BaseModel
from .walks import WalkOut
from .medical import MedicalOut
from .immunization import ImmunizationOut
from .feedings import FeedingOut
from .sleep import SleepOut
from .poops import PoopOut


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
                            "walks": [],
                            "medical": [],
                            "immunizations": [],
                            "feedings": [],
                            "sleeps": [],
                            "poops": [],
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

    def get_all_medical(self) -> List[Dict]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM medical
                        """
                    )
                    medical_results = db.fetchall()

                    medical = [
                        MedicalOut(
                            id=row[0],
                            description=row[1],
                            veterinarian=row[2],
                            prescriptions=row[3],
                            date=row[4],
                            pet_id=row[5],
                        )
                        for row in medical_results
                    ]

                    return medical

        except Exception as e:
            print("Error in get_all_medical:", e)
            return []

    def get_all_immunizations(self) -> List[Dict]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM immunization
                        """
                    )
                    immunization_results = db.fetchall()

                    immunizations = [
                        ImmunizationOut(
                            id=row[0],
                            vaccination=row[1],
                            date=row[2],
                            date_valid_until=row[3],
                            pet_id=row[4],
                        )
                        for row in immunization_results
                    ]

                    return immunizations

        except Exception as e:
            print("Error in get_all_immunizations:", e)
            return []

    def get_all_feedings(self) -> List[Dict]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM feeding
                        """
                    )
                    feeding_results = db.fetchall()

                    feedings = [
                        FeedingOut(
                            id=row[0],
                            date=row[1],
                            time=row[2],
                            food_type=row[3],
                            amount=row[4],
                            pet_id=row[5],
                        )
                        for row in feeding_results
                    ]

                    return feedings

        except Exception as e:
            print("Error in get_all_feedings:", e)
            return []

    def get_all_sleeps(self) -> List[Dict]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM sleep
                        """
                    )
                    sleep_results = db.fetchall()

                    sleeps = [
                        SleepOut(
                            id=row[0],
                            date=row[1],
                            time=row[2],
                            duration=row[3],
                            pet_id=row[4],
                        )
                        for row in sleep_results
                    ]

                    return sleeps

        except Exception as e:
            print("Error in get_all_sleeps:", e)
            return []

    def get_all_poops(self) -> List[Dict]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM poop
                        """
                    )
                    poop_results = db.fetchall()

                    poops = [
                        PoopOut(
                            id=row[0],
                            date=row[1],
                            time=row[2],
                            consistency=row[3],
                            pet_id=row[4],
                        )
                        for row in poop_results
                    ]

                    return poops

        except Exception as e:
            print("Error in get_all_poops:", e)
            return []
