import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: typeList[0],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateSettings);

contactSchema.post('findOneAndUpdate', handleSaveError);

export const contactsSortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

const ContactsCollection = model('contact', contactSchema);

export default ContactsCollection;
