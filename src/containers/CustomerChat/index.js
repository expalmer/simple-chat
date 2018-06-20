import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { find, prop, mergeCustomerAndChannel } from "../../helpers";
import {
  changeChannelAction,
  sendMessageAction,
  changeTypingAction,
  changePopoverAction
} from "../../reducers/actions";

import Chat from "../../components/Chat";
import Users from "../../components/Users";

const CustomerChat = props => {
  const { users, currentCustomerId, changeChannel } = props;
  return (
    <div className="side side--customer">
      <Users
        users={users}
        currentId={currentCustomerId}
        changeChannel={channel => changeChannel(channel)}
      />
      <Chat {...props} />
    </div>
  );
};

function mapStateToProps(state) {
  const sender = "customer";
  const { app } = state;
  const { controll, agent, customers, channels, emojis } = app;
  const { currentChannel: channel, isPopoverOpened } = controll[sender];
  const { agent: agent$1, customer, chats } = prop(channels, channel) || {
    customer: {},
    chats: []
  };
  const owner = find(customers, i => i.id === customer.id);
  const client = agent;

  const { isTyping } = agent$1;
  const currentCustomerId = customer.id;
  const users = mergeCustomerAndChannel(channels, customers, agent.id);

  return {
    sender,
    channel,
    owner,
    client,
    chats,
    isTyping,
    isPopoverOpened,
    emojis,
    users,
    currentCustomerId
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

CustomerChat.propTypes = {
  sender: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  owner: userPropType.isRequired,
  client: userPropType.isRequired,
  chats: PropTypes.arrayOf(chatPropType).isRequired,
  isTyping: PropTypes.bool.isRequired,
  isPopoverOpened: PropTypes.bool.isRequired,
  emojis: PropTypes.arrayOf(emojiPropType).isRequired,
  users: PropTypes.arrayOf(userPropType).isRequired,
  currentCustomerId: PropTypes.number.isRequired,
  changeTab: PropTypes.func.isRequired,
  changeChannel: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  changeTyping: PropTypes.func.isRequired,
  changePopover: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    changeTab: () => {},
    changeChannel: channel => dispatch(changeChannelAction(channel, false)),
    sendMessage: (channel, sender, message) =>
      dispatch(sendMessageAction(channel, sender, message)),
    changeTyping: (channel, sender, value) =>
      dispatch(changeTypingAction(channel, sender, value)),
    changePopover: (sender, value) =>
      dispatch(changePopoverAction(sender, value))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerChat);
