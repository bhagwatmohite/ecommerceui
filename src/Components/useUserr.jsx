// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";

// const useUserr = () => {
//   const [email, setEmail] = useState('');
//   const [userrDetails, setUserrDetails] = useState(null);
//   const [fname, setFname] = useState("");
//   const [id, setId] = useState("");
//   const [lname, setLname] = useState("");
//   const [mobno, setMobno] = useState("");
//   const [addresses, setAddresses] = useState([]);



//   useEffect(() => {
//     // Retrieve email from local storage
//     const storedEmail = localStorage.getItem('email');
//     if (storedEmail) {
//       setEmail(storedEmail);

//     }
//     // Fetch all user data from the API
//     const fetchUserrData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/userr');
//         const data = await response.json();

//         // Find the user whose email matches the stored email
//         const userr = data.find(userr => userr.email === storedEmail);
//         if (userr) {
//           setUserrDetails(userr);
//           setFname(userr.fname); // Set the first name
//           setId(userr.id); // Set the user ID
//           setLname(userr.lname);
//           setMobno(userr.mobno);
//           setAddresses(userr.addresses);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };

//     if (storedEmail) {
//       fetchUserrData();
//     }
//   }, []);




//   return { email, userrDetails, fname, id, lname, mobno, addresses };
// };

// export default useUserr;



/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useUserr = () => {
  const [email, setEmail] = useState('');
  const [userrDetails, setUserrDetails] = useState(null);
  const [fname, setFname] = useState("");
  const [id, setId] = useState("");
  const [lname, setLname] = useState("");
  const [mobno, setMobno] = useState("");
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      setEmail(storedEmail);

      // Fetch all user data from the API
      const fetchUserrData = async () => {
        try {
          const response = await fetch('http://localhost:8080/userr');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          // Find the user whose email matches the stored email
          const userr = data.find(userr => userr.email === storedEmail);
          if (userr) {
            setUserrDetails(userr);
            setFname(userr.fname); // Set the first name
            setId(userr.id); // Set the user ID
            setLname(userr.lname);
            setMobno(userr.mobno);
            setAddresses(userr.addresses);
          } else {
            console.warn('No user found with the stored email');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };

      fetchUserrData();
    }
  }, []); // Ensure that the effect runs only once when the component mounts

  return { email, userrDetails, fname, id, lname, mobno, addresses };
};

export default useUserr;

