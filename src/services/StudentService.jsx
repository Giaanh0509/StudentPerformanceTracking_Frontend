import axios from "axios";

const CREATE_STUDENT_API_URL = "studentperformancetrackingbackend-production.up.railway.app/students/new";

class StudentService {
    saveStudent(student) {
        return axios.post(CREATE_STUDENT_API_URL, student);
    }
}

export default new StudentService();
