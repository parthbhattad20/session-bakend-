const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  


const app = express();
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']  
}));

app.use(bodyParser.json());


mongoose.connect('mongodb+srv://Session:Session@parthdb.douis99.mongodb.net/?retryWrites=true&w=majority&appName=ParthDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const feedbackSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  feedback: { type: String, required: true },
  rating:{type:Number,required:true},
  speakers:{type:Number,required:true}
});


const Feedback = mongoose.model('Feedback', feedbackSchema);


app.post('/feedback', async (req, res) => {
  try {
    const { fullName, feedback,rating,speakers } = req.body;
    const newFeedback = new Feedback({ fullName, feedback,rating,speakers});
    await newFeedback.save();
    
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting feedback', error: err });
  }
});


const PORT = process.env.PORT || 8005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//done ythe adkfjaosdkjf
