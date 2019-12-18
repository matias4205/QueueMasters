import io from 'socket.io-client';

import config from '../../../config';

const { WS_BASE_URL } = config;

export default (() => {
  let instance = null;

  const connect = (cb) => (
    new Promise((res, rej) => {
      try {
        console.log('Trying to connet the servers!');
        instance = io.connect(`${WS_BASE_URL}/queue`);
        instance.on('connect', () => {
          console.log('Conection succesful');
          cb(instance);
          res(instance);
        });
      } catch (err) {
        console.log(err);
        rej(err);
      }
    })
  );

  return {
    initConnection: connect,
    instance: () => instance,
  };
})();
