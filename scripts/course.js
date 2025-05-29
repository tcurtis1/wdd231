const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const totalCreditsSpan = document.getElementById('total-credits');
    const courseDetails = document.getElementById('course-details');

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
            card.addEventListener('click', () => {
                console.log(`Card clicked: ${course.subject} ${course.number}`);
                displayCourseDetails(course);
            });
            courseList.appendChild(card);
        });

        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    function displayCourseDetails(course) {
        // Reset the dialog state
        courseDetails.innerHTML = '';
        courseDetails.removeAttribute('open');
        courseDetails.style.display = '';

        // Populate the dialog
        courseDetails.innerHTML = `
            <button id="closeModal">X</button>
            <h2>${course.subject} ${course.number}</h2>
            <h3>${course.title}</h3>
            <p><strong>Credits</strong>: ${course.credits}</p>
            <p><strong>Certificate</strong>: ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies</strong>: ${
                Array.isArray(course.technology) ? course.technology.join(', ') : 'N/A'
            }</p>
        `;

        
        courseDetails.showModal();

        
        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener("click", () => {
            console.log('Close button clicked');
            courseDetails.close();
        }, { once: true });

        courseDetails.addEventListener('close', () => {
            console.log('Dialog closed');
            courseDetails.innerHTML = '';
            courseDetails.removeAttribute('open');
            courseDetails.style.display = 'none';
            void courseDetails.offsetWidth;
        }, { once: true });

        courseDetails.addEventListener('click', (event) => {
            if (event.target === courseDetails) {
                console.log('Backdrop clicked, closing dialog');
                courseDetails.close();
            }
        }, { once: true });
    }

    document.getElementById('all-courses').addEventListener('click', () => {
        console.log('All Courses button clicked');
        displayCourses('all');
    });
    document.getElementById('wdd-courses').addEventListener('click', () => {
        console.log('WDD Courses button clicked');
        displayCourses('wdd');
    });
    document.getElementById('cse-courses').addEventListener('click', () => {
        console.log('CSE Courses button clicked');
        displayCourses('cse');
    });

    displayCourses();
});