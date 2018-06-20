import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { find, prop, getOnlineCustomers } from "../../helpers";
import {
  changeTabAction,
  changeChannelAction,
  sendMessageAction,
  changeTypingAction,
  changePopoverAction
} from "../../reducers/actions";
import Chat from "../../components/Chat";

const AgentChat = props => (
  <div className="side side--agent">
    <Chat isAgent {...props} />
  </div>
);

function mapStateToProps(state) {
  const sender = "agent";
  const { controll, agent, customers, channels, emojis } = state.app;
  const { currentChannel: channel, currentTab, isPopoverOpened } = prop(
    controll,
    sender
  );
  const { customer, chats } = prop(channels, channel);
  const owner = agent;
  const client = find(customers, i => i.id === customer.id);
  const { isTyping } = customer;
  const onlineCustomers = getOnlineCustomers(channels, customers, agent.id);
  const someIsUnread = onlineCustomers.some(i => i.unread > 0);
  const showChannels = currentTab === 2;

  return {
    emojis,
    owner,
    client,
    chats,
    isTyping,
    sender,
    channel,
    onlineCustomers,
    showChannels,
    someIsUnread,
    isPopoverOpened
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTab: value => dispatch(changeTabAction(value)),
    changeChannel: channel => dispatch(changeChannelAction(channel, true)),
    sendMessage: (channel, sender, message) =>
      dispatch(sendMessageAction(channel, sender, message)),
    changeTyping: (channel, sender, value) =>
      dispatch(changeTypingAction(channel, sender, value)),
    changePopover: (sender, value) =>
      dispatch(changePopoverAction(sender, value))
  };
}

const userPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
});

const chatPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  read: PropTypes.bool.isRequired,
  sender: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired
});

const emojiPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired
});

AgentChat.propTypes = {
  sender: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  owner: userPropType.isRequired,
  client: userPropType.isRequired,
  chats: PropTypes.arrayOf(chatPropType).isRequired,
  isTyping: PropTypes.bool.isRequired,
  isPopoverOpened: PropTypes.bool.isRequired,
  emojis: PropTypes.arrayOf(emojiPropType).isRequired,
  onlineCustomers: PropTypes.arrayOf(userPropType).isRequired,
  changeTab: PropTypes.func.isRequired,
  changeChannel: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  changeTyping: PropTypes.func.isRequired,
  changePopover: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentChat);
