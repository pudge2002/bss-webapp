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

export async function fetchFolders(path: string = ''): Promise<{ directories: string[], files: string[] }> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`${API_URL}/api/Cameras/browse?path=${encodeURIComponent(path)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении списка папок и файлов');
        }

        const data = await response.json();
        console.log('Fetched folders and files:', data);
        return data;
    } catch (error) {
        console.error('Error fetching folders and files:', error);
        return { directories: [], files: [] };
    }
}

export async function downloadFile(filePath: string): Promise<Blob> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`${API_URL}/api/Cameras/download/file?filePath=${encodeURIComponent(filePath)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при скачивании файла');
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}

export async function downloadFolder(folderPath: string): Promise<Blob> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`${API_URL}/api/Cameras/download/folder?folderPath=${encodeURIComponent(folderPath)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при скачивании папки');
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error downloading folder:', error);
        throw error;
    }
}

export async function playVideo(filePath: string): Promise<void> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`${API_URL}/api/Cameras/play/${encodeURIComponent(filePath)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при воспроизведении видео');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        document.body.appendChild(video);
    } catch (error) {
        console.error('Error playing video:', error);
        throw error;
    }
}

export async function streamCamera(cameraId: number): Promise<void> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`${API_URL}/api/Cameras/stream/${cameraId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при стриминге камеры');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        document.body.appendChild(video);
    } catch (error) {
        console.error('Error streaming camera:', error);
        throw error;
    }
}