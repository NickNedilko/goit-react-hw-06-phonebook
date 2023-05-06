import React from 'react';
import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterValue } from 'redux/contacts/contacts.slice';
import { filterContact } from 'redux/contacts/contacts.slice';

const Filter = () => {
  const value = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(filterContact(e.target.value));
  };

  return (
    <div className={css.filterWrapper}>
      <p className={css.filterText}>Find contact by name</p>
      <label htmlFor="">
        <input
          className={css.filterInput}
          type="text"
          value={value}
          onChange={changeFilter}
        />
      </label>
    </div>
  );
};

export default Filter;
