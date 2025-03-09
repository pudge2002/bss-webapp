import React from 'react';
import '../styles/filesPageStyle.css';

interface FilesPageProps {
    folders: { name: string; date: string }[];
    files: { name: string; date: string }[];
    path: string[];
    onFolderClick: (folderName: string) => void;
    onFileDownload: (fileName: string) => void;
    onFolderDownload: (folderName: string) => void;
    onPathClick: (index: number) => void;
    onFileClick: (fileName: string) => void; // Добавляем новый пропс для обработки клика по файлу
}

const FilesPage: React.FC<FilesPageProps> = ({
                                                 folders,
                                                 files,
                                                 path,
                                                 onFolderClick,
                                                 onFileDownload,
                                                 onFolderDownload,
                                                 onPathClick,
                                                 onFileClick
                                             }) => (
    <div className="content-container">
        <div className="breadcrumbs">
            <span onClick={() => onPathClick(-1)} style={{ cursor: 'pointer', marginRight: '8px' }}>
                Все папки
            </span>
            {path.map((folder, index) => (
                <span key={index} onClick={() => onPathClick(index)} style={{ cursor: 'pointer', marginRight: '8px' }}>
                    {`> ${folder}`}
                </span>
            ))}
        </div>
        <div className="folders-list">
            {folders.map((folder, index) => (
                <div className="folders" key={index} onClick={() => onFolderClick(folder.name)}>
                    <img src="/icons/fol-icon.png" alt="Folder Icon"/>
                    <p>{folder.name}</p>
                    <p>{folder.date}</p>
                    <button onClick={(e) => { e.stopPropagation(); onFolderDownload(folder.name); }}>

                    </button>
                </div>
            ))}
        </div>
        <div className="files-list">
            {files.map((file, index) => (
                <div className="folders" key={index} onClick={() => onFileClick(file.name)}>
                    <img src="/icons/vid-icon.png" alt="File Icon"/>
                    <p>{file.name}</p>
                    <p>{file.date}</p>
                    <button onClick={(e) => { e.stopPropagation(); onFileDownload(file.name); }}>

                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default FilesPage;
