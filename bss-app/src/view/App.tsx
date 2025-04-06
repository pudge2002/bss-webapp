// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import ProtectedRoute from './ProtectedRoute';

function App(){
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
