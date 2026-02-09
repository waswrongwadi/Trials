// Moving NO button logic
document.addEventListener('DOMContentLoaded', function() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('.yes-btn');
    
    if (noBtn) {
        let escapeCount = 0;
        const messages = [
            ["Nice try gng", "#ff6b6b"],
            ["You can't catch me, say yes already", "#ff9e6d"],
            ["WHY YOU TRYNA SAY NO LOVE", "#ffd166"],
            ["BABYYPIEEEE, SAY YES CMON", "#06d6a0"],
            ["YK I LOVE YOU", "#118ab2"],
            ["AANYAAAAAAAAAAAA, MWAH say yes", "#7209b7"],
            ["Getting tired yet?", "#f15bb5"],
            ["oh my dearest poem, you're not gonna catch this button", "#00bbf9"],
            ["Almost! ...Not really", "#9b5de5"],
            ["YES is looking really good right now", "#ff006e"]
        ];
        
        let glowIntensity = 0;
        let glowColor = '#ff4d8d';
        
        // Set initial position style
        noBtn.style.position = 'relative';
        noBtn.style.zIndex = '1000';
        
        // Move button when mouse gets close
        noBtn.addEventListener('mouseover', function() {
            escapeCount++;
            moveButton();
            
            // Increase YES button glow
            if (yesBtn) {
                glowIntensity = Math.min(escapeCount * 0.7, 10);
                const blur = 10 + (glowIntensity * 3);
                const spread = 3 + (glowIntensity * 1.5);
                const alpha = 0.4 + (glowIntensity * 0.06);
                const color = `rgba(255, 77, 141, ${alpha})`;
                
                yesBtn.style.boxShadow = `
                    0 0 ${blur}px ${spread}px ${color},
                    0 8px 25px rgba(255, 77, 141, ${0.4 + glowIntensity * 0.05})
                `;
                
                if (glowIntensity > 3) {
                    yesBtn.style.animation = 'heartbeat 1s infinite';
                }
                
                if (glowIntensity > 5) glowColor = '#ff0066';
                if (glowIntensity > 8) {
                    glowColor = '#ff00ff';
                    yesBtn.style.animation = 'intenseGlow 0.8s infinite alternate';
                }
                
                yesBtn.style.textShadow = `0 0 ${glowIntensity * 2}px white`;
                
                // Brief flash
                yesBtn.style.filter = 'brightness(1.2)';
                setTimeout(() => {
                    yesBtn.style.filter = '';
                }, 200);
            }
        });
        
        // Also move if she tries to click
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            escapeCount++;
            moveButton();
        });
        
        function moveButton() {
            // Calculate safe area (keep button within viewport)
            const buttonWidth = noBtn.offsetWidth;
            const buttonHeight = noBtn.offsetHeight;
            const windowWidth = window.innerWidth - buttonWidth - 20;
            const windowHeight = window.innerHeight - buttonHeight - 20;
            
            // Get random position but keep it on screen
            const randomX = Math.max(20, Math.floor(Math.random() * windowWidth));
            const randomY = Math.max(20, Math.floor(Math.random() * windowHeight));
            
            const messageIndex = Math.floor(Math.random() * messages.length);
            const [message, color] = messages[messageIndex];
            
            // Apply the movement with fixed positioning
            noBtn.style.position = 'fixed';
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
            noBtn.style.backgroundColor = color;
            noBtn.style.color = 'white';
            noBtn.style.border = '3px solid white';
            noBtn.style.transition = 'all 0.3s ease-out';
            noBtn.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
            noBtn.style.zIndex = '1000';
            noBtn.textContent = message;
            
            // Add wiggle effect
            setTimeout(() => {
                noBtn.style.transform = 'rotate(3deg) scale(1.05)';
                setTimeout(() => {
                    noBtn.style.transform = 'rotate(-3deg) scale(1.05)';
                    setTimeout(() => {
                        noBtn.style.transform = 'rotate(0deg) scale(1)';
                    }, 150);
                }, 150);
            }, 50);
            
            // After 10 escapes, make it more challenging
if (escapeCount >= 10) {
    if (Math.random() > 0.6) {
        // Teleport to opposite side
        noBtn.style.left = (windowWidth - randomX) + 'px';
        noBtn.style.top = (windowHeight - randomY) + 'px';
        noBtn.textContent = "Teleport! ✨";
        noBtn.style.backgroundColor = '#9b5de5';
        noBtn.style.transition = 'all 0.1s';
    }
    
    // Shrink button - FIXED VERSION
    const shrinkAmount = Math.min(escapeCount - 10, 20); // Max shrink after 30 escapes
    const scale = Math.max(0.5, 1 - (shrinkAmount * 0.05));
    noBtn.style.transform = `scale(${scale})`;
    
    // Also reduce font size
    const fontSize = Math.max(1.2, 1.8 - (shrinkAmount * 0.1));
    noBtn.style.fontSize = fontSize + 'rem';
    
    // Reduce padding
    const paddingV = Math.max(10, 20 - shrinkAmount);
    const paddingH = Math.max(30, 50 - (shrinkAmount * 2));
    noBtn.style.padding = `${paddingV}px ${paddingH}px`;
}
            
            // Show escape counter after 3 tries
            if (escapeCount >= 3) {
                let counter = document.getElementById('escapeCounter');
                if (!counter) {
                    counter = document.createElement('div');
                    counter.id = 'escapeCounter';
                    counter.style.cssText = `
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: rgba(255,255,255,0.9);
                        padding: 10px 15px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        color: #666;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                        z-index: 1001;
                        font-family: 'Poppins', sans-serif;
                    `;
                    document.body.appendChild(counter);
                }
                counter.textContent = `Escapes: ${escapeCount} ✨`;
                counter.style.display = 'block';
            }
        }
        
        // Also trigger move if mouse gets near (proximity detection)
        document.addEventListener('mousemove', function(e) {
            if (!noBtn) return;
            
            const btnRect = noBtn.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate distance between mouse and button center
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            const distance = Math.sqrt(
                Math.pow(mouseX - btnCenterX, 2) + 
                Math.pow(mouseY - btnCenterY, 2)
            );
            
            // If mouse is within 100px of button, move it
            if (distance < 100 && distance > 0) {
                escapeCount++;
                moveButton();
            }
        });
    }
});