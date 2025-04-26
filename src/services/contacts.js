import { sortList } from '../constants/index.js';
import ContactsCollection from '../db/models/contacts.js';
import { calculationPaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
}) => {
  const skip = (page - 1) * perPage;
  const data = await ContactsCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await ContactsCollection.find().countDocuments();

  const paginationData = calculationPaginationData({
    page,
    perPage,
    totalItems,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (contactId) =>
  ContactsCollection.findOne({ _id: contactId });

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (contactId, payload) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    { $set: payload },
  );

  return updatedContact;
};

export const deleteContactById = (contactId) =>
  ContactsCollection.findOneAndDelete({ _id: contactId });
