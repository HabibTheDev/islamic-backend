import { z } from 'zod';
import { IPrayerTime } from './timezone.interface';

const prayerTimeSchema = z.object({
  day: z.number(),
  fajrBegins: z.string().optional(),
  fajrIqama: z.string().optional(),
  sunrise: z.string().optional(),
  zuhrBegins: z.string().optional(),
  zuhrIqama: z.string().optional(),
  asrBegins: z.string().optional(),
  asrIqama: z.string().optional(),
  sunset: z.string().optional(),
  ishaBegins: z.string().optional(),
  ishaIqama: z.string().optional(),
  jumah1Iqama: z.string().optional(),
  jumah2Iqama: z.string().optional(),
});

const validateUpdate = (data: Partial<IPrayerTime>) => {
  try {
    prayerTimeSchema.parse(data);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.errors };
  }
};

export { validateUpdate };
