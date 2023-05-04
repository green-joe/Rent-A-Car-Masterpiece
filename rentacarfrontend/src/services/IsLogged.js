
import { useLocation, useNavigate} from "react-router-dom";





import React from 'react'

export function getIsLogged(){
    try {
        const response = fetch(`http://localhost:8080/customer/auth/logout`)
        return response
    }  catch (error) {
        return []
    }
}


// export const IsLoggedIn=()=> getIsLogged().then()
   
//     .then(response => {
        
//       if (response.ok) {         
//         console.log("Logged out successfully");
//         localStorage.removeItem('customer') 
//           redirect("/home");


//        // window.dispatchEvent(new Event('storage'))         
        
        
//       } else {
//         console.log("Failed to log out");
//       }
//     })
//     .catch(error => {
//       console.error(error);
//     });

  
// export default IsLoggedIn


  
 