import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Avatar from '../../../../Avatar'
import Actions from './Actions'
import { Brazil, Chrome, Safari } from '../../../../Svg'

const Agent = props => {
  const {
    client,
    showChannels,
    changeTab,
    onlineCustomers,
    someIsUnread,
  } = props
  const tabChat = classnames({ active: !showChannels })
  const tabChannel = classnames({ active: showChannels })
  return (
    <div>
      <div className="chat__header-customer">
        <div className="chat__header-user">
          <Avatar label={client.name} isSmall image={client.avatar} />
          <h4>{client.name}</h4>
        </div>
        <ul className="chat__header-icons">
          <li>
            <Brazil />
          </li>
          <li>
            <Safari />
          </li>
          <li>
            <Chrome />
          </li>
        </ul>
        <Actions />
      </div>
      <div className="chat__header-nav">
        <button onClick={() => changeTab(1)} className={tabChat}>
          Current Chat
        </button>
        <button onClick={() => changeTab(2)} className={tabChannel}>
          Online Customers ({onlineCustomers.length})
          {someIsUnread && <i className="pulse" />}
        </button>
      </div>
    </div>
  )
}

const userPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
})

Agent.propTypes = {
  client: userPropType.isRequired,
  onlineCustomers: PropTypes.arrayOf(userPropType).isRequired,
  someIsUnread: PropTypes.bool.isRequired,
  showChannels: PropTypes.bool.isRequired,
  changeTab: PropTypes.func.isRequired,
}

export default Agent
