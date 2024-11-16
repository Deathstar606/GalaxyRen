import * as ActionTypes from './ActionTypes';
import { CASES } from '../data/case';

export const fetchCases = () => (dispatch) => {
    dispatch(casesLoading(true));

    try {
        dispatch(addCases(CASES));
    } catch (error) {
        dispatch(casesFailed(error.message));
    }
};

export const casesLoading = () => ({
    type: ActionTypes.CASE_LOADING
});

export const casesFailed = (errmess) => ({
    type: ActionTypes.CASE_FAILED,
    payload: errmess
});

export const addCases = (cases) => ({
    type: ActionTypes.ADD_CASE,
    payload: cases
});
