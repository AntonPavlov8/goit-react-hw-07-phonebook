import { useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addContact, fetchContacts } from 'redux/operators';

import { Contacts } from './Contacts';

export const PhoneBook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  let formRef = useRef();

  const contacts = useSelector(state => state.contacts.items, shallowEqual);
  const previousCountRef = useRef(contacts);
  const isStateChanged = previousCountRef.current !== contacts;

  useEffect(() => {
    if (isStateChanged) {
      formRef.current.reset();
    }
  }, [contacts, isStateChanged]);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
    if (contacts.filter(person => person.name === name).length === 0) {
      if (contacts.filter(person => person.phone === phone).length === 0) {
        dispatch(
          addContact({
            name,
            phone,
          })
        ).then(() => dispatch(fetchContacts()));
      } else alert(`Person with number ${phone} is already in contacts`);
    } else alert(`${name} is already in contacts`);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          border: '1px #000 solid',
          width: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '280px',
          padding: '48px 24px',
        }}
      >
        <span>Name</span>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(['-][a-zA-Zа-яА-Я ]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
        />
        <span>Number</span>
        <input
          type="tel"
          name="phone"
          pattern="^(?:\+?\d{1,3})?\d+$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button action="submit">Add contact</button>
      </form>
      <Contacts />
    </div>
  );
};
