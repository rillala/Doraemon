//Import Axios Library and Auth0
import axios from "axios";

//創建一個axios實例(可以有很多個)
const apiInstance = axios.create({
  // Set a base URL for all requests
  baseURL: "/api",
  // Set a default timeout for all requests (in milliseconds)
  timeout: 5000,
  // Set default headers for all requests
  headers: {
    "Content-Type": "application/json",
  },
});

// 將實例請求封裝
apiInstance.interceptors.request.use(
  async (config) => {
    // 針對token
    // const { getAccessTokenSilently } = useAuth0();
    // const accessToken = await getAccessTokenSilently();
    // config.headers['Authorization'] = accessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;

// 如何使用 apiInstance 去抓回後端資料
//import apiInstance from '@/plugins/auth';

// function getDB() {
//   apiInstance
//     .get("url")
//     .then((response) => {
//       dataList.value = response.data;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
