import React from 'react';
import '../styles/loginStyle.css';
import {useNavigate} from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add logic to navigate
        navigate('/home');
    };
        return (
            <div className="login-form-container">
                <form  className="login-form"  onSubmit={handleSubmit}>

                    <div>
                        <label>Логин</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label>Пароль:</label>
                        <input type="password" id="pass" name="password" required />
                    </div>
                    <input type="submit" value="Sign in" />

                </form>
            </div>
        );
    }



export default LoginForm;
