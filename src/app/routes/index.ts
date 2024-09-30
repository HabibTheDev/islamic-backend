import { Router } from 'express';
import { AuthRoutes } from '../modules/user/user.route';
import { PrayerTimeRoutes } from '../modules/timezone/timezone.route';
import { BlogRoutes } from '../modules/announcement/announcement.route';
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
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
