import { Namespace } from 'socket.io';

export default (panelIo: Namespace) => {
    panelIo.on('connection', (panel) => {
        panel.on('next', () => {
            
        });
    });
}