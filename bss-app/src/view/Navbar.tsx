import React from 'react';
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import { clearTokens } from "../Controllers/controller.ts";

interface NavbarProps {
    onOption1Click: () => void;
    onOption2Click: () => void;
    activeButton: string;
}

const Navbar: React.FC<NavbarProps> = ({ onOption1Click, onOption2Click, activeButton }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        let isClear = await clearTokens();
        if (isClear) {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-center">
                <button
                    onClick={onOption1Click}
                    className={activeButton === 'option1' ? 'active' : ''}
                >
                    Просмотр
                </button>
                <button
                    onClick={onOption2Click}
                    className={activeButton === 'option2' ? 'active' : ''}
                >
                    Воспроизведение
                </button>
            </div>
            <button onClick={handleClick} className="exitButton">

            </button>
        </nav>
    );
};

export default Navbar;
