import React,{useState,useEffect,useContext} from "react";
import {Navigate,useNavigate} from "react-router-dom";
import { UserContext } from "../UserContext";
function ProfileUpdate ()
    {   const {CurrentUser,setCurrentUser}=useContext(UserContext);
   
        const navigate=useNavigate();
        const initialValues = {  email:CurrentUser.email, age:"",phone:"" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [Error,setError]=useState("");
   
  
    const handleResponse=()=>{ 
    navigate('/Login');
   
 };
    const handleSubmit =  (e) => {
      e.preventDefault();
      
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    } 
       useEffect(()=>
    {
      if(!CurrentUser.email)
      navigate('/Login');
      else if(Object.keys(formErrors).length === 0 && isSubmit)
      {
        fetch('http://localhost:3001/update', {
          method: 'POST',
          body: JSON.stringify(formValues),
          headers: {
              'Content-Type': 'application/json'
          },
      }) .then((res) => {
          if(!res.ok)
          {
              setError("Invalid Credentials");
              
          }
          return res.json()
      })
      .then(data => {
        {  
        handleResponse();
        }
      })
      }
      
    },[formErrors])
    const handleChange = (e) => {
     
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    
    };
  
    const validate = (values) => {
      console.log(values);
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.age) {
        errors.age= "Age is required!";
        setError(errors.age);
      }
     
      if (!values.phone) {
        errors.phone = "Phone is required";
        setError(errors.phone)
      }else if (values.phone.length !== 10) {
        errors.phone = "Phone must contains 10 digits";
        setError(errors.phone)
      }
      else if (regex.test(values.phone)) {
        errors.phone = "This is not a valid phone format!";
        setError(errors.phone)
      }
    
      return errors;
    };
  

        return (
            <form>
                <h3>Fill Your Updated Info!</h3>
                {{Error} ? (
                <div style={{color:"red"}}>
                {Error}
                </div>):null
                }
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" className="form-control" placeholder="New Age" name="age" value={formValues.age}
              onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="number" className="form-control" placeholder="New Phone"  name="phone" value={formValues.phone}
              onChange={handleChange} />
                </div>
              <button type="submit" onClick={handleSubmit} className="btn btn-dark btn-lg btn-block">Register</button>  
            </form>
        );
        }

export default ProfileUpdate;