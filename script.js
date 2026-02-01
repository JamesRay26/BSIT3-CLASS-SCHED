// Motivational quotes array
const quotes = [
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        text: "Don't be afraid to give up the good to go for the great.",
        author: "John D. Rockefeller"
    },
    {
        text: "I find that the harder I work, the more luck I seem to have.",
        author: "Thomas Jefferson"
    },
    {
        text: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "The secret of success is to do the common thing uncommonly well.",
        author: "John D. Rockefeller Jr."
    },
    {
        text: "I never dreamed about success, I worked for it.",
        author: "Estée Lauder"
    },
    {
        text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
        author: "Roy T. Bennett"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "Opportunities don't happen. You create them.",
        author: "Chris Grosser"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    },
    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Anonymous"
    },
    {
        text: "Dream bigger. Do bigger.",
        author: "Anonymous"
    },
    {
        text: "Success doesn't just find you. You have to go out and get it.",
        author: "Anonymous"
    }
];

// Function to get quote based on day of year (shuffles daily)
function getDailyQuote() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return quotes[dayOfYear % quotes.length];
}

// Set the quotes on page load
function initializeQuotes() {
    const dailyQuote = getDailyQuote();
    const topQuote = document.getElementById('topQuote');
    const bottomQuote = document.getElementById('bottomQuote');
    
    topQuote.innerHTML = `${dailyQuote.text}<span class="quote-author">— ${dailyQuote.author}</span>`;
    bottomQuote.innerHTML = `${dailyQuote.text}<span class="quote-author">— ${dailyQuote.author}</span>`;
}

// Function to highlight current and next time slots
function updateTimeHighlight() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Remove all existing highlights
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('current-time', 'next-time');
    });

    // Find the day column
    const dayColumn = document.querySelector(`[data-day="${currentDay}"]`);
    if (!dayColumn) return;

    const timeSlots = dayColumn.querySelectorAll('.time-slot');
    let foundCurrent = false;
    let foundNext = false;

    timeSlots.forEach((slot, index) => {
        const startTime = slot.getAttribute('data-start');
        const endTime = slot.getAttribute('data-end');
        
        if (!startTime || !endTime) return;

        // Convert time to minutes
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);
        const startInMinutes = startHour * 60 + (startMin || 0);
        const endInMinutes = endHour * 60 + (endMin || 0);

        // Check if current time falls within this slot
        if (currentTimeInMinutes >= startInMinutes && currentTimeInMinutes < endInMinutes && !foundCurrent) {
            slot.classList.add('current-time');
            foundCurrent = true;
            
            // Highlight next slot
            if (index + 1 < timeSlots.length && !foundNext) {
                timeSlots[index + 1].classList.add('next-time');
                foundNext = true;
            }
        }
    });
}

// Create confetti effect
function createConfetti(x, y) {
    const colors = ['#e74c3c', '#3498db', '#9b59b6', '#f39c12', '#2ecc71'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 3 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        let rotation = 0;
        
        const animate = () => {
            posX += vx;
            posY += vy + 2;
            opacity -= 0.02;
            rotation += 10;
            
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        animate();
    }
}

// Add click handlers to all class slots
function initializeClassSlotInteractions() {
    document.querySelectorAll('.class-info').forEach(slot => {
        slot.addEventListener('click', (e) => {
            const rect = slot.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Add pulse effect
            slot.style.transform = 'scale(1.1)';
            setTimeout(() => {
                slot.style.transform = '';
            }, 200);
            
            // Create confetti
            createConfetti(x, y);
        });
    });
}

// Smooth scroll reveal for day columns
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.day-column').forEach(column => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(20px)';
        column.style.transition = 'all 0.6s ease-out';
        observer.observe(column);
    });
}

