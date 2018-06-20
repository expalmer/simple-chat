import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../../../../components/Avatar'

const Typing = ({ client }) => (
  <div className="chat__msg chat__msg--in is-typing">
    <Avatar label={client.name} image={client.avatar} />
    <div className="typing">
      <span />
      <span />
      <span />
    </div>
  </div>
)

Typing.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
}

export default Typing
