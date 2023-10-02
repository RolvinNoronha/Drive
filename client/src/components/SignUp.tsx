import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Input = {
    username: string,
    password: string,
}

const SignUp = () => {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<Input>({ username: "", password: "" });

    const { username, password } = inputValue;
    const handleOnChange = (e : any) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:5000/signup",
                {
                ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            
            if (success) {
                alert(message);
                navigate("/home");
            } else {
                alert(message);
            }
        } catch (error) {
            console.log(error);
        }
        
        setInputValue({
            ...inputValue,
            username: "",
            password: "",
        });
    };

    return (
        <>
            <h2 className="signin_title">Sign up</h2>
            <form className="signin_form" onSubmit={handleSubmit}>
                <div className="signin_form-input">
                    <label htmlFor="email">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="signin_form-input">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </div> 
                <button className="signin_button" type="submit">Submit</button>
            </form>
        </>
    )
}

export default SignUp