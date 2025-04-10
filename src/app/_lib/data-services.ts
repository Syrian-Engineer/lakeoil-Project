// interface AuthProps {
//     email: string;
//     password: string;
//   }
  
// export  async function getAuth({ email, password }: AuthProps) {
//     try {
//       const response = await fetch("https://api-lakeoil.onrender.com/auth/login", {
//         method: "POST", // Specify the HTTP method as POST
//         headers: {
//           "Content-Type": "application/json", // Indicate that the body is JSON
//         },
//         body: JSON.stringify( {email, password }), // Send email and password in the body
//       });
  
//       // Check if the response is successful (status code 200-299)
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       // Parse the JSON response
//       const data = await response.json();
  
//       // Return the access token (or handle it as needed)
//       console.log("Access Token:", data.accessToken);
//       return data.accessToken; // Assuming the server returns an `accessToken`
//     } catch (error) {
//       console.error("Error during authentication:", error);
//       throw error; // Rethrow the error for further handling
//     }
//   }


// interface PumpsProps{
//   accessToken:string
// }

// export async function getPumps({accessToken}:PumpsProps){
//   try{
//     const response = await fetch("https://api-lakeoil.onrender.com/station/pumps",{
//       headers:{Authorization:JSON.parse(accessToken)}
//     })
//     const data = await response.json();
//     return data
//   }catch(err){
//     console.error(err)
//   }
// }