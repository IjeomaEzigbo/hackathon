
// this is the function for the voice input
function startVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = function(event) {
            document.getElementById('voiceInput').value = event.results[0][0].transcript;
        };
        recognition.start();
    } else {
        alert("Your browser does not support speech recognition.");
    }
}

// this is the function for the camera to capture image

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.getElementById('cameraPreview');
        videoElement.style.display = 'block'; // Show the video preview
        videoElement.srcObject = stream;

        // Capture image after a short delay (adjust as needed)
        videoElement.onloadedmetadata = () => {
            videoElement.play();
            setTimeout(() => {
                captureImage();
            }, 3000); // Capture image after 3 seconds
        };
    } catch (error) {
        alert("Camera access denied or not available.");
        console.error(error);
    }
}

function captureImage() {
    const videoElement = document.getElementById('cameraPreview');
    const canvas = document.getElementById('capturedImage');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Stop the video stream
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    videoElement.style.display = 'none'; // Hide the video preview
    canvas.style.display = 'block'; // Show the captured image
}