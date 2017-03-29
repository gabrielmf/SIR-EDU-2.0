import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const spinnerOverlay = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'black',
    opacity: 0.3,
    zIndex: 99,
    top: 0,
    left: 0
};

const LoadingSpinner = () => (
    <div>
        <div style={spinnerOverlay}/>
        <RefreshIndicator
            size={60}
            left={-20}
            top={10}
            status={'loading'}
            style={{position:'fixed', zIndex: 1000, marginTop: '20%',marginLeft: '50%'}}
        />
    </div>
);

export default LoadingSpinner;