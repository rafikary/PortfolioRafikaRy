// GitHub Pages compatible contact form using FormSubmit.co
// This replaces PHP functionality for static hosting

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Update form action untuk FormSubmit.co
        contactForm.action = 'https://formsubmit.co/rafikary12@gmail.com';
        contactForm.method = 'POST';
        
        // Add hidden fields for FormSubmit configuration
        const hiddenFields = `
            <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_next" value="${window.location.origin}/thank-you.html">
        `;
        
        contactForm.insertAdjacentHTML('afterbegin', hiddenFields);
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            // Reset button after 3 seconds if form doesn't redirect
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
});
