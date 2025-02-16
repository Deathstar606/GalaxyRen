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

export const fetchContacts = () => (dispatch) => {
    dispatch(contactLoading(true));

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    return fetch(baseUrl + "contact", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}` // Attach token here
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("HEy NIGGA");
            return response.json();
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    })
    .then(tools => dispatch(addContacts(tools)))
    .catch(error => dispatch(contactFailed(error.message)));
};

export const contactLoading = () => ({
    type: ActionTypes.CONTACT_LOADING
});

export const contactFailed = (errmess) => ({
    type: ActionTypes.CONTACT_FAILED,
    payload: errmess
});

export const addContacts = (contacts) => ({
    type: ActionTypes.ADD_CONTACT,
    payload: contacts
});

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));

            dispatch(fetchContacts());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}
// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}
