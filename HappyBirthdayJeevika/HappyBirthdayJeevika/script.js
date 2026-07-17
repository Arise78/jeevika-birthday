// ===== STARRY BACKGROUND =====
function createStars() {
    const container = document.getElementById('starsContainer');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.setProperty('--delay', (Math.random() * 5) + 's');
        container.appendChild(star);
    }
    
    for (let i = 0; i < 3; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        shootingStar.style.left = Math.random() * 80 + '%';
        shootingStar.style.top = Math.random() * 30 + '%';
        shootingStar.style.animationDelay = (Math.random() * 8 + 2) + 's';
        container.appendChild(shootingStar);
    }
}

// ===== FLOATING BALLOONS =====
function createBalloons() {
    const container = document.getElementById('balloonsContainer');
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎂', '🎉'];
    
    balloonEmojis.forEach((emoji, index) => {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.textContent = emoji;
        balloon.style.left = (5 + index * 14) + '%';
        balloon.style.setProperty('--duration', (Math.random() * 10 + 15) + 's');
        balloon.style.setProperty('--delay', (Math.random() * 10) + 's');
        balloon.style.setProperty('--rotation', (Math.random() * 20 - 10) + 'deg');
        container.appendChild(balloon);
    });
}

// ===== FLOATING BUTTERFLIES/BIRDS =====
function createButterflies() {
    const container = document.getElementById('butterfliesContainer');
    const butterflies = ['🦋', '🦋', '🦋', '🐦', '🐦', '🕊️', '🦋', '🌸'];
    
    butterflies.forEach((emoji, index) => {
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        butterfly.textContent = emoji;
        butterfly.style.left = (5 + index * 12) + '%';
        butterfly.style.top = (10 + Math.random() * 70) + '%';
        butterfly.style.setProperty('--fly-duration', (Math.random() * 6 + 4) + 's');
        butterfly.style.setProperty('--fly-delay', (Math.random() * 3) + 's');
        container.appendChild(butterfly);
    });
}

// ===== BOUNCING MONKEY =====
const monkey = document.getElementById('monkey');
let monkeyX = Math.random() * (window.innerWidth - 50);
let monkeyY = Math.random() * (window.innerHeight * 0.6);
let monkeyVX = (Math.random() - 0.5) * 4;
let monkeyVY = (Math.random() - 0.5) * 4;

function animateMonkey() {
    monkeyX += monkeyVX;
    monkeyY += monkeyVY;
    
    if (monkeyX <= 0 || monkeyX >= window.innerWidth - 50) monkeyVX *= -1;
    if (monkeyY <= 0 || monkeyY >= window.innerHeight * 0.8) monkeyVY *= -1;
    
    monkey.style.left = monkeyX + 'px';
    monkey.style.top = monkeyY + 'px';
    
    requestAnimationFrame(animateMonkey);
}

// ===== SPARKLE TRAIL =====
const sparkleCanvas = document.getElementById('sparkleCanvas');
const sparkleCtx = sparkleCanvas.getContext('2d');
sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;

let mouseX = 0, mouseY = 0;
const sparkles = [];

class Sparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.color = Math.random() > 0.5 ? '#a855f7' : '#ec4899';
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
    }
    
    draw() {
        sparkleCtx.save();
        sparkleCtx.globalAlpha = this.life;
        sparkleCtx.fillStyle = this.color;
        sparkleCtx.shadowColor = this.color;
        sparkleCtx.shadowBlur = 10;
        sparkleCtx.beginPath();
        sparkleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        sparkleCtx.fill();
        sparkleCtx.restore();
    }
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update custom cursor position
    document.body.style.setProperty('--mouse-x', mouseX + 'px');
    document.body.style.setProperty('--mouse-y', mouseY + 'px');
    
    // Add sparkles
    for (let i = 0; i < 3; i++) {
        sparkles.push(new Sparkle(mouseX, mouseY));
    }
});

function animateSparkles() {
    sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
    
    for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].update();
        sparkles[i].draw();
        if (sparkles[i].life <= 0) {
            sparkles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animateSparkles);
}

