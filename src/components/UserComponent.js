// import React, { useEffect, useState } from "react";
// import axios from "axios";
//
// function Test1() {
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         axios
//             .get('http://localhost:3000/users')
//             .then((response) => {
//                 setData(response.data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, []);
//
//     return (
//         <div>
//             <h1>Список пользователей:</h1>
//             <ul>
//                 {data.map((user) => (
//                     <li key={user.id}>
//                         {user.name} ({user.email})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
//
// export default Test1;
//
//
