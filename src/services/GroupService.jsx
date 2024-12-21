import axios from "axios";

const CREATE_GROUP_API_URL = "http://localhost:8080/groups/new";

class GroupService {
    saveGroup(group) {
        return axios.post(CREATE_GROUP_API_URL, group);
    }
}

export default new GroupService;