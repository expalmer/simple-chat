import React from 'react'
import PropTypes from 'prop-types'

const Popover = props => {
  const { emojis, addEmoji } = props
  return (
    <div className="chat__popover">
      <div className="chat__emoji">
        <div className="chat__emoji-body">
          <div className="chat__emoji-items">
            {emojis.map(i => (
              <button
                key={i.title}
                className="chat__emoji-item"
                title={i.title}
                onClick={() => addEmoji(i.emoji)}
              >
                {i.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const emojiPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
})

Popover.propTypes = {
  emojis: PropTypes.arrayOf(emojiPropType).isRequired,
  addEmoji: PropTypes.func.isRequired,
}

export default Popover
