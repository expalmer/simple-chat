import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../../../../Avatar'
import Actions from './Actions'

const Customer = ({ client }) => (
  <div>
    <div className="chat__header-common">
      <div className="chat__header-common-title">Support</div>
      <Actions />
    </div>
    <div className="chat__header-agent">
      <Avatar label={client.name} isSmall image={client.avatar} />
      <h2>
        {client.name} <small>Customer Support</small>
      </h2>
    </div>
  </div>
)

Customer.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
}

export default Customer
