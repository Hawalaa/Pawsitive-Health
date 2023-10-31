## September 26, 2023

Today, I worked on:

-   Creating the Postgres database
-   Creating the Users and Pet tables in the database

After I finished my tasks, I helped guide my teammates on how to pull the code from the repository and how to run the code on their local machines. After successfully running the code, I helped them create their own tables, push their changes back to remote. We also walked through how to create a pull request and merge it into the master branch.

## September 27, 2023

Today, I worked on:

-   Completed Authentication and closed tickets #1, #2, #5, and #16

After I finished my tasks, I floated around and helped to guide my teammates through theirs. I did a work around for my uuid fields, so today I am going to try to fix that. I also need to work on the Dashbaord route.

## September 28, 2023

Today, I worked on:

-   Cleaning up Gitlab
-   Working on the Dashboard route
-   Lookup how to use UUID Generate 4
-   Created a RESOLVE for my HMU post yesterday

## October 9, 2023

Today, I worked on:

-   Finishing up Authentication Routes.

## October 10, 2023

Today, I worked on:

-   Dashboard Endpoint. Almost finished.

## October 11, 2023

Today, I worked on:

-   Finished Dashboard Endpoint.
-   Finished Activity Endpoint
-   Finished Records Endpoint
-   Finished protecting the above endpoints with back end authentication.

## October 12, 2023

Today, I worked on:

-   Working on the front end authentication, along with implementing Redux.
-   Unable to finish, so I will complete this task tomorrow.

## October 13, 2023

Today, I worked on:

-   Finished front end authentication.
-   Finished implementing Redux.
-   Pushed a bug into main where my dashboard would not pull all the data, so I fixed it in a new ticket.

## October 16, 2023

-   Finished filtering the database so the front end would only display data of the logged in user.
-   Installed Material UI dependency so that we can use it for styling.

## October 17, 2023

-   Installed and tested React Charts

## October 18, 2023 - October 19, 2023

-   Started working on the Dashboard page. Created the DailyWalksCard component and the DailyWalksApi API in Redux.
-   Added error handling if no data was being returned in the PoopHealthCard
-   Adjusted the Dashboard, Navbar, and TopNavbar styling
-

## October 22, 2023

-   Created SleepHabitsApi and SleepHabitsCard components.
-   Modified the Sleep query on the back end changing the duration to be an integer instead of a string.
-   Completed the Sleep Habits card as well as adjusted the css on the DailyWalks card.

## October 23, 2023

-   Adjusted styling of Daily Walks card.
-   Finished the Poop Consistency card.
-   Adjusted styling on the Sleep Habits card.

## October 24, 2023

-   Harold could not finish his feature of the Records page, so he dropped it and I took over.
-   I modified the back end queries of both Immunization and Medical.
-   Created both Immunization and Medical modals that function to create records for both tables.
-   Created Accordions for each card that maps over their respective table and displays the necessary data.
-   Implemented a delete record function within each accordion row that deletes the record from the database.
-   Refactored the styling of the Records Page so that it is more responsive.
-   Refactored the styling on the Dashboard so that it adjusts when it is smaller than 1100px width.
-   I modified the routers of Feedings, Immunization, Medical, and Walks.
-   I created my unit test for get poop.
-   Cleaned up console logs, dead imports, dead variables, and refactored Toast notifications.

## October 25, 2023

-   Fixed the bug with localhost:3000 redirect.
-   Worked with Junhao to help Ken fix his Update Pet Profile page.
-   Finished Readme.md file.
-   Refactored Navigation from base URL to, instead of `/dashboard`, to `/login`.
-   Bug fixed the wrong toast message on successful deletion of medical record.
-   Refactored Dashboard to enable realtime data updates.

## October 26, 2023

-   Fixed a major bug where when a user would log out of their account, and log into a different account, the data from the previous account would still show up in the Pet Dropdown.
-   Fixed overall styling issues with the app where everything was displaced and not centered, causing both X and Y axis scroll bars to appear.
-   Fixed a bug where the logout button would be hidden on any screens smaller than 1000px height.
