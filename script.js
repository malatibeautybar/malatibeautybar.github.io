document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Accordion Functionality
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            // Close other open accordions (optional, but good for UX)
            accordions.forEach(otherAcc => {
                if (otherAcc !== this && otherAcc.classList.contains('active')) {
                    otherAcc.classList.remove('active');
                    otherAcc.nextElementSibling.style.maxHeight = null;
                }
            });

            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Reviews Carousel (Fade Effect)
    const groups = document.querySelectorAll('.review-group');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showGroup(index) {
        // Reset all
        groups.forEach(group => group.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Activate new
        if (groups[index]) {
            groups[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        currentIndex = index;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = groups.length - 1;
            showGroup(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= groups.length) newIndex = 0;
            showGroup(newIndex);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showGroup(index);
        });
    });

    // Auto-advance reviews every 8 seconds (longer for reading 3)
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= groups.length) newIndex = 0;
        showGroup(newIndex);
    }, 8000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu on click

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        } else {
            navbar.style.background = '#121212';
        }
    });
});

/* Fullscreen Video Logic */
function openFullscreen(video) {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }

    // Unmute when entering fullscreen
    video.muted = false;
}

// Listen for fullscreen change events to re-mute when exiting
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        // User exited fullscreen, find the video and mute it
        const videos = document.querySelectorAll('.gallery-video');
        videos.forEach(video => {
            video.muted = true;
        });
    }
}

