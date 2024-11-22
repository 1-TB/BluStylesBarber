import React from 'react';

// UNTESTED!!!!
// Loading overlay for the future
const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">Loading...</div>
    </div>
);

export default LoadingOverlay;