// ===== MUSIC VISUALIZER =====
const visualizerBars = document.querySelectorAll('.visualizer-bar');
let visualizerActive = false;

function animateVisualizer() {
    if (!visualizerActive) {
        visualizerBars.forEach(bar => {
            bar.style.height = '5px';
        });
        return;
    }
    
    visualizerBars.forEach(bar => {
        const height = Math.random() * 50 + 5;
        bar.style.height = height + 'px';
    });
}

setInterval(animateVisualizer, 200);

// ===== CONFETTI =====
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = [];
const confettiColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#a855f7', '#ec4899'];

class Confetti {
    constructor() {
        this.reset();
        this.y = Math.random() * confettiCanvas.height;
    }
    
    reset() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.speed = Math.random() * 2 + 1;
        this.wind = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
    }
    
    draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate((this.rotation * Math.PI) / 180);
        confettiCtx.fillStyle = this.color;
        
        if (this.shape === 'rect') {
            confettiCtx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        } else {
            confettiCtx.beginPath();
            confettiCtx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            confettiCtx.fill();
        }
        
        confettiCtx.restore();
    }
    
    update() {
        this.y += this.speed;
        this.x += this.wind;
        this.rotation += this.rotationSpeed;
        
        if (this.y > confettiCanvas.height + 10) {
            this.reset();
        }
        
        this.draw();
    }
}

for (let i = 0; i < 100; i++) {
    confettiPieces.push(new Confetti());
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(piece => piece.update());
    requestAnimationFrame(animateConfetti);
}

// ===== FIREWORKS =====
function launchFirework(x, y) {
    const container = document.getElementById('fireworksContainer');
    const particleCount = 50;
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#a855f7', '#ec4899'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 200 + 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
}

// ===== FLOATING HEARTS ON CLICK =====
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = ['💜', '💖', '💕', '💗', '💝', '🩷'][Math.floor(Math.random() * 6)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.getElementById('heartsContainer').appendChild(heart);
    
    setTimeout(() => heart.remove(), 3000);
});

// ===== ROAST GENERATOR =====
const roastBtn = document.getElementById('roastBtn');
const roastMessage = document.getElementById('roastMessage');

const roasts = [
    "Tu 18 ki ho gayi but dimag abhi bhi 5 saal ka hai 🤏😂",
    "Jeevika itni chhoti hai ki usko step ladder lekar ghoomna padta hai 🤣",
    "Bandar ka bday hai aaj, kele kahan hai? 🐒🍌",
    "18 saal ki ho gayi, ab shayad thoda dimag aa jaye... SHAYAD 🤭",
    "Tu badi ho gayi but height toh abhi bhi same hai 🤏😂",
    "Itni cute hai ki log aaj bhi tujhe 12 saal ki samajhte hain 👶",
    "Yur so skibidi coded sigma always watching skibidi black brainrotted shows 😤😂",
    "Baka itni badi ho gayi, ab sense aayega? (Nahi aayega) 🤪",
    "18 saal mein tune sirf height mein growth ki hai, baaki sab same hai 📏😭",
];

roastBtn.addEventListener('click', () => {
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    roastMessage.textContent = randomRoast;
    
    // Add shake animation
    roastMessage.style.animation = 'none';
    roastMessage.offsetHeight;
    roastMessage.style.animation = 'fadeInUp 0.5s ease-out';
    
    // Burst confetti
    for (let i = 0; i < 20; i++) {
        confettiPieces.push(new Confetti());
    }
});

// ===== CAKE CUTTING =====
// ===== CAKE CUTTING =====
const knife = document.getElementById('knife');
const fullCake = document.getElementById('fullCake');
const cakeInstruction = document.getElementById('cakeInstruction');
const cakeMessage = document.getElementById('cakeMessage');
const cakeContainer = document.getElementById('cakeContainer');
let isDragging = false;
let cakeCut = false;
let startX, startY, knifeStartX, knifeStartY;

// Make knife position absolute within container
knife.style.position = 'relative';
knife.style.cursor = 'grab';

