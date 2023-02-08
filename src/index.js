import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthCtxProvider } from './components/store/auth-provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthCtxProvider><App /></AuthCtxProvider>);
