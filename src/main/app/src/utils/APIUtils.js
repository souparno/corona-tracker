import { API_ROOT_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function updatelog(){ 
    return request({
        url: API_ROOT_URL + "/updatelog",
        method: 'GET',
    });
}

export function _timeseries(){ 
    return request({
        url: API_ROOT_URL + "/timeseries",
        method: 'GET',
    });
}


export function timeseriesState(stateCode){ 
    return request({
      url: API_ROOT_URL + "/timeseries/" + stateCode,
        method: 'GET',
    });
}

export function _data(){ 
    return request({
        url: API_ROOT_URL + "/data",
        method: 'GET',
    });
}

export function login(loginRequest) {
    return request({
        url: API_ROOT_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_ROOT_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_ROOT_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_ROOT_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_ROOT_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_ROOT_URL + "/users/" + username,
        method: 'GET'
    });
}

