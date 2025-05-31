// Extract and display query parameters
const newMember = new URLSearchParams(window.location.search);


const timestamp = newMember.get('timestamp');
let formattedTimestamp = 'N/A';
if (timestamp) {
    const date = new Date(timestamp);
    const options = {
        weekday: 'long', // "Saturday"
        month: 'long', // "May"
        day: 'numeric', // "31"
        year: 'numeric', // "2025"
        hour: 'numeric', // "11"
        minute: '2-digit', // "54"
        hour12: true // "am/pm"
    };
    formattedTimestamp = date.toLocaleString('en-US', options);
    // Replace "11:54 AM" with "11:54am"
    formattedTimestamp = formattedTimestamp.replace(/(\d+:\d+)\s(AM|PM)/i, '$1$2').replace('AM', 'am').replace('PM', 'pm');
    // Add "at" between date and time
    formattedTimestamp = formattedTimestamp.replace(/, (\d+)/, ' $1').replace(/(\d{4}) (\d+)/, '$1 at $2');
}

document.getElementById('first-name').textContent = newMember.get('first-name') || 'N/A';
document.getElementById('last-name').textContent = newMember.get('last-name') || 'N/A';
document.getElementById('email').textContent = newMember.get('email') || 'N/A';
document.getElementById('phone').textContent = newMember.get('phone') || 'N/A';
document.getElementById('org-name').textContent = newMember.get('org-name') || 'N/A';
document.getElementById('timestamp').textContent = formattedTimestamp; 