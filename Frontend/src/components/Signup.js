import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
function Signup ()
    {   const initialValues = { name:"", email: "", password: "",confirmpassword:"" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [Error,setError]=useState("");
    const navigate=useNavigate();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
      
    };
  
    useEffect(() => {
     // console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        
        fetch('http://localhost:3001/register', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res) => {
      if(res.ok)
      {
          navigate('/Login');
      }
      else
      {
        setError("Email Already Registered!")
      }
      return res.json()
  })
    .then(data => console.log(data)); 

     setFormValues(initialValues);
     setError("");
      }
    }, [formErrors]);
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.name) {
        errors.name = "Name is required!";
        setError(errors.name);
      }
      if (!values.email) {
        errors.email = "Email is required!";
        setError(errors.email)
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
        setError(errors.email)
      }
      if (!values.password) {
        errors.password = "Password is required";
        setError(errors.password)
      }else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
        setError(errors.password)
      }
      else if(values.password!==values.confirmpassword)
     { errors.confirmpassword="Password must be same"
     setError(errors.confirmpassword)
    }
      return errors;
    };
  

        return (
            <form>
                <h3>Register</h3>
                {{Error} ? (
                <div style={{color:"red"}}>
                {Error}
                </div>):null
                }
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="name" value={formValues.name}
              onChange={handleChange} />

              
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email"  name="email" value={formValues.email}
              onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password"  value={formValues.password}
              onChange={handleChange} />
                </div>
                 
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="text" className="form-control" placeholder="Confirm Password" name="confirmpassword"  value={formValues.confirmpassword}
              onChange={handleChange}/>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="/Login">log in</a>
                </p>
            </form>
        );
        }

export default Signup;