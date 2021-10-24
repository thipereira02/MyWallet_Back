import { financeSchema } from "../schemas/FinancesSchema.js";

import * as financesRepository from "../repositories/financesRepository.js";

export async function dataIsValid(value, description) {
    const isValid = financeSchema.validate({value, description});
    if (isValid.error !== undefined) return false;
    return true;
}

export async function getUserId(token) {
    const getUserId = await financesRepository.getUserId(token);
    const userId = getUserId.userId;
    return userId;
}

export async function newFinance(userId, value, description, eventType) {
    const newFinance = await financesRepository.newFinance(userId, value, description, eventType);
}

export async function getUserFinances(userId) {
    const getUserFinances = await financesRepository.getUserFinances(userId);
    return getUserFinances;
}