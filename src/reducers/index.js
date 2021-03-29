import { format }  from 'date-fns';
import { SET_LAST_UPDATED, SET_UPDATED_COUNT } from '../constants';

export const initialState = {
  lastUpdated: null,
  updatedCount: 0
};

const rootReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_LAST_UPDATED:
      return {
        ...state,
        lastUpdated: format(payload, 'M/dd hh:mmaa'),
        updatedCount: state.updatedCount + 1
      };
    case SET_UPDATED_COUNT:
      return { ...state, updatedCount: state.updatedCount + 1 };
    default:
      return state || initialState;
    }
};

export default rootReducer;
