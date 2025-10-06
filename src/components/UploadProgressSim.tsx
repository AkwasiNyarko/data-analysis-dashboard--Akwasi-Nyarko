import { set } from "date-fns";
import { useState } from "react";

const UploadProgressSim = () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false); 
    const [uploadId, setUploadId] = useState(null);

    // Event handlers - What happens when users interact

    const startUpload = () => {
    // TODO: Start the upload simulation
        setIsUploading(true);
        setProgress(0);
    // Step 2: Create a timer that updates progress
        const timerId = setInterval(() => {
    // This function runs every 300ms
    setProgress(currentProgress => {
        const increment = Math.random() * 10 + 5; // Random increment between 5 and 15
        const newProgress = currentProgress + increment;

        if (newProgress >= 100) {
            // Upload complete
            setIsUploading(false);
            clearInterval(timerId); // stop the timer
            return 100; // set to exactly 100%
        }
        return Math.min (newProgress, 100); // Ensure it doesn't exceed 100%
    });
    }, 300); // Run every 300ms

    };
    
    const resetProgress = () => {
    // TODO: Reset everything back to start
        if (uploadId) {
            clearInterval(uploadId);
            setUploadId(null);
        }

        setProgress(0);
        setIsUploading(false);
    };

    const cancelUpload = () => {
    // TODO: Stop upload in progress
    };

    return (
            <div className="progress-container p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">

                {/* Header */}
                <h2 className="text-2xl font-bold text-center mb-6">
                📁 Upload Progress Simulator
                </h2>

                {/* Progress Bar */}
                <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                    />
                </div>
                </div>

                {/* Progress Display */}
                <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-600">{progress}%</span>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-3">
                {!isUploading ? (
                    // show start button when not uploading
                    <button 
                    onClick={startUpload}
                    disabled = {progress === 100}
                    className = "px-6 py-3 bg-blue-500 text-white rounded lg font-bold hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                    {progress === 100 ? 'Complete' : 'Start Upload'}
                    </button>
                ) : (
                    // show status when uploading.
                    <div className = "px-6 py-3 bg-yellow-100 text-yellow-800 rounded lg font-bold">
                    Uploading... {Math.round(progress)}%
                    </div>
                )}
                    
                <button
                    onClick={resetProgress}
                    disabled = {isUploading}
                    className = "px-6 py-3 bg-gray-500 text-white rounded lg font-bold hover:bg-gray-600 transition-colors disabled:bg-gray-400"
                >
                    Reset
                </button> 
                </div>
            </div>
    );
};

export default UploadProgressSim;