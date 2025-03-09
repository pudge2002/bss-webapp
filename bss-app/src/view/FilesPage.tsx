// ContentOption1.tsx
import React from 'react';

interface FilesPageData {
    data: { name: string; date: string }[];
}

const FilesPage: React.FC<FilesPageData> = ({ data }) => (
    <div className="content-container">
        {data.map((item, index) => (
            <div className="folders" key={index}>
                <img src="/icons/fol-icon.png" alt="Image Description"/>
                <p>{item.name}</p>
                <p>{item.date}</p>
                <button>
                    {/*<img src="/icons/download-ico.png" alt="Button Image"/>*/}
                </button>
            </div>
        ))}
    </div>
);

export default FilesPage;
