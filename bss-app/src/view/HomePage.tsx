import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import FilesPage from './FilesPage';
import PlaybackPage from './PlaybackPage';
import '../styles/pagesStyle.css';
import VideoModal from './VideoModal';

import { fetchFolders, downloadFile, downloadFolder, playVideo } from "../Controllers/controller.ts";

function HomePage() {
    const [activeButton, setActiveButton] = useState<'option1' | 'option2'>('option1');
    const [folders, setFolders] = useState<{ name: string; date: string }[]>([]);
    const [files, setFiles] = useState<{ name: string; date: string }[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideoSrc, setCurrentVideoSrc] = useState('');

    useEffect(() => {
        async function loadFoldersAndFiles() {
            const pathString = currentPath.join('/');
            const data = await fetchFolders(pathString);
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
        setCurrentPath([...currentPath, folderName]);
        console.log('Current path updated to:', [...currentPath, folderName]); // Вывод данных в консоль
    };

    const handlePathClick = (index: number) => {
        if (index === -1) {
            setCurrentPath([]);
        } else {
            setCurrentPath(currentPath.slice(0, index + 1));
        }
    };

    const handleFileDownload = async (fileName: string) => {
        try {
            const filePath = currentPath.join('/') ? `${currentPath.join('/')}/${fileName}` : fileName;
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
            const folderPath = currentPath.join('/') ? `${currentPath.join('/')}/${folderName}` : folderName;
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

    const handleFileClick = async (fileName: string) => {
        const filePath = currentPath.join('/') ? `${currentPath.join('/')}/${fileName}` : fileName;
        try {
            const videoBlob = await playVideo(filePath);
            const videoUrl = URL.createObjectURL(videoBlob);
            setCurrentVideoSrc(videoUrl);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error playing video:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideoSrc('');
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
                        path={currentPath}
                        onFolderClick={handleFolderClick}
                        onFileDownload={handleFileDownload}
                        onFolderDownload={handleFolderDownload}
                        onPathClick={handlePathClick}
                        onFileClick={handleFileClick} // Передаем обработчик клика по файлу
                    />
                ) : (
                    <PlaybackPage />
                )}
            </div>
            <VideoModal isOpen={isModalOpen} videoSrc={currentVideoSrc} onClose={closeModal} />
        </div>
    );
}

export default HomePage;