// Add ripple effect to time slots
function initializeRippleEffect() {
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('mouseenter', (e) => {
            const ripple = document.createElement('span');
            const rect = slot.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            slot.style.position = 'relative';
            slot.style.overflow = 'hidden';
            slot.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Fun easter egg: Double click header for motivation
function initializeMotivationEasterEgg() {
    let clickCount = 0;
    document.querySelector('header').addEventListener('click', () => {
        clickCount++;
        if (clickCount === 2) {
            const messages = [
                "You've got this! 💪",
                "Keep pushing forward! 🚀",
                "Believe in yourself! ⭐",
                "You're doing amazing! 🎉",
                "Success is coming! 🏆"
            ];
            const message = messages[Math.floor(Math.random() * messages.length)];
            
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 2rem 3rem;
                border-radius: 15px;
                font-size: 2rem;
                font-weight: bold;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'popOut 0.3s ease-in forwards';
                setTimeout(() => toast.remove(), 300);
            }, 2000);
            
            clickCount = 0;
        }
        setTimeout(() => clickCount = 0, 500);
    });
}

// Initialize day navigation buttons
function initializeDayNavigation() {
    const navButtons = document.querySelectorAll('.day-nav-btn');
    const dayNavigation = document.querySelector('.day-navigation');
    const navToggle = document.getElementById('navToggle');
    const dayMap = {
        '1': 'monday',
        '2': 'tuesday',
        '3': 'wednesday',
        '4': 'thursday'
    };

    // Toggle navigation visibility
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            dayNavigation.classList.toggle('hidden');
            navToggle.textContent = dayNavigation.classList.contains('hidden') ? '☰' : '✕';
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetDay = button.getAttribute('data-target-day');
            const targetId = dayMap[targetDay];
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add highlight animation after scroll
                setTimeout(() => {
                    targetElement.classList.add('highlight');
                    
                    // Remove highlight after animation completes
                    setTimeout(() => {
                        targetElement.classList.remove('highlight');
                    }, 1000);
                }, 500);

                // Auto-hide navigation on mobile after selection
                if (window.innerWidth <= 768 && navToggle) {
                    setTimeout(() => {
                        dayNavigation.classList.add('hidden');
                        navToggle.textContent = '☰';
                    }, 1000);
                }
            }
        });
    });

    // Check which day is in viewport and highlight corresponding button
    function checkDayProximity() {
        const dayColumns = document.querySelectorAll('.day-column');
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        navButtons.forEach(btn => btn.classList.remove('active'));

        dayColumns.forEach(column => {
            const rect = column.getBoundingClientRect();
            const columnTop = window.scrollY + rect.top;
            const columnBottom = columnTop + rect.height;

            if (scrollPosition >= columnTop && scrollPosition <= columnBottom) {
                const dayNum = column.getAttribute('data-day');
                const correspondingButton = document.querySelector(`[data-target-day="${dayNum}"]`);
                if (correspondingButton) {
                    correspondingButton.classList.add('active');
                }
            }
        });
    }

    // Add scroll effect to sticky navigation and check proximity
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            dayNavigation.classList.add('scrolled');
        } else {
            dayNavigation.classList.remove('scrolled');
        }
        
        // Check day proximity
        checkDayProximity();
        
        lastScroll = currentScroll;
    });

    // Initial check on load
    setTimeout(checkDayProximity, 500);
}

// Initialize back-to-top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize report modal
function initializeReportModal() {
    const reportButton = document.getElementById('reportButton');
    const reportModal = document.getElementById('reportModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');

    if (!reportButton || !reportModal) return;

    // Open modal
    reportButton.addEventListener('click', () => {
        reportModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal function
    const closeModal = () => {
        reportModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Close on X button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on Cancel button
    if (modalCancel) {
        modalCancel.addEventListener('click', closeModal);
    }

    // Close on overlay click
    reportModal.addEventListener('click', (e) => {
        if (e.target === reportModal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && reportModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize quotes
    initializeQuotes();
    
    // Initialize time highlighting and update every minute
    updateTimeHighlight();
    setInterval(updateTimeHighlight, 60000);
    
    // Initialize interactive features
    initializeClassSlotInteractions();
    initializeScrollReveal();
    initializeRippleEffect();
    initializeMotivationEasterEgg();
    initializeDayNavigation();
    initializeBackToTop();
    initializeReportModal();
});
