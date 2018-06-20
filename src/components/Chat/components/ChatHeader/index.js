import React from 'react'
import PropTypes from 'prop-types'

import Customer from './components/Customer'
import Agent from './components/Agent'

const ChatHeader = props => (
  <div className="chat__header">
    {props.isAgent ? <Agent {...props} /> : <Customer {...props} />}
  </div>
)

const userPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
})

ChatHeader.propTypes = {
  isAgent: PropTypes.bool,
  client: userPropType.isRequired,
  onlineCustomers: PropTypes.arrayOf(userPropType),
  someIsUnread: PropTypes.bool,
  showChannels: PropTypes.bool,
  changeTab: PropTypes.func.isRequired,
}

ChatHeader.defaultProps = {
  isAgent: false,
  someIsUnread: false,
  showChannels: false,
  onlineCustomers: [],
}

export default ChatHeader
