import ContactCollection from '../db/models/contacts.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (contactId) =>
  ContactCollection.findOne({ _id: contactId });
