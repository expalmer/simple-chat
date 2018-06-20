import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Avatar from '../../../../components/Avatar'

const ChatChannels = ({ channel, onlineCustomers, changeChannel }) => (
  <div className="chat__channels">
    <ul className="chat__channels-users">
      {onlineCustomers.map(i => (
        <li
          key={i.channel}
          className={classnames({
            active: i.channel === channel,
          })}
        >
          <button onClick={() => changeChannel(i.channel)}>
            {i.unread > 0 && <b className="badge">{i.unread}</b>}
            <Avatar label={i.name} image={i.avatar} />
            <strong>{i.name}</strong>
          </button>
        </li>
      ))}
    </ul>
  </div>
)

const customerPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  unread: PropTypes.number.isRequired,
})

ChatChannels.propTypes = {
  channel: PropTypes.string.isRequired,
  onlineCustomers: PropTypes.arrayOf(customerPropType).isRequired,
  changeChannel: PropTypes.func.isRequired,
}

export default ChatChannels
