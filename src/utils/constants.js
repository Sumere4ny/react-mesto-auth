
const token = localStorage.getItem('token')
const jwt = token ? token : "";

const requestParams = {
  baseUrl: "http://api.sumere4ny.students.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${jwt}`,
  },
};

export default requestParams
