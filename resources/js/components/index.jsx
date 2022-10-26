import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/js/bootstrap';
import '../../css/app.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';

if (document.getElementById('app')) {

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('app')
    );

}
