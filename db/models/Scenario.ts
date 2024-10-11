import mongoose from 'mongoose';


// Поисковой запрос
const ScenarioSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		query: { type: String, required: true },
		interval: { type: Number, required: true },
		minCost: { type: Number, required: true },
		maxCost: { type: Number, required: true },
		strictSearch: { type: String, required: true },
		isActive: { type: Boolean, default: true },
		lastRun: { type: Date },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

export default mongoose.model('Scenario', ScenarioSchema);
