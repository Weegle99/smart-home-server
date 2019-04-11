import * as mongoose from "mongoose";
import { isNil } from "ramda";

const Schema = mongoose.Schema;

const yeelightSchema = new Schema({
  deviceId: String,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },
  name: String,
  power: Boolean,
  bright: Number,
  rgb: Number,
  ct: Number,
  color_mode: Number,
  connected: Boolean
});

const Yeelight = mongoose.model("Yeelight", yeelightSchema);

export const upsertYeelight = (deviceId, props) =>
  Yeelight.findOneAndUpdate({ deviceId }, props, { upsert: true }).exec();

export const upsertYeelightWithRoom = (id, roomId) =>
  Yeelight.findByIdAndUpdate(id, { room: roomId }).exec();

export const getYeelights = () =>
  Yeelight.find(
    {},
    "deviceId name power bright rgb connected ct color_mode"
  ).exec();

export const getYeelight = ({ deviceId }) =>
  Yeelight.findOne(
    { deviceId },
    "deviceId name power bright rgb connected ct color_mode"
  ).exec();

export const findYeelightByDeviceId = deviceId =>
  Yeelight.findOne({ deviceId }).exec();

export const getRoomFromYeelight = deviceId =>
  Yeelight.findOne({ deviceId })
    .populate("room")
    .exec();