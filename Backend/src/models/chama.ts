import mongoose, { Schema } from "mongoose";

export interface IChamaBank extends Document {
    totalSavings: number;
    transactions: { amount: number; date: Date }[];
}

const ChamaBankSchema: Schema = new Schema({
    totalSavings: { type: Number, default: 0 },
    transactions: [{
        amount: Number,
        date: { type: Date, default: Date.now }
    }]
});

export default mongoose.model<IChamaBank>('ChamaBank', ChamaBankSchema);