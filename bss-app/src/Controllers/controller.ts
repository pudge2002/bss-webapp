export const API_URL = 'https://localhost:7181';

export async function checkLogin(username: string, password: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/api/Users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            // Если сервер вернул токен, значит логин успешен
            const token = data.token;

            localStorage.setItem('token', token);

            return true // Предполагается, что сервер возвращает объект с полем success
        } else {
            throw new Error('Failed to login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login: ' + error);
        return false;
    }
}

export async function ShowCameras() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token provided');
            return [];
        }

        const response = await fetch(`${API_URL}/api/Cameras`, {
            method: 'GET', // Указываем метод запроса
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении списка камер');
        }
        const cameras = await response.json();
        return cameras;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchFolders(): Promise<{ directories: string[] }> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`${API_URL}/api/Cameras/browse`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении списка папок');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching folders:', error);
        return { directories: [] };
    }
}