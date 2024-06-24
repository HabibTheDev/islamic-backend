import { IPrayerTime } from './timezone.interface';
import getPrayerTimeModel from './timezone.model';

/**
 * Get all prayer times for a given month.
 * @param {string} month
 * @returns {Promise<IPrayerTime[]>}
 */
const getPrayerTimes = async (month: string): Promise<IPrayerTime[]> => {
  const PrayerTime = getPrayerTimeModel(month);
  return await PrayerTime.find();
};

/**
 * Update prayer time for a given day in a given month.
 * @param {string} month
 * @param {number} day
 * @param {Partial<IPrayerTime>} updateData
 * @returns {Promise<IPrayerTime | null>}
 */
const updatePrayerTime = async (
  month: string,
  day: number,
  updateData: Partial<IPrayerTime>,
): Promise<IPrayerTime | null> => {
  const PrayerTime = getPrayerTimeModel(month);
  return await PrayerTime.findOneAndUpdate({ day }, updateData, { new: true });
};

export { getPrayerTimes, updatePrayerTime };
