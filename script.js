document.addEventListener('DOMContentLoaded', function() {
    // Handle preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Immediately start the process to hide preloader 
        // Don't wait for load event as it might not fire correctly on some deployments
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000); // Reduced from 2500ms to 1000ms for faster display
    }

    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Navigation scroll effect
    const nav = document.querySelector('nav');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
                nav.style.boxShadow = 'none';
            }
        });
    }

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            const toggle = question.querySelector('.faq-toggle');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemToggle = item.querySelector('.faq-toggle');
                if (itemToggle) itemToggle.textContent = '+';
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.display = 'none';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
                if (toggle) toggle.textContent = '−'; // Use minus sign
                const answer = faqItem.querySelector('.faq-answer');
                if (answer) answer.style.display = 'block';
            }
        });
    });

    // Initialize FAQ items (ensure the first one is open by default)
    const firstFaqItem = document.querySelector('.faq-item');
    if (firstFaqItem) {
        firstFaqItem.classList.add('active');
        const firstToggle = firstFaqItem.querySelector('.faq-toggle');
        if (firstToggle) firstToggle.textContent = '−'; // Use minus sign
        const firstAnswer = firstFaqItem.querySelector('.faq-answer');
        if (firstAnswer) firstAnswer.style.display = 'block';
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button functionality
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    if (scrollToTopButton) {
        // Show button when user scrolls down 300px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile menu toggle (for smaller screens)
    const createMobileMenu = function() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;
        
        // Create toggle button if it doesn't exist
        if (!document.querySelector('.mobile-toggle')) {
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('mobile-toggle');
            toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
            toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
            nav.insertBefore(toggleButton, navLinks);
            
            // Add click event to toggle menu
            toggleButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                navLinks.classList.toggle('active');
                
                if (navLinks.classList.contains('active')) {
                    toggleButton.innerHTML = '<i class="fas fa-times"></i>';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
                } else {
                    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = ''; // Allow scrolling when menu is closed
                }
            });
            
            // Add click event to links to close menu when clicked
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = ''; // Allow scrolling again
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = nav.contains(event.target);
                
                if (!isClickInside && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);



});

// Order Card Modal Functions
window.openOrderModal = function(planName, cost) {
    const modal = document.getElementById('order-modal');
    if (!modal) return;
    
    // Reset modal state
    document.querySelector('.modal-body').classList.remove('hidden');
    const confirmBtn = document.getElementById('confirm-order-btn');
    confirmBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet & Pay';
    confirmBtn.disabled = false;
    
    // Set plan details
    document.getElementById('modal-plan-name').textContent = planName;
    document.getElementById('modal-plan-cost').textContent = cost + ' MTP';
    
    // Calculate 5% reward
    const reward = (cost * 0.05).toFixed(1);
    document.getElementById('modal-plan-reward').textContent = '+' + reward + ' MTP';
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.closeOrderModal = function() {
    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

window.processOrder = async function() {
    const btn = document.getElementById('confirm-order-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    try {
        // Check if Web3 wallet is available
        if (typeof window.ethereum === 'undefined') {
            throw new Error('Please install MetaMask or another Web3 wallet to proceed.');
        }

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // We simulate a real payment transaction by requesting a 0 ETH transfer
        // to a dummy address (or just wait for user to confirm the transaction)
        const transactionParameters = {
            to: account, // Sending to self for demonstration
            from: account,
            value: '0x0', // 0 ETH
        };

        // Send transaction
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        // Transaction successful
        closeOrderModal();
        alert('Payment Successful!');
        
        // Update live counter
        const counter = document.getElementById('cards-ordered-counter');
        if (counter) {
            let current = parseInt(counter.textContent);
            counter.textContent = current + 1;
        }
    } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed or cancelled: " + (error.message || "Unknown error"));
        // Reset button state
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('order-modal');
    if (event.target === modal) {
        closeOrderModal();
    }
});