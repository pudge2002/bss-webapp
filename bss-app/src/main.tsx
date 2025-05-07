import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './view/App.tsx';
import { loadConfig } from './Controllers/urlconfig.ts'; // Импортируйте модуль конфигурации

// Загрузите конфигурацию

(async () => {
    try {
        // Загрузите конфигурацию
        const config = await loadConfig();

        // Передайте конфигурацию в ваше приложение
        createRoot(document.getElementById('root')!).render(
            <StrictMode>
                <App config={config} />
            </StrictMode>
        );
    } catch (error) {
        console.error('Error loading config12112:', error);
    }
})();