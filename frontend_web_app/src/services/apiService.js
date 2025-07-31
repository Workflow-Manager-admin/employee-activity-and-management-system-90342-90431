import axios from 'axios';

// PUBLIC_INTERFACE
// API service configuration with environment variable support
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000;

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error responses
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// PUBLIC_INTERFACE
// Authentication API methods
export const authAPI = {
  /**
   * Login user with credentials
   * @param {Object} credentials - User login credentials
   * @returns {Promise} API response
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  /**
   * Logout current user
   * @returns {Promise} API response
   */
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('authToken');
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} API response
   */
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Work Log API methods
export const workLogAPI = {
  /**
   * Submit new work log entry
   * @param {Object} logData - Work log data
   * @returns {Promise} API response
   */
  submitLog: async (logData) => {
    const formData = new FormData();
    Object.keys(logData).forEach(key => {
      if (logData[key] !== null && logData[key] !== undefined) {
        formData.append(key, logData[key]);
      }
    });
    
    const response = await apiClient.post('/work-logs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Get work logs for current user
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getLogs: async (params = {}) => {
    const response = await apiClient.get('/work-logs', { params });
    return response.data;
  },

  /**
   * Update existing work log
   * @param {string} logId - Log ID
   * @param {Object} logData - Updated log data
   * @returns {Promise} API response
   */
  updateLog: async (logId, logData) => {
    const response = await apiClient.put(`/work-logs/${logId}`, logData);
    return response.data;
  },

  /**
   * Delete work log
   * @param {string} logId - Log ID
   * @returns {Promise} API response
   */
  deleteLog: async (logId) => {
    const response = await apiClient.delete(`/work-logs/${logId}`);
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Leave Request API methods
export const leaveAPI = {
  /**
   * Submit leave request
   * @param {Object} leaveData - Leave request data
   * @returns {Promise} API response
   */
  submitRequest: async (leaveData) => {
    const response = await apiClient.post('/leave-requests', leaveData);
    return response.data;
  },

  /**
   * Get leave requests for current user
   * @returns {Promise} API response
   */
  getRequests: async () => {
    const response = await apiClient.get('/leave-requests');
    return response.data;
  },

  /**
   * Get team leave requests (for managers)
   * @returns {Promise} API response
   */
  getTeamRequests: async () => {
    const response = await apiClient.get('/leave-requests/team');
    return response.data;
  },

  /**
   * Approve or reject leave request
   * @param {string} requestId - Request ID
   * @param {string} action - 'approve' or 'reject'
   * @param {string} note - Optional note
   * @returns {Promise} API response
   */
  processRequest: async (requestId, action, note = '') => {
    const response = await apiClient.put(`/leave-requests/${requestId}/${action}`, { note });
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Employee Management API methods (Admin only)
export const employeeAPI = {
  /**
   * Get all employees
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getEmployees: async (params = {}) => {
    const response = await apiClient.get('/employees', { params });
    return response.data;
  },

  /**
   * Create new employee
   * @param {Object} employeeData - Employee data
   * @returns {Promise} API response
   */
  createEmployee: async (employeeData) => {
    const response = await apiClient.post('/employees', employeeData);
    return response.data;
  },

  /**
   * Update employee
   * @param {string} employeeId - Employee ID
   * @param {Object} employeeData - Updated employee data
   * @returns {Promise} API response
   */
  updateEmployee: async (employeeId, employeeData) => {
    const response = await apiClient.put(`/employees/${employeeId}`, employeeData);
    return response.data;
  },

  /**
   * Delete employee
   * @param {string} employeeId - Employee ID
   * @returns {Promise} API response
   */
  deleteEmployee: async (employeeId) => {
    const response = await apiClient.delete(`/employees/${employeeId}`);
    return response.data;
  },

  /**
   * Bulk import employees from CSV
   * @param {File} csvFile - CSV file
   * @returns {Promise} API response
   */
  bulkImport: async (csvFile) => {
    const formData = new FormData();
    formData.append('csv', csvFile);
    
    const response = await apiClient.post('/employees/bulk-import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Team Management API methods (Manager only)
export const teamAPI = {
  /**
   * Get team logs
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getTeamLogs: async (params = {}) => {
    const response = await apiClient.get('/team/logs', { params });
    return response.data;
  },

  /**
   * Submit feedback for team member log
   * @param {string} logId - Log ID
   * @param {string} feedback - Feedback text
   * @returns {Promise} API response
   */
  submitFeedback: async (logId, feedback) => {
    const response = await apiClient.post(`/team/logs/${logId}/feedback`, { feedback });
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Reporting API methods (Admin/Manager)
export const reportingAPI = {
  /**
   * Generate report
   * @param {Object} reportParams - Report parameters
   * @returns {Promise} API response
   */
  generateReport: async (reportParams) => {
    const response = await apiClient.post('/reports/generate', reportParams);
    return response.data;
  },

  /**
   * Export data to PDF
   * @param {Object} exportParams - Export parameters
   * @returns {Promise} Blob response
   */
  exportToPDF: async (exportParams) => {
    const response = await apiClient.post('/reports/export/pdf', exportParams, {
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Export data to Excel
   * @param {Object} exportParams - Export parameters
   * @returns {Promise} Blob response
   */
  exportToExcel: async (exportParams) => {
    const response = await apiClient.post('/reports/export/excel', exportParams, {
      responseType: 'blob',
    });
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Notifications API methods
export const notificationAPI = {
  /**
   * Get notifications for current user
   * @returns {Promise} API response
   */
  getNotifications: async () => {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   * @returns {Promise} API response
   */
  markAsRead: async (notificationId) => {
    const response = await apiClient.put(`/notifications/${notificationId}/read`);
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Dashboard and Analytics API methods
export const dashboardAPI = {
  /**
   * Get dashboard statistics for current user
   * @returns {Promise} API response with user-specific stats
   */
  getStats: async () => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  /**
   * Get team statistics (for managers)
   * @returns {Promise} API response with team stats
   */
  getTeamStats: async () => {
    const response = await apiClient.get('/dashboard/team-stats');
    return response.data;
  },

  /**
   * Get system statistics (for admins)
   * @returns {Promise} API response with system-wide stats
   */
  getSystemStats: async () => {
    const response = await apiClient.get('/dashboard/system-stats');
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Audit Trail API methods (Admin only)
export const auditAPI = {
  /**
   * Get audit trail entries
   * @param {Object} params - Query parameters (limit, offset, etc.)
   * @returns {Promise} API response with audit entries
   */
  getAuditTrail: async (params = {}) => {
    const response = await apiClient.get('/audit-trail', { params });
    return response.data;
  }
};

// PUBLIC_INTERFACE
// Calendar API methods
export const calendarAPI = {
  /**
   * Get calendar events for a specific month
   * @param {number} year - Year
   * @param {number} month - Month (0-11)
   * @returns {Promise} API response with calendar events
   */
  getCalendarEvents: async (year, month) => {
    const response = await apiClient.get('/calendar/events', {
      params: { year, month }
    });
    return response.data;
  },

  /**
   * Get current user's calendar events
   * @param {Object} params - Date range parameters
   * @returns {Promise} API response with user's events
   */
  getUserEvents: async (params = {}) => {
    const response = await apiClient.get('/calendar/user-events', { params });
    return response.data;
  }
};

// Export the configured axios instance for custom requests
export default apiClient;
