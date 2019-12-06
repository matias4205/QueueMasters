// @ts-check

import express from 'express';
import socket_io from 'socket.io';
const app = express();
import { Server } from 'http';
const server = new Server(app);
const io = socket_io(server);
import * as path from 'path';

import { client as clientEvents, panel as panelEvents } from './sockets';

import config from './config';

app.set('port', config.PORT);

app.use(express.static(path.join(__dirname, 'frontend/build')));

/* Routes */
const panelIo = io.of('/ws/panel');
const clientIo = io.of('/ws/queue');

clientEvents({ clientIo, panelIo });
panelEvents({ panelIo, clientIo });

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

server.listen(app.get('port') || 3000, () => {
    console.log(`Listening at: http://localhost:${config.PORT}`);
});