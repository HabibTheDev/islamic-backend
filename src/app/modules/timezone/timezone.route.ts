import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { PrayerTimeControllers } from './timezone.controller';
// import prayerTimeSchema from './timeZoneSchema';

const router = express.Router();

router.get('/:month', PrayerTimeControllers.getPrayerTimesController);
router.put('/:month/:day', PrayerTimeControllers.updatePrayerTimeController);

export const PrayerTimeRoutes = router;
