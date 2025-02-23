import './SignUpIn.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { db, collection, addDoc } from "../firebase"; // Import Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


function SignUp(){
    
   
    const navigate = useNavigate();

    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
       
        console.log("Register function called");
        try {
          
          const userCredential = await createUserWithEmailAndPassword(auth, mail, password);
          const user = userCredential.user;
    
        
          const userData = {
            email: mail,
            userId: user.uid,
            pass:password
          };
    
    
          console.log("User added to Firestore:", userData);
          navigate("/SignIn");
    
        } catch (error) {
          console.error("Error registering user:", error);
          alert(error);
        }

      
      };



    function emailInput(e){
        setMail(e.target.value)
       
    }

    function pass(e){
        setPassword(e.target.value)
    }





    return(
        <>
        <div className='form'>
            <h1>SignUp</h1>
                <Form onSubmit={handleRegister} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control type="email" placeholder="Enter email" className='textInputs' onChange={emailInput} />                    
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control type="password" placeholder="Password" className='textInputs' onChange={pass}/>
                    </Form.Group>
                
                    <Button variant="primary" className='button' type="submit">
                        Submit
                    </Button>
                </Form>
        </div>
        </>
    )
}

export default SignUp