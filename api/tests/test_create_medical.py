from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.medical import MedicalRepository

client = TestClient(app)


def fake_account():
    return {
        "id": 1,
        "username": "testuser",
        "first_name": "test",
        "last_name": "user",
        "email": "testuser@mail.com",
    }


class CreateMedicalRepository:
    def create(self, medical):
        result = {
            "id": 1,
            "description": "str",
            "veterinarian": "str",
            "prescriptions": "str",
            "date": "date",
            "pet_pic": "https://animalcorner.org/wp-content/uploads/2020/"
            "05/simon-rae-jY_2XG-6HU0-unsplash.jpg",
        }
        result.update(medical)
        return result


def test_create_medical():
    # Arrange
    app.dependency_overrides[MedicalRepository] = CreateMedicalRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_account

    json = {
        "description": "Sprained paw",
        "veterinarian": "Dr. Valdez",
        "prescriptions": "Pain killer",
        "date": "2023-11-13",
        "pet_id": 1,
        "pet_pic": "https://animalcorner.org/wp-content/uploads/2020/"
        "05/simon-rae-jY_2XG-6HU0-unsplash.jpg",
    }
    expected = {
        "id": 1,
        "description": "Sprained paw",
        "veterinarian": "Dr. Valdez",
        "prescriptions": "Pain killer",
        "date": "2023-11-13",
        "pet_id": 1,
        "pet_pic": "https://animalcorner.org/wp-content/uploads/2020/"
        "05/simon-rae-jY_2XG-6HU0-unsplash.jpg",
    }

    # Act
    response = client.post("/user/{user_id}/pet/1/medical", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
