import { Router } from 'express';
import { AuthRoutes } from '../modules/user/user.route';
import { PrayerTimeRoutes } from '../modules/timezone/timezone.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/times',
    route: PrayerTimeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
