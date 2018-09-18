import React, {Component} from 'react';
import { logger } from 'redux-logger';
import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducers from './reducers';
import mainSaga from './mainSaga';

import VisioComponent from './visio/component/VisioComponent';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(
            sagaMiddleware,
            logger
        )
    )
)

sagaMiddleware.run(mainSaga);

class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <h2>Hello Motto !</h2>
                <VisioComponent/>
            </Provider>
        )
    }
}

export default App;