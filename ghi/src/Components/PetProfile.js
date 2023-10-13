import { useState, useEffect } from "react";

function ListPet() {
const [pets, setPets] = useState([]);

const getData = async (user_id) => {
    const pet_id = "1";
    const url = `http://localhost:8000/user/${user_id}/pet/${pet_id}`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNzIxZTMxMS1hNWU4LTQ0ZTUtOTM3OS04YWZiNjY0MTAwODEiLCJleHAiOjE2OTcxNjMwMTAsInN1YiI6ImtlbiIsImFjY291bnQiOnsiaWQiOjEsInVzZXJuYW1lIjoia2VuIiwiZmlyc3RfbmFtZSI6ImtlbiIsImxhc3RfbmFtZSI6InllaCIsImVtYWlsIjoia2VuQGVtYWlsLmNvbSJ9fQ.9TqRxIu7WIkk5p5kLQ0B1TvOjHXmzTY1EI2I7cXyRGo";
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        // console.log(response)
        console.log(data)
        setPets(data.pets)
    }
}

useEffect(() => {
    getData()
}, []);

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
}


export default ListPet;
