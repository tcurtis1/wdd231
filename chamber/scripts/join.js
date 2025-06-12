
document.getElementById('timestamp').value = new Date().toISOString();


const orgTitleInput = document.querySelector('input[name="org-title"]');
const orgTitleError = document.getElementById('org-title-error');
const orgTitlePattern = /^[A-Za-z\s-]{7,}$/; 


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


orgTitleInput.addEventListener('input', validateOrgTitle);


const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    if (!validateOrgTitle()) {
        e.preventDefault(); 
        orgTitleInput.focus();
    }
});


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


document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
        }
    });
});