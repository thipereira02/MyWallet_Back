import joi from "joi";

const financeSchema = joi.object({
	value: joi.number().required(),
	description: joi.string().min(1).max(20).required()
});

export { financeSchema };