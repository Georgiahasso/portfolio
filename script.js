// Create floating particles
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll for scroll indicator
const scrollBtn = document.querySelector('.scroll-indicator');
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Profile image placeholder logic
const profileImage = document.getElementById('profileImage');
const placeholder = document.querySelector('.profile-placeholder');

function showPlaceholder() {
    if (placeholder) placeholder.style.display = 'flex';
    if (profileImage) profileImage.style.display = 'none';
}

function showImage() {
    if (placeholder) placeholder.style.display = 'none';
    if (profileImage) profileImage.style.display = 'block';
}

if (profileImage) {
    // Show image by default, only show placeholder if there's an error
    showImage();
    
    profileImage.addEventListener('error', showPlaceholder);
    profileImage.addEventListener('load', () => {
        // Only show image if it successfully loaded and has natural dimensions
        if (profileImage.naturalWidth > 0 && profileImage.naturalHeight > 0) {
            showImage();
        } else {
            showPlaceholder();
        }
    });
}

// Video Modal Functions
function openVideoModal(videoId) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById(videoId);
    
    if (modal && video) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Load and play video
        video.load(); // Reload the video element
        
        // Try to play, but don't force it (browsers may block autoplay)
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay prevented:', error);
                // Video will play when user clicks play button
            });
        }
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('birthwise-video');
    
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset video to beginning
        }
    }
}

// Close modal when clicking outside the video content
const videoModal = document.getElementById('video-modal');
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
});

// Video error handling
const birthwiseVideo = document.getElementById('birthwise-video');
if (birthwiseVideo) {
    birthwiseVideo.addEventListener('error', (e) => {
        console.error('Video error:', e);
        const error = birthwiseVideo.error;
        if (error) {
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Video source:', birthwiseVideo.currentSrc);
        }
    });
    
    birthwiseVideo.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
    });
    
    birthwiseVideo.addEventListener('canplay', () => {
        console.log('Video can start playing');
    });
}

