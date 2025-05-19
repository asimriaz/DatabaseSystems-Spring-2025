function App() {
    return {
        page: 1,
        courses: [],
        dept: {},
        course: {},
        depts: [],
        async getCourses() {
            const courses = (await fetch(`/api/courses`).then(res => res.json()));
            console.log(courses);
            this.courses = courses;
        },
        async getDept(dept_name) {
            console.log(dept_name);
            const dept = (await fetch(`/api/depts/${dept_name}`).then(res => res.json()));
            console.log(dept[0]);
            this.dept = dept[0];

        },
        async Edit(course_id) {
            console.log(course_id);
            const { course, depts } = (await fetch(`/api/courses/${course_id}`).then(res => res.json()));
            this.page = 2;
            console.log(course[0], depts)
            this.course = course[0]
            this.depts = depts;
        },
        async Save() {
            fetch(`/api/courses/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.course),
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                this.courses = data;
                this.page = 1;
                //this.getCourses()
            });
        }

    }
}