import axios from 'axios';

import config from '../config';

class Youtube{
    private API_KEY = config.API_KEY;
    private BASE_URL = `https://www.googleapis.com/youtube/v3/videos`;

    constructor(){}

    public async videoInfo(url: string): Promise<any>{
        let videoId = '';

        if(url.match('https://(www.)?youtube|youtu\.be')){
            videoId = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
        }

        try {
            const { data } = await axios.get(`${this.buildUrl(videoId, this.API_KEY)}&part=contentDetails,snippet`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    private buildUrl(videoId: string, apiKey?: string){
        return `${this.BASE_URL}?id=${videoId}&key=${apiKey}`
    }
}

export default new Youtube();