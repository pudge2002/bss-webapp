// HomePage.tsx
import { useState } from 'react';
import Navbar from './Navbar';
import '../styles/pagesStyle.css';
function HomePage() {
    const [text, setText] = useState('Welcome to the home page!');
    const [activeButton, setActiveButton] = useState<'option1' | 'option2'>('option1');

    const changeTextToOption1 = () => {
        setText('Страница просмотра');
        setActiveButton('option1');
    };

    const changeTextToOption2 = () => {
        setText('Страница воспроизведения');
        setActiveButton('option2');
    };

    return (
        <div><Navbar
        onOption1Click={changeTextToOption1}
        onOption2Click={changeTextToOption2}
        activeButton={activeButton}
            />
        <div className="content-container">

            <h1>Контент</h1>
            <p>{text}</p>
        </div>
        </div>
    );
}

export default HomePage;
