import axios from "axios";

const CREATE_INDICATOR_API_URL = "studentperformancetrackingbackend-production.up.railway.app/indicators/new";
const GET_ALL_INDICATOR_API_URL = "studentperformancetrackingbackend-production.up.railway.app/indicators/all";

class IndicatorService {
    saveIndicator(indicator) {
        return axios.post(CREATE_INDICATOR_API_URL, indicator);
    }

    getAllIndicators() {
        return axios.get(GET_ALL_INDICATOR_API_URL);
    }
}

export default new IndicatorService();