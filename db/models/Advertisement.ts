import mongoose from "mongoose";


// Объявление
const Advertisement = new mongoose.Schema(
	{
		title: String,
		price: String,
		currency: String,
		url: { type: String, unique: true },
		image: String,
		description: String,
		date: String,
		sellerName: String,
		sellerRating: String,
		location: String,
		scenario: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Scenario',
			required: true,
		},
	},
	{ timestamps: true }
);



export default mongoose.model('Ad', Advertisement)