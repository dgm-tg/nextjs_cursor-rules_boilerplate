# Form Email Setup Guide

## Overview
The form builder feature allows you to create custom forms that send emails when submitted. This uses EmailJS, a free service for sending emails from client-side applications.

## 🆕 Autosave Functionality

**NEW:** All forms AND the page builder interface now include automatic autosave functionality powered by FormPersistence.js! 

### What it does:
- **Auto-saves form data** as users type (no data loss!)
- **Auto-saves page builder progress** - sections, colors, fonts, form fields, everything!
- **Restores data** if the page is accidentally refreshed or closed
- **Works in both preview and exported HTML** files
- **Smart restore notifications** - shows when previous work is detected
- **Clears saved data** after successful form submission
- **Uses localStorage** for exported HTML (persistent across sessions)
- **Uses sessionStorage** for preview (temporary during session)
- **Uses localStorage** for page builder (persistent across sessions)

### Builder Autosave Features:
- ✅ **Hero Section settings** - title, description, button text
- ✅ **Page settings** - title, subtitle  
- ✅ **Colors & fonts** - all theme customizations
- ✅ **All sections** - content, types, form fields
- ✅ **Form configurations** - fields, validation, email settings
- ✅ **Real-time save status** - see "Saving..." and "Saved" indicators
- ✅ **Restore notification** - prompted when returning with saved work
- ✅ **Manual clear option** - "Clear autosave & restart" button

### No setup required:
- Autosave works automatically on all forms AND the builder
- Data is saved locally in the user's browser (secure)
- No server or database needed
- CDN-based integration (no npm dependencies)

## EmailJS Setup (Optional)

1. **Sign up for EmailJS**: Go to [https://www.emailjs.com/](https://www.emailjs.com/) and create a free account.

2. **Create an Email Service**: 
   - Add a new service (Gmail, Outlook, etc.)
   - Note down the Service ID

3. **Create an Email Template**:
   - Create a new template with the following template variables:
     - `{{to_email}}` - Recipient email
     - `{{from_name}}` - Sender name (page title)
     - `{{subject}}` - Email subject
     - `{{message}}` - Form data content
     - `{{reply_to}}` - Reply-to email
   - Note down the Template ID

4. **Get Your Keys**:
   - Go to Account → API Keys
   - Note down your Public Key and Private Key

5. **Environment Variables**:
   Create a `.env.local` file in your project root with:
   ```
   EMAILJS_SERVICE_ID=your_service_id_here
   EMAILJS_TEMPLATE_ID=your_template_id_here
   EMAILJS_PUBLIC_KEY=your_public_key_here
   EMAILJS_PRIVATE_KEY=your_private_key_here
   ```

## Without EmailJS Configuration

If you don't configure EmailJS, the forms will still work but emails will be **simulated**. You'll see the form data in the server console, which is useful for testing and development.

## Form Builder Features

- **Multiple Field Types**: Text, Email, Phone, Textarea, Select, Radio, Checkbox, File Upload
- **Field Validation**: Mark fields as required
- **Custom Options**: Add custom options for select, radio, and checkbox fields
- **Responsive Design**: Forms automatically adapt to your page's color scheme
- **Success Messages**: Customize the message shown after successful submission
- **🆕 Autosave**: Automatic form data persistence - no more lost data!

## How to Use

1. In the Page Builder, add a new section
2. Change the section type to "Form"
3. Configure the recipient email address
4. Add form fields using the "Add Field" button
5. Customize each field type, label, placeholder, and validation
6. Preview your form in the Preview tab
7. Test form submissions (check console if EmailJS not configured)

## Security Note

The form submissions are processed server-side through the Next.js API route, ensuring better security and preventing spam. 