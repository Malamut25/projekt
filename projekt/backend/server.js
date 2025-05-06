const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const morgan = require('morgan');
app.use(morgan('combined'));
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL kapcsolat
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <-- Add your MySQL username here
    password: '', // <-- Add your MySQL password here
    database: 'projekt'
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Bcrypt salt rounds
const saltRounds = 10;
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

// ==================== USERS ====================
// Login Route (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                teacher: user.teacher,
                profileUrl: user.profileUrl,
                isDark: user.isDark
            }
        });
    });
});

// Sign-Up Route (POST)
app.post('/signup', async (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { username, password, teacher } = req.body;

    if (!username || !password) {
        console.error('Username and password are required');
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query = 'INSERT INTO users (username, password, teacher) VALUES (?, ?, ?)';
        connection.query(query, [username, hashedPassword, teacher || 0], (err, results) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            console.log('User created successfully:', results);
            res.status(201).json({ id: results.insertId, username, teacher });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all users (GET)
app.get('/users', (req, res) => {
    const query = 'SELECT id, username, teacher FROM users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get user by ID (GET)
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT id, username, teacher, profileUrl, isDark FROM users WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(results[0]);
    });
});

// Update user isDark status (PUT)
app.put('/users/:id/isDark', (req, res) => {
    const userId = req.params.id;
    const { isDark } = req.body;

    if (isDark === undefined) {
        return res.status(400).json({ error: 'isDark field is required' });
    }

    const query = 'UPDATE users SET isDark = ? WHERE id = ?';
    connection.query(query, [isDark, userId], (err, results) => {
        if (err) {
            console.error('Error updating user isDark status:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User isDark status updated successfully' });
    });
});

// Update user (PUT)
app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, password, teacher } = req.body;

    if (!username && !password && teacher === undefined) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    try {
        let query = 'UPDATE users SET ';
        const updates = [];
        const params = [];

        if (username) {
            updates.push('username = ?');
            params.push(username);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updates.push('password = ?');
            params.push(hashedPassword);
        }
        if (teacher !== undefined) {
            updates.push('teacher = ?');
            params.push(teacher);
        }

        query += updates.join(', ') + ' WHERE id = ?';
        params.push(userId);

        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User updated successfully' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete user (DELETE)
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// ==================== PRACTICE ====================
// Get practice questions (GET)
app.get('/practice', (req, res) => {
    const quizId = req.query.quiz_id;
    let query = 'SELECT * FROM practice';
    let params = [];

    if (quizId) {
        query += ' WHERE quiz_id = ?';
        params.push(quizId);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching practice questions:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Create practice question (POST)
app.post('/practice', (req, res) => {
    const { language_id, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id } = req.body;

    if (!language_id || !question || !answer1 || !answer2 || !answer3 || !answer4 || !correct_answer || !quiz_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO practice (language_id, question, anwsear1, anwsear2, anwsear3, anwsear4, correct_answer, quiz_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [language_id, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id], (err, results) => {
        if (err) {
            console.error('Error creating practice:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: results.insertId });
    });
});

// Update practice question (PUT)
app.put('/practice/:id', (req, res) => {
    const practiceId = req.params.id;
    const { language_id, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id } = req.body;

    if (!language_id || !question || !answer1 || !answer2 || !answer3 || !answer4 || !correct_answer || !quiz_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'UPDATE practice SET language_id = ?, question = ?, answer1 = ?, answer2 = ?, answer3 = ?, answer4 = ?, correct_answer = ?, quiz_id = ? WHERE id = ?';
    connection.query(query, [language_id, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id, practiceId], (err, results) => {
        if (err) {
            console.error('Error updating practice:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Practice question not found' });
        }
        res.json({ message: 'Practice question updated successfully' });
    });
});

// Delete practice question (DELETE)
app.delete('/practice/:id', (req, res) => {
    const practiceId = req.params.id;
    const query = 'DELETE FROM practice WHERE id = ?';
    connection.query(query, [practiceId], (err, results) => {
        if (err) {
            console.error('Error deleting practice:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Practice question not found' });
        }
        res.json({ message: 'Practice question deleted successfully' });
    });
});

// ==================== QUIZZES ====================
// Multer configuration for image uploads
// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
app.delete('/delete-profile-picture', (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
    }

    // Construct the full file path
    const fullFilePath = path.join(__dirname, filePath);

    // Check if the file exists
    if (!fs.existsSync(fullFilePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file
    fs.unlink(fullFilePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json({ error: 'Failed to delete file' });
        }
        res.json({ message: 'File deleted successfully' });
    });
});
const upload = multer({ storage });

// Image upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

// Endpoint to update profile picture
app.post('/users/:id/change-profile-picture', upload.single('image'), (req, res) => {
    const userId = req.params.id;

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    const query = 'UPDATE users SET profileUrl = ? WHERE id = ?';
    connection.query(query, [imageUrl, userId], (err, results) => {
        if (err) {
            console.error('Error updating profile picture:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'Profile picture updated successfully', imageUrl }); // Include 'imageUrl' in the response
    });
});
// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Get all quizzes (GET)
app.get('/quizzes/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const query = `
        SELECT *
        FROM quizzes q
        LEFT JOIN isdone id ON q.id = id.quizz_id AND id.user_id = ?`;
    
    connection.query(query, [userId, userId], (err, results) => {
        if (err) {
            console.error('Error fetching quizzes:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Create quiz (POST)
app.post('/quizzes', async (req, res) => {
const { language_id, title, description, imgUrl, questions, createdby } = req.body;

if (!language_id || !title || !description || !createdby) {
    return res.status(400).json({ error: 'Invalid request: language_id, title, description, and createdby are required' });
}

if (!questions || questions.length < 2) {
    return res.status(400).json({ error: 'At least 2 questions are required' });
}

try {
    const quizQuery = 'INSERT INTO quizzes (language_id, title, description, imgUrl, numberOfRates, totalRates, createdby) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [quizResult] = await connection.promise().query(quizQuery, [language_id, title, description, imgUrl || null, 0, 0, createdby]);

    const quizId = quizResult.insertId;

    const questionQuery = 'INSERT INTO practice (language_id, question, answer1, answer2, answer3, answer4, correct_answer, quiz_id) VALUES ?';
    const questionValues = questions.map(q => [
    language_id,
    q.question,
    q.answer1,
    q.answer2,
    q.answer3,
    q.answer4,
    q.correct_answer,
    quizId
    ]);

    await connection.promise().query(questionQuery, [questionValues]);

    res.status(201).json({ message: 'Quiz and questions created successfully', quizId });
} catch (error) {
    console.error('Error creating quiz:', error );
    res.status(500).json({ error: 'Database error occurred while creating quiz' });
}
});

// Update quiz (PUT)
app.put('/quizzes/:id', async (req, res) => {
    const quizId = req.params.id;
    const { language_id, title, description, imgUrl, rating } = req.body;

    if (!language_id || !title || !description) {
        return res.status(400).json({ error: 'Language ID, title, and description are required' });
    }

    try {
        if (rating !== undefined) {
            const updateQuery = 'UPDATE quizzes SET numberOfRates = numberOfRates + 1, totalRates = totalRates + ? WHERE id = ?';
            await connection.promise().query(updateQuery, [rating, quizId]);
        }

        const query = 'UPDATE quizzes SET language_id = ?, title = ?, description = ?, imgUrl = ? WHERE id = ?';
        await connection.promise().query(query, [language_id, title, description, imgUrl || null, quizId]);

        const [quiz] = await connection.promise().query('SELECT numberOfRates, totalRates FROM quizzes WHERE id = ?', [quizId]);
        const newRating = Math.ceil(quiz[0].totalRates / quiz[0].numberOfRates);

        res.json({ message: 'Quiz updated successfully', rating: newRating });
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get quiz by ID (GET)
app.get('/practice', (req, res) => {
    const quizId = req.query.quiz_id; // Get quiz_id from query parameters
    let query = 'SELECT * FROM practice';
    let params = [];
  
    if (quizId) {
      query += ' WHERE quiz_id = ?'; // Filter questions by quiz_id
      params.push(quizId);
    }
  
    connection.query(query, params, (err, results) => {
      if (err) {
        console.error('Error fetching practice questions:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
// Összes gyakorlat lekérése (GET)
app.get('/practice', (req, res) => {
    const query = 'SELECT * FROM practice';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching practice:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});


// Get quiz by ID (GET)

app.get('/quizzes/:id', async (req, res) => {
    const quizId = req.params.id;
    
    try {
        // Fetch quiz details
        const [quiz] = await connection.promise().query('SELECT * FROM quizzes WHERE id = ?', [quizId]);

        if (quiz.length === 0) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Fetch associated questions
        const [questions] = await connection.promise().query('SELECT * FROM practice WHERE quiz_id = ?', [quizId]);

        // Calculate the average rating
        const newRating = Math.ceil(quiz[0].totalRates / quiz[0].numberOfRates);

        // Construct the response
        const quizData = {
            ...quiz[0],
            rating: newRating,
            questions: questions // Include the associated questions
        };

        res.json(quizData);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Database error' });
    }
});



// Delete quiz (DELETE)
// Endpoint to delete a quiz and its associated questions
app.delete('/quizzes/:quizId', (req, res) => {
    const quizId = req.params.quizId;

    // Validate quiz ID
    if (!quizId) {
        return res.status(400).json({ error: 'Quiz ID is required' });
    }

    // Start a transaction to ensure atomicity
    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // 1. Delete the associated practice questions
        const deleteQuestionsQuery = 'DELETE FROM practice WHERE quiz_id = ?';
        connection.query(deleteQuestionsQuery, [quizId], (err, results) => {
            if (err) {
                // Rollback the transaction on error
                return connection.rollback(() => {
                    console.error('Error deleting practice questions:', err);
                    res.status(500).json({ error: 'Database error' });
                });
            }

            // 2. Delete the associated isdone table entries
            const deleteIsdoneQuery = 'DELETE FROM isdone WHERE quizz_id = ?';
            connection.query(deleteIsdoneQuery, [quizId], (err, results) => {
                if (err) {
                    // Rollback the transaction on error
                    return connection.rollback(() => {
                        console.error('Error deleting isdone table entries:', err);
                        res.status(500).json({ error: 'Database error' });
                    });
                }

                // 3. Delete the quiz
                const deleteQuizQuery = 'DELETE FROM quizzes WHERE id = ?';
                connection.query(deleteQuizQuery, [quizId], (err, results) => {
                    if (err) {
                        // Rollback the transaction on error
                        return connection.rollback(() => {
                            console.error('Error deleting quiz:', err);
                            res.status(500).json({ error: 'Database error' });
                        });
                    }

                    // Commit the transaction
                    connection.commit((err) => {
                        if (err) {
                            // Rollback the transaction on error
                            return connection.rollback(() => {
                                console.error('Error committing transaction:', err);
                                res.status(500).json({ error: 'Database error' });
                            });
                        }

                        // Check if any rows were deleted
                        if (results.affectedRows === 0) {
                            return res.status(404).json({ error: 'Quiz not found' });
                        }

                        // Return a success message
                        res.json({ message: 'Quiz and associated questions deleted successfully' });
                    });
                });
            });
        });
    });
});

// ==================== PROGRAM LANGUAGES ====================
// Get all programming languages (GET)
app.get('/program_languages', (req, res) => {
    const query = 'SELECT * FROM program_language';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching program languages:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Add a new programming language (POST)
app.post('/program_languages', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const query = 'INSERT INTO program_language (name) VALUES (?)';
    connection.query(query, [name], (err, results) => {
        if (err) {
            console.error('Error adding program language:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: results.insertId, name });
    });
});

// Update a programming language (PUT)
app.put('/program_languages/:id', (req, res) => {
    const languageId = req.params.id;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const query = 'UPDATE program_language SET name = ? WHERE id = ?';
    connection.query(query, [name, languageId], (err, results) => {
        if (err) {
            console.error('Error updating program language:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Language not found' });
        }
        res.json({ message: 'Program language updated successfully' });
    });
});

// Delete a programming language (DELETE)
app.delete('/program_languages/:id', (req, res) => {
    const languageId = req.params.id;
    const query = 'DELETE FROM program_language WHERE id = ?';
    connection.query(query, [languageId], (err, results) => {
        if (err) {
            console.error('Error deleting program language:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Language not found' });
        }
        res.json({ message: 'Program language deleted successfully' });
    });
});
// Értékelés hozzáadása a kvízhez
app.put('/quizzes/:id/rate', (req, res) => {
    const quizId = req.params.id;
    const { rating } = req.body;
  
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Érvénytelen értékelés. Az értékelésnek 1 és 5 között kell lennie.' });
    }
  
    const query = 'UPDATE quizzes SET numberOfRates = numberOfRates + 1, totalRates = totalRates + ? WHERE id = ?';
    connection.query(query, [rating, quizId], (err, results) => {
      if (err) {
        console.error('Error updating quiz rating:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json({ message: 'Rating updated successfully' });
    });
  });

  app.use(bodyParser.urlencoded({ extended: true }));
// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hegyitibor52@gmail.com',
      pass: 'eyuv ybcw wkrk ligt' // Your app-specific password
    }
  });

  app.post('/isdone', (req, res) => {
    const { user_id, quizz_id } = req.body;
  
    if (!user_id || !quizz_id) {
        return res.status(400).json({ error: 'User ID and quiz ID are required' });
    }
  
    const isdone = true;
    const query = `
        INSERT INTO isdone (user_id, quizz_id, isdone) 
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE isdone = VALUES(isdone)
    `;
  
    connection.query(query, [user_id, quizz_id, isdone], (err, results) => {
        if (err) {
            console.error('Error posting to isdone table:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        res.status(201).json({ message: 'Posted to isdone table successfully' });
    });
});
  
  // Simple email endpoint
  app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
  
    try {
      await transporter.sendMail({
        from: 'hegyitibor52@gmail.com',
        to,
        subject,
        text
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  });
  
  // Email with attachments endpoint
  app.post('/send-email-with-attachments', upload.array('attachments'), async (req, res) => {
    const { to, subject, text } = req.body;
    
    try {
      const attachments = req.files.map(file => ({
        filename: file.originalname,
        path: file.path
      }));
  
      await transporter.sendMail({
        from: 'hegyitibor52@gmail.com',
        to,
        subject,
        text,
        attachments
      });
  
      // Clean up uploaded files after sending
      req.files.forEach(file => {
        fs.unlink(file.path, err => {
          if (err) console.error('Error deleting file:', err);
        });
      });
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Email with attachments error:', error);
      
      // Clean up files even if sending fails
      if (req.files) {
        req.files.forEach(file => {
          fs.unlink(file.path, err => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      }
  
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  });
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});