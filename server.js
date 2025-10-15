const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let users = [
    { id: 1, name:"Surya Aprilian", email: "surya98@gmail.com"},
    { id: 2, name:"Mundi Nugroho", email: "mundi98@gmail.com"},
    { id: 3, name:"Nugroho Surya", email: "nugrosur98@gmail.com"},
];

let nextId = users.length + 1;

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Rest API is running. Check /api/users endpoint.'
    });
});

app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
        total: users.length,
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Validation Failed: Both name and email are required'
        });
    }
    if (users.some(user => user.email === email)) {
        return res.status(409).json({
            success: false,
            message: 'Validation Failed: Email already exist'
        });
    }
    const newUser = {
        id: nextId++,
        name,
        email
    };

    users.push(newUser); 
    res.status(201).json({
        success: true,
        message: 'User created successfully.',
        data: newUser
    });
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format.'
        });
    }
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found.`
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    
})