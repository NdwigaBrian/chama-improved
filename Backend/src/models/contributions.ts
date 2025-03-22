export interface IContribution extends Document {
    user: mongoose.Types.ObjectId;
    amount: number;
    round: number;
    date: Date;
}

const ContributionSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    round: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

export default mongoose.model<IContribution>('Contribution', ContributionSchema);