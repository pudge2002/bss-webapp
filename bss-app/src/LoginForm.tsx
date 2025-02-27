// Удалите импорт React, если он не используется
// import React from 'react';
import './loginStyle.css'; // Убедитесь, что путь к файлу стилей правильный

function LoginForm() {
    return (
        <div className="login-form">
            <div>
                <label>Логин</label>
                <input type="text" id="username" name="username"/>
            </div>

            <div>
                <label>Пароль</label>
                <input type="password" id="pass" name="password" required/>
            </div>
            <input type="submit" value="Войти"/>
        </div>
    );
}

export default LoginForm;
