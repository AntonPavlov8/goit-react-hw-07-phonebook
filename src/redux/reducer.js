const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  contacts: [],
  filter: '',
};
const rootReducer = createSlice({
  name: 'root',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    deleteContact: (state, action) => {
      const newState = [];
      state.contacts.forEach(contact => {
        if (contact.id !== action.payload) {
          newState.push(contact);
        }
      });

      state.contacts = newState;
    },
    setContacts: (state, action) => {
      if (
        state.contacts.filter(contact => {
          return contact.name === action.payload.name;
        }).length === 0
      ) {
        if (
          state.contacts.filter(contact => {
            return contact.number === action.payload.number;
          }).length === 0
        ) {
          state.contacts = [
            ...state.contacts,
            {
              id: action.payload.id,
              name: action.payload.name,
              number: action.payload.number,
            },
          ];
        } else {
          alert(
            `Person with number ${action.payload.number} is already in contacts.`
          );
        }
      } else {
        alert(`${action.payload.name} is already in contacts.`);
      }
    },
  },
});
export const { changeFilter, setContacts, deleteContact } = rootReducer.actions;

export default rootReducer.reducer;
