import axios from 'axios';

const getQueryParametersWithSessionId = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/queryParameter/${sessionId}`)
    .then((result) => resolve(result.data))
    .catch((errorFromQueryParameterData) => reject(errorFromQueryParameterData));
});

const addQueryLocationToSession = (queryToAdd) => axios.post('https://localhost:44347/api/queryParameter/addQueryParam', queryToAdd);

export default { getQueryParametersWithSessionId, addQueryLocationToSession };
