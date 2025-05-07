export const loadConfig = async (): Promise<{ API_URL: string }> => {
    try {
        const response = await fetch('/urlconfig.json');  // Используйте путь относительно корня
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to load config: ${text}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error loading config:', error);
        throw error;
    }
};
