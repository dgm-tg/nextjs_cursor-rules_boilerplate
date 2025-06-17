import { PageData, FormSection, FormField } from '../src/app/page';

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
  transition: transform 0.3s ease-in-out;
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
  padding: 0.5rem;
}

/* Mobile Menu */
.mobile-menu { 
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

.mobile-menu-header h3 {
  font-family: '${pageData.fonts.heading}', sans-serif;
  color: ${pageData.colors.text};
  margin: 0;
}

.mobile-menu-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${pageData.colors.text};
  padding: 0.25rem;
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
  transition: background-color 0.3s;
}

.mobile-menu-links a:hover {
  background-color: rgba(0,0,0,0.05);
  padding-left: 0.5rem;
}

.mobile-menu-backdrop { 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  background-color: rgba(0,0,0,0.5); 
  z-index: 999; 
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu-backdrop.active { 
  opacity: 1;
  visibility: visible;
}

/* Hero Section */
.hero { 
  text-align: center; 
  padding: 5rem 0; 
  position: relative;
  background-size: ${pageData.heroBackgroundSize || 'cover'};
  background-position: ${pageData.heroBackgroundPosition || 'center'};
  background-attachment: ${pageData.heroBackgroundAttachment || 'scroll'};
  background-repeat: no-repeat;
}

.hero.has-background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
}

.hero .hero-content {
  position: relative;
  z-index: 2;
}

.hero h2 { 
  font-family: '${pageData.fonts.heading}', sans-serif; 
  font-size: 3.5rem; 
  font-weight: 700; 
  margin-bottom: 1.5rem; 
  color: ${pageData.colors.text}; 
}

.hero.has-background h2 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.hero p { 
  font-size: 1.25rem; 
  margin-bottom: 2rem; 
  max-width: 600px; 
  margin-left: auto; 
  margin-right: auto; 
  color: ${pageData.colors.text}; 
}

.hero.has-background p {
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
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



/* Custom Forms */
.custom-form { 
  max-width: 500px; 
  margin: 0 auto; 
}

.custom-form .form-description {
  text-align: center;
  margin-bottom: 2rem;
  color: ${pageData.colors.text};
  line-height: 1.6;
}

.custom-form .form-field { 
  margin-bottom: 1.5rem; 
}

.custom-form .form-field label { 
  display: block; 
  margin-bottom: 0.5rem; 
  font-weight: 500; 
  color: ${pageData.colors.text}; 
}

.custom-form .form-field .required { 
  color: #ef4444; 
  margin-left: 0.25rem; 
}

.custom-form .form-field input, 
.custom-form .form-field textarea, 
.custom-form .form-field select { 
  width: 100%; 
  padding: 0.75rem; 
  border: 1px solid #d1d5db; 
  border-radius: 0.375rem; 
  font-size: 1rem; 
  font-family: inherit; 
  background-color: white;
}

.custom-form .form-field input:focus, 
.custom-form .form-field textarea:focus, 
.custom-form .form-field select:focus { 
  outline: none; 
  border-color: ${pageData.colors.primary}; 
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); 
}

.custom-form .radio-group, 
.custom-form .checkbox-group { 
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem; 
}

.custom-form .radio-option, 
.custom-form .checkbox-option { 
  display: flex; 
  align-items: center; 
  gap: 0.5rem; 
}

.custom-form .radio-option input, 
.custom-form .checkbox-option input { 
  width: auto; 
  margin: 0; 
}

.custom-form .radio-option label, 
.custom-form .checkbox-option label { 
  margin: 0; 
  font-weight: normal; 
  cursor: pointer; 
  flex: 1;
}

.custom-form .submit-button { 
  width: 100%; 
  background-color: ${pageData.colors.primary}; 
  color: white; 
  padding: 0.75rem 2rem; 
  border: none; 
  border-radius: 0.375rem; 
  font-size: 1rem; 
  font-weight: 600; 
  cursor: pointer; 
  transition: opacity 0.3s; 
  margin-top: 1rem;
}

.custom-form .submit-button:hover { 
  opacity: 0.9; 
}

