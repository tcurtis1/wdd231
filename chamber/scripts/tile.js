document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Footer Dates
    const currentYear = document.getElementById('current-year');
    const lastModified = document.getElementById('last-modified');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    } else {
        console.error("Element with ID 'current-year' not found.");
    }
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    } else {
        console.error("Element with ID 'last-modified' not found.");
    }

    // Member Directory Functionality (Only for Directory Page)
    let membersData = null;
    async function fetchMembers() {
        if (!document.getElementById('member-directory')) return; // Skip if not on directory page
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            membersData = await response.json();
            displayMembers(membersData, 'grid');
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    function displayMembers(members, viewType) {
        const directory = document.getElementById('member-directory');
        if (!directory) return;
        if (!members) {
            console.error("No members data available to display.");
            directory.innerHTML = '<p>Error loading members. Please try again later.</p>';
            return;
        }
        directory.innerHTML = '';
        directory.className = `${viewType}-view`;

        members.forEach(member => {
            const membershipLabel = member.membershipLevel === 3 ? 'Gold' : member.membershipLevel === 2 ? 'Silver' : 'Member';
            if (viewType === 'grid') {
                directory.innerHTML += `
                    <div class="member-card">
                        ${member.image ? `<img src="images/${member.image}" alt="${member.name} Logo" class="member-logo">` : ''}
                        <h3>${member.name}</h3>
                        <p>${member.tagline}</p>
                        <p>${member.address}</p>
                        <p>EMAIL: ${member.email}</p>
                        <p>PHONE: ${member.phone}</p>
                        <p>URL: <a href="${member.url}" target="_blank">${member.url}</a></p>
                        <p>Membership: ${membershipLabel}</p>
                    </div>
                `;
            } else {
                directory.innerHTML += `
                    <div class="member-list-item">
                        ${member.image ? `<img src="images/${member.image}" alt="${member.name} Logo" class="member-logo">` : ''}
                        <h3>${member.name}</h3>
                        <p>${member.tagline}</p>
                        <p>${member.address}</p>
                        <p>EMAIL: ${member.email} | PHONE: ${member.phone}</p>
                        <p>URL: <a href="${member.url}" target="_blank">${member.url}</a></p>
                        <p>Membership: ${membershipLabel}</p>
                    </div>
                `;
            }
        });
    }

    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    if (gridView) {
        gridView.addEventListener('click', () => {
            gridView.classList.add('active');
            if (listView) listView.classList.remove('active');
            displayMembers(membersData, 'grid');
        });
    }
    if (listView) {
        listView.addEventListener('click', () => {
            listView.classList.add('active');
            if (gridView) gridView.classList.remove('active');
            displayMembers(membersData, 'list');
        });
    }

    fetchMembers();
});