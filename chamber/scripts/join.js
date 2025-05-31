// Set timestamp on page load
document.getElementById('timestamp').value = new Date().toISOString();

// Validate Organizational Title input
const orgTitleInput = document.querySelector('input[name="org-title"]');
const orgTitleError = document.getElementById('org-title-error');
const orgTitlePattern = /^[A-Za-z\s-]{7,}$/; // Matches alpha characters, spaces, hyphens, min 7 chars

// Function to validate Organizational Title
function validateOrgTitle() {
    const value = orgTitleInput.value;
    if (!orgTitlePattern.test(value)) {
        orgTitleError.textContent = 'Please enter a valid title (letters, spaces, hyphens only, minimum 7 characters).';
        orgTitleInput.setCustomValidity('Invalid organizational title.');
        return false;
    } else {
        orgTitleError.textContent = '';
        orgTitleInput.setCustomValidity('');
        return true;
    }
}

// Validate on input change
orgTitleInput.addEventListener('input', validateOrgTitle);

// Validate on form submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    if (!validateOrgTitle()) {
        e.preventDefault(); // Prevent submission if validation fails
        orgTitleInput.focus();
    }
});

// Modal handling (unchanged)
document.querySelectorAll('.card a[data-modal]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('data-modal');
        document.getElementById(modalId).classList.add('show');
    });
});

document.querySelectorAll('.modal-close').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').classList.remove('show');
    });
});

// Keyboard accessibility for modals (unchanged)
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
        }
    });
});