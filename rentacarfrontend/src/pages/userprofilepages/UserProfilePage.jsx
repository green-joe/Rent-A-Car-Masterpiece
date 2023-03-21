import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import Helmet from "../../components/Helmet/Helmet";
import LoginPage from '../LoginPage';
import Banner from './Banner';


const UserProfilePage = ({email }) => {
  const [userProfile, setUserProfile] = useState({
    
    email: email,
    bio: '',
    location: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send the userProfile object to a backend or do something else with the data
    console.log(userProfile);
  };

  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={userProfile.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={userProfile.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Bio:
          <textarea name="bio" value={userProfile.bio} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" value={userProfile.location} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserProfilePage;


// const UserProfilePage = (user) => {  
  
//   const handleLogout = () => {
//     // TODO: Implement logout logic
//     setIsLoggedIn(false);
//   };

//   return (
//     <Helmet title={user.name}>
//       <Banner/>
//     {/* <div className='vh-100' style={{ backgroundColor: "#f9a826" }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md="9" lg="7" xl="8" className="mt-5">
//             <Card style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
//               <CardBody className="p-4 text-black">
//                 <div>
//                   <h1>Profile Page</h1>
//                   <h6 className='display-5'>My name is</h6>
//                   <div className="d-flex align-items-center justify-content-between mb-3">
//                     <p className="small mb-0"><i
//                       className="ri-roadster-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>3 hrs</p>
//                     <p className="fw-bold mb-0">$90</p>
//                   </div>
//                 </div>               
              
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div> */}
//     </Helmet>
//   );

// }

