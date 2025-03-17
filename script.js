document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTypewriter();
    initMobileMenu();
    initSmoothScrolling();
    createSnowfall();
    setCurrentYear();
    
    initSectionAnimations();
  });
  
  function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      themeSwitch.checked = true;
    } else if (savedTheme === 'dark') {
      body.classList.remove('light-mode');
      themeSwitch.checked = false;
    } else if (prefersDarkScheme.matches) {
      body.classList.remove('light-mode');
      themeSwitch.checked = false;
    } else {
      body.classList.add('light-mode');
      themeSwitch.checked = true;
    }
    
    themeSwitch.addEventListener('change', () => {
      if (themeSwitch.checked) {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
  
  function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
      'I am a Content Creator',
      'I am a Web Developer',
      'I am a Vibe Coder',
      'I am an Entrepreneur',
      'I am a Writer',
      'I am a Human Being'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;
    
    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; 
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 50; 
      }
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; 
      } 
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; 
      }
      
      setTimeout(type, typingSpeed);
    }
    
    
    setTimeout(type, 1000);
  }
  
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      section.classList.add('section-hidden');
      sectionObserver.observe(section);
    });
  }
  
  function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
  
  function createSnowfall() {
    const snowfallContainer = document.getElementById('snowfall');
    const numberOfSnowflakes = 50; // Adjust as needed
    
    snowfallContainer.innerHTML = '';
    
    for (let i = 0; i < numberOfSnowflakes; i++) {
      createSnowflake(snowfallContainer);
    }
  }
  
  function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    const startPositionX = Math.random() * window.innerWidth;
    
    const size = Math.random() * 4 + 3;
    
    const duration = Math.random() * 20 + 10;
    
    const delay = Math.random() * 10;
    
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${startPositionX}px`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;
    
    if (size > 5) {
      snowflake.style.boxShadow = '0 0 5px rgba(61, 180, 242, 0.5)';
    }
    
    container.appendChild(snowflake);
    
    setTimeout(() => {
      snowflake.remove();
      createSnowflake(container);
    }, (duration + delay) * 1000);
  }
  
  window.addEventListener('resize', () => {
    createSnowfall();
  });

  document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    let formData = new FormData(this);

    let response = await fetch(this.action, {
        method: "POST",
        body: formData
    });

    let result = await response.json();

    if (result.success) {
        document.getElementById("thankYouModal").style.display = "flex"; 
        this.reset(); 
    }
});

document.querySelector(".close-btn").addEventListener("click", function() {
    document.getElementById("thankYouModal").style.display = "none";
});

document.querySelector(".ok-btn").addEventListener("click", function() {
    document.getElementById("thankYouModal").style.display = "none";
});
