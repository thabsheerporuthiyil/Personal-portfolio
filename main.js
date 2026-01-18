import './style.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { createIcons, icons } from 'lucide'

// Initialize icons
createIcons({ icons })

// Dark Mode Logic
const themeToggleBtn = document.getElementById('theme-toggle')
const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile')
const html = document.documentElement

// Check local storage or system preference
if (localStorage.theme === 'dark' || !('theme' in localStorage)) {
    html.classList.add('dark')
} else {
    html.classList.remove('dark')
}

function toggleTheme() {
    html.classList.toggle('dark')
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark'
    } else {
        localStorage.theme = 'light'
    }
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme)
if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme)

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn')
const mobileMenu = document.getElementById('mobile-menu')

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden')
    })

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden')
        })
    })
}

// Header Scroll Effect
const header = document.querySelector('header')
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('bg-white/80', 'dark:bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-slate-800', 'shadow-sm', 'h-16')
        header.classList.remove('h-20')
    } else {
        header.classList.remove('bg-white/80', 'dark:bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-slate-800', 'shadow-sm', 'h-16')
        header.classList.add('h-20')
    }
})

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Initialize Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';

const swiper = new Swiper('.mySwiper', {
    modules: [Navigation, Pagination, Mousewheel],
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: false, // Start from the left
    loop: false,
    grabCursor: true, // Show grab cursor for mouse drag
    mousewheel: {
        forceToAxis: true,
    },
    // Autoplay removed for manual control
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

/* =========================================
   EmailJS Integration
   ========================================= */
import emailjs from '@emailjs/browser';

// REPLACE THESE WITH YOUR ACTUAL KEYS
const PUBLIC_KEY = '6XhTN8wrUG0cHsk-m';
const SERVICE_ID = 'service_48k2k6g';
const TEMPLATE_ID = 'template_idt63du';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
            .then(() => {
                alert('Message sent successfully!');
                contactForm.reset();
            }, (error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send message. Please try again.');
            })
            .finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
    });
}


