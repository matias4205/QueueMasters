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

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlay: false,
      songs: [
        {
          id: 12,
          title: 'Tap Out - The strokes',
        },
        {
          id: 10,
          title: 'Hijo de la noche - Duki',
        },
        {
          id: 11,
          title: 'Pa Mi - (Remix)',
        },
        {
          id: 16,
          title: 'Te robo - Bad Bunny',
        },
      ],
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
    console.log('SENT!');
  }

  handleLike = () => {
    console.log('LIKED!');
  }

  renderQueueItems = (songs) => (
    songs.length > 0 ?
      songs.map(({ title, id }, index) => (
        <QueueItem title={title} active={index === 0} key={id} />
      )) : 'Queue has no items!'
  )

  render() {
    const { overlay, songs } = this.state;

    return (
      <>
        <div className='container'>
          <h1 className='title'>Queue</h1>
          <QueueLayout>
            {this.renderQueueItems(songs)}
          </QueueLayout>
          <div className='actions'>
            <CircularButton classes={['circular-button__action--like']} img={likeImg} alt='like' handler={this.handleLike} />
            <CircularButton classes={['circular-button__action--add']} img={plusImg} alt='add' handler={this.handleAdd} />
          </div>
        </div>
        <Overlay onClose={this.handleClose} isActive={overlay}>
          <div className='flex-container'>
            <LinkInput />
            <CircularButton classes={['circular-button__action--send']} img={sendImg} alt='send' handler={this.handleSend} />
          </div>
        </Overlay>
      </>
    );
  }
}

export default Client;
