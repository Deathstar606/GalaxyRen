import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseurl';

export const fetcTools = () => (dispatch) => {
    dispatch(toolsLoading(true));

    return fetch(baseUrl + 'tools')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(tools => dispatch(addTools(tools)))
        .catch(error => dispatch(toolsFailed(error.message)));
}

export const toolsLoading = () => ({
    type: ActionTypes.TOOL_LOADING
});

export const toolsFailed = (errmess) => ({
    type: ActionTypes.TOOL_FAILED,
    payload: errmess
});

export const addTools = (tools) => ({
    type: ActionTypes.ADD_TOOL,
    payload: tools
});
