import { SET_LAST_UPDATED, SET_UPDATED_COUNT } from '../constants';

export const setLastUpdated = payload => ({
    type: SET_LAST_UPDATED,
    payload
});

export const setUpdatedCount = () => ({
    type: SET_UPDATED_COUNT
});
