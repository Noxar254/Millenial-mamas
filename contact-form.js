// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const enquiryTypeSelect = document.getElementById('enquiryType');
    const volunteerSection = document.getElementById('volunteerSection');
    const partnerSection = document.getElementById('partnerSection');
    const donateSection = document.getElementById('donateSection');
    const fileInput = document.getElementById('cvUpload');

    // Handle file upload
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const statusDiv = document.querySelector('.file-upload-status');
            const uploadText = document.querySelector('.file-upload-text');
            
            if (file) {
                // Check file size (5MB = 5 * 1024 * 1024 bytes)
                const maxSize = 5 * 1024 * 1024;
                if (file.size > maxSize) {
                    statusDiv.textContent = 'File too large. Please select a file under 5MB.';
                    statusDiv.style.color = '#dc2626';
                    uploadText.textContent = 'Choose CV/Resume File';
                    e.target.value = '';
                    return;
                }
                
                // Check file type
                const allowedTypes = ['.pdf', '.doc', '.docx'];
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                if (!allowedTypes.includes(fileExtension)) {
                    statusDiv.textContent = 'Invalid file type. Please select a PDF, DOC, or DOCX file.';
                    statusDiv.style.color = '#dc2626';
                    uploadText.textContent = 'Choose CV/Resume File';
                    e.target.value = '';
                    return;
                }
                
                // File is valid
                statusDiv.textContent = `Selected: ${file.name}`;
                statusDiv.style.color = '#22c55e';
                uploadText.textContent = file.name;
            } else {
                statusDiv.textContent = '';
                uploadText.textContent = 'Choose CV/Resume File';
            }
        });
    }

    // Handle enquiry type change
    enquiryTypeSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        
        // Hide all conditional sections
        hideAllConditionalSections();
        
        // Show relevant section based on selection
        switch(selectedValue) {
            case 'volunteer':
                showSection(volunteerSection);
                break;
            case 'partner':
                showSection(partnerSection);
                break;
            case 'donate':
                showSection(donateSection);
                break;
            default:
                // Hide all sections for other options
                break;
        }
    });

    // Function to hide all conditional sections
    function hideAllConditionalSections() {
        const sections = [volunteerSection, partnerSection, donateSection];
        sections.forEach(section => {
            section.classList.remove('show');
            // Use setTimeout to allow animation to complete before hiding
            setTimeout(() => {
                if (!section.classList.contains('show')) {
                    section.style.display = 'none';
                }
            }, 300);
        });
    }

    // Function to show a specific section
    function showSection(section) {
        section.style.display = 'block';
        // Use setTimeout to ensure display is set before adding show class
        setTimeout(() => {
            section.classList.add('show');
        }, 10);
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to regular object
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Validate required fields
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Show success message
            showMessage('Thank you for your message! We\'ll get back to you within 2-3 business days.', 'success');
            
            // Reset form
            form.reset();
            hideAllConditionalSections();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    });

    // Form validation function
    function validateForm(data) {
        const requiredFields = ['firstName', 'lastName', 'email', 'enquiryType', 'subject', 'message'];
        const missingFields = [];

        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                missingFields.push(field);
            }
        });

        // Check consent checkbox
        if (!data.consent) {
            missingFields.push('consent');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (missingFields.length > 0) {
            showMessage('Please fill in all required fields.', 'error');
            highlightMissingFields(missingFields);
            return false;
        }

        return true;
    }

    // Function to highlight missing fields
    function highlightMissingFields(fields) {
        // Remove existing highlights
        document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
            input.classList.remove('error');
        });

        // Add highlights to missing fields
        fields.forEach(fieldName => {
            const field = document.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.classList.add('error');
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Function to show messages
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Insert message at the top of the form
        const formContainer = document.querySelector('.form-container');
        formContainer.insertBefore(messageDiv, formContainer.firstChild);

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    // Add smooth scrolling for form sections
    document.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            // Remove error styling when user starts typing
            this.classList.remove('error');
        });
    });

    // Phone number formatting (basic)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        this.value = value;
    });

    // Auto-resize textarea
    const textarea = document.getElementById('message');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Add CSS for error states and messages
const style = document.createElement('style');
style.textContent = `
    .form-input.error,
    .form-select.error,
    .form-textarea.error {
        border-color: #ef4444;
        background-color: #fef2f2;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .form-message {
        padding: 15px 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        border-left: 4px solid;
        animation: slideIn 0.3s ease-out;
    }

    .form-message.success {
        background-color: #f0fdf4;
        border-color: #22c55e;
        color: #15803d;
    }

    .form-message.error {
        background-color: #fef2f2;
        border-color: #ef4444;
        color: #dc2626;
    }

    .message-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
