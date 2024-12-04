import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/subjects/";

class SubjectService {
    saveSubject(subject) {
        return axios.post(USER_API_BASE_URL, subject);
    }
}

export default new SubjectService();
