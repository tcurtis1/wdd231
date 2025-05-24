export function displaySpotlights(members) {
    const spotlightList = document.getElementById('spotlight-list');
    if (!spotlightList) return;
    if (!members) {
        spotlightList.innerHTML = '<p>Error loading spotlights. Please try again later.</p>';
        return;
    }

    const highLevelMembers = members.filter(member => member.membershipLevel >= 2);
    const selectedMembers = highLevelMembers.sort(() => 0.5 - Math.random()).slice(0, Math.min(3, highLevelMembers.length));

    spotlightList.innerHTML = '';
    selectedMembers.forEach(member => {
        const membershipLabel = member.membershipLevel === 3 ? 'Gold' : 'Silver';
        spotlightList.innerHTML += `
            <div class="spotlight-card">
                ${member.image ? `<img src="images/${member.image}" alt="${member.name} Logo" class="member-logo">` : ''}
                <h3>${member.name}</h3>
                <p>${member.tagline}</p>
                <p>PHONE: ${member.phone}</p>
                <p><a href="${member.url}" target="_blank">Visit Website</a></p>
                <p>Membership: ${membershipLabel}</p>
            </div>
        `;
    });
}