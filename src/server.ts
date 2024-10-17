import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loanApplication')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Create a Mongoose schema for loan applications
const loanSchema = new mongoose.Schema({
  fullName: String,
  loanAmount: Number,
  bankAccount: String,
  employmentStatus: String,
  loanReason: String,
  employerAddress: String,
});

const LoanApplication = mongoose.model('LoanApplication', loanSchema);

// POST route for form submissions
app.post('/api/submit', async (req: Request, res: Response) => {
    try {
      const newLoanApplication = new LoanApplication(req.body);
      await newLoanApplication.save();
      res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit application', error });
    }
  });
  

// GET route to get all loan applications (for future dashboard, if needed)
app.get('/api/applications', async (req: Request, res: Response) => {
  try {
    const applications = await LoanApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve applications', error });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
