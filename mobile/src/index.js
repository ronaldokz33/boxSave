import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['WebSocket']);

import Routes from './routes';

const App = () => <Routes />;

export default App;