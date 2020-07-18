import axios from 'axios';

const getQueryParametersWithSessionId = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/queryParameter/${sessionId}`)
    .then((result) => resolve(result.data))
    .catch((errorFromQueryParameterData) => reject(errorFromQueryParameterData));
});

const addQueryLocationToSession = (queryToAdd) => axios.post('https://localhost:44347/api/queryParameter/addQueryParam', queryToAdd);

const updateQueryNames = (sessionId, updatedQuery) => axios.put(`https://localhost:44347/api/queryParameter/updateQueryName/${sessionId}`, updatedQuery);

export default { getQueryParametersWithSessionId, addQueryLocationToSession, updateQueryNames };
