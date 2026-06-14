import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  city: string;
  conference: 'East' | 'West';
  championships: number;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  conference: { type: String, enum: ['East', 'West'], required: true },
  championships: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<ITeam>('Team', TeamSchema);