export function getTime() {
  const d = new Date()
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

export function clone(...args) {
  return Object.assign(...args)
}

export function sortBy(list, fn) {
  return list.sort((a, b) => {
    const aa = fn(a)
    const bb = fn(b)
    if (aa < bb) {
      return -1
    }
    return aa > bb ? 1 : 0
  })
}

export function find(list, fn) {
  let idx = 0
  const len = list.length
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx]
    }
    idx += 1
  }
  return undefined
}

export function prop(obj, p) {
  return obj && obj[p]
}

export function debounce(fn, wait) {
  let timeout
  return function d(...args) {
    const ctx = this
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(ctx, args)
    }, wait || 100)
  }
}

function getUnreadChats(channel, sender) {
  if (!channel) {
    return 0
  }
  const chats = prop(channel, 'chats') || []
  if (chats.length === 0) {
    return 0
  }
  return chats.reduce((acc, x) => {
    if (x.sender === sender && x.read === false) {
      return acc + 1
    }
    return acc
  }, 0)
}

export function getOnlineCustomers(channels, customers, agentId) {
  return customers.reduce((acc, customer) => {
    const channel = `${agentId}_${customer.id}`
    const channel$1 = prop(channels, channel)
    if (channels[channel]) {
      const unread = channel$1.chats.reduce(
        (accum, x) => (x.sender === 'customer' && !x.read ? accum + 1 : accum),
        0,
      )
      acc.push(clone({}, customer, { channel, unread }))
    }
    return acc
  }, [])
}

export function mergeCustomerAndChannel(channels, customers, agentId) {
  return customers.map(i => {
    const channel = `${agentId}_${i.id}`
    return Object.assign({}, i, {
      channel,
      unread: getUnreadChats(prop(channels, channel), 'agent'),
    })
  })
}
