import React, { Component } from 'react';

import './Client.scss';

import likeImg from '../../assets/static/like.png';
import plusImg from '../../assets/static/plus.png';
import sendImg from '../../assets/static/send.png';

import Overlay from '../../components/Overlay';
import CircularButton from '../../components/CircularButton';
import QueueItem from './components/QueueItem';
import QueueLayout from './components/QueueLayout';
import LinkInput from './components/LinkInput';
import Socket from './components/Socket';
import { Notification, NotificationManager } from '../../components/Notification';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlay: false,
      connected: false,
      error: null,
      link: '',
      songs: [],
    };
  }

  handleAdd = () => {
    this.setState({
      overlay: true,
    });
  }

  handleClose = () => {
    this.setState({
      overlay: false,
    });
  }

  handleSend = () => {
    const { link } = this.state;
    Socket.instance().emit('add', link);
    this.setState({
      overlay: false,
    });
  }

  handleLike = () => {
    const { songs: [lastSong] } = this.state;

    Socket.instance().emit('like', lastSong.video.id);
  }

  handleLinkChange = ({ currentTarget }) => {
    this.setState({
      link: currentTarget.value,
    });
  }

  renderQueueItems = (songs) => (
    songs.length > 0 ?
      songs.map(({ video: { title, id } }, index) => (
        <QueueItem title={title} index={index} active={index === 0} key={id} />
      )) : 'Queue has no items!'
  )

  bindHandlers(instance) {
    instance.on('disconnect', () => {
      NotificationManager.danger('Server connection lost!');
      this.setState({
        connected: false,
      });
    });
    instance.on('set:like', () => {
      NotificationManager.success('Someone liked your song ❤️!');
    });
    instance.on('set:queue', (data) => {
      console.log(data);
      this.setState({
        songs: data,
      });
    });
  }

  initializeSocket = async () => {
    try {
      await Socket.initConnection(this.bindHandlers.bind(this));
      this.setState({
        connected: true,
      });
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  componentDidMount() {
    this.initializeSocket();
  }

  render() {
    const { overlay, songs, connected, error, link } = this.state;

    if (error) {
      return (
        <div>
          {error}
        </div>
      );
    }

    if (!connected) {
      return (
        <div>
          Connecting...
        </div>
      );
    }

    return (
      <>
        <Notification timeout={4000} />
        <div className='container'>
          <h1 className='title'>Queue</h1>
          <QueueLayout>
            {this.renderQueueItems(songs)}
          </QueueLayout>
          <div className='actions' style={{ transition: 'all 200ms ease' }}>
            { songs.length > 0 && <CircularButton classes={['circular-button__action--like']} img={likeImg} alt='like' handler={this.handleLike} /> }
            <CircularButton classes={['circular-button__action--add']} img={plusImg} alt='add' handler={this.handleAdd} />
          </div>
        </div>
        <Overlay onClose={this.handleClose} isActive={overlay}>
          <div className='flex-container'>
            <LinkInput handleChange={this.handleLinkChange} text={link} />
            <CircularButton classes={['circular-button__action--send']} img={sendImg} alt='send' handler={this.handleSend} />
          </div>
        </Overlay>
      </>
    );
  }
}

export default Client;
