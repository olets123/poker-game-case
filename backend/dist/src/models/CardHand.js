"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CardHandSchema = new mongoose_1.default.Schema({
    cards: [String],
    rankings: String,
}, {
    timestamps: true,
});
const CardHand = mongoose_1.default.model('CardHand', CardHandSchema);
exports.default = CardHand;
