import VideoQueue from '../lib/VideoQueue';

var b = VideoQueue.getInstance();

console.log(b.shuffle());
console.log(b.get(2));