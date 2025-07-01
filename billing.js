// Billing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const donationCards = document.querySelectorAll('.donation-card');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const paymentSection = document.getElementById('paymentSection');
    const customAmountSection = document.getElementById('customAmountSection');
    const customAmountInput = document.getElementById('customAmount');
    const donationSummary = document.getElementById('donationSummary');
    const methodTabs = document.querySelectorAll('.method-tab');
    const paymentForms = document.querySelectorAll('.payment-form');
    const donateBtn = document.getElementById('donateBtn');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const mpesaPhoneInput = document.getElementById('mpesaPhone');

    let currentDonationType = '';
    let currentAmount = 0;
    let isRecurring = false;

    // Debug: Check if elements are found
    console.log('Payment section found:', !!paymentSection);
    console.log('Donation cards found:', donationCards.length);
    console.log('Amount buttons found:', amountButtons.length);

    // Handle donation card selection
    donationCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            donationCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Get donation type
            currentDonationType = this.getAttribute('data-type');
            isRecurring = currentDonationType === 'monthly' || currentDonationType === 'sponsor';
            
            // Reset amount buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Reset custom amount section
            customAmountSection.classList.remove('show');
            customAmountInput.value = '';
            customAmountInput.style.borderColor = '';
            const errorMsg = customAmountInput.parentNode.querySelector('.amount-error');
            if (errorMsg) {
                errorMsg.remove();
            }
            
            // Reset current amount
            currentAmount = 0;
            
            // Update summary
            updateDonationSummary();
        });
    });

    // Handle amount button selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.donation-card');
            if (!card.classList.contains('active')) {
                // If no card is selected, select this card first
                donationCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                currentDonationType = card.getAttribute('data-type');
                isRecurring = currentDonationType === 'monthly' || currentDonationType === 'sponsor';
            }

            // Remove active class from sibling buttons
            const siblingButtons = card.querySelectorAll('.amount-btn');
            siblingButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const amount = this.getAttribute('data-amount');
            
            if (amount === 'custom') {
                customAmountSection.classList.add('show');
                currentAmount = parseFloat(customAmountInput.value) || 0;
                customAmountInput.focus();
                
                // Update summary and potentially show payment section
                updateDonationSummary();
            } else {
                customAmountSection.classList.remove('show');
                currentAmount = parseFloat(amount);
                updateDonationSummary();
            }
        });
    });

    // Handle custom amount input
    customAmountInput.addEventListener('input', function() {
        currentAmount = parseFloat(this.value) || 0;
        console.log('Custom amount entered:', currentAmount); // Debug
        updateDonationSummary();
    });

    // Handle custom amount input blur (when user clicks away)
    customAmountInput.addEventListener('blur', function() {
        if (currentAmount < 5 && this.value) {
            this.style.borderColor = '#ef4444';
            // Show minimum amount message
            let errorMsg = this.parentNode.querySelector('.amount-error');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'amount-error';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.fontSize = '12px';
                errorMsg.style.marginTop = '5px';
                this.parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Minimum amount is $5.00';
        } else {
            this.style.borderColor = '';
            const errorMsg = this.parentNode.querySelector('.amount-error');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    });

    // Handle custom amount input focus
    customAmountInput.addEventListener('focus', function() {
        this.style.borderColor = '#ec4899';
        const errorMsg = this.parentNode.querySelector('.amount-error');
        if (errorMsg) {
            errorMsg.remove();
        }
    });

    // Handle payment method tabs
    methodTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            methodTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all payment forms
            paymentForms.forEach(form => form.classList.remove('active'));
            
            // Show corresponding payment form
            const method = this.getAttribute('data-method');
            document.getElementById(method + 'Form').classList.add('active');
            
            // Update donate button text
            updateDonateButtonText(method);
        });
    });

    // Card number formatting
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            this.value = formattedValue;
        });
    }

    // Expiry date formatting
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }

    // CVV input restriction
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // M-Pesa phone number formatting
    if (mpesaPhoneInput) {
        mpesaPhoneInput.addEventListener('input', function() {
            let value = this.value.replace(/[^0-9+]/g, '');
            if (value.startsWith('254')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+254' + value.substring(1);
            } else if (value.startsWith('7') && value.length === 9) {
                value = '+254' + value;
            }
            this.value = value;
        });
    }

    // Handle form submission
    if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processing...</span>';
            this.disabled = true;
            
            // Simulate payment processing
            setTimeout(() => {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                resetForm();
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        });
    }

    function updateDonationSummary() {
        console.log('Updating summary - Type:', currentDonationType, 'Amount:', currentAmount); // Debug
        
        if (!currentDonationType) {
            paymentSection.classList.remove('show');
            return;
        }

        const typeText = getDonationTypeText(currentDonationType);
        const amountText = currentAmount > 0 ? 
            (isRecurring ? `$${currentAmount}/month` : `$${currentAmount}`) : 
            'Amount not selected';
        
        const donationTypeElement = document.querySelector('.donation-type');
        const donationAmountElement = document.querySelector('.donation-amount');
        
        if (donationTypeElement) donationTypeElement.textContent = typeText;
        if (donationAmountElement) donationAmountElement.textContent = amountText;
        
        // Show payment section if we have both type and valid amount
        if (currentAmount > 0) {
            console.log('Showing payment section'); // Debug
            showPaymentSection();
        }
    }

    function getDonationTypeText(type) {
        switch(type) {
            case 'one-time': return 'One-Time Donation:';
            case 'monthly': return 'Monthly Donation:';
            case 'sponsor': return 'Sponsor a Mom:';
            default: return 'Donation:';
        }
    }

    function showPaymentSection() {
        if (currentAmount > 0 && currentDonationType) {
            paymentSection.classList.add('show');
            // Small delay to ensure the section is visible before scrolling
            setTimeout(() => {
                paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            paymentSection.classList.remove('show');
        }
    }

    function updateDonateButtonText(method) {
        const baseText = isRecurring ? 'Start Monthly Donation' : 'Complete Donation';
        let methodText = '';
        
        switch(method) {
            case 'paypal':
                methodText = ' with PayPal';
                break;
            case 'mpesa':
                methodText = ' with M-Pesa';
                break;
            default:
                methodText = '';
        }
        
        donateBtn.querySelector('span').textContent = baseText + methodText;
    }

    function validateForm() {
        const activeMethod = document.querySelector('.method-tab.active').getAttribute('data-method');
        
        if (currentAmount < 5) {
            // Scroll to and highlight the custom amount input if it's visible
            if (customAmountSection.classList.contains('show')) {
                customAmountInput.focus();
                customAmountInput.style.borderColor = '#ef4444';
                customAmountSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            alert('Minimum donation amount is $5.00');
            return false;
        }
        
        // Basic validation based on payment method
        switch(activeMethod) {
            case 'card':
                return validateCardForm();
            case 'paypal':
                return validatePayPalForm();
            case 'mpesa':
                return validateMPesaForm();
        }
        
        return true;
    }

    function validateCardForm() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!firstName || !lastName || !email || !cardNumber || !expiryDate || !cvv) {
            alert('Please fill in all required fields');
            return false;
        }
        
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            alert('Please enter a valid card number');
            return false;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert('Please enter a valid expiry date (MM/YY)');
            return false;
        }
        
        if (cvv.length < 3 || cvv.length > 4) {
            alert('Please enter a valid CVV');
            return false;
        }
        
        return true;
    }

    function validatePayPalForm() {
        const email = document.getElementById('paypalEmail').value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    function validateMPesaForm() {
        const phone = document.getElementById('mpesaPhone').value.trim();
        const email = document.getElementById('mpesaEmail').value.trim();
        
        if (!phone || !email) {
            alert('Please fill in all required fields');
            return false;
        }
        
        if (!/^\+254[17]\d{8}$/.test(phone)) {
            alert('Please enter a valid M-Pesa phone number');
            return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    function showSuccessMessage() {
        const successHtml = `
            <div class="success-message">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Thank You for Your Donation!</h3>
                <p>Your generous contribution of $${currentAmount}${isRecurring ? '/month' : ''} will make a real difference in the lives of millennial mothers.</p>
                <p>You will receive a receipt via email shortly.</p>
                <button onclick="location.reload()" class="return-btn">Make Another Donation</button>
            </div>
        `;
        
        document.querySelector('.payment-container').innerHTML = successHtml;
    }

    function resetForm() {
        // Reset all form values and states
        currentDonationType = '';
        currentAmount = 0;
        isRecurring = false;
        
        donationCards.forEach(card => card.classList.remove('active'));
        amountButtons.forEach(btn => btn.classList.remove('active'));
        paymentSection.classList.remove('show');
        customAmountSection.classList.remove('show');
    }
});

// Additional styles for success message
const additionalStyles = `
<style>
.success-message {
    text-align: center;
    padding: 40px 20px;
}

.success-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: white;
    font-size: 40px;
}

.success-message h3 {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 15px;
}

.success-message p {
    color: #6b7280;
    margin-bottom: 15px;
    line-height: 1.6;
}

.return-btn {
    margin-top: 20px;
    padding: 12px 30px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.return-btn:hover {
    background: linear-gradient(135deg, #16a34a, #15803d);
    transform: translateY(-2px);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
