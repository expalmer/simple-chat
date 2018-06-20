import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Avatar = ({ image, label, isSmall }) => {
  const className = classnames('avatar', {
    'avatar--sm': isSmall,
  })
  return (
    <span className={className}>
      <img src={image} alt={label} />
    </span>
  )
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
}

Avatar.defaultProps = {
  isSmall: false,
}

export default Avatar
