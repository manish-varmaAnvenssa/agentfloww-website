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
      console.log('Unauthorized - redirecting to login');
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Database Functions using PHP API
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api.php?action=login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export const submitDemo = async (demoData) => {
  try {
    const response = await api.post('/api.php?action=demo', demoData);
    return response.data;
  } catch (error) {
    console.error('Demo submission error:', error);
    return { success: false, error: error.message };
  }
};

export const submitContact = async (contactData) => {
  try {
    const response = await api.post('/api.php?action=contact', contactData);
    return response.data;
  } catch (error) {
    console.error('Contact submission error:', error);
    return { success: false, error: error.message };
  }
};

export const getAllDemos = async () => {
  try {
    const response = await api.get('/api.php?action=demos');
    return response.data;
  } catch (error) {
    console.error('Get demos error:', error);
    return { success: false, error: error.message };
  }
};

export const getAllContacts = async () => {
  try {
    const response = await api.get('/api.php?action=contacts');
    return response.data;
  } catch (error) {
    console.error('Get contacts error:', error);
    return { success: false, error: error.message };
  }
};

export const updateDemoStatus = async (demoId, status) => {
  try {
    const response = await api.post('/api.php?action=updateDemo', { demoId, status });
    return response.data;
  } catch (error) {
    console.error('Update demo status error:', error);
    return { success: false, error: error.message };
  }
};

export const updateContactStatus = async (contactId, status) => {
  try {
    const response = await api.post('/api.php?action=updateContact', { contactId, status });
    return response.data;
  } catch (error) {
    console.error('Update contact status error:', error);
    return { success: false, error: error.message };
  }
};

export default api 