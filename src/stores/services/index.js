import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/auth/authenticate', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', JSON.stringify(response.data.accessToken));
          localStorage.setItem('refresh_token', JSON.stringify(response.data.refreshToken));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/auth/register', user);
  }
}

class CompanyService {
  update(company) {
    return axios.put(API_URL + "/company", company, { headers: authHeader() });
  }

  get() {
    return axios.get(API_URL + "/company/get", { headers: authHeader() });
  }
}

class UserService {
  updatePhone(updateUserRequest) {
    return axios.patch(API_URL + '/users/phone', updateUserRequest, { headers: authHeader() });
  }

  updatePosition(userId, position) {
    return axios.patch(API_URL + '/users/position/' + userId, position, { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + '/users', { headers: authHeader() });
  }
}

export const userService = new UserService();
export const companyService = new CompanyService();
export const authService = new AuthService();