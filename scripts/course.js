const courses = [
    { subject: 'WDD', number: '130', title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: '230', title: 'Web Frontend Development I', credits: 3, completed: true },
    { subject: 'CSE', number: '110', title: 'Programming Building Blocks', credits: 2, completed: false },
    { subject: 'CSE', number: '111', title: 'Programming with Functions', credits: 2, completed: false },
    // Add more courses as needed
];

const courseList = document.getElementById('course-list');
const totalCreditsSpan = document.getElementById('total-credits');

function displayCourses(filter = 'all') {
    courseList.innerHTML = '';
    let filteredCourses = courses;

    if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    }

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) card.classList.add('completed');
        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
        `;
        courseList.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

document.getElementById('all-courses').addEventListener('click', () => displayCourses('all'));
document.getElementById('wdd-courses').addEventListener('click', () => displayCourses('wdd'));
document.getElementById('cse-courses').addEventListener('click', () => displayCourses('cse'));

displayCourses();