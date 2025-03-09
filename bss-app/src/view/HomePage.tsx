// HomePage.tsx
import {useEffect, useState} from 'react';
import Navbar from './Navbar';
import FilesPage from './FilesPage';
import PlaybackPage from './PlaybackPage';
import '../styles/pagesStyle.css';

import { fetchFolders } from "../Controllers/controller.ts";

function HomePage() {
    const [activeButton, setActiveButton] = useState<'option1' | 'option2'>('option1');
    const [folders, setFolders] = useState<{ name: string; date: string }[]>([]);

    useEffect(() => {
        async function loadFolders() {
            const data = await fetchFolders();
            const formattedFolders = data.directories.map(folder => ({
                name: folder,
                date: '2025-09-03' // Замените на реальную дату, если она доступна
            }));
            setFolders(formattedFolders);
            console.log('Folders set:', formattedFolders); // Вывод данных в консоль
        }

        loadFolders();
    }, []);

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
                {activeButton === 'option1' ? <FilesPage data={folders} /> : <PlaybackPage />}
            </div>
        </div>
    );
}

export default HomePage;