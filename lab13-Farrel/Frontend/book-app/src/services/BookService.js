// 
import axios from "axios";

const API_URL = "http://localhost:8000/basic/"; // pastikan ini endpoint list/create
// Jika API mount path berbeda (mis. /api/books/), sesuaikan di sini.

export const getAllBooks = async ({ q = "", rating = "" } = {}) => {
  try {
    const params = {};
    if (q) params.q = q;
    if (rating) params.rating = rating;

    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    // If there's a file, send as FormData
    if (bookData.imageFile) {
      const fd = new FormData();
      fd.append("name", bookData.name);
      fd.append("author", bookData.author);
      fd.append("rating", bookData.rating);
      fd.append("image", bookData.imageFile);

      const response = await axios.post(API_URL, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } else {
      // send JSON if no file
      const response = await axios.post(API_URL, {
        name: bookData.name,
        author: bookData.author,
        rating: bookData.rating,
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const updateBook = async (bookId, bookData) => {
  try {
    // If there's an imageFile, do multipart PUT/PATCH
    if (bookData.imageFile) {
      const fd = new FormData();
      if (bookData.name !== undefined) fd.append("name", bookData.name);
      if (bookData.author !== undefined) fd.append("author", bookData.author);
      if (bookData.rating !== undefined) fd.append("rating", bookData.rating);
      fd.append("image", bookData.imageFile);

      const response = await axios.put(`${API_URL}${bookId}/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } else {
      // JSON update
      const payload = {};
      if (bookData.name !== undefined) payload.name = bookData.name;
      if (bookData.author !== undefined) payload.author = bookData.author;
      if (bookData.rating !== undefined) payload.rating = bookData.rating;

      const response = await axios.put(`${API_URL}${bookId}/`, payload);
      return response.data;
    }
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${API_URL}${bookId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
