export interface IPayout extends Document {
    recipient: mongoose.Types.ObjectId;
    amount: number;
    round: number;
    date: Date;
}

const PayoutSchema: Schema = new Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    round: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

export default mongoose.model<IPayout>('Payout', PayoutSchema);