from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.poops import PoopRepository


client = TestClient(app)


def fake_pet(pet_id):
    return {
        "id": pet_id,
        "pet_name": "testpet",
        "breed": "testbreed",
        "age": 1,
        "weight": 1,
        "pet_pic": (
            "https://animalcorner.org/wp-content/uploads/2020/"
            "05/simon-rae-jY_2XG-6HU0-unsplash.jpg",
        ),
        "user_id": 1,
    }


class CreatePoopRepository:
    def create(self, poop, pet_id):
        result = {
            "id": 1,
            "date": "date",
            "time": "time",
            "consistency": "str",
            "pet_id": pet_id,
        }
        result.update(poop)
        return result


def test_create_poop():
    # Arrange
    app.dependency_overrides[PoopRepository] = CreatePoopRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_pet

    json = {
        "date": "2023-11-13",
        "time": "09:00",
        "consistency": "firm",
        "pet_id": 1,
    }
    expected = {
        "id": 1,
        "date": "2023-11-13",
        "time": "09:00:00",
        "consistency": "firm",
        "pet_id": 1,
    }

    # Act
    response = client.post("/user/{user_id}/pet/1/poops", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
