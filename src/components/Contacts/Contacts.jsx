import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';


import { getContactsList, removeContact } from 'redux/contacts/contacts.slice';
import css from './Contacts.module.css';

const Contacts = () => {
  const contacts = useSelector(getContactsList);
  const value = useSelector(state => state.contacts.filter);

  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const filterContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
  };
  const filterContacts = filterContact();
  return (
    <ul className={css.contactsList}>
      {filterContacts?.map(({ name, contactId, number }) => {
        return (
          <li key={contactId} className={css.item}>
            <span>
              {name}: {number}
            </span>
            <button
              className={css.deleteBtn}
              type="button"
              onClick={() => deleteContact(contactId)}
            >
             Delete <RiDeleteBin6Line />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Contacts;
