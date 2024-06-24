import mongoose, { Model } from 'mongoose';
import { IPrayerTime } from './timezone.interface';
import prayerTimeSchema from './timeZoneSchema';

const getPrayerTimeModel = (month: string): Model<IPrayerTime> => {
  const collectionName = `${month}`; // e.g., "prayerTimes_january"
  return mongoose.model<IPrayerTime>(
    collectionName,
    prayerTimeSchema,
    collectionName,
  );
};

export default getPrayerTimeModel;
