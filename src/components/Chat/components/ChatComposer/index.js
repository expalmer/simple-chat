import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Attach, Emoji, Send } from '../../../Svg'
import Popover from './components/Popover'

export default class ChatComposer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
    this.refTextarea = React.createRef()
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onChangeHandler(e) {
    this.setState({ value: e.target.value })
  }

  onKeyDown(e) {
    const value = this.state.value.trim()
    if (e.keyCode === 13 && !e.shiftKey && value) {
      e.preventDefault()
      this.onSend(value)
    }
  }

  onSend(value) {
    if (!value.trim()) {
      return
    }
    this.props.onSendHandler(value)
    this.setState({ value: '' })
  }

  addEmoji(emoji) {
    const { changePopover } = this.props
    this.setState({ value: `${this.state.value} ${emoji} ` })
    changePopover(false)
    const { current } = this.refTextarea
    current.focus()
  }

  render() {
    const { value } = this.state
    const { emojis, isPopoverOpened, changePopover } = this.props
    const chatComposerClassName = classnames('chat__composer', {
      'is-ready': value,
      'is-popover': isPopoverOpened,
    })

    return (
      <div className={chatComposerClassName}>
        <pre>{value}</pre>
        <textarea
          ref={this.refTextarea}
          onChange={this.onChangeHandler}
          onKeyDown={this.onKeyDown}
          value={value}
        />
        <div className="chat__composer-buttons">
          <span>
            <Attach />
          </span>
          <button
            className="none"
            onClick={() => changePopover(!isPopoverOpened)}
          >
            <Emoji />
          </button>
          <button className="none" onClick={() => this.onSend(value)}>
            <Send />
          </button>
        </div>
        <Popover emojis={emojis} addEmoji={emoji => this.addEmoji(emoji)} />
      </div>
    )
  }
}

const emojiPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
})

ChatComposer.propTypes = {
  emojis: PropTypes.arrayOf(emojiPropType).isRequired,
  isPopoverOpened: PropTypes.bool.isRequired,
  onSendHandler: PropTypes.func.isRequired,
  changePopover: PropTypes.func.isRequired,
}