knife.addEventListener('mousedown', (e) => {
    if (cakeCut) return;
    isDragging = true;
    knife.style.cursor = 'grabbing';
    knife.classList.add('dragging');
    cakeInstruction.textContent = 'Yes! Now drag it to the cake! 🔪➡️🎂';
    
    // Store starting positions
    startX = e.clientX;
    startY = e.clientY;
    
    const knifeRect = knife.getBoundingClientRect();
    knifeStartX = knifeRect.left;
    knifeStartY = knifeRect.top;
    
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging || cakeCut) return;
    
    // Move the knife with mouse
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    knife.style.transform = `translate(${dx}px, ${dy}px) rotate(-30deg)`;
    knife.style.zIndex = '50';
    
    // Check if knife is touching the cake
    const knifeRect = knife.getBoundingClientRect();
    const cakeRect = fullCake.getBoundingClientRect();
    
    // Add some tolerance for easier cutting
    const tolerance = 60;
    
    if (knifeRect.left < cakeRect.right - tolerance &&
        knifeRect.right > cakeRect.left + tolerance &&
        knifeRect.top < cakeRect.bottom - tolerance &&
        knifeRect.bottom > cakeRect.top + tolerance) {
        
        // CUT THE CAKE!
        cutTheCake();
    }
});

document.addEventListener('mouseup', () => {
    if (cakeCut) return;
    isDragging = false;
    knife.style.cursor = 'grab';
    knife.classList.remove('dragging');
    
    // Reset knife position
    knife.style.transform = 'translate(0px, 0px) rotate(0deg)';
    knife.style.zIndex = '20';
    
    if (!cakeCut) {
        cakeInstruction.textContent = '👆 Click and drag the knife to the cake!';
    }
});

function cutTheCake() {
    cakeCut = true;
    isDragging = false;
    knife.style.cursor = 'default';
    knife.classList.remove('dragging');
    
    // Cake cutting animation
    fullCake.style.transition = 'all 0.8s ease';
    fullCake.style.transform = 'scale(0.7) rotate(-5deg)';
    fullCake.style.opacity = '0.4';
    
    // Hide candle
    const candle = document.querySelector('.cake-candle');
    if (candle) candle.style.display = 'none';
    
    // Hide knife
    knife.style.opacity = '0';
    knife.style.transition = 'opacity 0.5s';
    
    // Update instruction
    cakeInstruction.textContent = '🎉 Cutting the cake... 🎉';
    
    // Show celebration message
    setTimeout(() => {
        cakeMessage.classList.remove('hidden');
        cakeMessage.style.animation = 'none';
        cakeMessage.offsetHeight;
        cakeMessage.style.animation = 'popIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        cakeInstruction.textContent = '🎉 Online Cake cutting done! xD, Enjoy your day Jeevu! 🎉';
        
        // MASSIVE CELEBRATION!
        for (let i = 0; i < 100; i++) {
            confettiPieces.push(new Confetti());
        }
        
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                launchFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight * 0.6
                );
            }, i * 200);
        }
        
        // Extra fireworks after a delay
        setTimeout(() => {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    launchFirework(
                        window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4,
                        window.innerHeight * 0.2 + Math.random() * window.innerHeight * 0.3
                    );
                }, i * 300);
            }
        }, 1500);
        
    }, 800);
}

// Touch support for mobile
knife.addEventListener('touchstart', (e) => {
    if (cakeCut) return;
    isDragging = true;
    knife.classList.add('dragging');
    cakeInstruction.textContent = 'Yes! Now drag it to the cake! 🔪➡️🎂';
    
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    
    e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging || cakeCut) return;
    
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    
    knife.style.transform = `translate(${dx}px, ${dy}px) rotate(-30deg)`;
    knife.style.zIndex = '50';
    
    const knifeRect = knife.getBoundingClientRect();
    const cakeRect = fullCake.getBoundingClientRect();
    const tolerance = 60;
    
    if (knifeRect.left < cakeRect.right - tolerance &&
        knifeRect.right > cakeRect.left + tolerance &&
        knifeRect.top < cakeRect.bottom - tolerance &&
        knifeRect.bottom > cakeRect.top + tolerance) {
        cutTheCake();
    }
});

