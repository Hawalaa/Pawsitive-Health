from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.walks import WalkRepository
from datetime import date, time

client = TestClient(app)

def fake_account():
    return {
        "id": 1,
        "username": "testuser",
        "first_name": "test",
        "last_name": "user",
        "email": "testuser@mail.com"
    }


class CreateWalkRepository:
    def create(self, walk, pet_id):
        result = {
            "id": 1,
            "date": "date",
            "time": "time",
            "duration": "str",
            "pet_id": pet_id
        }
        result.update(walk)
        return result


def test_create_walk():
    # Arrange
    app.dependency_overrides[WalkRepository] = CreateWalkRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_account

    json = {
        "date": "2023-11-13",
        "time": "09:00",
        "duration": "30mins",
        "pet_id": 1
    }
    expected = {
        "id": 1,
        "date": "2023-11-13",
        "time": "09:00:00",
        "duration": "30mins",
        "pet_id": 1
    }

    # Act
    response = client.post("/user/{user_id}/pet/1/walks", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
