## Oct 26, 2023

Today, I worker on:

* Testing the application and fixing some small bugs.

Today we are just testing our application and make sure there's no bugs since we are basically finished with our project except for the strech goals that
we'll be working on next week. And we are doing our presentation for grading as well.

## Oct 25, 2023

Today, I worker on:

* Fixed the http/https error on the deployed front end, worked with Ken and Cory on the update modal on pet profile page, and fixed a lot of small bugs
in the project.

In this morning, I was working on the error on our deployed front end and I saw a lot of groups are having the same issue(http/https). So I was looking
through those HMU post and found a solution to the 404 error but the http/https error was still there. Thankfully, Alex gave me some advice and it fixed
the http/https error. Woo-hoo!, big thank you yo Alex. The project is basically done now, and we'll be practicing the presentation tomorrow.

## Oct 24, 2023

Today, I worker on:

* Added a create pet modal on the user profile page and fixed bug for front end deployment.

In the morning, we encountered our deployed front end is broken and we were very confused about it. So I posted a help me understand post and got some
advice from others and I found out there was a trailing slash in the PUBLIC_URL and some of out Api endpoints, and fixing those fix the broken deployed
front end. After that, I added a create pet modal on the user profile page so that the user can add their pet in the application. I think our project is
mostly done, we just need to write our project documentation and the readme.md.

## Oct 23, 2023

Today, I worker on:

* Building the front end activities page and unit test for create walk endpoint.

I started working on the activities page last friday and was working on it over the weekend. Today I finally got it all done, just need to
have my group mates to take a look at it and test the functionality tomorrow. I also wrote a unit test for the backend create walk endpoint in this
afternoon. I will be working on the add pet button fot the user profile page tomorrow.

## Oct 19, 2023

Today, I worker on:

* Building the front end user profile page and started on the activities page.

Finally finished the front-end user profile page, started working on the front-end activities page but feel like it is a challenge.
Didn't do much today since we had a review section this morning and afternoon. But I probably will be working on the unit test during
the weekend since the project is due next friday.

## Oct 18, 2023

Today, I worker on:

* Building the front end user profile page and deployment.

Finally got the deployment working with Rosheen's help. After that, spent the rest of the day working on the front end user profile
page. Changed the user profile queries on the back end and it only shows the logged-in user data instead of all the users' data. And
used material ui to implement the front end styling, looks really good in my opinion!

## Oct 17, 2023

Today, I worker on:

* Building the front end sign up, log in page, and deployment.

Sign up and log in pages are 99% finished, just need a touch of styling work. Worked on the deployment this afternoon as a group but
no luck getting it working. Asked for help from Rosheen and she said it might be the issue from their end, so we'll wait until tomorrow.
After that, I'll be keep working on the front end user profile page.

## Oct 16, 2023

Today, I worker on:

* Building the front end user profile page using redux

Modified the user profile page to use redux and able to get it working. But still need to do the styling for it. After this afternoon's
lecture, we tried to working the deployment as a group but did not finish. Decided to wait for the recording comes up and review it first.
Nothing much today.

## Oct 13, 2023

Today, I worker on:

* Building the front end user profile page

Kept working on building the front end user profile page, tried to made the login component working first since I need
the token to access the protected user profile page. Got stuck since last night but finally figured it out this afternoon. Turns out
I need to pass the username and password as FormData format instead of json format. Thats the reason why me and Cory keep getting
a 422 error when we tried to log in. After that, Cory was able to get the login form and dashboard components working using redux,
so I will be building the user profile component using redux instead of plain react. We spent a lot of time debugging the login
form and the dashboard using redux, but we finally get them to work, Woo-hoo!

## Oct 12, 2023

Today, I worker on:

* Building the front end user profile page

Made a user profile component and I was able fetch the user data with the pet data. But I did that by hardcoding the
token inside the component since the user profile page is a protected page. Still figuring out how to fetch the token
after the user logged-in and store that token somewhere. Spent a lot of time researching on that today but still no
progress yet, will keep working on that tomorrow and probably make a HMU post about it.

## Oct 11, 2023

Today, I worker on:

* Implement Back-end authentication for walks, poops, and user_profile endpoints

After the stand-up of today, Cory, Ken, and I helped Harold debugging the sleep and immunization endpoints.
We spent about 1 hour on that, it wasn't too difficult. After that, I went to re-watch the Back-end auth video and learned
how to implement that into the endpoints. Turns out it was super easy to do so we finished that really fast. We basically
finish all of the endpoints and ready to do the front-end, Woo-hoo!


## Oct 10, 2023

Today, I worker on:

* Finished the user profile endpoint
* Fixing bugs in dashboard.py, pet.py, immunization.py, and medical.py
* Creating endpoints `/user/{user_id}/pet/{pet_id}/poops` for the GET and POST request and
`/user/{user_id}/pet/{pet_id}/poops/{poop_id}` for the PUT and DELETE request to the poop table

Finished the user profile endpoint in the morning, and found some bugs in the dashboard.py, pet.py, immunization.py,
and medical.py. I discussed those bugs with my teammates and fixed them after the career service workshop.
We spent most of the afternoon finding bugs in those finished endpoints and fixing them together. At the end of the day,
I finished the poop endpoint as well so Cory can finish up the dashboard endpoint.


## Oct 09, 2023

Today, I worker on:

* Creating an endpoint `/user` for the user profile page

The endpoint is mostly done, just need to make small changes to the PetInfo model once Ken finish updating the pet table
in the database. Also ken and I worked together to fix the bug on the create walk endpoint where it can only create a walk
data if the passed in pet_id is exist in the database, otherwise it should return a error saying that pet does not exist.

## Sep 28, 2023

Today, I worker on:

* Creating an endpoint `/user/{user_id}/pet/{pet_id}/walks/{walk_id}` for the PUT and DELETE request to the walk table

At the beginning of the day, I spent some time on researching how to auto generate UUID into our tables, and I kind of get
it working. But after discussing with my team, we decided to use id field as the primary key instead of the UUID since they
both server the same purpose and using id field is much easier. After that, I worked on finishing the rest of the walk endpoint,
and I got it done before the fall break, Woo-hoo!

## Sep 27, 2023

Today, I worker on:

* Creating an endpoint `/user/{user_id}/pet/{pet_id}/walks` for the GET and POST request to the walk table

I spent a lot of time on understanding how to write the `queries/walks.py` file
but eventually I had a good understanding of it and implemented the endpoint.


## Sep 26, 2023

Today, I worker on:

* Creating the poop and sleeping tables in the DB

I worked with my teammates Cory, Ken, and Harold on this
because this is the very first thing we work on the project
so we want to do that together.
