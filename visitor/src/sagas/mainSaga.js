import { all, call, takeEvery, put, fork, take}      from 'redux-saga/effects';
import {opentokSession as activeSession} from '../utils/opentokSession';
import {INIT_VISIO_CHAT}                 from '../actions/actions';
import { SEND_MESSAGE, RECEIVED_MESSAGE}                   from '../actions/actions';

const { Config } = process.env;

export default function* mainSaga() {
    console.log('WELL GOOD JOMB');
    yield all([
        takeEvery(INIT_VISIO_CHAT, initSession)
    ])
}

function* initSession() {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    const sessionId = url.searchParams.get('sessionId');

    yield call(openTokSession, {token, sessionId, apiKey: Config.VISIO_CLIENT_ID})
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

            active.setStream(stream);
            active.setSubscriber(stream);
        }

        const subscriber = active.subscriber;

        subscriber.on('destroyed', () => {
            session.unsubscribe(subscriber);
        })
    });

    session.on('connectionCreated', e => {
        console.log('connectionCreated : ', e);

        if (!active.publisher) {

            active.initPublisher();
            session.publish(active.publisher);
        }
    });

    session.on('connectionDestroyed', function*(e) {
        console.log('connectionDestroyed : ', e);
    });

    session.on('signal:msg', e => {
        console.log(e);
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