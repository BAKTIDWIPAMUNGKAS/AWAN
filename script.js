// PERUBAHAN 2: Menambahkan logika Modal Form ke dalam tag script di index.html

// Profile tabs functionality (memastikan JS yang sudah ada tetap berfungsi)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});


// Logika Modal
const modal = document.getElementById('serviceModal');
const serviceCards = document.querySelectorAll('.service-card');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-btn');
const serviceForm = document.getElementById('serviceForm');
const formSuccess = document.getElementById('formSuccess');
const successService = document.getElementById('successService');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.getAttribute('data-service');
        const serviceDesc = card.querySelector('p').textContent;
        
        modalTitle.textContent = `Permintaan Informasi: ${serviceName}`;
        modalDescription.textContent = `Silakan isi formulir di bawah untuk mendapatkan akses atau informasi lebih lanjut mengenai layanan **${serviceName}**: ${serviceDesc}`;
        
        // Reset form state
        serviceForm.style.display = 'block';
        formSuccess.style.display = 'none';
        serviceForm.reset();

        // Tambahkan hidden field untuk layanan yang diminta
        let hiddenInput = document.getElementById('hiddenService');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.id = 'hiddenService';
            hiddenInput.name = 'layanan_diminta';
            serviceForm.appendChild(hiddenInput);
        }
        hiddenInput.value = serviceName;
        
        // Tampilkan modal
        modal.style.display = 'block';
    });
});

closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Handle Form Submission (Simulasi)
serviceForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nama layanan dari hidden field
    const serviceName = document.getElementById('hiddenService').value;
    
    // Sembunyikan form dan tampilkan pesan sukses
    serviceForm.style.display = 'none';
    successService.textContent = serviceName;
    formSuccess.style.display = 'block';
    
    console.log(`Simulasi: Data untuk layanan ${serviceName} telah dikirim!`);
});

// Bagian script.js lainnya tetap dipertahankan
// Smooth scrolling, observer, counter animation, sticky header, etc.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-item, .service-card, .news-card').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isNumber = !isNaN(target);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (isNumber) {
                element.textContent = Math.floor(current) + '+';
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isNumber) {
                element.textContent = target + '+';
            } else {
                element.textContent = target;
            }
        }
    };
    
    if (isNumber) {
        updateCounter();
    }
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace('+', ''));
                if (!isNaN(number)) {
                    stat.textContent = '0+';
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Sticky header background change on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Profile cards hover effect enhancement
document.querySelectorAll('.struktur-card, .fasilitas-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== TOGGLE MENU MOBILE - SCRIPT LENGKAP =====
// Tambahkan script ini di akhir tag <body> atau di file script.js

document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen-elemen yang diperlukan
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;

    // Pastikan elemen ada sebelum menambahkan event listener
    if (menuToggle && navLinks && menuOverlay) {
        
        // Fungsi untuk membuka menu
        function openMenu() {
            menuToggle.classList.add('active');
            navLinks.classList.add('active');
            menuOverlay.classList.add('active');
            body.classList.add('menu-open');
        }

        // Fungsi untuk menutup menu
        function closeMenu() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }

        // Toggle menu saat hamburger diklik
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Tutup menu saat overlay diklik
        menuOverlay.addEventListener('click', function() {
            closeMenu();
        });

        // Tutup menu saat link diklik (untuk smooth navigation)
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(function(link) {
            link.addEventListener('click', function() {
                // Tutup menu hanya di mobile
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });

        // Tutup menu saat window diresize ke desktop
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    closeMenu();
                }
            }, 250);
        });

        // Tutup menu dengan tombol ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Prevent scroll pada body saat menu terbuka
        navLinks.addEventListener('touchmove', function(e) {
            if (navLinks.classList.contains('active')) {
                e.stopPropagation();
            }
        }, { passive: false });

    } else {
        // Log jika elemen tidak ditemukan (untuk debugging)
        console.warn('Toggle menu elements not found. Make sure you have added:');
        console.warn('- <button id="menuToggle"> in header');
        console.warn('- <ul id="navLinks"> for navigation');
        console.warn('- <div id="menuOverlay"> after header');
    }

    // Highlight active menu berdasarkan halaman saat ini
    function setActiveMenu() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuItems = document.querySelectorAll('.nav-links a');
        
        menuItems.forEach(function(item) {
            const href = item.getAttribute('href');
            
            // Check jika href sama dengan current page
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href.includes('#'))) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Jalankan fungsi set active menu
    setActiveMenu();
});

// ===== SMOOTH SCROLL (Bonus) =====
// Smooth scroll untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Jangan prevent default jika href hanya '#'
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

console.log('Mobile toggle menu initialized successfully!');

console.log('Madrasah Raudhatul Ulum - Sistem Informasi loaded successfully!');

