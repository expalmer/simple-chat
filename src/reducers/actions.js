import { getTime } from '../helpers'
import * as types from './constants'

export const changeTabAction = tab => ({
  type: types.CHANGE_TAB,
  tab,
})

export const changeChannelAction = (channel, isAgent = false) => ({
  type: types.CHANGE_CHANNEL,
  channel,
  isAgent,
})

export const sendMessageAction = (channel, sender, message) => ({
  type: types.SEND_MESSAGE,
  channel,
  sender,
  message: {
    id: Date.now(),
    sender,
    message,
    sentAt: getTime(),
    read: false,
    views: 0,
  },
})

export const changeTypingAction = (channel, sender, value) => ({
  type: types.IS_TYPING,
  channel,
  sender,
  value,
})

export const changePopoverAction = (sender, value) => ({
  type: types.CHANGE_POPOVER,
  sender,
  value,
})
