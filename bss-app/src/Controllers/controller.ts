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
