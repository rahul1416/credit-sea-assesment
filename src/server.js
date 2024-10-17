"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connect to MongoDB
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/loanApplication')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Create a Mongoose schema for loan applications
const loanSchema = new mongoose_1.default.Schema({
    fullName: String,
    loanAmount: Number,
    bankAccount: String,
    employmentStatus: String,
    loanReason: String,
    employerAddress: String,
});
const LoanApplication = mongoose_1.default.model('LoanApplication', loanSchema);
// POST route for form submissions
app.post('/api/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLoanApplication = new LoanApplication(req.body);
        yield newLoanApplication.save();
        res.status(201).json({ message: 'Application submitted successfully!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to submit application', error });
    }
}));
// GET route to get all loan applications (for future dashboard, if needed)
app.get('/api/applications', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield LoanApplication.find();
        res.status(200).json(applications);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve applications', error });
    }
}));
// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
