import { toast } from '@/components/ui/toast';
import axiosInstance from 'axios';

const API_URL = "http://localhost:8080/api/v1";

const axios = axiosInstance.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 403 error globally
    if (error.response && error.response.status === 403) {
      toast({ title: "An error occurred! Please login", variant: 'destructive' })
      authService.logout()
      window.location.reload();
    }

    // Further error handling
    return Promise.reject(error);
  }
);

function authHeader() {
  const token = JSON.parse(localStorage.getItem('access_token'));

  if (token) {
    return { Authorization: 'Bearer ' + token, "Content-Type": 'application/json' };
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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
    return axios.put(API_URL + '/users/position/' + userId, position, { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + '/users', { headers: authHeader() });
  }
}

export const userService = new UserService();
export const companyService = new CompanyService();
export const authService = new AuthService();