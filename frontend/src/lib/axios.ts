import { PUBLIC_API_URL } from '$env/static/public';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = Cookies.get('Refresh');

//         const response = await axios.post(`${PUBLIC_API_URL}/tokens/refresh/`, {
//           refresh: refreshToken,
//         });
//         const { access } = response.data;

//         Cookies.set('Access', access, {
//           expires: inFifteenMinutes,
//         });

//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {

//         console.error('Token refresh failed:', refreshError);
//         Cookies.remove('Access');
//         Cookies.remove('Refresh');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