document.addEventListener('touchend', () => {
    if (cakeCut) return;
    isDragging = false;
    knife.classList.remove('dragging');
    knife.style.transform = 'translate(0px, 0px) rotate(0deg)';
    knife.style.zIndex = '20';
    
    if (!cakeCut) {
        cakeInstruction.textContent = '👆 Tap and drag the knife to the cake!';
    }
});

// ===== TEASING NO BUTTON =====
const noBtn = document.getElementById('noBtn');
const teaseBtn = document.getElementById('teaseBtn');
const heroSection = document.getElementById('heroSection');
const messageSection = document.getElementById('messageSection');

let noBtnClicks = 0;
const teasingMessages = [
    "Nice try 😏",
    "Nope, click the other one!",
    "Why so negative? 😂",
    "There's no escape!",
    "Resistance is futile 🤖",
    "Just accept the wish already!",
    "You're persistent 😤",
    "OK FINE, just click the wish! 😤"
];

noBtn.addEventListener('mouseover', () => {
    if (noBtnClicks < 8) {
        // Move RIGHT only (50-130px), and randomly UP or DOWN (-40 to +40)
        const moveX = Math.random() * 80 + 50;  // 50 to 130 pixels to the RIGHT
        const moveY = (Math.random() * 80) - 40; // -40 to +40 pixels (up or down)
        
        noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        noBtn.style.transition = 'transform 0.25s ease-out';
    }
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noBtnClicks++;
    
    if (noBtnClicks <= 7) {
        noBtn.textContent = teasingMessages[noBtnClicks - 1];
        // Extra movement on click - RIGHT and random UP/DOWN
        const moveX = Math.random() * 100 + 60;
        const moveY = (Math.random() * 100) - 50;
        noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
        noBtn.textContent = teasingMessages[7];
        noBtn.style.cursor = 'not-allowed';
        noBtn.style.opacity = '0.5';
        noBtn.style.transform = 'translate(0px, 0px)';
        noBtn.style.pointerEvents = 'none';
    }
});

// Return to center when mouse leaves
document.querySelector('.tease-container').addEventListener('mouseleave', () => {
    if (noBtnClicks < 8) {
        setTimeout(() => {
            noBtn.style.transform = 'translate(0px, 0px)';
            noBtn.style.transition = 'transform 0.5s ease-out';
        }, 400);
    }
});

// ===== PHOTO SLIDESHOW =====
let currentPhotoIndex = 0;
const slideshowImages = document.querySelectorAll('.slideshow-img');

function changePhoto() {
    slideshowImages[currentPhotoIndex].classList.remove('active');
    currentPhotoIndex = (currentPhotoIndex + 1) % slideshowImages.length;
    slideshowImages[currentPhotoIndex].classList.add('active');
}

let slideshowInterval;

function startSlideshow() {
    slideshowInterval = setInterval(changePhoto, 4000);
}

// ===== TYPEWRITER MESSAGE =====
const birthdayMessage = `A VERY HAPPYYYY BIRTHDAYYYYY JEEVIKAAAAAAAAAA!!!!! 🥳🎂💜

Happy birthday to youuuuu~~~~ OMGGGG AAJ BANDAR KA BDAY HAIII XD 🐒🎉

Fit choose karliya?? WWWWW 😤✨ PIC BHEJNAAAAA HEHEHE 📸

Hope yuu have the BESTEST day everrrr and enjoy today to the fullest!! Eat lots of cake, click lots of pictures, and make amazing memories todayyy!! 🎂💖

Alsoooo bakaaaaaaaaaaaaa 😤💜 Thank you sooo sooo muchhh for alwaysssss being there for me no matter what. Seriously, you've helped me through so many things, and I appreciate you more than you know. You're genuinely one of the sweetest, kindest and most amazing people I've ever met, and I'm really lucky to have a friend like you. 🫶

You sure are a smol kid pfft 🤏😂 but somehow you're also really mature for your age. Like... HOW?? This lil baka is actually so goood omg wowowowow 😭✨ so skibidi coded frfr.

Never lose that smile of yours, never stop being your goofy self, and never change the things that make you... you. You have such a way of making people around you feel comfortable and happy, and I hope you always remember how special you are. 💜

I hope this new chapter of your life brings you endless happiness, good health, success, lots of laughter, unforgettable memories, and everything you've been wishing for. May all your dreams come true, and I hope this year becomes one of the best years of your life. 🌸✨

TYSMMMM again, Jeevuuuuu, for everything you've done for me. You're my bestie and you'll always be one of my closest friends. ❤️

HAPPYYYY BIRTHDAYYYYY AGAINNNN!!! HAPPY 18THHHH!!!! 🎉🎂💜

Badi hogayiiii omg wowowowowow 😭😂 ab shayad thoda sense aayega... (hopefully 🤭).

And bakaa jeevuuuu, Take care of yourself, stay happy always, keep smiling, and have an absolutely amazing birthdayyyyy!! 💜🫂`;

