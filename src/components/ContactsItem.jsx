import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/reducer';

export const ContactsItem = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li>
      {contact.name}
      {': '}
      {contact.number}

      <button type="button" onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </button>
    </li>
  );
};
