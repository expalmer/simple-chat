import { combineReducers } from 'redux'
import { initialState } from './initialState'

import * as types from './constants'
import { clone, prop } from '../helpers'

function controll(state, action) {
  const { channel, isAgent } = action
  const sender = isAgent ? 'agent' : 'customer'
  switch (action.type) {
    case types.CHANGE_CHANNEL: {
      return clone({}, state, {
        [sender]: clone({}, state[sender], {
          currentTab: 1,
          currentChannel: channel,
        }),
      })
    }
    default: {
      return state
    }
  }
}

function createChannelIfDoesntExists(state, action) {
  const { channel } = action
  if (!prop(state, channel)) {
    const [agentId, customerId] = channel.split('_')
    return clone({}, state, {
      [channel]: {
        agent: {
          id: +agentId,
          isTyping: false,
        },
        customer: {
          id: +customerId,
          isTyping: false,
        },
        chats: [],
      },
    })
  }
  return state
}

function verifyReadMessages(state, action) {
  const { isAgent, channel } = action
  const receiver = isAgent ? 'customer' : 'agent'
  const nextState = createChannelIfDoesntExists(state, action)
  const nextChats = nextState[channel].chats.map(i => {
    const read = i.sender === receiver ? true : i.read
    const views = i.views + 1
    return clone({}, i, {
      read,
      views,
    })
  })
  return clone({}, nextState, {
    [channel]: clone({}, nextState[channel], {
      chats: nextChats,
    }),
  })
}

function sendMessage(state, controllState, action) {
  const { sender, channel, message } = action
  const type = sender === 'agent' ? 'customer' : 'agent'
  const user = controllState[type]
  const isOpened = user.currentChannel === channel
  return clone({}, state, {
    [action.channel]: clone({}, state[channel], {
      [action.sender]: clone({}, state[channel][sender], {
        isTyping: false,
      }),
      chats: [...state[channel].chats, clone({}, message, { read: isOpened })],
    }),
  })
}

function addTyping(state, action) {
  return clone({}, state, {
    [action.channel]: clone({}, state[action.channel], {
      [action.sender]: clone({}, state[action.channel][action.sender], {
        isTyping: action.value,
      }),
    }),
  })
}

function app(state, action) {
  if (typeof state === 'undefined') {
    return initialState()
  }
  switch (action.type) {
    case types.CHANGE_TAB: {
      return clone({}, state, {
        controll: clone({}, state.controll, {
          agent: clone({}, state.controll.agent, {
            currentTab: action.tab,
          }),
        }),
      })
    }
    case types.CHANGE_CHANNEL: {
      return clone({}, state, {
        controll: controll(state.controll, action),
        channels: verifyReadMessages(state.channels, action),
      })
    }
    case types.SEND_MESSAGE: {
      return clone({}, state, {
        channels: sendMessage(state.channels, state.controll, action),
      })
    }
    case types.IS_TYPING: {
      return clone({}, state, {
        channels: addTyping(state.channels, action),
      })
    }
    case types.CHANGE_POPOVER: {
      return clone({}, state, {
        controll: clone({}, state.controll, {
          [action.sender]: clone({}, state.controll[action.sender], {
            isPopoverOpened: action.value,
          }),
        }),
      })
    }
    default: {
      return state
    }
  }
}

const chatApp = combineReducers({ app })

export default chatApp
