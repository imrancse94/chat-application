import React from 'react';
import { createPortal } from 'react-dom';
import '@/assets/css/loader.css'


const Loader = () => {

    const scalingFactor = 0.79;

    const styles = {
        transform: `scale(${scalingFactor})`,
    };

    return (
        createPortal(
            <div className="loading" id="full-page-loader">
                <div className="uil-ring-css" style={styles}>
                    <div></div>
                    <h3></h3>
                </div>
            </div>,
            document.body)
    );
}

export default Loader;
