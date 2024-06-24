import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  role: {
    type: String,
    enum: ['admin'],
  },
});

userSchema.statics.isUserExists = async (email: number, username: string) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  return existingUser;
};

userSchema.statics.isUserExistsByUserName = async function (email: string) {
  return await User.findOne({ username: email }).select('+password');
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email: email }).select('+password');
};

userSchema.statics.isUserExistsId = async function (id: string) {
  return await User.findById({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isPasswordCompare = async function (
  plainTextPassword,
  hashedPassword,
) {
  if (plainTextPassword === hashedPassword) {
    return false;
  }

  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// bcrypting the password field
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.id;
    delete ret.passwordHistory;
    delete ret.passwordChangedAt;

    return ret;
  },
});

export const User = model<TUser, UserModel>('User', userSchema);
