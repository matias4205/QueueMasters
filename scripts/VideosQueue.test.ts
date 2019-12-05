import VideoQueue from '../lib/VideoQueue';
import { Video } from '../lib/VideoQueue/Videos';

var b = VideoQueue.getInstance();
var a = VideoQueue.getInstance();
console.log(a.add({
    duration: 120,
    id: 'sad',
    title: 'dou',
    url: 'neah'
}));
console.log(b.get());