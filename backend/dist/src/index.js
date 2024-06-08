"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const pokerRoutes_1 = __importDefault(require("./routes/pokerRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = 'mongodb+srv://skogliiii:zK50T7s2ou5BiKmW@poker-cluster.0vumsog.mongodb.net/?retryWrites=true&w=majority&appName=poker-cluster';
console.log(process.env.MONGO_DB_URI);
const start = async () => {
    try {
        await mongoose_1.default.connect(uri);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};
start();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use('/api', pokerRoutes_1.default);
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
exports.default = app;