const typewriterEl = document.getElementById('typewriterLetter');

function startTypewriter() {
    typewriterEl.textContent = '';
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < birthdayMessage.length) {
            typewriterEl.textContent += birthdayMessage[charIndex];
            charIndex++;
            typewriterEl.scrollTop = typewriterEl.scrollHeight;
        } else {
            clearInterval(typingInterval);
        }
    }, 45); // Slower typing speed
}

// ===== CLICK BIRTHDAY WISH BUTTON =====
teaseBtn.addEventListener('click', () => {
    heroSection.style.display = 'none';
    messageSection.classList.remove('hidden');
    
    startSlideshow();
    startTypewriter();
    
    for (let i = 0; i < 50; i++) {
        confettiPieces.push(new Confetti());
    }
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            launchFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.6
            );
        }, i * 300);
    }
    
    setTimeout(() => {
        messageSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    noBtn.textContent = "Told you so! 😜";
    noBtn.style.opacity = '0.5';
    noBtn.style.pointerEvents = 'none';
    noBtn.style.left = '0px';
    noBtn.style.top = '0px';
});

// ===== MUSIC CONTROL =====
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

bgMusic.volume = 0.5;

// Show "Click anywhere" overlay to start music
const overlay = document.createElement('div');
overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    backdrop-filter: blur(5px);
`;
overlay.innerHTML = `
    <div style="text-align: center; color: white; font-family: 'Poppins', sans-serif;">
        <div style="font-size: 4rem; margin-bottom: 20px;">🎂💜</div>
        <h2 style="font-size: 2rem; margin-bottom: 10px;">Click anywhere to enter!</h2>
        <p style="opacity: 0.7; font-size: 1.1rem;">Music & surprises await... ✨</p>
    </div>
`;

document.body.appendChild(overlay);

// Click overlay to start music and remove overlay
overlay.addEventListener('click', () => {
    bgMusic.play().then(() => {
        console.log('▶️ Music started!');
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🔊';
        isMusicPlaying = true;
        visualizerActive = true;
    }).catch(err => console.log('Play failed:', err));
    
    // Fade out overlay
    overlay.style.transition = 'opacity 0.5s';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 500);
});

// Toggle button
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🔇';
        isMusicPlaying = false;
        visualizerActive = false;
    } else {
        bgMusic.play().catch(err => console.log('Play failed:', err));
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🔊';
        isMusicPlaying = true;
        visualizerActive = true;
    }
});

// ===== WINDOW RESIZE =====
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    sparkleCanvas.width = window.innerWidth;
    sparkleCanvas.height = window.innerHeight;
});

// ===== INITIALIZE EVERYTHING =====
createStars();
createBalloons();
createButterflies();
animateConfetti();
animateSparkles();
animateMonkey();

// Initial fireworks
setTimeout(() => {
    launchFirework(window.innerWidth * 0.3, window.innerHeight * 0.3);
    launchFirework(window.innerWidth * 0.7, window.innerHeight * 0.2);
}, 1500);

// Random fireworks
setInterval(() => {
    if (Math.random() > 0.6) {
        launchFirework(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight * 0.5
        );
    }
}, 4000);

console.log('🎉 Happy Birthday Jeevika! 💜');
console.log('🐒 Bandar ka bday hai aaj! XD');
console.log('🔪 Drag the knife to cut the cake!');
console.log('🔥 Click the roast button for fun!');