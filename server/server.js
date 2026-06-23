const express = require("express");
const pool = require('./db')
const cors = require("cors")
const multer = require("multer")
const path = require('path');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
console.log('SECRET:', process.env.JWT_SECRET);




const SECRET = process.env.JWT_SECRET;




// fixes cors error
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use("/uploads", express.static('./uploads'));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');

    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      
    }
  })
  
const upload = multer({ storage: storage })




// allows express to handle json
app.use(express.json());






app.post('/imageUpload', upload.single("filename"), async (req, res) => {
    
    
    



    res.json({message : `${req.file.originalname}`})
})

// learning  v v v v v
app.get('/message', (req, res) => {
    res.json({ message: "Hello from backed!"})
});

app.get('/about', (req, res) => {
    res.send("this is about me")
});

app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id)
    const products =   [
        {id: 1, user: 'tobi'}, 
        {id: 2, user: 'tim'}]

     const requestedProduct = products.find((product) => product.id === id); 
     res.json(requestedProduct)
});



app.post('/loginAttempt', async (req, res) => { 
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const user = result.rows[0];

        // 3. compare the plain password against the stored hash
        const match = await bcrypt.compare(password, user.hashed_password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid email or password' });
          }
        
          // 5. success
       
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' });
        res.json({ user: { id: user.id, email: user.email }, token, message: 'Logged in!' });

    } catch(err) {
        console.log(err)
    }

    
})


app.post('/signUpAttempt', async (req, res) => {

    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query('INSERT INTO users (email, hashed_password) VALUES ($1, $2)',
    [email, hashed])

    res.json({ message: 'Account created successfully' });
    } catch(err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Email already exists' });
          }
          console.log(err);
          res.status(500).json({ error: 'Something went wrong' });
    }
})


app.post('/saveImage', async (req, res) => {

    try {
        const authHeader = req.headers.authorization;

        // No Authorization header at all, or wrong format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Not logged in' });
        }

        const token = authHeader.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtErr) {
            // Token exists but is invalid or expired
            return res.status(401).json({ error: 'Not logged in' });
        }

        const { filename, deficiency } = req.body;

        
        const result = await pool.query('INSERT INTO images (user_id, filename, deficiency) VALUES ($1, $2, $3)',
        [decoded.id, filename, deficiency])
        
        res.json({ message: 'Image saved!' });


    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to save image' });

    }

})

app.get('/getSavedImage', async(req, res) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await pool.query('SELECT * FROM images WHERE user_id = $1 ORDER BY created_at DESC',
        [decoded.id])
        
        res.json(result.rows)



    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch history' });

    }
})





// starts server
app.listen(port, () => {
    console.log('Backend running')
});
