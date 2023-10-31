# Data models

---

## User

| Column     | Type    | Description                    |
| ---------- | ------- | ------------------------------ |
| id         | integer | Unique identifier for the user |
| username   | string  | Username for the user          |
| first_name | string  | First name of the user         |
| last_name  | string  | Last name of the user          |
| email      | string  | Email address of the user      |
| username   | string  | Username for the user          |
| password   | string  | Password for the user          |

---

## Pet

| Column   | Type    | Description                    |
| -------- | ------- | ------------------------------ |
| id       | integer | Unique identifier for the pet  |
| pet_name | string  | Name of the pet                |
| breed    | string  | Breed of the pet               |
| gender   | string  | Gender of the pet              |
| age      | integer | Age of the pet                 |
| weight   | integer | Weight of the pet              |
| user_id  | integer | Unique identifier for the user |

---

## Medical

| Column        | Type    | Description                              |
| ------------- | ------- | ---------------------------------------- |
| id            | integer | Unique identifier for the medical record |
| description   | string  | Description of the medical record        |
| veterinarian  | string  | Veterinarian of the medical record       |
| prescriptions | string  | Prescriptions of the medical record      |
| date          | date    | Date of the medical record               |
| pet_id        | integer | Unique identifier for the pet            |

---

## Immunization

| Column           | Type    | Description                                   |
| ---------------- | ------- | --------------------------------------------- |
| id               | integer | Unique identifier for the immunization record |
| vaccination      | string  | Vaccination of the immunization record        |
| date             | date    | Date of the immunization record               |
| date_valid_until | date    | Date valid until of the immunization record   |
| pet_id           | integer | Unique identifier for the pet                 |

---

## Walk

| Column   | Type    | Description                           |
| -------- | ------- | ------------------------------------- |
| id       | integer | Unique identifier for the walk record |
| date     | date    | Date of the walk record               |
| time     | time    | Time of the walk record               |
| duration | integer | Duration of the walk record           |
| pet_id   | integer | Unique identifier for the pet         |

---

## Poop

| Column      | Type    | Description                           |
| ----------- | ------- | ------------------------------------- |
| id          | integer | Unique identifier for the poop record |
| date        | date    | Date of the poop record               |
| time        | time    | Time of the poop record               |
| consistency | string  | Consistency of the poop record        |
| pet_id      | integer | Unique identifier for the pet         |

---

## Sleep

| Column   | Type    | Description                            |
| -------- | ------- | -------------------------------------- |
| id       | integer | Unique identifier for the sleep record |
| date     | date    | Date of the sleep record               |
| time     | time    | Time of the sleep record               |
| duration | integer | Duration of the sleep record           |
| pet_id   | integer | Unique identifier for the pet          |

---

## Feeding

| Column    | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| id        | integer | Unique identifier for the feeding record |
| date      | date    | Date of the feeding record               |
| time      | time    | Time of the feeding record               |
| food_type | string  | Food type of the feeding record          |
| pet_id    | integer | Unique identifier for the pet            |
