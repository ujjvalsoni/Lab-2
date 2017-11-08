var axios = require('axios');

const BASE_URL = 'http://localhost:5000';


module.exports = function getdata() {
    const url = `${BASE_URL}/`;
    //console.log(axios.get(url).then(response => response.data));
    return axios.get(url).then(response => response.data);

};
