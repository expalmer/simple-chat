import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Avatar from '../Avatar'

const Users = props => {
  const { users, currentId, changeChannel } = props
  return (
    <ul className="users">
      {users.map(i => (
        <li
          key={i.id}
          className={classnames({
            active: i.id === currentId,
          })}
        >
          <button onClick={() => changeChannel(i.channel)} className="none">
            {i.unread > 0 && <b className="badge">{i.unread}</b>}
            <Avatar label={i.name} image={i.avatar} />
          </button>
        </li>
      ))}
    </ul>
  )
}

const userPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  unread: PropTypes.number.isRequired,
})

Users.propTypes = {
  users: PropTypes.arrayOf(userPropType).isRequired,
  currentId: PropTypes.number.isRequired,
  changeChannel: PropTypes.func.isRequired,
}

export default Users
