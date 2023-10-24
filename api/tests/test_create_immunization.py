from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.immunization import ImmunizationRepository


client = TestClient(app)


def fake_account():
    return {
        "id": 1,
        "username": "testuser",
        "first_name": "test",
        "last_name": "user",
        "email": "testuser@mail.com",
    }


class CreateImmunizationRepository:
    def create(self, immunization):
        result = {
            "id": 1,
            "vaccination": "str",
            "date": "date",
            "date_valid_until": "date",
            "pet_pic": "https://animalcorner.org/wp-content/uploads/2020/"
            "05/simon-rae-jY_2XG-6HU0-unsplash.jpg",
        }
        result.update(immunization)
        return result


def test_create_immunization():
    # Arrange
    app.dependency_overrides[
        ImmunizationRepository
    ] = CreateImmunizationRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_account

    json = {
        "vaccination": "Wolfs Bane",
        "date": "2023-11-13",
        "date_valid_until": "2023-11-13",
        "pet_id": 1,
        "pet_pic": "https://animalcorner.org/wp-content/uploads/2020/"
        "05/simon-rae-jY_2XG-6HU0-unsplash.jpg",
    }
    expected = {
        "id": 1,
        "vaccination": "Wolfs Bane",
        "date": "2023-11-13",
        "date_valid_until": "2023-11-13",
        "pet_id": 1,
        "pet_pic": "https://animalcorner.org/wp-content/uploads/2020/"
        "05/simon-rae-jY_2XG-6HU0-unsplash.jpg",
    }

    # Act
    response = client.post("/user/{user_id}/pet/1/immunization", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
