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