import React, { useState } from 'react';
import '../styles/loginStyle.css';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../Controllers/controller';

function LoginForm() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('pass') as HTMLInputElement).value;

        const isLoggedIn = await checkLogin(username, password);
        if (isLoggedIn) {
            navigate('/home');
        } else {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Логин</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password" id="pass" name="password" required />
                </div>
                {error && <div className="error-message">{error}</div>}
                <input type="submit" value="Sign in" />
            </form>
        </div>
    );
}

export default LoginForm;
