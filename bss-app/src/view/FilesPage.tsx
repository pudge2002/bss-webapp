import React from 'react';

interface FilesPageProps {
    folders: { name: string; date: string }[];
    files: { name: string; date: string }[];
    onFolderClick: (folderName: string) => void;
    onFileDownload: (fileName: string) => void;
    onFolderDownload: (folderName: string) => void;
}

const FilesPage: React.FC<FilesPageProps> = ({ folders, files, onFolderClick, onFileDownload, onFolderDownload }) => (
    <div className="content-container">
        <h2>Folders</h2>
        <div className="folders-list">
            {folders.map((folder, index) => (
                <div className="folders" key={index}>
                    <img src="/icons/fol-icon.png" alt="Folder Icon"/>
                    <p>{folder.name}</p>
                    <p>{folder.date}</p>
                    <button onClick={() => onFolderClick(folder.name)}>Open</button>
                    <button onClick={() => onFolderDownload(folder.name)}>Download as ZIP</button>
                </div>
            ))}
        </div>
        <h2>Files</h2>
        <div className="files-list">
            {files.map((file, index) => (
                <div className="folders" key={index}>
                    <img src="/icons/file-icon.png" alt="File Icon"/>
                    <p>{file.name}</p>
                    <p>{file.date}</p>
                    <button onClick={() => onFileDownload(file.name)}>Download</button>
                </div>
            ))}
        </div>
    </div>
);

export default FilesPage;
