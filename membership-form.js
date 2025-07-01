// Membership Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('membershipForm');
    const steps = document.querySelectorAll('.form-step');
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Current step tracking
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Initialize form
    initializeForm();
    
    function initializeForm() {
        updateProgressBar();
        updateButtons();
        setupEventListeners();
        setupFileUpload();
        setupChildrenDetails();
    }
    
    function setupEventListeners() {
        // Navigation buttons
        nextBtn.addEventListener('click', nextStep);
        prevBtn.addEventListener('click', prevStep);
        submitBtn.addEventListener('click', submitForm);
        
        // Form validation on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Employment status change
        const employmentRadios = document.querySelectorAll('input[name="employmentStatus"]');
        employmentRadios.forEach(radio => {
            radio.addEventListener('change', handleEmploymentChange);
        });
    }
    
    function setupFileUpload() {
        const fileInput = document.getElementById('familyPhotos');
        const uploadArea = document.getElementById('familyPhotosUpload');
        const uploadedFiles = document.getElementById('uploadedFiles');
        
        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFileSelection(files);
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            handleFileSelection(e.target.files);
        });
        
        function handleFileSelection(files) {
            Array.from(files).forEach((file, index) => {
                if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
                    displayUploadedFile(file);
                } else {
                    showError('Please select image files under 5MB');
                }
            });
        }
        
        function displayUploadedFile(file) {
            const fileElement = document.createElement('div');
            fileElement.className = 'uploaded-file';
            fileElement.innerHTML = `
                <i class="fas fa-image"></i>
                <span>${file.name}</span>
                <button type="button" onclick="removeFile(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;
            uploadedFiles.appendChild(fileElement);
        }
    }
    
    function setupChildrenDetails() {
        const childrenCountInput = document.getElementById('childrenCount');
        const childrenDetailsGroup = document.getElementById('childrenDetailsGroup');
        const childrenDetails = document.getElementById('childrenDetails');
        
        childrenCountInput.addEventListener('input', function() {
            const count = parseInt(this.value) || 0;
            generateChildrenFields(count);
            
            // Show/hide the children details group
            if (count > 0) {
                childrenDetailsGroup.style.display = 'block';
            } else {
                childrenDetailsGroup.style.display = 'none';
            }
        });
        
        function generateChildrenFields(count) {
            childrenDetails.innerHTML = '';
            
            for (let i = 1; i <= count; i++) {
                const childDiv = document.createElement('div');
                childDiv.className = 'child-detail';
                childDiv.innerHTML = `
                    <div class="form-group">
                        <label for="childName${i}" class="form-label">Child ${i} Name</label>
                        <input type="text" id="childName${i}" name="childName${i}" class="form-input" required>
                        <div class="input-icon">
                            <i class="fas fa-child"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="childBirthday${i}" class="form-label">Birthday</label>
                        <input type="date" id="childBirthday${i}" name="childBirthday${i}" class="form-input" required>
                        <div class="input-icon">
                            <i class="fas fa-birthday-cake"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="childAge${i}" class="form-label">Age</label>
                        <input type="number" id="childAge${i}" name="childAge${i}" class="form-input" min="0" max="30" required>
                        <div class="input-icon">
                            <i class="fas fa-hashtag"></i>
                        </div>
                    </div>
                `;
                
                if (count > 1) {
                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'remove-child';
                    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
                    removeBtn.onclick = () => removeChild(i);
                    childDiv.appendChild(removeBtn);
                }
                
                childrenDetails.appendChild(childDiv);
                
                // Auto-calculate age when birthday changes
                const birthdayInput = document.getElementById(`childBirthday${i}`);
                const ageInput = document.getElementById(`childAge${i}`);
                
                birthdayInput.addEventListener('change', function() {
                    const birthDate = new Date(this.value);
                    const today = new Date();
                    const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
                    ageInput.value = age >= 0 ? age : '';
                });
            }
        }
        
        window.removeChild = function(childIndex) {
            const currentCount = parseInt(childrenCountInput.value);
            if (currentCount > 1) {
                childrenCountInput.value = currentCount - 1;
                generateChildrenFields(currentCount - 1);
            }
        };
    }
    
    function nextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
                updateProgressBar();
                updateButtons();
                scrollToTop();
            }
        }
    }
    
    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateProgressBar();
            updateButtons();
            scrollToTop();
        }
    }
    
    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index + 1 === step);
        });
        
        progressSteps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index + 1 === step);
        });
    }
    
    function updateProgressBar() {
        const progress = (currentStep / totalSteps) * 100;
        progressFill.style.width = progress + '%';
    }
    
    function updateButtons() {
        // Previous button
        if (currentStep === 1) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }
        
        // Next/Submit buttons
        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }
    
    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        // Special validation for children details
        if (currentStep === 2) {
            const childrenCount = parseInt(document.getElementById('childrenCount').value) || 0;
            if (childrenCount > 0) {
                for (let i = 1; i <= childrenCount; i++) {
                    const nameField = document.getElementById(`childName${i}`);
                    const birthdayField = document.getElementById(`childBirthday${i}`);
                    const ageField = document.getElementById(`childAge${i}`);
                    
                    if (!nameField.value.trim() || !birthdayField.value || !ageField.value) {
                        isValid = false;
                        showFieldError(nameField, 'Please fill in all child details');
                        break;
                    }
                }
            }
        }
        
        // Special validation for consent checkboxes
        if (currentStep === 4) {
            const dataConsent = document.getElementById('dataConsent');
            if (!dataConsent.checked) {
                showFieldError(dataConsent, 'Please provide consent to proceed');
                isValid = false;
            }
        }
        
        if (!isValid) {
            showError('Please fill in all required fields correctly');
        }
        
        return isValid;
    }
    
    function validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        let isValid = true;
        
        // Clear previous errors
        clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
        
        // Specific field validations
        if (value) {
            switch (field.type) {
                case 'email':
                    if (!isValidEmail(value)) {
                        showFieldError(field, 'Please enter a valid email address');
                        isValid = false;
                    }
                    break;
                case 'tel':
                    if (!isValidPhone(value)) {
                        showFieldError(field, 'Please enter a valid phone number');
                        isValid = false;
                    }
                    break;
                case 'number':
                    const min = parseInt(field.getAttribute('min'));
                    const max = parseInt(field.getAttribute('max'));
                    const numValue = parseInt(value);
                    
                    if (min !== null && numValue < min) {
                        showFieldError(field, `Value must be at least ${min}`);
                        isValid = false;
                    }
                    if (max !== null && numValue > max) {
                        showFieldError(field, `Value must be no more than ${max}`);
                        isValid = false;
                    }
                    break;
            }
        }
        
        // Update field appearance
        if (isValid && value) {
            field.parentNode.classList.add('has-success');
            field.parentNode.classList.remove('has-error');
        } else if (!isValid) {
            field.parentNode.classList.add('has-error');
            field.parentNode.classList.remove('has-success');
        }
        
        return isValid;
    }
    
    function clearFieldError(field) {
        field.parentNode.classList.remove('has-error', 'has-success');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        field.parentNode.classList.add('has-error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        field.parentNode.appendChild(errorElement);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    function handleEmploymentChange(event) {
        const otherOption = document.getElementById('other');
        const professionDetails = document.getElementById('professionDetails');
        
        if (event.target.value === 'other') {
            professionDetails.placeholder = 'Please specify your situation...';
        } else {
            professionDetails.placeholder = 'Tell us more about your work, business, studies, or current situation...';
        }
    }
    
    function submitForm(event) {
        event.preventDefault();
        
        if (!validateCurrentStep()) {
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(form);
        
        // Add children data as structured object
        const childrenCount = parseInt(formData.get('childrenCount')) || 0;
        const children = [];
        
        for (let i = 1; i <= childrenCount; i++) {
            children.push({
                name: formData.get(`childName${i}`),
                birthday: formData.get(`childBirthday${i}`),
                age: formData.get(`childAge${i}`)
            });
        }
        
        formData.append('childrenData', JSON.stringify(children));
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successOverlay = document.createElement('div');
        successOverlay.className = 'success-overlay';
        successOverlay.innerHTML = `
            <div class="success-modal">
                <div class="success-content">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Welcome to the Family!</h2>
                    <p>Thank you for joining Millennial Mamas. We're excited to have you as part of our supportive community.</p>
                    <p>You'll receive a confirmation email shortly with next steps and information about upcoming events.</p>
                    <div class="success-actions">
                        <a href="index.html" class="btn btn-primary">Go to Homepage</a>
                        <a href="index.html#upcoming-events" class="btn btn-secondary">View Events</a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(successOverlay);
        
        // Animate in
        setTimeout(() => {
            successOverlay.classList.add('show');
        }, 100);
    }
    
    function showError(message) {
        // Remove existing error
        const existingError = document.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            ${message}
        `;
        
        // Insert error before form navigation
        const formNavigation = document.querySelector('.form-navigation');
        formNavigation.parentNode.insertBefore(errorElement, formNavigation);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
        
        scrollToTop();
    }
    
    function scrollToTop() {
        const formContainer = document.querySelector('.form-container');
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Global function for removing uploaded files
    window.removeFile = function(button) {
        button.parentElement.remove();
    };
});

// Additional CSS for success overlay and error messages
const additionalStyles = `
<style>
.success-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.success-overlay.show {
    opacity: 1;
}

.success-modal {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    text-align: center;
    max-width: 500px;
    margin: 2rem;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.success-overlay.show .success-modal {
    transform: scale(1);
}

.success-icon {
    font-size: 4rem;
    color: var(--success-green);
    margin-bottom: 1.5rem;
}

.success-content h2 {
    color: var(--primary-green);
    margin-bottom: 1rem;
    font-size: 2rem;
}

.success-content p {
    color: var(--dark-gray);
    margin-bottom: 1rem;
    line-height: 1.6;
}

.success-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.form-error {
    background: linear-gradient(45deg, var(--error-red), #f57c00);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
    animation: slideInDown 0.3s ease;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hidden {
    display: none !important;
}

@media (max-width: 768px) {
    .success-modal {
        padding: 2rem;
        margin: 1rem;
    }
    
    .success-actions {
        flex-direction: column;
    }
    
    .success-actions .btn {
        width: 100%;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);
