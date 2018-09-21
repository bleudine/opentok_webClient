import { all, call, takeEvery, put}      from 'redux-saga/effects';
import {opentokSession as activeSession} from '../utils/opentokSession';
import {INIT_VISIO_CHAT}                 from '../actions/actions';

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

    session.on('streamCreated', e => {
        console.log('streamCreated : ', e);
        const { stream } = e;

        active.setStream(stream);
        active.setSubscriber(stream);
        const subscriber = active.subscriber;

        subscriber.on('destroyed', () => {
            session.unsubscribe(subscriber);
        })
    });

    session.on('connectionCreated', e => {
        console.log('connectionCreated : ', e);

        active.initPublisher();
        session.publish(active.publisher);
    });

    session.on('connectionDestroyed', function*(e) {
        console.log('connectionDestroyed : ', e);
    });

    session.on('signal', e => {
        console.log('signal : ', e);
    });


    active.connect();
}