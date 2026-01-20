// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const requestButtons = document.querySelectorAll('.request-btn');
const requestModal = document.getElementById('requestModal');
const closeModal = document.querySelector('.close-modal');
const requestForm = document.getElementById('requestForm');
const projectNameSpan = document.getElementById('projectName');
const demoForm = document.getElementById('demoForm');
const subscribeBtn = document.getElementById('subscribeBtn');

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Request Project Files Modal
requestButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectName = button.getAttribute('data-project');
        projectNameSpan.textContent = projectName;
        requestModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    requestModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === requestModal) {
        requestModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle Request Form Submission
requestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('requestName').value;
    const email = document.getElementById('requestEmail').value;
    const message = document.getElementById('requestMessage').value;
    const project = projectNameSpan.textContent;
    
    // Here you would typically send this data to a server
    // For now, we'll just show an alert and reset the form
    alert(`Thank you ${name}! Your request for "${project}" files has been received. We'll email you at ${email} shortly.`);
    
    requestForm.reset();
    requestModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Handle Contact Form Submission
demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    alert(`Thank you ${name}! Your message has been sent successfully. We'll get back to you soon at ${email}.`);
    
    demoForm.reset();
});

// Handle Newsletter Subscription
subscribeBtn.addEventListener('click', () => {
    const emailInput = document.querySelector('.newsletter-form input');
    const email = emailInput.value;
    
    if (email && email.includes('@')) {
        alert(`Thank you for subscribing! You'll receive data insights at ${email}.`);
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-card').forEach(card => {
    observer.observe(card);
});

// Resume download tracking
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function() {
        const fileName = this.getAttribute('href');
        console.log(`Downloading resume: ${fileName}`);
        // You could add analytics tracking here
    });
});

// Profile image fallback
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('error', function() {
        // If profile image doesn't exist, show placeholder
        this.src = 'https://via.placeholder.com/400x400/3a86ff/ffffff?text=PG';
        this.alt = 'Profile Image Placeholder';
    });
}