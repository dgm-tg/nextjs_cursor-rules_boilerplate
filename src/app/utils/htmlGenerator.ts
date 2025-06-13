import { PageData } from '../page';

export const generateCSS = (pageData: PageData) => {
  return `/* Styles for ${pageData.title} */
* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
}

body { 
  font-family: '${pageData.fonts.body}', sans-serif; 
  background-color: ${pageData.colors.background}; 
  color: ${pageData.colors.text}; 
  line-height: 1.6; 
}

.container { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 20px; 
}

/* Navigation */
nav { 
  background-color: ${pageData.colors.background}; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
  position: sticky; 
  top: 0; 
  z-index: 50; 
}

nav .nav-container { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 1rem 0; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding-left: 20px; 
  padding-right: 20px; 
}

nav h1 { 
  font-family: '${pageData.fonts.heading}', sans-serif; 
  font-size: 1.5rem; 
  font-weight: 700; 
  color: ${pageData.colors.text}; 
}

.nav-links { 
  display: flex; 
  list-style: none; 
  gap: 2rem; 
}

.nav-links a { 
  color: ${pageData.colors.text}; 
  text-decoration: none; 
  transition: opacity 0.3s; 
}

.nav-links a:hover { 
  opacity: 0.7; 
}

.mobile-menu-button { 
  display: none; 
  background: none; 
  border: none; 
  color: ${pageData.colors.text}; 
  font-size: 1.5rem; 
  cursor: pointer; 
}

/* Mobile Menu */
.mobile-menu { 
  display: none; 
  position: fixed; 
  top: 0; 
  right: 0; 
  width: 300px; 
  height: 100vh; 
  background-color: ${pageData.colors.background}; 
  box-shadow: -2px 0 10px rgba(0,0,0,0.1); 
  z-index: 1000; 
  transform: translateX(100%); 
  transition: transform 0.3s ease; 
}

.mobile-menu.active { 
  transform: translateX(0); 
}

.mobile-menu-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 1rem; 
  border-bottom: 1px solid #e5e7eb; 
}

.mobile-menu-links { 
  padding: 1rem; 
}

.mobile-menu-links a { 
  display: block; 
  padding: 0.75rem 0; 
  color: ${pageData.colors.text}; 
  text-decoration: none; 
  border-bottom: 1px solid #f3f4f6; 
}

.mobile-menu-backdrop { 
  display: none; 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  background-color: rgba(0,0,0,0.5); 
  z-index: 999; 
}

.mobile-menu-backdrop.active { 
  display: block; 
}

/* Hero Section */
.hero { 
  text-align: center; 
  padding: 5rem 0; 
}

.hero h2 { 
  font-family: '${pageData.fonts.heading}', sans-serif; 
  font-size: 3.5rem; 
  font-weight: 700; 
  margin-bottom: 1.5rem; 
  color: ${pageData.colors.text}; 
}

.hero p { 
  font-size: 1.25rem; 
  margin-bottom: 2rem; 
  max-width: 600px; 
  margin-left: auto; 
  margin-right: auto; 
  color: ${pageData.colors.text}; 
}

.btn, .cta-button { 
  display: inline-block; 
  background-color: ${pageData.colors.primary}; 
  color: white; 
  padding: 0.75rem 2rem; 
  text-decoration: none; 
  border-radius: 0.5rem; 
  font-weight: 600; 
  border: none; 
  cursor: pointer; 
  transition: opacity 0.3s; 
}

.btn:hover, .cta-button:hover { 
  opacity: 0.9; 
}

/* Sections */
section { 
  padding: 4rem 0; 
}

section h2 { 
  font-family: '${pageData.fonts.heading}', sans-serif; 
  font-size: 2.5rem; 
  font-weight: 700; 
  text-align: center; 
  margin-bottom: 3rem; 
  color: ${pageData.colors.text}; 
}

/* Features */
.features-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 2rem; 
}

.feature-card { 
  text-align: center; 
  padding: 2rem; 
}

.feature-icon { 
  width: 4rem; 
  height: 4rem; 
  background-color: ${pageData.colors.primary}; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin: 0 auto 1rem; 
  color: white; 
  font-size: 1.5rem; 
  font-weight: 700; 
}

.feature-card h3 { 
  font-size: 1.25rem; 
  font-weight: 600; 
  margin-bottom: 1rem; 
  color: ${pageData.colors.text}; 
}

.feature-card p { 
  color: ${pageData.colors.text}; 
}

/* Testimonials */
.testimonials-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); 
  gap: 2rem; 
}

.testimonial-card { 
  background-color: #f9fafb; 
  padding: 2rem; 
  border-radius: 0.5rem; 
}

.testimonial-card blockquote { 
  font-style: italic; 
  margin-bottom: 1rem; 
  color: #6b7280; 
}

.testimonial-author { 
  display: flex; 
  align-items: center; 
  gap: 1rem; 
}

.testimonial-avatar { 
  width: 3rem; 
  height: 3rem; 
  background-color: ${pageData.colors.primary}; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  color: white; 
  font-weight: 600; 
}

.testimonial-info h4 { 
  font-weight: 600; 
  color: ${pageData.colors.text}; 
}

.testimonial-info p { 
  font-size: 0.875rem; 
  color: #6b7280; 
}

/* Contact Form */
.contact-form { 
  max-width: 500px; 
  margin: 0 auto; 
}

.form-group { 
  margin-bottom: 1.5rem; 
}

.form-group label { 
  display: block; 
  margin-bottom: 0.5rem; 
  font-weight: 500; 
  color: ${pageData.colors.text}; 
}

.form-group input, .form-group textarea { 
  width: 100%; 
  padding: 0.75rem; 
  border: 1px solid #d1d5db; 
  border-radius: 0.375rem; 
  font-size: 1rem; 
  font-family: inherit; 
}

.form-group input:focus, .form-group textarea:focus { 
  outline: none; 
  border-color: ${pageData.colors.primary}; 
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); 
}

/* Footer */
footer { 
  background-color: #f9fafb; 
  text-align: center; 
  padding: 2rem 0; 
  margin-top: 4rem; 
  border-top: 1px solid #e5e7eb; 
}

footer p { 
  color: ${pageData.colors.text}; 
}

/* Responsive Design */
@media (max-width: 768px) { 
  .nav-links { 
    display: none; 
  }
  
  .mobile-menu-button { 
    display: block; 
  }
  
  .hero h2 { 
    font-size: 2.5rem; 
  }
  
  .features-grid { 
    grid-template-columns: 1fr; 
  }
  
  .testimonials-grid { 
    grid-template-columns: 1fr; 
  }
  
  .container { 
    padding: 0 15px; 
  }
}

@media (max-width: 480px) { 
  .hero { 
    padding: 3rem 0; 
  }
  
  .hero h2 { 
    font-size: 2rem; 
  }
  
  section { 
    padding: 3rem 0; 
  }
  
  section h2 { 
    font-size: 2rem; 
  }
}`;
};

