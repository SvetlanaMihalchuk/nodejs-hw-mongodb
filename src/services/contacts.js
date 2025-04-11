import ContactsCollection from '../db/models/contacts.js';

export const getContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findOne({ _id: contactId });

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (contactId, payload) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    { $set: payload },
    { new: true },
  );

  return updatedContact;
};

export const deleteContactById = (contactId) =>
  ContactsCollection.findOneAndDelete({ _id: contactId });
