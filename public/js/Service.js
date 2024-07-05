export class Services {
  async fetchData(endpoint, method, data = null) {
    try {
      const headers = {
      'Content-Type': 'application/json'
    };
      const res = await axios({
        url: `http://localhost:3000/api/${endpoint}`,
        method,
        headers,
        data
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Return the custom JSON object for 404 errors
        return {
          status: 404,
          message: 'Product not found',
          success: false,
          data: error.response.data,  // Include the response data from the server if available
        };
      }
      // For other errors, you can handle them as needed
      console.error(error);
      return {
        status: error.response ? error.response.status : 500,
        message: error.message,
        success: false,
        data: error.response ? error.response.data : null,  // Include the response data from the server if available
      };
    }
  }

  async addProduct(data) {
    return this.fetchData('products', 'POST', data);
  }

  async getProducts() {
    return this.fetchData('products', 'GET');
  }

  async deleteProduct(id) {
    return this.fetchData(`products/${id}`, 'DELETE');
  }

  async getProductById(id) {
    return this.fetchData(`products/${id}`, 'GET');
  }

  async updateProduct(data) {
    return this.fetchData(`products/${data.id}`, 'PUT', data);
  }

  async getBangGia() {
        return this.fetchData('scrape/banggia', 'GET');
  }
}
