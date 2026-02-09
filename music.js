// SIMPLE FIXED VOLUME MUSIC
let valentineMusic = {
    audio: null,
    isPlaying: false,
    
    init() {
        console.log("🎵 Starting music automatically at 40% volume...");
        
        // Use local file first, fallback to online
        this.audio = new Audio('valentine-song.mp3');
        
        // Check if local file loads
        this.audio.addEventListener('error', () => {
            console.log("Local file not found, using online version");
            this.audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-valentine-521.mp3');
            this.setupAudio();
        });
        
        // If local file works
        this.audio.addEventListener('canplay', () => {
            this.setupAudio();
        });
        
        // Try to load the file
        this.audio.load();
    },
    
    setupAudio() {
        this.audio.loop = true;
        this.audio.volume = 0.4; // FIXED 40% VOLUME
        this.audio.preload = 'auto';
        
        // Try to play automatically
        const playPromise = this.audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("🎵 Music started at 40% volume");
                this.isPlaying = true;
                this.addSimpleControls();
            }).catch(error => {
                console.log("🎵 Autoplay blocked, will start on click");
                this.setupClickToStart();
            });
        }
    },
    
    setupClickToStart() {
        const startMusic = () => {
            if (!this.isPlaying) {
                this.audio.play().then(() => {
                    this.isPlaying = true;
                    console.log("🎵 Music started after click");
                });
                // Remove listener
                document.removeEventListener('click', startMusic);
            }
        };
        document.addEventListener('click', startMusic);
    },
    
    addSimpleControls() {
        if (document.getElementById('musicControls')) return;
        
        const controls = document.createElement('div');
        controls.id = 'musicControls';
        controls.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(255,255,255,0.9);
                padding: 8px 15px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                z-index: 10000;
                border: 1px solid #ff4d8d;
                font-family: 'Poppins', sans-serif;
                backdrop-filter: blur(5px);
            ">
                <button id="musicToggle" style="
                    background: #ff4d8d;
                    color: white;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">🎵</button>
                <div style="font-size: 0.8rem; color: #ff4d8d;">
                    Love Song
                </div>
            </div>
        `;
        
        document.body.appendChild(controls);
        
        // Simple play/pause toggle
        document.getElementById('musicToggle').addEventListener('click', () => {
            if (this.isPlaying) {
                this.audio.pause();
                document.getElementById('musicToggle').textContent = '🔇';
            } else {
                this.audio.play();
                document.getElementById('musicToggle').textContent = '🎵';
            }
            this.isPlaying = !this.isPlaying;
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            controls.style.opacity = '0.6';
            controls.style.transform = 'translateX(-80%)';
            
            controls.addEventListener('mouseenter', () => {
                controls.style.opacity = '1';
                controls.style.transform = 'translateX(0)';
            });
            
            controls.addEventListener('mouseleave', () => {
                controls.style.opacity = '0.6';
                controls.style.transform = 'translateX(-80%)';
            });
        }, 5000);
    }
};

// Remove any celebrate function calls from other files
// In question.html and yes.html, REMOVE any music.celebrate() calls

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    valentineMusic.init();
});

// Make globally accessible
window.getMusicPlayer = function() {
    return valentineMusic;
};