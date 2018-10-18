import React, {Component, Fragment}            from 'react';
import { logger }                              from 'redux-logger';
import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware                    from 'redux-saga';
import { Provider }                            from 'react-redux';
import reducers                                from './reducers/reducers';
import mainSaga                                from './sagas/mainSaga';
import './App.scss';
import VisioComponent                          from './component/VisioComponent';

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
                <Fragment>
                    <h2>Hello Motto !</h2>
                    <VisioComponent/>
                </Fragment>
            </Provider>
        )
    }
}

export default App;