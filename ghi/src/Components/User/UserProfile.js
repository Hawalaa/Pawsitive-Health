import { useEffect, useState } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function UserProfile() {
    const [user, setUser] = useState([]);
    const { token } = useAuthContext();

//     const getData = async () => {
//         if (token) {
//             const response = await fetch("http://localhost:8000/user", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
//                 setUser(data);
//             } else {
//                 console.error("Request failed with status:", response.status);
//             }
//         } else {
//             console.log("error:", "no token fetch!")
//         }
//     };

//     useEffect(() => {
//         getData();
//     }, [token]);
// };

    const getData = async () => {
        const response = await fetch("http://localhost:8000/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
        } else {
        console.error("Request failed with status:", response.status);
        }
    }

    useEffect(() => {
        getData();
    }, []);
}


export default UserProfile;
