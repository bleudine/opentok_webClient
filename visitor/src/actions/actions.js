export const FETCH_SESSION_CREDENTIALS = Symbol('FETCH_SESSION_CREDENTIALS');
export const fetchSessionCredentials = () => ({
    type: FETCH_SESSION_CREDENTIALS
});

export const RECEIVED_SESSION_CREDENTIALS = Symbol('RECEIVED_SESSION_CREDENTIALS');
export const receivedSessionCredentials = ({apiKey, sessionId, token}) => ({
    type: RECEIVED_SESSION_CREDENTIALS,
    apiKey,
    sessionId,
    token
});

export const INIT_VISIO_CHAT = Symbol('INIT_VISIO_CHAT');
export const initVisioChat = () => ({
    type: INIT_VISIO_CHAT,
});

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