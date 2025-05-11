// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const themeToggle = document.getElementById('theme-toggle');
    const scrollTopBtn = document.getElementById('scroll-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const skillBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('.section');
    
    // Vérifier si le thème sombre est activé dans le localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Fonction pour basculer entre mode clair et sombre
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('dark-mode', null);
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Écouteur d'événement pour le bouton de thème
    themeToggle.addEventListener('click', toggleDarkMode);
    
    // Fonction pour faire défiler vers le haut de la page
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Écouteur d'événement pour le bouton de retour en haut
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Afficher le bouton de retour en haut lorsque l'utilisateur fait défiler la page
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // Mettre à jour le menu de navigation actif
        updateActiveNavLink();
    });
    
    // Navigation fluide
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Mettre à jour l'URL sans recharger la page
            history.pushState(null, null, targetId);
        });
    });
    
    // Mettre à jour le lien de navigation actif en fonction de la section visible
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Animation des barres de compétences
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            bar.style.width = progress;
        });
    }
    
    // Utiliser IntersectionObserver pour déclencher l'animation des compétences
    const skillsSection = document.getElementById('competences');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
    
    // Animation d'apparition des éléments
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Ajouter la classe CSS pour l'animation de fade-in
    const style = document.createElement('style');
    style.innerHTML = `
        .section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .section.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Observer toutes les sections pour l'animation de fade-in
    sections.forEach(section => {
        fadeInObserver.observe(section);
    });
    
    // Gestion du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simuler l'envoi du formulaire (à remplacer par une vraie soumission)
            console.log('Formulaire soumis:', { name, email, subject, message });
            
            // Afficher un message de succès
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.cssText = `
                background-color: #10b981;
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: center;
                font-weight: 500;
            `;
            successMessage.textContent = 'Votre message a été envoyé avec succès !';
            
            // Ajouter le message de succès après le formulaire
            contactForm.parentNode.appendChild(successMessage);
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Supprimer le message de succès après 5 secondes
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Animation pour les projets
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Effet de zoom sur la photo de profil
    const profileImage = document.getElementById('profile-image');
    
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Animation de typing pour le titre
    function setupTypingAnimation() {
        const titleElement = document.querySelector('.profile-info h2');
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
    
    // Lancer l'animation de typing après un court délai
    setTimeout(setupTypingAnimation, 500);
    
    // Initialiser l'état actif du menu de navigation
    updateActiveNavLink();
});