/* Language Translation Support */
const translations = {
    'en': {
        'nav_home': 'Home',
        'nav_about': 'About',
        'nav_services': 'Services',
        'nav_gallery': 'Gallery',
        'nav_reviews': 'Reviews',
        'nav_book': 'Book Now',

        'hero_title_1': 'Organic Elegance & Beauty',
        'hero_desc_1': 'Experience the art of herbal treatments in a cozy, professional setting.',
        'btn_appointment': 'Book Appointment',

        'hero_title_2': 'Precision Brow Artistry',
        'hero_desc_2': 'Perfectly shaped brows using organic threading techniques.',
        'btn_services': 'View Services',

        'hero_title_3': 'Rejuvenating Facials',
        'hero_desc_3': 'Restore your glow with our signature herbal spa treatments.',

        'about_title': "Welcome to Malati's Beauty Bar",
        'about_intro_strong': 'A Cozy Home-Based Salon',
        'about_intro_1': ', Where Comfort Meets Elegance, Located in the Heart of Leiden.',
        'about_intro_2': 'Relax and experience professional, salon-quality beauty care in a warm and welcoming home environment. We offer expert threading, waxing, facials, hair care, and relaxing massages, all performed with great care and attention to detail. Our treatments use herbal and organic products to help you achieve naturally radiant skin and healthy, beautiful hair.',
        'about_intro_3': 'Open for off-hours and weekends, Malati’s Beauty Bar is designed to give you a comfortable, personal, and relaxing salon experience.',
        'about_intro_4_strong': 'Indulge in beauty care that feels relaxing, refined, and just for you.',
        'about_intro_contact': 'Contact us via call or WhatsApp to book an appointment. ✨',

        'malati_name': 'Meet Malati',
        'malati_role': 'Esthetician & Beauty Expert',
        'malati_bio_1': 'With years of experience in the beauty industry, Malati brings a gentle touch and expert precision to every treatment.',
        'malati_bio_2': 'Her philosophy is simple: beauty should be organic, relaxing, and tailored to you. Whether it\'s the art of brow threading or the science of herbal facials, Malati ensures you leave feeling refreshed and radiant.',

        'services_title': 'Our Services',
        'service_cat_brows': 'Brow & Face Artistry',
        'service_cat_hair': 'Hair Styling & Color',
        'service_sub_styling': 'Styling & Cut',
        'service_sub_color': 'Color & Treatment',
        'service_cat_waxing': 'Smooth & Silky Waxing',
        'service_sub_body_wax': 'Body Waxing',
        'service_sub_intimate_wax': 'Intimate Waxing',
        'service_cat_facials': 'Facials & Spa Treatments',
        'service_sub_signature_facial': 'Signature Facials (45-50 min)',
        'service_sub_mani_pedi': 'Manicure, Pedicure & Massage',
        'price_note': '* Prices are subject to change. Please confirm when booking.',

        'gallery_title': 'Portfolio',
        'reviews_title': 'Kind Words',
        'contact_title': 'Visit Us',
        'contact_hours': 'Mon - Sun: Open (See Google for specific hours)',
        'footer_rights': '&copy; 2024 Malati\'s Beauty Bar. All Rights Reserved.'
    },
    'nl': {
        'nav_home': 'Home',
        'nav_about': 'Over Ons',
        'nav_services': 'Diensten',
        'nav_gallery': 'Galerij',
        'nav_reviews': 'Recensies',
        'nav_book': 'Boek Nu',

        'hero_title_1': 'Organische Elegantie & Schoonheid',
        'hero_desc_1': 'Ervaar de kunst van kruidenbehandelingen in een gezellige, professionele setting.',
        'btn_appointment': 'Afspraak Maken',

        'hero_title_2': 'Precisie Wenkbrauw Styling',
        'hero_desc_2': 'Perfect gevormde wenkbrauwen met organische threading-technieken.',
        'btn_services': 'Bekijk Diensten',

        'hero_title_3': 'Verjongende Gezichtsbehandelingen',
        'hero_desc_3': 'Herstel je gloed met onze signature kruiden spa-behandelingen.',

        'about_title': "Welkom bij Malati's Beauty Bar",
        'about_intro_strong': 'Een Gezellige Salon aan Huis',
        'about_intro_1': ', Waar Comfort en Elegantie Samenkomen, in het Hart van Leiden.',
        'about_intro_2': 'Ontspan en ervaar professionele schoonheidszorg van salonkwaliteit in een warme en gastvrije huiselijke omgeving. Wij bieden expert threading, waxen, gezichtsbehandelingen, haarverzorging en ontspannende massages, allemaal uitgevoerd met grote zorg en oog voor detail. Onze behandelingen maken gebruik van kruiden- en biologische producten om je te helpen een natuurlijk stralende huid en gezond, mooi haar te bereiken.',
        'about_intro_3': 'Open buiten kantooruren en in het weekend; Malati’s Beauty Bar is ontworpen om je een comfortabele, persoonlijke en ontspannende salonervaring te geven.',
        'about_intro_4_strong': 'Geniet van schoonheidsverzorging die ontspannend, verfijnd en speciaal voor jou voelt.',
        'about_intro_contact': 'Neem contact op via telefoon of WhatsApp om een afspraak te maken. ✨',

        'malati_name': 'Ontmoet Malati',
        'malati_role': 'Schoonheidsspecialiste & Beauty Expert',
        'malati_bio_1': 'Met jarenlange ervaring in de schoonheidsindustrie brengt Malati een zachte aanraking en deskundige precisie in elke behandeling.',
        'malati_bio_2': 'Haar filosofie is simpel: schoonheid moet organisch, ontspannend en op maat gemaakt zijn. Of het nu gaat om de kunst van wenkbrauw threading of de wetenschap van kruiden gezichtsbehandelingen, Malati zorgt ervoor dat je je verfrist en stralend voelt.',

        'services_title': 'Onze Diensten',
        'service_cat_brows': 'Wenkbrauw & Gezicht Styling',
        'service_cat_hair': 'Haarstyling & Kleur',
        'service_sub_styling': 'Styling & Knippen',
        'service_sub_color': 'Kleur & Behandeling',
        'service_cat_waxing': 'Gladde & Zijdezachte Waxing',
        'service_sub_body_wax': 'Lichaamswaxen',
        'service_sub_intimate_wax': 'Intieme Waxing',
        'service_cat_facials': 'Gezichtsbehandelingen & Spa',
        'service_sub_signature_facial': 'Signature Gezichtsbehandelingen (45-50 min)',
        'service_sub_mani_pedi': 'Manicure, Pedicure & Massage',
        'price_note': '* Prijzen zijn onder voorbehoud. Gelieve te bevestigen bij het boeken.',

        'gallery_title': 'Portfolio',
        'reviews_title': 'Klantervaringen',
        'contact_title': 'Bezoek Ons',
        'contact_hours': 'Ma - Zo: Open (Zie Google voor openingstijden)',
        'footer_rights': '&copy; 2024 Malati\'s Beauty Bar. Alle Rechten Voorbehouden.'
    }
};

function setLanguage(lang) {
    // 1. Update Text
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerText = translations[lang][key];
        }
    });

    // 2. Update Active Toggle State
    document.querySelectorAll('.language-toggle span').forEach(span => {
        span.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');

    // 3. Save Preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize Language on Load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
});
