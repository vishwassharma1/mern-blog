// backend/src/index.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://vsharma7100:BSA%40vish%40123@nodeapp.pioapum.mongodb.net/wanderon?retryWrites=true&w=majority&appName=nodeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
