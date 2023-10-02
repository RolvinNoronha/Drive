import { useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const Auth = () => {
    
    const [value, setValue] = useState<boolean>(true);

    return (
        <>
            <div className="header">
                <h1 className="header_title">Drive</h1>
            </div>
            <div className="signincontainer">
            {
                value ? 
                    <div className="signin">
                        <SignUp /> 
                        <p className="signin_message">Already have an account? <span className="signin_link" onClick={() => setValue(false)}>Login</span></p>
                    </div>
                    : 
                    <div className="signin">
                        <Login />
                        <p className="signin_message">Don't have an account? <span className="signin_link" onClick={() => setValue(true)}>SignUp</span></p>
                    </div>
            }
            </div>
        </>
    )
}

export default Auth