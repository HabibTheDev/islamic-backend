import { Request, Response } from 'express';
import { getPrayerTimes, updatePrayerTime } from './timezone.service';
import { validateUpdate } from './timezone.validation';

/**
 * Get prayer times for a given month.
 * @param {Request} req
 * @param {Response} res
 */
const getPrayerTimesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { month } = req.params;
  try {
    const prayerTimes = await getPrayerTimes(month);
    res.json(prayerTimes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update prayer time for a given day in a given month.
 * @param {Request} req
 * @param {Response} res
 */
const updatePrayerTimeController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { month, day } = req.params;
  const updateData = req.body;

  // Validate input data
  const validationResult = validateUpdate(updateData);
  if (!validationResult.success) {
    res.status(400).json(validationResult.error);
    return;
  }

  try {
    const updatedPrayerTime = await updatePrayerTime(
      month,
      parseInt(day, 10),
      updateData,
    );
    res.json(updatedPrayerTime);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const PrayerTimeControllers = {
  getPrayerTimesController,
  updatePrayerTimeController,
};
