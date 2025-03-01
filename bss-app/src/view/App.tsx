// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
function App(){
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;

