// API service for communicating with the Hexapure backend
const API_BASE_URL = import.meta.env.BACKEND_URL || 'https://hexapurebackend.onrender.com';

class ApiService {
    async sendContactForm(formData) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/health`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Health check error:', error);
            throw error;
        }
    }
}

export default new ApiService();