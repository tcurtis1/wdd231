document.addEventListener('DOMContentLoaded', () => {
    

    const visitForm = document.getElementById('visitForm');
    const logEntriesContainer = document.getElementById('logEntries');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');

    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalDetails = document.getElementById('modalDetails');
    const closeButton = document.querySelector('.modal .close-button');
    const modalConfirmButton = document.querySelector('.modal .modal-confirm-button');

    


    const LOCAL_STORAGE_KEY = 'tornadoVisitLogs';
    const JSON_DATA_PATH = 'data/visit.json'; 

    
    function showModal(title, message, details = {}) {
        if (!modal || !modalTitle || !modalMessage) {
            console.error('showModal: Cannot display modal, required elements are missing.');
            
            
            return;
        }
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        if (Object.keys(details).length > 0) {
            modalDetails.textContent = JSON.stringify(details, null, 2); 
            modalDetails.style.display = 'block';
        } else {
            modalDetails.textContent = '';
            modalDetails.style.display = 'none';
        }
        modal.classList.add('show-modal');
        
    }

    
    function hideModal() {
        if (!modal) {
            console.error('hideModal: Modal element not found.');
            return;
        }
        modal.classList.remove('show-modal');
        
        if (modalTitle) modalTitle.textContent = '';
        if (modalMessage) modalMessage.textContent = '';
        if (modalDetails) modalDetails.textContent = '';
        
    }

    
    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
        
    }
    if (modalConfirmButton) {
        modalConfirmButton.addEventListener('click', hideModal);
        
    }
    
    if (modal) { 
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                hideModal();
            }
        });
        
    }


    
    function renderLogEntry(log) {
        
        const logCardHTML = `
            <h4>${log.name}</h4>
            <p><strong>Date:</strong> ${log.date}</p>
            <p><strong>Location:</strong> ${log.location}</p>
            <p><strong>Comments:</strong> ${log.comments}</p>
        `;
        const logCard = document.createElement('div');
        logCard.classList.add('log-entry-card');
        logCard.innerHTML = logCardHTML;
        return logCard;
    }

    
    async function fetchVisitLogs() {
        if (loadingMessage) loadingMessage.style.display = 'block'; 
        if (errorMessage) errorMessage.style.display = 'none';   
        

        try {
            
            const storedLogs = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedLogs) {
                
                
                const parsedLogs = JSON.parse(storedLogs).filter(log => log.name && log.date && log.location && log.comments);
                if (parsedLogs.length > 0) {
                    
                    if (loadingMessage) loadingMessage.style.display = 'none';
                    return parsedLogs;
                }
            }

            console.log(`visit.js: No logs in Local Storage or empty. Fetching from ${JSON_DATA_PATH}...`);
            
            const response = await fetch(JSON_DATA_PATH);
            if (!response.ok) {
                const errorText = await response.text(); 
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || errorText}`);
            }
            const data = await response.json();

            
            if (!Array.isArray(data)) {
                throw new Error('Fetched data is not an array.');
            }
            const filteredData = data.filter(log => log.name && log.date && log.location && log.comments);
            

            if (loadingMessage) loadingMessage.style.display = 'none';
            return filteredData;

        } catch (error) {
            console.error('visit.js: Error fetching visit logs:', error);
            if (errorMessage) {
                errorMessage.textContent = `Failed to load visit logs: ${error.message}. Please check console.`;
                errorMessage.style.display = 'block';
            }
            if (loadingMessage) loadingMessage.style.display = 'none';
            showModal('Error', 'There was an issue loading the visit logs.', { error: error.message, source: 'fetch' });
            return []; 
        }
    }

    
    function displayVisitLogs(logs) {
        if (!logEntriesContainer) {
            
            return;
        }
        logEntriesContainer.innerHTML = ''; 
        if (logs.length === 0) {
            logEntriesContainer.innerHTML = '<p class="loading-message">No visit logs to display yet.</p>';
            
            return;
        }

        
        logs.forEach(log => {
            logEntriesContainer.appendChild(renderLogEntry(log));
        });
       
    }

    
    function saveLogsToLocalStorage(logs) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(logs));
            
        } catch (error) {
            console.error('visit.js: Error saving to local storage:', error);
            showModal('Storage Error', 'Could not save your log. Local storage might be full or unavailable.', { error: error.message });
        }
    }

    
    async function handleFormSubmit(event) {
        event.preventDefault(); 
        

        const formData = new FormData(visitForm);
        const newLog = {
            id: Date.now().toString(), 
            name: formData.get('name'),
            email: formData.get('email'),
            date: formData.get('date'),
            location: formData.get('location'),
            comments: formData.get('comments')
        };

        
        if (!newLog.name || !newLog.email || !newLog.date || !newLog.location || !newLog.comments) {
            showModal('Validation Error', 'Please fill in all required fields.');
            console.warn('visit.js: Form validation failed. Missing fields.');
            return;
        }

        try {
           
            const currentLogs = await fetchVisitLogs(); 
            const updatedLogs = [newLog, ...currentLogs]; 

            saveLogsToLocalStorage(updatedLogs);
            displayVisitLogs(updatedLogs); 

            showModal('Success!', 'Your visit log has been submitted.', newLog);
            visitForm.reset(); 
            
        } catch (error) {
            console.error('visit.js: Error submitting form:', error);
            showModal('Submission Error', 'There was an issue submitting your log. Please try again.', { error: error.message, source: 'form_submission' });
        }
    }

   
    if (visitForm) {
        visitForm.addEventListener('submit', handleFormSubmit);
        
    }

    
    fetchVisitLogs().then(displayVisitLogs)
        .catch(error => console.error('visit.js: Initial log display failed:', error));
});