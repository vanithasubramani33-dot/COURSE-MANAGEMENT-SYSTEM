let courses = [];
let students = [];
let enrollments = [];

const courseForm = document.getElementById("courseForm");
const studentForm = document.getElementById("studentForm");
const enrollmentForm = document.getElementById("enrollmentForm");

courseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const course = {
        id: courses.length + 1,
        name: document.getElementById("courseName").value,
        instructor: document.getElementById("instructor").value,
        category: document.getElementById("category").value,
        duration: document.getElementById("duration").value,
        status: document.getElementById("courseStatus").value
    };

    courses.push(course);

    courseForm.reset();

    displayCourses();
    updateCourseOptions();
    updateDashboard();
});

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = {
        id: students.length + 1,
        name: document.getElementById("studentName").value,
        email: document.getElementById("studentEmail").value,
        department: document.getElementById("studentDepartment").value
    };

    students.push(student);

    studentForm.reset();

    displayStudents();
    updateStudentOptions();
    updateDashboard();
});

enrollmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentId = Number(
        document.getElementById("enrollmentStudent").value
    );

    const courseId = Number(
        document.getElementById("enrollmentCourse").value
    );

    const student = students.find(function (item) {
        return item.id === studentId;
    });

    const course = courses.find(function (item) {
        return item.id === courseId;
    });

    const enrollment = {
        id: enrollments.length + 1,
        student: student.name,
        course: course.name
    };

    enrollments.push(enrollment);

    enrollmentForm.reset();

    displayEnrollments();
    updateDashboard();
});

function displayCourses() {
    const courseList = document.getElementById("courseList");

    courseList.innerHTML = "";

    courses.forEach(function (course) {
        courseList.innerHTML += `
            <tr>
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.instructor}</td>
                <td>${course.category}</td>
                <td>${course.duration} Weeks</td>
                <td>${course.status}</td>
                <td>
                    <button class="action-btn edit-btn"
                        onclick="editCourse(${course.id})">
                        Edit
                    </button>

                    <button class="action-btn delete-btn"
                        onclick="deleteCourse(${course.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function displayStudents() {
    const studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    students.forEach(function (student) {
        studentList.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td>
                    <button class="action-btn delete-btn"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function displayEnrollments() {
    const enrollmentList = document.getElementById("enrollmentList");

    enrollmentList.innerHTML = "";

    enrollments.forEach(function (enrollment) {
        enrollmentList.innerHTML += `
            <tr>
                <td>${enrollment.id}</td>
                <td>${enrollment.student}</td>
                <td>${enrollment.course}</td>
                <td>
                    <button class="action-btn delete-btn"
                        onclick="deleteEnrollment(${enrollment.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function updateStudentOptions() {
    const select = document.getElementById("enrollmentStudent");

    select.innerHTML = `<option value="">Select Student</option>`;

    students.forEach(function (student) {
        select.innerHTML += `
            <option value="${student.id}">
                ${student.name}
            </option>
        `;
    });
}

function updateCourseOptions() {
    const select = document.getElementById("enrollmentCourse");

    select.innerHTML = `<option value="">Select Course</option>`;

    courses.forEach(function (course) {
        select.innerHTML += `
            <option value="${course.id}">
                ${course.name}
            </option>
        `;
    });
}

function deleteCourse(id) {
    courses = courses.filter(function (course) {
        return course.id !== id;
    });

    displayCourses();
    updateCourseOptions();
    updateDashboard();
}

function deleteStudent(id) {
    students = students.filter(function (student) {
        return student.id !== id;
    });

    displayStudents();
    updateStudentOptions();
    updateDashboard();
}

function deleteEnrollment(id) {
    enrollments = enrollments.filter(function (enrollment) {
        return enrollment.id !== id;
    });

    displayEnrollments();
    updateDashboard();
}

function editCourse(id) {
    const course = courses.find(function (item) {
        return item.id === id;
    });

    document.getElementById("courseName").value = course.name;
    document.getElementById("instructor").value = course.instructor;
    document.getElementById("category").value = course.category;
    document.getElementById("duration").value = course.duration;
    document.getElementById("courseStatus").value = course.status;

    courses = courses.filter(function (item) {
        return item.id !== id;
    });

    displayCourses();
    updateCourseOptions();
    updateDashboard();
}

document.getElementById("courseSearch").addEventListener(
    "input",
    function () {
        const searchValue = this.value.toLowerCase();

        const filteredCourses = courses.filter(function (course) {
            return course.name.toLowerCase().includes(searchValue);
        });

        const courseList = document.getElementById("courseList");

        courseList.innerHTML = "";

        filteredCourses.forEach(function (course) {
            courseList.innerHTML += `
                <tr>
                    <td>${course.id}</td>
                    <td>${course.name}</td>
                    <td>${course.instructor}</td>
                    <td>${course.category}</td>
                    <td>${course.duration} Weeks</td>
                    <td>${course.status}</td>
                    <td>
                        <button class="action-btn delete-btn"
                            onclick="deleteCourse(${course.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    }
);

function updateDashboard() {
    document.getElementById("totalCourses").innerText =
        courses.length;

    document.getElementById("totalStudents").innerText =
        students.length;

    document.getElementById("totalEnrollments").innerText =
        enrollments.length;

    const activeCount = courses.filter(function (course) {
        return course.status === "Active";
    }).length;

    document.getElementById("activeCourses").innerText =
        activeCount;
}
