import io from 'socket.io-client';

import config from '../../../config';

const { WS_BASE_URL } = config;

export default (() => {
  let instance = null;

  const connect = (cb) => (
    new Promise((res, rej) => {
      try {
        console.log('Trying to connet the servers!');
        const socket = io.connect(`${WS_BASE_URL}/queue`);
        socket.on('connect', () => {
          console.log('Conection succesful');
          cb(socket);
          res(socket);
        });
      } catch (err) {
        console.log(err);
        rej(err);
      }
    })
  );

  const initConnection = async (cb) => {
    instance = await connect(cb);
  };
  return {
    initConnection,
    instance: () => instance,
  };
})();
