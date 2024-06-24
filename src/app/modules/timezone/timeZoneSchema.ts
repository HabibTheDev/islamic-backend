import mongoose, { Schema } from 'mongoose';

const prayerTimeSchema: Schema = new mongoose.Schema({
  day: { type: Number, required: true },
  fajrBegins: String,
  fajrIqama: String,
  sunrise: String,
  zuhrBegins: String,
  zuhrIqama: String,
  asrBegins: String,
  asrIqama: String,
  sunset: String,
  ishaBegins: String,
  ishaIqama: String,
  jumah1Iqama: String,
  jumah2Iqama: String,
});

export default prayerTimeSchema;
