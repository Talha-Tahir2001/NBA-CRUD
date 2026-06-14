import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
  team: string;
  position: string;
  jerseyNumber: number;
  pointsPerGame: number;
  isAllStar: boolean;
}

const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  position: { type: String, required: true, enum: ['PG', 'SG', 'SF', 'PF', 'C'] },
  jerseyNumber: { type: Number, required: true },
  pointsPerGame: { type: Number, default: 0 },
  isAllStar: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IPlayer>('Player', PlayerSchema);