import { signInWithEmailAndPassword } from 'firebase/auth';
import './SignUpIn.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { auth } from "../firebase";

function SignIn(){

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignIn = async (e)=>{
        e.preventDefault();

        try{
            const userCredential = await signInWithEmailAndPassword(auth,mail,password);
            const user = userCredential.user
            console.log("successful login")

            navigate("/Todo");

        }catch(error){
            console.log(error)
            alert("invalid email or password")
            alert(error)
        }
    }


    return(
        <>
        <div className='form'>
            <h1>SignIn</h1>
            <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control type="email" placeholder="Enter email" className='textInputs' onChange={(e)=>setMail(e.target.value)}/>                   
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control type="password" placeholder="Password" className='textInputs'  onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                 
                    <Button variant="primary" className='button' type="submit" onClick={handleSignIn}>Submit</Button>
                </Form>
        </div>
        </>
    )
}

export default SignIn