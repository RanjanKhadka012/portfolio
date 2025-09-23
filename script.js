// Modern Portfolio JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            const target = document.querySelector(hash);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add scrolled class styles
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background-color: rgba(33, 37, 41, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all cards and timeline items
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.card, .timeline-item, .contact-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Download resume functionality
document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();
    
    // You can replace this with actual resume download logic
    const resumeContent = generateResumeContent();
    downloadResume(resumeContent);
});

function generateResumeContent() {
    return `
RANJAN KHADKA
Software Engineering Student

Contact Information:
Crookston, MN | Khadk046@crk.umn.edu | (218) 275-0287
LinkedIn: https://www.linkedin.com/in/ranjan-khadka-181b461a5/

OBJECTIVE
Software Engineering student with hands-on experience in software development, IT support, and leadership roles. Currently interning as a Software Engineering Intern while contributing to campus-wide sustainability initiatives through software projects. Skilled in full-stack development, troubleshooting, and cross-functional collaboration. Seeking opportunities to apply technical expertise and problem-solving abilities in professional software engineering environments.

EDUCATION
University of Minnesota Crookston – Crookston, MN
Bachelor of Science in Software Engineering | Expected Graduation: Dec, 2027
Relevant Coursework: Data Structures & Algorithms, Software Engineering, Operating Systems, Database Systems, Computer Networks

TECHNICAL SKILLS
Languages: Python, Java, C, JavaScript, SQL
Web Development: HTML, CSS, React, Node.js, Express.js
Databases: MySQL, MongoDB
Tools & Platforms: Git/GitHub, Linux, Docker, AWS (basic), JIRA

EXPERIENCE
Software Engineering Intern – Sustainability Department, UMC | May, 2025– Present
• Collaborating with engineers to design, implement, and test software features.
• Writing clean, efficient code and debugging issues to improve system performance.
• Participating in Agile team meetings, sprint planning, and code reviews.

IT Technician – Help Desk – University of Minnesota Crookston | Oct, 2024 – Present
• Provided technical support for faculty, staff, and students, resolving hardware, software, and networking issues.
• Installed and configured operating systems and software applications.
• Documented support tickets and solutions to improve IT workflows.

Student Supervisor & Assistant Manager – Facilities & Grounds, University of Minnesota Crookston | May 2024– Aug 2025
• Supervised a team of student employees, assigned tasks, and monitored progress.
• Assisted with scheduling, equipment management, and compliance with safety protocols.
• Developed leadership and organizational skills through team coordination.

POS Operator – Sodexo | Aug, 2024 – Present
• Operated point-of-sale systems to process customer transactions.
• Delivered customer support while ensuring smooth daily operations.

PROJECTS
Sustainability Online Marketplace – University of Minnesota Crookston Sustainability Department | Aug, 2025 – Present
• Developing a campus-focused online platform to promote sustainability by enabling students and staff to exchange and repurpose items.
• Building a full-stack application with React, Node.js/Express, and MongoDB.
• Implementing user authentication, item listing, and search functionality.
• Working closely with department stakeholders to align features with sustainability goals.

Task Manager Web App
• Created a full-stack task management system with React, Node.js, and MongoDB.
• Designed CRUD functionality for task management with responsive UI.

LEADERSHIP & ACTIVITIES
• Vice Student Chair, IEEE Club – University of Minnesota Crookston (2024–Present)
• Hackathon Participant – Built a finance tracking prototype app in under 24 hours
• Volunteer, Campus Tech Support

SOFT SKILLS
Problem-Solving | Leadership | Teamwork | Communication | Time Management | Adaptability
`;
}

function downloadResume(content) {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Ranjan_Khadka_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Show success message
    showNotification('Resume downloaded successfully!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-check-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Form validation and enhancement (if needed)
function enhanceContactForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
        });
    });
}

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
    
    // Enhance contact forms
    enhanceContactForms();
    
    // Add loading class to animated elements
    const animatedElements = document.querySelectorAll('.card, .timeline-item');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('loading');
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling logic here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Back to top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'btn btn-primary position-fixed bottom-0 end-0 m-3 rounded-circle';
    button.style.zIndex = '9999';
    button.style.display = 'none';
    button.style.width = '50px';
    button.style.height = '50px';
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);