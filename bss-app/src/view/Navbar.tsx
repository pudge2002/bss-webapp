
import React from 'react';
import '../styles/navbar.css';


interface NavbarProps {
    onOption1Click: () => void;
    onOption2Click: () => void;
    activeButton: string;
}

const Navbar: React.FC<NavbarProps> = ({ onOption1Click, onOption2Click, activeButton }) => {
    return (
        <nav className="navbar">
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
        </nav>
    );
};

export default Navbar;
