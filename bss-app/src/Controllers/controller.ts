import Hls from 'hls.js';

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
            const token = data.token;
            const refreshToken = data.refreshToken;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            return true;
        } else {
            throw new Error('Failed to login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login: ' + error);
        return false;
    }
}

async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token provided');
    }

    const response = await fetch(`${API_URL}/api/Users/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
        const data = await response.json();
        const newToken = data.token;
        const newRefreshToken = data.refreshToken;
        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        return newToken;
    } else {
        throw new Error('Failed to refresh token');
    }
}

async function fetchWithAuth(url: string, options: RequestInit): Promise<Response> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token provided');
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 401) {
        const newToken = await refreshToken();
        const newResponse = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json',
            }
        });
        return newResponse;
    }

    return response;
}

export async function ShowCameras() {
    try {
        const response = await fetchWithAuth(`${API_URL}/api/Cameras`, {
            method: 'GET',
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
        const response = await fetchWithAuth(`${API_URL}/api/Cameras/browse?path=${encodeURIComponent(path)}`, {
            method: 'GET',
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
        const response = await fetchWithAuth(`${API_URL}/api/Cameras/download/file?filePath=${encodeURIComponent(filePath)}`, {
            method: 'GET',
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
        const response = await fetchWithAuth(`${API_URL}/api/Cameras/download/folder?folderPath=${encodeURIComponent(folderPath)}`, {
            method: 'GET',
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

export async function playVideo(filePath: string): Promise<Blob> {
    try {
        const response = await fetchWithAuth(`${API_URL}/api/Cameras/play/${encodeURIComponent(filePath)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Ошибка при воспроизведении видео');
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error playing video:', error);
        throw error;
    }
}

export async function streamCamera(cameraId: number): Promise<void> {
    const videoElement = document.getElementById(`cameraStream_${cameraId}`) as HTMLVideoElement;
    if (!videoElement) return;

    const hlsUrl = `http://localhost:8888/camera_${cameraId}/index.m3u8`;

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.play();
        });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Поддержка HLS в Safari
        videoElement.src = hlsUrl;
        videoElement.addEventListener('loadedmetadata', () => {
            videoElement.play();
        });
    }
}
