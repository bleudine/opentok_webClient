export const SEND_MESSAGE = Symbol('SEND_MESSAGE');
export const sendMessage = message => ({
    type: SEND_MESSAGE,
    message,
});

export const RECEIVED_MESSAGE = Symbol('RECEIVED_MESSAGE');
export const receivedMessage = message => ({
    type: RECEIVED_MESSAGE,
    message,
});