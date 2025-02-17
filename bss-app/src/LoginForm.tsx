function LoginForm() {
    return <div>
        <div>
            <label>Логин</label>
            <input type="text" id="username" name="username"/>
        </div>

        <div>
            <label>Пароль:</label>
            <input type="password" id="pass" name="password" required/>
        </div>
        <input type="submit" value="Sign in"/>
    </div>

}

export default LoginForm;