import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },

    removeContact: (state, { payload }) => {
      state.contacts = state.contacts.filter(
        contact => contact.contactId !== payload
      );
    },
    filterContact: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

console.log(contactsSlice);

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const getFilterValue = state => state.contacts.value;
export const getContactsList = state => state.contacts.contacts;

export const { addContact, removeContact, filterContact } =
  contactsSlice.actions;
