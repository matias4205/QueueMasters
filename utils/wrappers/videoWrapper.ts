import { Video } from '../../lib/VideoQueue/Videos';

export default ({ items: [ videoData ] } : { items: any[] }): Video => {
    const video = {
        id: videoData.id,
        url: `https://www.youtube.com/watch?v=${videoData.id}`,
        duration: videoData.contentDetails.duration,
        title: videoData.snippet.title
    };

    return video;
}

// https://www.googleapis.com/youtube/v3/videos?id=${VideoId}&part=contentDetails&key=${YOUR_API_KEY}