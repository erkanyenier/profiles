import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


// An interface that describes the properties
// that are reqired to create a new profile
interface ProfileAttrs {
  username: string;
  name: string;
  surname: string;
  birthDate: Date;
  mailPermision: boolean;
  isProfileActivated: boolean;
  companyTitle: string;
}

// An interface that describes the properties
// that the Profile Model has
interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

// An interface that describes the properties
// that a User Document has
interface ProfileDoc extends mongoose.Document {
  username: string;
  name: string;
  surname: string;
  birthDate: Date;
  mailPermision: boolean;
  isProfileActivated: boolean;
  companyTitle: string;
  version: number;
}

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: false
  },
  birthDate: {
    type: Date,
    required: false
  },
  mailPermision: {
    type: Boolean,
    required: true,
    default: true
  },
  isProfileActivated: {
    type: Boolean,
    required: true,
    default: true
  },
  companyTitle: {
    type: String,
    required: false
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
}

const Profile = mongoose.model<ProfileDoc, ProfileModel>('Profile', profileSchema);

export { Profile };
