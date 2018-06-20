import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { debounce } from '../../helpers'

import ChatHeader from './components/ChatHeader'
import ChatChannels from './components/ChatChannels'
import ChatMessages from './components/ChatMessages'
import ChatComposer from './components/ChatComposer'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.refMessages = React.createRef()
    this.stopTyping = debounce(this.stopTyping.bind(this), 1500)
  }

  componentDidMount() {
    this.scroll()
  }

  componentDidUpdate(oldProps) {
    const { chats, isTyping } = this.props
    if (oldProps.chats.length !== chats.length || isTyping) {
      this.scroll()
    }
  }

  onSendHandler(value) {
    const { channel, sender, sendMessage } = this.props
    sendMessage(channel, sender, value)
  }

  onChangeChannel(customer) {
    const { changeChannel, sender, owner: agent } = this.props
    const channel = `${agent.id}_${customer.id}`
    changeChannel(channel, sender, agent, customer)
  }

  stopTyping() {
    const { changeTyping, channel, sender } = this.props
    changeTyping(channel, sender, false)
  }

  scroll() {
    const { current } = this.refMessages
    current.scrollTop = current.scrollHeight
  }

  render() {
    const {
      isAgent,
      emojis,
      channel,
      sender,
      owner,
      client,
      isTyping,
      chats,
      onlineCustomers,
      showChannels,
      someIsUnread,
      isPopoverOpened,
      changeTab,
      changeChannel,
      changePopover,
    } = this.props
    const chatClassName = classnames('chat', { 'is-channel': showChannels })

    return (
      <div className={chatClassName}>
        <ChatHeader
          isAgent={isAgent}
          client={client}
          someIsUnread={someIsUnread}
          showChannels={showChannels}
          onlineCustomers={onlineCustomers}
          changeTab={changeTab}
        />

        {isAgent && (
          <ChatChannels
            channel={channel}
            onlineCustomers={onlineCustomers}
            changeChannel={changeChannel}
          />
        )}

        <div className="chat__body" ref={this.refMessages}>
          <ChatMessages
            sender={sender}
            owner={owner}
            client={client}
            isTyping={isTyping}
            chats={chats}
          />
        </div>
        <div className="chat__footer">
          <ChatComposer
            emojis={emojis}
            isPopoverOpened={isPopoverOpened}
            onSendHandler={value => this.onSendHandler(value)}
            changePopover={value => changePopover(sender, value)}
          />
        </div>
      </div>
    )
  }
}

const userPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  channel: PropTypes.string,
  unread: PropTypes.number,
})

const chatPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  read: PropTypes.bool.isRequired,
  sender: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
})

const emojiPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
})

Chat.propTypes = {
  isAgent: PropTypes.bool,
  sender: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  owner: userPropType.isRequired,
  client: userPropType.isRequired,
  chats: PropTypes.arrayOf(chatPropType).isRequired,
  isTyping: PropTypes.bool.isRequired,
  isPopoverOpened: PropTypes.bool.isRequired,
  emojis: PropTypes.arrayOf(emojiPropType).isRequired,
  showChannels: PropTypes.bool,
  someIsUnread: PropTypes.bool,
  onlineCustomers: PropTypes.arrayOf(userPropType),
  changeTab: PropTypes.func.isRequired,
  changeChannel: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  changeTyping: PropTypes.func.isRequired,
  changePopover: PropTypes.func.isRequired,
}

Chat.defaultProps = {
  isAgent: false,
  showChannels: false,
  someIsUnread: false,
  onlineCustomers: [],
}
