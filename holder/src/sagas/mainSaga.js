import { all, call, takeEvery, put, fork, take}      from 'redux-saga/effects';
import {
    FETCH_SESSION_CREDENTIALS,
    RECEIVED_SESSION_CREDENTIALS,
    receivedSessionCredentials,
    SEND_MESSAGE
}                                        from '../actions/actions';
import {opentokSession as activeSession} from '../utils/opentokSession';

export default function* mainSaga() {
    console.log('WELL GOOD JOMB');
    yield all([
        takeEvery(FETCH_SESSION_CREDENTIALS, fetchSession),
        takeEvery(RECEIVED_SESSION_CREDENTIALS, openTokSession)
    ])
}

function* fetchSession() {
    try {
        const res = yield call(fetch, 'http://localhost:8080/room/session', {method: 'GET'});
        const json = yield call([res, 'json']);

        yield put(receivedSessionCredentials(json));


        console.log(json);
    } catch (error) {
        console.error(error);
    }
}

function* openTokSession(payload) {
    const active = new activeSession(payload);
    const session = active.session;
    const streams = {};

    yield fork(chat, active);

    session.on('streamCreated', e => {
        console.log('streamCreated : ', e);
        const { stream } = e;

        if (!streams[stream.connection.connectionId]) {

            streams[stream.connection.connectionId] = stream;

            const confirm = window.confirm('Would you like to take the call');

            if (confirm) {

                active.initPublisher();
                session.publish(active.publisher);

                active.setStream(stream);
                active.setSubscriber(stream);
            } else {

            }
        }

        const subscriber = active.subscriber;

        if (subscriber) {

            subscriber.on('destroyed', () => {
                session.unsubscribe(subscriber);
            })
        }
    });

    session.on('connectionCreated', e => {
        console.log('connectionCreated : ', e);
    });

    session.on('connectionDestroyed', function*(e) {
        console.log('connectionDestroyed : ', e);
    });

    session.on('signal:msg', e => {
        const msg = document.createElement('p');
        msg.innerText = e.data;
        msg.style.backgroundColor = e.from.connectionId === session.connection.connectionId ? '#fff' : '#00F';
        msg.style.color = e.from.connectionId === session.connection.connectionId ? '#000' : '#fff';
        document.getElementById('chatBox').appendChild(msg);
        msg.scrollIntoView();
    });


    active.connect();
}

function* chat(active) {
    const session = active.session;
    console.log('OK CHAT CHAT ');

    while (true) {
        const payload = yield take(SEND_MESSAGE);
        console.log(payload);

        session.signal({
            type: 'msg',
            data: payload.message,
        }, error => {
            if (error) {
                console.error(error);
            } else {
                document.getElementById('textInput').value = '';
            }
        })
    }
}