export const generateJS = (pageData: PageData) => {
  return `/* JavaScript for ${pageData.title} */

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking on menu links
  document.querySelectorAll('.mobile-menu-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Smooth scrolling for navigation links
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

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // Show success message (in a real application, you would send the data to your server)
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      this.reset();
    });
  }

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      nav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Add transition to nav
  nav.style.transition = 'transform 0.3s ease-in-out';
});`;
};

export const generateHTML = (pageData: PageData) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageData.title}</title>
    <meta name="description" content="${pageData.subtitle}">
    <link href="https://fonts.googleapis.com/css2?family=${pageData.fonts.heading.replace(' ', '+')}:wght@400;600;700&family=${pageData.fonts.body.replace(' ', '+')}:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="nav-container">
            <h1>${pageData.title}</h1>
            <ul class="nav-links">
                ${pageData.sections.map(section => `<li><a href="#section-${section.id}">${section.title}</a></li>`).join('')}
            </ul>
            <button class="mobile-menu-button" aria-label="Toggle mobile menu">
                ☰
            </button>
        </div>
    </nav>

    <!-- Mobile Menu Backdrop -->
    <div class="mobile-menu-backdrop"></div>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu">
        <div class="mobile-menu-header">
            <h3>Menu</h3>
            <button class="mobile-menu-close" aria-label="Close mobile menu">×</button>
        </div>
        <div class="mobile-menu-links">
            ${pageData.sections.map(section => `<a href="#section-${section.id}">${section.title}</a>`).join('')}
        </div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h2>${pageData.heroTitle}</h2>
            <p>${pageData.heroDescription}</p>
            <a href="${pageData.heroButtonUrl}" class="cta-button">${pageData.heroButtonText}</a>
        </div>
    </section>

    <!-- Dynamic Sections -->
    ${pageData.sections.map(section => `
        <section id="section-${section.id}">
            <div class="container">
                <h2>${section.title}</h2>
                ${section.type === 'features' ? `
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">1</div>
                            <h3>Feature 1</h3>
                            <p>${section.content}</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">2</div>
                            <h3>Feature 2</h3>
                            <p>${section.content}</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">3</div>
                            <h3>Feature 3</h3>
                            <p>${section.content}</p>
                        </div>
                    </div>
                ` : section.type === 'testimonials' ? `
                    <div class="testimonials-grid">
                        <div class="testimonial-card">
                            <blockquote>"${section.content}"</blockquote>
                            <div class="testimonial-author">
                                <div class="testimonial-avatar">A</div>
                                <div class="testimonial-info">
                                    <h4>Alice Johnson</h4>
                                    <p>Happy Customer</p>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-card">
                            <blockquote>"${section.content}"</blockquote>
                            <div class="testimonial-author">
                                <div class="testimonial-avatar">B</div>
                                <div class="testimonial-info">
                                    <h4>Bob Smith</h4>
                                    <p>Satisfied Client</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : section.type === 'contact' ? `
                    <form class="contact-form">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn">Send Message</button>
                    </form>
                ` : `<p>${section.content}</p>`}
            </div>
        </section>
    `).join('')}

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${pageData.title}. ${pageData.subtitle}</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
}; 