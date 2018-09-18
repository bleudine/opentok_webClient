import { all, call} from 'redux-saga/effects';
import OT           from "@opentok/client";

export default function* mainSaga() {
    console.log('WELL GOOD JOMB');
}

function* openTokSession() {
    const session = OT.initSession('46189992', '');
}

class activeSession {
    constructor(request) {
        this.tokbox = request.tokbox;
        this.tokboxSession = OT.initSession(Config.VISIO_CLIENT_ID, this.tokbox.sessionId);
        this.sessionSubscriber = null;
        this.sessionPublisher = null;
        this.currentStream = null;
    }

    onPublish(error) {
        if (error) {
            console.error(error);
        }
    }

    onSubscribe(error) {
        if (error) {
            console.error(error);
        }
    }

    onConnection(error) {
        if (error) {
            console.error(error);
        }
    }

    initPublisher(onPublish = this.onPublish) {
        this.sessionPublisher = OT.initPublisher('helper_preview', {
            insertMode: 'append',
            width: '100%',
            height: '100%',
        }, onPublish)
    }

    setSubscriber(stream, onSubscribe = this.onSubscribe) {
        this.sessionSubscriber= this.tokboxSession.subscribe(stream, 'user_preview', {
            insertMode: 'append',
            width: '100%',
            height: '100%',
            fitMode: 'contain',
        })
    }

    setStream(stream) {
        this.currentStream = stream;
    }

    get session() {
        return this.tokboxSession;
    }

    get publisher() {
        return this.sessionPublisher;
    }

    get subscriber() {
        return this.sessionSubscriber;
    }

    get stream() {
        return this.currentStream;
    }

    connect() {
        return this.session.connect(this.tokbox.token, this.onConnection);
    }

    disconnect() {
        return this.session.disconnect();
    }
}