import React from 'react';
import "../styles/playbackPageStyle.css"
const PlaypackPage: React.FC = () => (
    <div className="content-cameras">
        <div className="cameras"><h1>камеры</h1></div>
        <div className="showingCam"><h1>выбранные камеры</h1>
        <video className="output-video" width={1200} height={700}></video></div>
    </div>
);

export default PlaypackPage;
