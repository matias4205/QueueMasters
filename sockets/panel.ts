import { Namespace } from 'socket.io';
import debug from 'debug';

import videoQueue from '../lib/VideoQueue';

const debugLog = debug('app:panel');
const VideoQueue = videoQueue.getInstance();

export default ({ panelIo, clientIo }: { panelIo: Namespace, clientIo: Namespace }) => {
    panelIo.on('connection', (panel) => {
        debugLog("A panel connected with id: ", panel.id);
        
        panel.on('get', (cb: Function) => {
            debugLog("A panel asked for queue!");
            cb(VideoQueue.get());
        });

        panel.on('next', () => {
            VideoQueue.next();
            debugLog("Panel passed one song! Song queue length: ", VideoQueue.queueLength);
            panelIo.emit('set:queue', VideoQueue.get());
            clientIo.emit('set:queue', VideoQueue.get());
        });
    });
}