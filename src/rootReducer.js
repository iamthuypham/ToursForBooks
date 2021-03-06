import { combineReducers } from 'redux';

import ToursReducer from './tour/reducer';
import MessageReducer from './page/reducer';

export default combineReducers({
    ToursReducer,
    MessageReducer,
});