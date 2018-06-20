import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Seen } from '../../../Svg'
import Avatar from '../../../Avatar'
import Typing from './components/Typing'

const ChatMessages = props => {
  const { sender, owner, client, isTyping, chats } = props
  return (
    <div className="chat__messages">
      {chats.map(i => {
        const isOwner = i.sender === sender
        const messageClassName = classnames('chat__msg', {
          'chat__msg--in': !isOwner,
          'chat__msg--out': isOwner,
          'is-seen': i.read,
          pristine: i.views === 0,
        })
        const user = isOwner ? owner : client
        const seen = isOwner ? <Seen /> : null
        return (
          <div className={messageClassName} key={i.id}>
            <Avatar label={user.name} image={user.avatar} />
            {i.message}
            <div className="chat__msg-status">
              {i.sentAt}
              {seen}
            </div>
          </div>
        )
      })}
      {isTyping && <Typing client={client} />}
    </div>
  )
}

const chatPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  read: PropTypes.bool.isRequired,
  sender: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
})

const userPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
})

ChatMessages.propTypes = {
  sender: PropTypes.string.isRequired,
  owner: userPropType.isRequired,
  client: userPropType.isRequired,
  isTyping: PropTypes.bool.isRequired,
  chats: PropTypes.arrayOf(chatPropType).isRequired,
}

export default ChatMessages
