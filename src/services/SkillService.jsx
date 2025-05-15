import axios from "axios";

const CREATE_SKILL_API_URL = "studentperformancetrackingbackend-production.up.railway.app/skills/new";

class SkillService {
    saveSkill(skill) {
        return axios.post(CREATE_SKILL_API_URL, skill);
    }
}

export default new SkillService();