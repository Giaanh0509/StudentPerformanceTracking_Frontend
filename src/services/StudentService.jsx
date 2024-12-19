import axios from "axios";

const CREATE_STUDENT_API_URL = "http://localhost:8080/students/new";

class StudentService {
    saveStudent(student) {
        return axios.post(CREATE_STUDENT_API_URL, student);
    }
}

export default new StudentService();
