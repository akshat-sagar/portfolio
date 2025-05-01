// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Modal functionality for project, certification, and achievement images
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalDesc = document.getElementById('modal-desc');
    const imageModalClose = document.getElementById('image-modal-close');

    // Animated Designation (Typewriter/Fade Effect)
    const titles = [
        
        'Data Scientist',
        'Problem Solver',
        'Computer Science Student'
    ];
    const designationSpan = document.querySelector('.animated-designation');
    let titleIndex = 0;
    let charIndex = 0;
    let typing = true;

    function showTitle(title) {
        designationSpan.textContent = title;
    }

    function typeWriter() {
        const currentTitle = titles[titleIndex];
        if (typing) {
            if (charIndex < currentTitle.length) {
                designationSpan.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeWriter, 70);
            } else {
                typing = false;
                setTimeout(typeWriter, 1200);
            }
        } else {
            if (charIndex > 0) {
                designationSpan.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeWriter, 30);
            } else {
                typing = true;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(typeWriter, 400);
            }
        }
    }
    if (designationSpan) {
        typeWriter();
    }

    // Add scrolled class to header when scrolling
    function toggleHeaderClass() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Highlight active section in navigation
    function highlightActiveSection() {
        let scrollPosition = window.scrollY + 100; // Adjusted offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        const triggerBottom = windowHeight * 0.8;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate-active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // Event Listeners
    window.addEventListener('scroll', toggleHeaderClass);
    window.addEventListener('scroll', highlightActiveSection);
    window.addEventListener('scroll', animateOnScroll);
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Initialize
    toggleHeaderClass();
    highlightActiveSection();
    animateOnScroll();

    // Add animation classes to elements
    document.querySelectorAll('.skill-card, .project-card, .internship-card, .certification-card, .achievement-card').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Add animation to section titles
    document.querySelectorAll('.section-title').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Helper to get description from card
    function getCardDescription(imgElem) {
        // Project
        let card = imgElem.closest('.project-card');
        if (card) {
            let desc = card.querySelector('.project-description');
            return desc ? Array.from(desc.querySelectorAll('li')).map(li => li.textContent).join('\n') : '';
        }
        // Certification
        card = imgElem.closest('.certification-card');
        if (card) {
            let desc = card.querySelector('.certification-title');
            return desc ? desc.textContent : '';
        }
        // Achievement
        card = imgElem.closest('.achievement-card');
        if (card) {
            let desc = card.querySelector('.achievement-description');
            return desc ? desc.textContent : '';
        }
        // Internship
        card = imgElem.closest('.internship-card');
        if (card) {
            let title = card.querySelector('.internship-title').textContent;
            let position = card.querySelector('.internship-position').textContent;
            let duration = card.querySelector('.internship-duration').textContent;
            let description = card.querySelector('.internship-description');
            let descriptionText = description ? Array.from(description.querySelectorAll('li')).map(li => li.textContent).join('\n') : '';
            return `${title}\n${position}\n${duration}\n\n${descriptionText}`;
        }
        return '';
    }

    function openImageModal(imgElem) {
        modalImg.src = imgElem.src;
        modalImg.alt = imgElem.alt;
        modalDesc.textContent = getCardDescription(imgElem);
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
        modalImg.src = '';
        modalDesc.textContent = '';
    }

    // Add click listeners to all relevant images
    document.querySelectorAll('.project-image img, .certification-image img, .achievement-image img, .internship-image img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            openImageModal(this);
        });
    });

    // Close modal on close button
    imageModalClose.addEventListener('click', closeImageModal);
    // Close modal when clicking outside modal content
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeLabel = document.querySelector('.theme-label');

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeLabel.textContent = 'Night';
            themeIcon.style.transform = 'rotate(180deg)';
        } else {
            themeLabel.textContent = 'Morning';
            themeIcon.style.transform = 'rotate(0deg)';
        }
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set initial icon rotation based on theme
    if (savedTheme === 'dark') {
        themeIcon.style.transform = 'rotate(180deg)';
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Rotate icon
        themeIcon.style.transform = newTheme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});