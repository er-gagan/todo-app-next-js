"use client"
import React, { useEffect } from 'react';
const Modal = ({ isOpen, onClose, Component }: any) => {
    const handleOverlayClick = (e: any) => {
        if (e.target.id === "modalOverlay") {
            onClose();
        }
    };

    useEffect(() => {
        // Optional: Trap focus inside modal for better accessibility
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);
    if (!isOpen || !Component) return null;
    return (
        <div id="modalOverlay" onClick={handleOverlayClick} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                {Component}
            </div>
        </div>
    )
}

export default Modal

