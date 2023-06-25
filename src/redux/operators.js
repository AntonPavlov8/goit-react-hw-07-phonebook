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
  async data => {
    const { contacts, name, phone } = data;

    if (contacts.filter(person => person.name === name).length === 0) {
      if (contacts.filter(person => person.phone === phone).length === 0) {
        try {
          const response = await axios.post(
            'https://64924751428c3d2035d00120.mockapi.io/contacts',
            { name, phone }
          );
          return response.data;
        } catch (err) {
          return err;
        }
      } else alert(`Person with number ${phone} is already in contacts`);
    } else alert(`${name} is already in contacts`);
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
// dispatch(
//         addContact({
//           name,
//           phone,
//         })
//       ).then(() => dispatch(fetchContacts()));
