import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import ProtectedRoute from './ProtectedRoute';
import { setApiUrl } from '../Controllers/controller'; // Импортируйте функцию для установки API_URL


interface AppProps {
    config: { API_URL: string };
}

function App({ config }: AppProps) {
    // Установите API_URL из конфигурации
    setApiUrl(config.API_URL);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;