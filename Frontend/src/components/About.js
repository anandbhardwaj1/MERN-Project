import React,{useState,useContext,useEffect} from "react";
import {Navigate,Link} from "react-router-dom";
import { UserContext } from "../UserContext";

function About()
{    const {CurrentUser,setCurrentUser}=useContext(UserContext);
     
    const initialValues = { email:CurrentUser.email,name:"XYZ",  age:20,phone:9876543210,gender:"male" };
    const [formValues, setFormValues] = useState(initialValues);


  if(!CurrentUser.email)
  return <Navigate to ="/Login"/>
   
    return (
    <>
            <h3>Hello </h3>
              
                <div >
                <label>Name  :  {CurrentUser.name}</label>
                </div>
                <div >
                <label>Age  :  {CurrentUser.age}</label>
                </div>
                <div >
                <label>Phone :  {CurrentUser.phone}</label>
                </div>
                <div >
                <label>Gender  :  {CurrentUser.gender}</label>
                </div>
                <Link to="/update" className="btn btn-primary">Update Your Profile</Link>
          </>
    );
    }


export default About;
