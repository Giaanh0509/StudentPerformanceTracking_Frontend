import axios from "axios";

const USER_API_BASE_URL = "https://student-be-production.up.railway.app/sessions/";

class UserService {
    saveUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }
}

export default new UserService();