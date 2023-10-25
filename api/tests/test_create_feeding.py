from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.feedings import FeedingRepository


client = TestClient(app)


def fake_account():
    return {
        "id": 1,
        "username": "testuser",
        "first_name": "test",
        "last_name": "user",
        "email": "testuser@mail.com"
    }


class CreateFeedingRepository:
    def create(self, feeding, pet_id):
        result = {
            "id": 1,
            "date": "date",
            "time": "time",
            "food_type": "str",
            "amount": "str",
            "pet_id": pet_id
        }
        result.update(feeding)
        return result


def test_create_feeding():
    # Arrange
    app.dependency_overrides[FeedingRepository] = CreateFeedingRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_account

    json = {
        "date": "2023-11-13",
        "time": "09:00",
        "food_type": "kibble",
        "amount": "1 cup",
        "pet_id": 1
    }
    expected = {
        "id": 1,
        "date": "2023-11-13",
        "time": "09:00:00",
        "food_type": "kibble",
        "amount": "1 cup",
        "pet_id": 1
    }

    # Act
    response = client.post("/pet/1/feedings", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
