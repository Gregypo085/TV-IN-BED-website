document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const heroVisual = document.querySelector('.hero-visual');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Mobile menu toggle functionality
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('open');
                navLinksContainer.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle hash links (internal page navigation)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For non-hash links, let the default navigation happen
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.album, .streaming-links, .social-links');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    const trackItems = document.querySelectorAll('.tracks li');
    trackItems.forEach((track, index) => {
        track.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(99, 102, 241, 0.1)';
            this.style.paddingLeft = '1rem';
        });
        
        track.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.paddingLeft = '0';
        });
    });
    
    const synthWave = document.querySelector('.synth-wave');
    if (synthWave) {
        let pulseInterval = setInterval(() => {
            synthWave.style.width = Math.random() * 20 + 60 + '%';
        }, 1000);
    }
    
    const genreTags = document.querySelectorAll('.genre-tag');
    genreTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    const streamingLinks = document.querySelectorAll('.streaming-link');
    streamingLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('.action').style.color = 'var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.querySelector('.action').style.color = 'var(--text-secondary)';
        });
    });
    
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.4)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '';
            }
        });
    });
});