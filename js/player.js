const modal = document.getElementById('modal');
const video = document.getElementById('video-player');

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

document.getElementById('play-video').addEventListener('click', function(event) {
    event.preventDefault();

    if (!isIOS()) {
        video.addEventListener('canplay', function() {
            video.play();
        });
    }
    modal.style.display = 'flex';
    video.load();
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        video.pause();
        video.currentTime = 0;
    }
});
