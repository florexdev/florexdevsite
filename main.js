document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animation using Intersection Observer
  // Adds a clean, organic fade-in effect to elements as they enter the screen
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once for performance
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // 2. Email Click-to-Copy with Feedback Notification
  const mailCard = document.getElementById('mail-card');
  const feedback = document.getElementById('mail-feedback');
  let copyTimeout = null;

  if (mailCard && feedback) {
    mailCard.addEventListener('click', () => {
      const email = mailCard.getAttribute('data-email');
      
      navigator.clipboard.writeText(email)
        .then(() => {
          // Reset existing timers if user double-clicks
          if (copyTimeout) {
            clearTimeout(copyTimeout);
          }
          
          // Display the copy notification inline
          feedback.classList.add('show');
          
          copyTimeout = setTimeout(() => {
            feedback.classList.remove('show');
          }, 2000);
        })
        .catch(err => {
          console.error('Kopyalama hatası: ', err);
        });
    });
  }

  // 3. Theme Toggle Switcher
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // 4. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const closeIcon = document.querySelector('.close-icon');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      
      if (isOpen) {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      } else {
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });

    // Close menu when clicking on a nav link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      });
    });
  }

  // 5. Scroll Spy (Highlights the current section in the navbar)
  const sections = document.querySelectorAll('section[id]');
  const menuLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && menuLinks.length > 0) {
    const scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          menuLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -70% 0px' // Trigger active state when section spans middle of screen
    });


    document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({
            behavior: 'smooth'
        });

        history.replaceState(null, null, window.location.pathname);
    });
});

    sections.forEach(section => {
      scrollSpyObserver.observe(section);
    });
  }
});
