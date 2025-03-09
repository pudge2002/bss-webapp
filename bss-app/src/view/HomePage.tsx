// HomePage.tsx
import {useEffect, useState} from 'react';
import Navbar from './Navbar';
import FilesPage from './FilesPage';
import PlaybackPage from './PlaybackPage';
import '../styles/pagesStyle.css';

import { fetchFolders, downloadFile, downloadFolder } from "../Controllers/controller.ts";

function HomePage() {
    const [activeButton, setActiveButton] = useState<'option1' | 'option2'>('option1');
    const [folders, setFolders] = useState<{ name: string; date: string }[]>([]);
    const [files, setFiles] = useState<{ name: string; date: string }[]>([]);
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        async function loadFoldersAndFiles() {
            const data = await fetchFolders(currentPath);
            const formattedFolders = data.directories.map(folder => ({
                name: folder,
                date: '2025-09-03' // Замените на реальную дату, если она доступна
            }));
            const formattedFiles = data.files.map(file => ({
                name: file,
                date: '2025-09-03' // Замените на реальную дату, если она доступна
            }));
            setFolders(formattedFolders);
            setFiles(formattedFiles);
            console.log('Folders set:', formattedFolders); // Вывод данных в консоль
            console.log('Files set:', formattedFiles); // Вывод данных в консоль
        }

        loadFoldersAndFiles();
    }, [currentPath]);

    const changeTextToOption1 = () => {
        setActiveButton('option1');
    };

    const changeTextToOption2 = () => {
        setActiveButton('option2');
    };

    const handleFolderClick = (folderName: string) => {
        const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
        setCurrentPath(newPath);
        console.log('Current path updated to:', newPath); // Вывод данных в консоль
    };

    const handleFileDownload = async (fileName: string) => {
        try {
            const filePath = currentPath ? `${currentPath}/${fileName}` : fileName;
            const blob = await downloadFile(filePath);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('File downloaded:', fileName); // Вывод данных в консоль
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleFolderDownload = async (folderName: string) => {
        try {
            const folderPath = currentPath ? `${currentPath}/${folderName}` : folderName;
            const blob = await downloadFolder(folderPath);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${folderName}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('Folder downloaded:', folderName); // Вывод данных в консоль
        } catch (error) {
            console.error('Error downloading folder:', error);
        }
    };

    return (
        <div>
            <Navbar
                onOption1Click={changeTextToOption1}
                onOption2Click={changeTextToOption2}
                activeButton={activeButton}
            />
            <div className="content">
                {activeButton === 'option1' ? (
                    <FilesPage
                        folders={folders}
                        files={files}
                        onFolderClick={handleFolderClick}
                        onFileDownload={handleFileDownload}
                        onFolderDownload={handleFolderDownload}
                    />
                ) : (
                    <PlaybackPage />
                )}
            </div>
        </div>
    );
}

export default HomePage;