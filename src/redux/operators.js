import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get(
      'https://64924751428c3d2035d00120.mockapi.io/contacts'
    );
    return response.data;
  } catch (err) {
    return err;
  }
});
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async user => {
    try {
      const response = await axios.post(
        'https://64924751428c3d2035d00120.mockapi.io/contacts',
        user
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async userId => {
    try {
      const response = await axios.delete(
        `https://64924751428c3d2035d00120.mockapi.io/contacts/${userId}`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
