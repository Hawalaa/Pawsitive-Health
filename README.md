# Pawsitive Health

-   Cory DeGuzman
-   Junhao Liang
-   Ken Yeh
-   Harold Sy

Pawsitive Health - A pet health tracking application that allows users to track their pet's health and wellness. Users can track their pet's daily walks, sleep habits, poop consistency, and more. Users can also track their pet's medical records and immunizations.

---

### Design

-   [API Design](docs/APIs.md)
-   [Data Model](docs/data-models.md)
-   [GHI](docs/GHI.md)

---

### Intended Market

We are targeting pet owners who want to track their pet's health and wellness as well as veterinarians who want to track their patient's health and wellness.

---

### Functionality

-   A person must create an account to access the application.
-   A registered user can:
    -   Add as many pets to their account that they want to track
    -   Create, Update, and Delete a pet's Medical records
    -   Create, Update, and Delete a pet's Immunization record
    -   Create, Update, and Delete a pet's Activity record
    -   View different types of information within a Dashboard that displays different types of charts

---

### Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone this repository to your local machine
2. CD into the new project directory
3. Run `docker volume create postgres-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Navigate to `localhost:3000` to enjoy tracking your pet's health and wellness!

### Foreseeable Updates

-   Confirm Deletion dialogue when deleting a pet.
-   A state that remembers which pet is selected across the entire application.
-   Styling for Login and Sign up pages-- Paw to cover eyes when typing in password and uncover upon revealing your password.

### Environments

-   [Pawsitive Health (Staging)](https://pawsitive-health.gitlab.io/pawsitive-health/)
