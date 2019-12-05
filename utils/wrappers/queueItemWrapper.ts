import { QueueItem, Video } from '../../lib/VideoQueue/Videos';
import { Socket } from 'socket.io';

import { videoWrapper } from './';

export default ({ socket, video }: { socket: Socket, video: any }): QueueItem => {
    const queueItem = {
        clientId: socket.id,
        video: videoWrapper(video),
        likes: 0
    }

    return queueItem;
}