import React from 'react';
import '../styles/videoModalStyle.css';

interface VideoModalProps {
    isOpen: boolean;
    videoSrc: string;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoSrc, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}></button>
                <video width="640" height="500" controls>
                    <source src={videoSrc} type="video/vnd.avi" />
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoModal;