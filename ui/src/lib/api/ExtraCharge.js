    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    export const ExtraChargeApiClient = {
      getAll: async ({ page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', filters = {} }) => {
        try {
          const response = await fetch(`${API_BASE_URL}/extracharge?${
    new URLSearchParams ({
        page, limit, sortBy, sortOrder, ...filters
    })
}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching ExtraCharges:', error);
          throw error;
        }
      },

      getById: async (id) => {
        try {
          const response = await fetch(`${API_BASE_URL}/extracharge/${id}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(`Error fetching ExtraCharge by ID:`, error);
          throw error;
        }
      },

      create: async (data) => {
        try {
          const response = await fetch(`${API_BASE_URL}/extracharge`, {
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
          console.error(`Error creating ExtraCharge:`, error);
          throw error;
        }
      },

      update: async (id, data) => {
        try {
          const response = await fetch(`${API_BASE_URL}/extracharge/${id}`, {
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
          console.error(`Error updating ExtraCharge:`, error);
          throw error;
        }
      },

      delete: async (id) => {
        try {
          await fetch(`${API_BASE_URL}/extracharge/${id}`, { method: 'DELETE' });
          console.log(`ExtraCharge with ID ${id} successfully deleted`);
        } catch (error) {
          console.error(`Error deleting ExtraCharge:`, error);
          throw error;
        }
      },

      
    };

