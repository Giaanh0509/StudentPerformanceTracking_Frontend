import axios from "axios";

const CREATE_SUBJECT_API_URL = "http://localhost:8080/subjects/new";
const GET_ALL_SUBJECTS_API_URL = "http://localhost:8080/subjects";

class SubjectService {
    saveSubject(subject) {
        return axios.post(CREATE_SUBJECT_API_URL, subject);
    }

    getAllSubjects() {
        return axios.get(GET_ALL_SUBJECTS_API_URL);
    }

    getSkills() {

    }
}

export default new SubjectService();
