import { ALL_VIDEOS, Video } from './Videos';

class VideoQueue{
    private static instance: VideoQueue;
    private static queue = ALL_VIDEOS;
    
    private constructor(){}

    static getInstance(): VideoQueue{
        if(!VideoQueue.instance){
            VideoQueue.instance = new VideoQueue();
        }

        return VideoQueue.instance;
    }

    public next(){
        VideoQueue.queue.shift();
    }

    public add(video: Video){
        VideoQueue.queue.push(video);
    }

    public get(top = 4){
        return VideoQueue.queue.slice(0, top);
    }

    public shuffle(){
        const length = VideoQueue.queue == null ? 0 : VideoQueue.queue.length
        if (!length) {
            return [];
        }
        let index = -1;
        const lastIndex = length - 1;
        const result = [...VideoQueue.queue];
        while (++index < length) {
            const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
            const value = result[rand];
            result[rand] = result[index];
            result[index] = value;
        }
        VideoQueue.queue = result;
        
        return VideoQueue.queue;
    }

    public get queueLength(){
        return VideoQueue.queue.length;
    }
}

export default VideoQueue;