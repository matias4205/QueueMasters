import client from 'socket.io-client'

const queue = client.connect("http://localhost:4000/ws/panel");
queue.on("connect", () => {
   queue.emit('get', (data: string) => {
      console.log(data);
   });
   
   setTimeout(() => {
      queue.emit('next');
   }, 10000);
});

queue.on('set:queue', (data: any) => {
   console.log(data);
});

queue.on('set:viewers', (data: any) => {
   console.log("Viewers: ", data);
});
