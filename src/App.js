import React from 'react';
import './App.css';
import Main from "./ui/1-main/Main"
import store from "./bll/store"
import {Provider} from "react-redux"

const App = () => (
    <Provider store={store}>
        <div className="App">
            <Main/>
        </div>
    </Provider>
)

export default App;