.custom-form .submit-button:disabled { 
  opacity: 0.6; 
  cursor: not-allowed; 
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
    if (mobileMenu && mobileMenuBackdrop) {
      mobileMenu.classList.add('active');
      mobileMenuBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileMenu && mobileMenuBackdrop) {
      mobileMenu.classList.remove('active');
      mobileMenuBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
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

  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
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
      
      // Disable submit button
      const submitButton = this.querySelector('.btn');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Send email via EmailJS or show success message
      if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
        const templateParams = {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Website Owner',
          reply_to: email
        };
        
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
          .then(function(response) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
          })
          .catch(function(error) {
            console.error('EmailJS Error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
          })
          .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          });
      } else {
        // Fallback when EmailJS is not configured
        setTimeout(() => {
          alert('Thank you for your message! We will get back to you soon.\\n\\nNote: To enable actual email sending, please configure EmailJS in the HTML file.');
          this.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1000);
      }
    });
  }

  // Custom form submission
  const customForms = document.querySelectorAll('.custom-form');
  customForms.forEach(form => {
    // Initialize FormPersistence for autosave
    if (typeof FormPersistence !== 'undefined' && form.id) {
      FormPersistence.persist(form, {
        uuid: form.id,
        saveOnSubmit: true, // Clear on successful submit
        useSessionStorage: false // Use localStorage for persistence
      });
    }
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitButton = this.querySelector('.submit-button');
      const successMessage = this.dataset.successMessage || 'Thank you! Your form has been submitted successfully.';
      const originalButtonText = this.dataset.submitText || 'Submit';
      
      // Disable submit button
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
      }
      
      // Prepare form data for EmailJS
      const templateParams = {
        form_name: this.id || 'Custom Form',
        to_name: 'Website Owner'
      };
      
      // Add all form fields to template params
      for (let [key, value] of formData.entries()) {
        templateParams[key] = value;
      }
      
      // Add reply_to field if email exists
      if (formData.get('email')) {
        templateParams.reply_to = formData.get('email');
      }
      
      // Send email via EmailJS or show success message
      if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
          .then((response) => {
            alert(successMessage);
            this.reset();
            
            // Clear FormPersistence data on successful submit
            if (typeof FormPersistence !== 'undefined' && this.id) {
              FormPersistence.clearStorage(this, { uuid: this.id });
            }
          })
          .catch((error) => {
            console.error('EmailJS Error:', error);
            alert('Sorry, there was an error submitting your form. Please try again later.');
          })
          .finally(() => {
            // Re-enable submit button
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = originalButtonText;
            }
          });
      } else {
        // Fallback when EmailJS is not configured
        setTimeout(() => {
          alert(successMessage + '\\n\\nNote: To enable actual email sending, please configure EmailJS in the HTML file.');
          this.reset();
          
          // Clear FormPersistence data on successful submit
          if (typeof FormPersistence !== 'undefined' && this.id) {
            FormPersistence.clearStorage(this, { uuid: this.id });
          }
          
          // Re-enable submit button
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          }
        }, 1000);
      }
    });
  });

  // Enhanced scroll effect for navigation (works with sticky positioning)
  let lastScrollTop = 0;
  let scrollTimer = null;
  const nav = document.querySelector('nav');
  
  if (nav) {
    window.addEventListener('scroll', function() {
      // Clear previous timer
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      // Only apply scroll effect on larger screens where sticky nav is more effective
      if (window.innerWidth > 768) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down - hide nav after a short delay
          scrollTimer = setTimeout(() => {
            nav.style.transform = 'translateY(-100%)';
          }, 150);
        } else {
          // Scrolling up - show nav immediately
          nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
      } else {
        // On mobile, always keep nav visible
        nav.style.transform = 'translateY(0)';
      }
    });
  }
});`;
};

export const generateHTML = (pageData: PageData) => {
  
  // Helper function to generate form field HTML
  const generateFormField = (field: FormField) => {
    const requiredAttr = field.required ? 'required' : '';
    const requiredLabel = field.required ? '<span class="required">*</span>' : '';
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return `
          <div class="form-field">
            <label for="${field.id}">${field.label}${requiredLabel}</label>
            <input type="${field.type}" id="${field.id}" name="${field.id}" placeholder="${field.placeholder || ''}" ${requiredAttr}>
          </div>`;
      
      case 'textarea':
        return `
          <div class="form-field">
            <label for="${field.id}">${field.label}${requiredLabel}</label>
            <textarea id="${field.id}" name="${field.id}" placeholder="${field.placeholder || ''}" rows="4" ${requiredAttr}></textarea>
          </div>`;
      
      case 'select':
        return `
          <div class="form-field">
            <label for="${field.id}">${field.label}${requiredLabel}</label>
            <select id="${field.id}" name="${field.id}" ${requiredAttr}>
              <option value="">Select an option</option>
              ${(field.options || []).map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
          </div>`;
      
      case 'radio':
        return `
          <div class="form-field">
            <label>${field.label}${requiredLabel}</label>
            <div class="radio-group">
              ${(field.options || []).map((option, index) => `
                <div class="radio-option">
                  <input type="radio" id="${field.id}_${index}" name="${field.id}" value="${option}" ${requiredAttr}>
                  <label for="${field.id}_${index}">${option}</label>
                </div>
              `).join('')}
            </div>
          </div>`;
      
      case 'checkbox':
        return `
          <div class="form-field">
            <label>${field.label}${requiredLabel}</label>
            <div class="checkbox-group">
              ${(field.options || []).map((option, index) => `
                <div class="checkbox-option">
                  <input type="checkbox" id="${field.id}_${index}" name="${field.id}" value="${option}">
                  <label for="${field.id}_${index}">${option}</label>
                </div>
              `).join('')}
            </div>
          </div>`;
      
      case 'file':
        return `
          <div class="form-field">
            <label for="${field.id}">${field.label}${requiredLabel}</label>
            <input type="file" id="${field.id}" name="${field.id}" ${requiredAttr}>
          </div>`;
      
      default:
        return '';
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageData.title}</title>
    <meta name="description" content="${pageData.subtitle}">
    <link href="https://fonts.googleapis.com/css2?family=${pageData.fonts.heading.replace(' ', '+')}:wght@400;600;700&family=${pageData.fonts.body.replace(' ', '+')}:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/gh/FThompson/FormPersistence.js@2.0.6/form-persistence.min.js"></script>
    <!-- EmailJS SDK -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <script type="text/javascript">
        // EmailJS Configuration - Replace with your own EmailJS credentials
        // Sign up at https://www.emailjs.com/ to get your credentials
        const EMAILJS_CONFIG = {
            publicKey: 'YOUR_PUBLIC_KEY_HERE',
            serviceId: 'YOUR_SERVICE_ID_HERE',
            templateId: 'YOUR_TEMPLATE_ID_HERE'
        };
        
        // Initialize EmailJS
        if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        }
    </script>
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
    <section class="hero${pageData.heroBackgroundImage ? ' has-background' : ''}"${pageData.heroBackgroundImage ? ` style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${pageData.heroBackgroundImage}); background-position: ${pageData.heroBackgroundPosition || 'center'}; background-attachment: ${pageData.heroBackgroundAttachment || 'scroll'}; background-size: ${pageData.heroBackgroundSize || 'cover'};"` : ''}>
        <div class="container">
            <div class="hero-content">
                <h2>${pageData.heroTitle}</h2>
                <p>${pageData.heroDescription}</p>
                <a href="${pageData.heroButtonUrl}" class="cta-button">${pageData.heroButtonText}</a>
            </div>
        </div>
    </section>

    <!-- Dynamic Sections -->
    ${pageData.sections.map(section => `
        <section id="section-${section.id}">
            <div class="container">
                <h2>${section.title}</h2>
                ${section.type === 'form' ? `
                    <form class="custom-form" id="form-${section.id}" data-success-message="${(section as FormSection).successMessage}" data-submit-text="${(section as FormSection).submitButtonText}">
                        ${(section as FormSection).content ? `<div class="form-description">${(section as FormSection).content}</div>` : ''}
                        ${(section as FormSection).formFields.map(field => generateFormField(field)).join('')}
                        <button type="submit" class="submit-button">${(section as FormSection).submitButtonText}</button>
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

export const generateReadme = (pageData: PageData) => {
  return `# ${pageData.title} - Landing Page

## Quick Start

1. Open \`index.html\` in your browser to view your landing page
2. All styles are in \`styles.css\`
3. All JavaScript functionality is in \`script.js\`

## Email Configuration (Important!)

Your landing page includes contact forms that can send emails using EmailJS. To enable email functionality:

### Step 1: Sign Up for EmailJS
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account (100 emails/month free)

### Step 2: Set Up Your Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your email provider
5. Copy your **Service ID**

### Step 3: Create an Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

\`\`\`
Subject: New Contact from {{from_name}}

Hello {{to_name}},

You have received a new message from your website:

From: {{from_name}}
Email: {{from_email}}
Message: {{message}}

Best regards,
Your Website
\`\`\`

4. Save the template and copy your **Template ID**

### Step 4: Get Your Public Key
1. Go to **Integration** in your dashboard
2. Copy your **Public Key**

### Step 5: Configure Your Website
1. Open \`index.html\` in a text editor
2. Find the EmailJS configuration section (around line 15)
3. Replace the placeholder values:

\`\`\`javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',    // Replace with your public key
    serviceId: 'YOUR_SERVICE_ID_HERE',    // Replace with your service ID
    templateId: 'YOUR_TEMPLATE_ID_HERE'   // Replace with your template ID
};
\`\`\`

### Step 6: Test Your Forms
1. Save the \`index.html\` file
2. Open it in your browser
3. Fill out and submit a contact form
4. Check your email for the message

## Without EmailJS Configuration

If you don't configure EmailJS:
- Forms will still work and show success messages
- No actual emails will be sent
- You'll see a note about configuring EmailJS

## Customization

### Colors
Edit the CSS variables in \`styles.css\` to change your brand colors.

### Content
Edit \`index.html\` to modify text, images, and layout.

### Styling
Modify \`styles.css\` to change fonts, spacing, and visual design.

### Behavior
Update \`script.js\` to add custom JavaScript functionality.

## Deployment

You can deploy your landing page to any web hosting service:

### Free Options:
- **Netlify**: Drag and drop your files
- **Vercel**: Upload your project folder
- **GitHub Pages**: Push to a GitHub repository

### Paid Options:
- **Bluehost**: Upload via FTP
- **SiteGround**: Use File Manager
- **HostGator**: Upload to public_html

## Support

For EmailJS support, visit: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)

For general web development questions, consult MDN Web Docs: [https://developer.mozilla.org/](https://developer.mozilla.org/)

---

Generated by Landing Page Builder
`;
}; 