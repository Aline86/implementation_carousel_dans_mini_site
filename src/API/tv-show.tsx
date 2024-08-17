import axios from "axios";
import {BASE_URL, API_KEY_PARAM} from '../config.tsx'

export default class TVShowAPI {
    async fetchPopulars () {
        const response = await axios.get(`${BASE_URL}/tv/popular${API_KEY_PARAM}`);
       
        return response.data.results;
    }

    async fetchRecommendation (tvShowId: number) {
        const response = await axios.get(`${BASE_URL}/tv/${tvShowId}/recommendations${API_KEY_PARAM}`);
      
        return response.data.results;
    }

    async fetchTVShow (name: string) {
        
        const response = await axios.get(`${BASE_URL}/search/tv${API_KEY_PARAM}&query=${name}`);
        
        return response.data.results;
    }
}