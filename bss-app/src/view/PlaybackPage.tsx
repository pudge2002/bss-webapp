import React, { useEffect, useState } from 'react';
import "../styles/playbackPageStyle.css";
import { ShowCameras, streamCamera } from '../Controllers/controller';

const PlaybackPage: React.FC = () => {
    const [cameras, setCameras] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState<number[]>([]);

    useEffect(() => {
        const fetchCameras = async () => {
            const cameras = await ShowCameras();
            setCameras(cameras);
        };

        fetchCameras();

        // Load selected cameras from localStorage
        const savedCameras = JSON.parse(localStorage.getItem('selectedCameras')) || [];
        setSelectedCameras(savedCameras);
    }, []);

    const handleCheckboxChange = (cameraId: number) => {
        setSelectedCameras(prevSelected => {
            const newSelected = prevSelected.includes(cameraId)
                ? prevSelected.filter(id => id !== cameraId)
                : [...prevSelected, cameraId];

            // Save selected cameras to localStorage
            localStorage.setItem('selectedCameras', JSON.stringify(newSelected));

            return newSelected;
        });
    };

    useEffect(() => {
        selectedCameras.forEach(cameraId => {
            streamCamera(cameraId);
        });
    }, [selectedCameras]);

    const getGridColumns = () => {
        return Math.ceil(Math.sqrt(selectedCameras.length));
    };

    return (
        <div className="content-cameras">
            <div className="cameras" style={{ paddingRight: '20px' }}>
                <h1>Камеры</h1>
                <ul>
                    {cameras.map(camera => (
                        <li key={camera.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ marginRight: 'auto' }}>{camera.name || `Камера ${camera.id}`}</span>
                            <input
                                type="checkbox"
                                checked={selectedCameras.includes(camera.id)}
                                onChange={() => handleCheckboxChange(camera.id)}
                                style={{ marginLeft: '5px' }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="showingCam">
                <h1>Выбранные камеры</h1>
                <div className="video-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`, gap: '10px' }}>
                    {selectedCameras.map(cameraId => {
                        const camera = cameras.find(cam => cam.id === cameraId);
                        return (
                            <div key={cameraId} className="video-container">
                                <video
                                    className="output-video"
                                    width="100%"
                                    height="auto"
                                    controls
                                ></video>
                                <div className="video-label">{camera ? camera.name || `Камера ${camera.id}` : `Камера ${cameraId}`}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PlaybackPage;
