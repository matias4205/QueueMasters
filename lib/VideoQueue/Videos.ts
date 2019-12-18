import { Socket } from 'socket.io';

export interface Video{
    id: string,
    url: string,
    duration: Number,
    title: string
}

export interface QueueItem{
    clientId: string,
    video: Video,
    likes: string[]
}