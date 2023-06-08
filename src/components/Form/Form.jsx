import React, { useState } from 'react';
import css from './Form.module.css';
import { nanoid } from 'nanoid';
import { BsFillTelephonePlusFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContactsList } from 'redux/contacts/contacts.slice';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispath = useDispatch();
  const contacts = useSelector(getContactsList);

  const inputNameId = nanoid();
  const inputNumberId = nanoid();
  const contactId = nanoid();

  const handleInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('default');
    }
  };

  const formSubmit = e => {
    e.preventDefault();
    const formData = { name, number, contactId };
    const normalazedName = formData.name.toLowerCase();
    if (
      contacts?.find(contact => contact.name.toLowerCase() === normalazedName)
    ) {
      return alert(`${name} is already in contacts`);
    }
    dispath(addContact(formData));
    formReset();
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={formSubmit} className={css.form}>
      <label htmlFor={inputNameId}>
        <span className={css.inputLabel}>Name</span>
        <input
          className={css.formInput}
          id={inputNameId}
          onChange={handleInputChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label htmlFor={inputNumberId}>
        <span className={css.inputLabel}>Tel </span>
        <input
          className={css.formInput}
          id={inputNumberId}
          onChange={handleInputChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.addBtn}>
      <BsFillTelephonePlusFill /> Add contact
      </button>
    </form>
  );
};



export default Form;
