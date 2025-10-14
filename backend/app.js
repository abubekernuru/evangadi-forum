// const express = require('express');
// const app = express();
// const cors = require('cors');
// require('dotenv').config();

// // ✅ MIDDLEWARE MUST COME FIRST
// app.use(cors());
// app.use(express.json()); // This is critical for parsing request bodies

// // Import all routes
// const userRoutes = require('./routes/userRoutes');
// const questionRoutes = require('./routes/questionRoutes');
// const answerRoutes = require('./routes/answerRoutes');

// // Import middleware
// const authenticate = require('./middleware/auth');

// // ✅ Routes - AFTER middleware
// app.use('/api/user', userRoutes);
// app.use('/api/question', questionRoutes);
// app.use('/api/answer', answerRoutes);

// // Test route
// app.get('/api/test', (req, res) => {
//     res.json({ 
//         message: '🎉 Evangadi Forum API is working!',
//         status: 'OK', 
//         timestamp: new Date().toISOString()
//     });
// });

// // Demo protected route
// app.get('/api/protected-demo', authenticate, (req, res) => {
//     res.json({
//         message: 'This is a protected route!',
//         user: req.user
//     });
// });

// const Port = process.env.PORT || 5500;

// app.listen(Port, () => {
//     console.log(`🚀 Server is running on port ${Port}`);
//     console.log(`🌐 API available at: http://localhost:${Port}/api`);
//     console.log(`📚 Using official Evangadi API documentation`);
// });


const express = require('express');
const app = express();

const Port = 5500;

// middleware files
const userRoutes = require('./routes/userRoutes.js');
const questionRoutes = require('./routes/questionRoutes.js')
const answerRoutes = require('./routes/answerRoutes.js')


// user routes middleware 
app.use('/api/users', userRoutes)


// question routes middleeware
app.use('/api/users/question', questionRoutes)

// answer routes middleware 
app.use('/api/users/answer', answerRoutes)


app.listen(Port, (err)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log(`Listening on ${Port}`)
    }
})












