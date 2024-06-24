import { Document } from 'mongoose';

export interface IPrayerTime extends Document {
  day: number;
  fajrBegins?: string;
  fajrIqama?: string;
  sunrise?: string;
  zuhrBegins?: string;
  zuhrIqama?: string;
  asrBegins?: string;
  asrIqama?: string;
  sunset?: string;
  ishaBegins?: string;
  ishaIqama?: string;
  jumah1Iqama?: string;
  jumah2Iqama?: string;
}
