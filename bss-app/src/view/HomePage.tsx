// HomePage.tsx
import { useState } from 'react';
import Navbar from './Navbar';
import FilesPage from './FilesPage';
import PlaybackPage from './PlaybackPage';
import '../styles/pagesStyle.css';

function HomePage() {
    const [activeButton, setActiveButton] = useState<'option1' | 'option2'>('option1');

    // Example data array, replace this with your actual API data
    const data = [
        { name: ' 1', date: '2025-09-03' },
        { name: ' 2', date: '2025-09-03' },
        { name: ' 3', date: '2025-09-03' }
    ];

    const changeTextToOption1 = () => {
        setActiveButton('option1');
    };

    const changeTextToOption2 = () => {
        setActiveButton('option2');
    };

    return (
        <div>
            <Navbar
                onOption1Click={changeTextToOption1}
                onOption2Click={changeTextToOption2}
                activeButton={activeButton}
            />
            <div className="content">
                {activeButton === 'option1' ? <FilesPage data={data} /> : <PlaybackPage />}
            </div>
        </div>
    );
}

export default HomePage;
