    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    export const RoleApiClient = {
      getAll: async ({ page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', filters = {} }) => {
        try {
          const response = await fetch(`${API_BASE_URL}/role?${
    new URLSearchParams ({
        page, limit, sortBy, sortOrder, ...filters
    })
}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching Roles:', error);
          throw error;
        }
      },

      getById: async (id) => {
        try {
          const response = await fetch(`${API_BASE_URL}/role/${id}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(`Error fetching Role by ID:`, error);
          throw error;
        }
      },

      create: async (data) => {
        try {
          const response = await fetch(`${API_BASE_URL}/role`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          if(!response.status>=400){
                throw result;
          }
          return result;
        } catch (error) {
          console.error(`Error creating Role:`, error);
          throw error;
        }
      },

      update: async (id, data) => {
        try {
          const response = await fetch(`${API_BASE_URL}/role/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          if(!response.status>=400){
                throw result;
          }
          return result;
        } catch (error) {
          console.error(`Error updating Role:`, error);
          throw error;
        }
      },

      delete: async (id) => {
        try {
          await fetch(`${API_BASE_URL}/role/${id}`, { method: 'DELETE' });
          console.log(`Role with ID ${id} successfully deleted`);
        } catch (error) {
          console.error(`Error deleting Role:`, error);
          throw error;
        }
      },

      
    };

