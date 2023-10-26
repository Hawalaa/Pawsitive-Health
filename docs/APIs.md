## Dashboard

The dashboard allows a user to view their pets' health and wellness data in a variety of ways. The dashboard will display a line graph of the pet's weight over time, a bar graph of the pet's sleep habits, and a pie chart of the pet's poop consistency. The dashboard will also display the pet's medical records and immunization records within an accordion.

-   **Method:** `GET`
-   **Path:** `/dashboard`

Output:

```
{
    "id" : int,
    "first_name" : string,
    "last_name" : string,
    "email" : string,
    "pets" : []

}
```

---

## Pets

The pets endpoint allows a user to create, update, and delete a pet. A user can also view a pet's information.

-   **Method:** `GET, POST, PUT, DELETE`
-   **Path:** `/user/{user_id}/pet`, `/user/{user_id}/pet/{pet_id}`

**GET**
Output:

```
{
    "pet_name" : string,
    "breed" : string,
    "gender" : string,
    "age" : int,
    "weight" : int,
    "pet_pic" : string
}
```

**POST**, **PUT**
Input / Output:

```
{
  "pet_name": "string",
  "breed": "string",
  "gender": "string",
  "age": int,
  "weight": int,
  "pet_pic": "string",
  "user_id": int
}
```

**DELETE**
Input:

```
{
    "pet_id" : int
}
```

Output:

```
true / false
```

---

## Activities

The Activities endpoint allows a user to view all of their pet's activities.

-   **Method:** `GET`
-   **Path:** `/user/{user_id}/pet/{pet_id}/activity`

Output:

```
[
  {
    "id": int,
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "pets": [
      {}
    ]
  }
]
```

---

## Feedings

The Feedings endpoint allows a user to create, update, delete, and view all of their pet's feedings.

-   **Method:** `GET, POST, PUT, DELETE`
-   **Path:** `/pet/{pet_id}/feedings`, `/pet/{pet_id}/feedings/{feeding_id}`, `/feedings/{feeding_id}`

**GET**
Output:

```
{
  "date": "2023-10-25",
  "time": "string",
  "food_type": "string",
  "amount": "string",
  "pet_id": int
}
```

**POST**, **PUT**
Input / Output:

```
{
  "date": "2023-10-25",
  "time": "string",
  "food_type": "string",
  "amount": "string",
  "pet_id": int
}
```

**DELETE**
Input:

```
{
    "feeding_id" : int
}
```

Output:

```
true / false
```

---

## Poops

The Feedings endpoint allows a user to create, update, delete, and view all of their pet's poops.

-   **Method:** `GET, POST, PUT, DELETE`
-   **Path:** `/pet/{pet_id}/poops`, `/pet/{pet_id}/poops/{poop_id}`, `/poops/{poop_id}`

**GET**
Output:

```
[
  {
    "id": int,
    "date": "2023-10-25",
    "time": "string",
    "consistency": "string",
    "pet_id": int
  }
]
```

**POST**, **PUT**
Input / Output:

```
{
  "date": "2023-10-25",
  "time": "string",
  "consistency": "string",
  "pet_id": int
}
```

**DELETE**
Input:

```
{
    "poop_id" : int
}
```

Output:

```
true / false
```

---

## Sleep

The Sleep endpoint allows a user to create, update, delete, and view all of their pet's sleep.

-   **Method:** `GET, POST, PUT, DELETE`
-   **Path:** `/pet/{pet_id}/sleeps`, `/pet/{pet_id}/sleeps/{sleep_id}`, `/sleeps/{sleep_id}`

**GET**
Output:

```
[
  {
    "id": int,
    "date": "2023-10-25",
    "time": "string",
    "duration": int,
    "pet_id": int
  }
]
```

**POST**, **PUT**
Input / Output

```
[
  {
    "id": int,
    "date": "2023-10-25",
    "time": "string",
    "duration": int,
    "pet_id": int
  }
]
```

**DELETE**
Input:

```
{
    "sleep_id" : int
}
```

Output:

```
true / false
```

---

## Walks

The Walks endpoint allows a user to create, update, delete, and view all of their pet's walks.

-   **Method:** `GET, POST, PUT, DELETE`
-   **Path:** `/user/{user_id}/pet/{pet_id}/walks`, `/user/{user_id}/pet/{pet_id}/walks/{walk_id}`, `/walks/{walk_id}`

**GET**
Output:

```
[
  {
    "id": int,
    "date": "2023-10-25",
    "time": "string",
    "duration": "string",
    "pet_id": int
  }
]
```

**POST**, **PUT**
Input / Output:

```
{
  "date": "2023-10-25",
  "time": "string",
  "duration": "string",
  "pet_id": int
}
```

**DELETE**
Input:

```
{
    "walk_id" : int
}
```

Output:

```
true / false
```

---

## Immunization

The Immunization endpoint allows a user to create, update, delete, and view all of their pet's immunizations.

-   **Method:** `GET, POST, PUT, DELETE`
-   **Path:** `/pet/{pet_id}/immunization`, `/pet/{pet_id}/immunization/{immunization_id}`, `/immunization/{immunization_id}`

**GET**
Output:

```
[
  {
    "id": int,
    "vaccination": "string",
    "date": "2023-10-25",
    "date_valid_until": "2023-10-25",
    "pet_id": int
  }
]
```

**POST**, **PUT**
Input / Output:

```
{
  "vaccination": "string",
  "date": "2023-10-25",
  "date_valid_until": "2023-10-25",
  "pet_id": int
}
```

**DELETE**
Input:

```
{
    "immunization_id" : int
}
```

Output:

```
true / false
```

---

## Medical

The Medical endpoint allows a user to create, update, delete, and view all of their pet's medical records.

-   **Method:** `GET, POST, PUT, DELETE`
-   **Path:** `/pet/{pet_id}/medical`, `/pet/{pet_id}/medical/{medical_id}`, `/medical/{medical_id}`

**GET**

```
[
  {
    "id": int,
    "description": "string",
    "veterinarian": "string",
    "prescriptions": "string",
    "date": "2023-10-25",
    "pet_id": int
  }
]
```

**POST**, **PUT**
Input/ Output:

```
{
  "description": "string",
  "veterinarian": "string",
  "prescriptions": "string",
  "date": "2023-10-25",
  "pet_id": int
}
```

**DELETE**
Input:

```
{
    "medical_id" : int
}
```

Output:

```
true / false
```
