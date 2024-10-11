import mongoose from 'mongoose';


// Информация о пользователе telegram
const UserSchema = new mongoose.Schema(
	{
		id: { type: Number, required: true, unique: true },
		is_bot: { type: Boolean },
		first_name: { type: String },
		last_name: { type: String },
		username: { type: String },
		language_code: { type: String },
		is_premium: { type: Boolean },
		added_to_attachment_menu: { type: Boolean },
		can_join_groups: { type: Boolean },
		can_read_all_group_messages: { type: Boolean },
		supports_inline_queries: { type: Boolean },
		botPremiumActive: { type: Boolean },
		botPremiumExpires: { type: Date },
	},
	{ timestamps: true }
);

export default mongoose.model('User', UserSchema);
