import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export {getlogin ,getuser ,getlistfiles,getgrpnames, getlog};

function getlogin() {
    const url = `${BASE_URL}/logininfo`;
    return axios.get(url).then(response => response.data);
}


function getuser() {
    const url = `${BASE_URL}/userinfo`;
    return axios.get(url).then(response => response.data);
}

function getlistfiles() {
    const url = `${BASE_URL}/listfiles`;
    return axios.get(url).then(response => response.data);
}

function getgrpnames() {
    const url = `${BASE_URL}/getgroups`;
    return axios.get(url).then(response => response.data);
}

function getlog() {
    const url = `${BASE_URL}/log`;
    return axios.get(url).then(response => response.data);
}