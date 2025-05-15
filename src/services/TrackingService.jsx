import axios from "axios";

const CREATE_TRACKING_API_URL = "https://studentperformancetrackingbackend-production.up.railway.app/trackings/new";
const CREATE_TRACKING_DETAILS_API_URL = "https://studentperformancetrackingbackend-production.up.railway.app/trackings/newDetails";

class TrackingService {
    saveTracking(tracking) {
        return axios.post(CREATE_TRACKING_API_URL, tracking);
    }

    saveTrackingDetails(trackingDetails) {
        return axios.post(CREATE_TRACKING_DETAILS_API_URL, trackingDetails);
    }
}

export default new TrackingService();