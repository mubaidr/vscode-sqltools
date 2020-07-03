import React from 'react';
import { render } from 'react-dom';
import SettingsScreen from './Screen';
import '../../sass/theme.scss';
import '../../sass/jsonschema.form.scss';

render(<SettingsScreen />, document.getElementById('app-root'));