import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
});

export const API_URL = 'https://localhost:7181';

Main();

async function Main() {
    const isLoginSuccessful = await CheckLogin('string', 'string');
    console.log("Результат проверки логина:", isLoginSuccessful);
}

async function CheckLogin(username, password) {
    try {
        // Отправка запроса на сервер с паролем в открытом виде
        const response = await fetch(`${API_URL}/api/Users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            agent
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Неправильный логин или пароль
                return false;
            }
            throw new Error('Ошибка при проверке логина');
        }

        const data = await response.json();
        // Если сервер вернул токен, значит логин успешен
        return !!data.token;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function ShowCameras() {
    try {
        const response = await fetch(`${API_URL}/api/Cameras`, { agent });
        if (!response.ok) {
            throw new Error('Ошибка при получении списка камер');
        }
        const cameras = await response.json();
        console.log("Список камер:", cameras);
    } catch (error) {
        console.error(error);
    }
}