import axios from 'axios'

const api = axios.create({
  baseURL: window.location.origin,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    console.log('=== API REQUEST ===');
    console.log('URL:', config.url);
    console.log('Method:', config.method);
    console.log('Token exists:', !!token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Authorization header set');
    }
    console.log('Request config:', config);
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    console.log('=== API RESPONSE ===');
    console.log('URL:', response.config.url);
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    return response
  },
  (error) => {
    console.error('=== API ERROR ===');
    console.error('URL:', error.config?.url);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/auth/login');
      if (!isLoginRequest) {
        console.log('Unauthorized - redirecting to login');
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Database Functions with Express Node Server
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return { success: true, user: response.data.user, token: response.data.token };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const submitDemo = async (demoData) => {
  try {
    const response = await api.post('/api/demo', demoData);
    return { success: true, demo: response.data.demo };
  } catch (error) {
    console.error('Demo submission error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const submitContact = async (contactData) => {
  try {
    const response = await api.post('/api/contact', contactData);
    return { success: true, contact: response.data.contact };
  } catch (error) {
    console.error('Contact submission error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const getAllDemos = async () => {
  try {
    const response = await api.get('/api/demo');
    return { success: true, demos: response.data.demos };
  } catch (error) {
    console.error('Get demos error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const getAllContacts = async () => {
  try {
    const response = await api.get('/api/contact');
    return { success: true, contacts: response.data.contacts };
  } catch (error) {
    console.error('Get contacts error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const updateDemoStatus = async (demoId, status) => {
  try {
    const response = await api.patch(`/api/demo/${demoId}/status`, { status });
    return { success: true, demo: response.data.demo };
  } catch (error) {
    console.error('Update demo status error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const updateContactStatus = async (contactId, status) => {
  try {
    const response = await api.patch(`/api/contact/${contactId}/status`, { status });
    return { success: true, contact: response.data.contact };
  } catch (error) {
    console.error('Update contact status error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await api.post('/api/otp/send', { email });
    return { success: true, message: response.data.message, mockOtp: response.data.mockOtp };
  } catch (error) {
    console.error('Send OTP error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post('/api/otp/verify', { email, otp });
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error('Verify OTP error:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export default api