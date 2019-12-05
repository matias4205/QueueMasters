import client from 'socket.io-client'

const queue = client.connect("http://localhost:4000/ws/queue");
queue.on("connect", () => {
   queue.emit('get', (data: string) => {
      console.log(data);
   });
   setTimeout(() => {
      queue.emit('add', 'https://www.youtube.com/watch?v=ewvIlJSBIGM');
   }, 2000);
   setTimeout(() => {
      queue.emit('like', 'ewvIlJSBIGM');
   }, 4000);
   setTimeout(() => {
      queue.emit('get', (data: string) => {
         console.log(data);
      });
   }, 8000);
});