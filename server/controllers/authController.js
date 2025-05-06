import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';
import {generateAccessToken} from '../utils/generateAccessToken.js';
import {generateRefreshToken} from '../utils/generateRefreshToken.js';
import authModal from '../modal/auth.modal.js';

export const register = async(req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)

  

  try {

    const isuserExits = await authModal.isUserExists(email)

    console.log("is user exist", isuserExits)
  return res.json({message: isuserExits})
    
  } catch (error) {
    console.log(error.message)
    return res.json({message: "error", error: error.message})
    
  }


  // db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
  //   if (err) return res.status(500).send('Database error');
  //   if (result.length > 0) return res.status(400).send('User already exists');

    // bcrypt.hash(password, 10, (err, hashedPassword) => {
    //   if (err) return res.status(500).send('Error hashing password');

      
    //   const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    //   db.query(query, [name, email, hashedPassword], (err, result) => {
    //     if (err) return res.status(500).send('Error creating user');
    //     res.status(201).send('User created');
    //   })ii;
    // });
  };


export const login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (result.length === 0) return res.status(400).send('Invalid email or password');

    const user = result[0];


    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing passwords');
      if (!isMatch) return res.status(400).send('Invalid email or password');

 
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      
      const updateQuery = 'UPDATE users SET refresh_token = ? WHERE id = ?';
      db.query(updateQuery, [refreshToken, user.id], (err) => {
        if (err) return res.status(500).send('Error saving refresh token');
        res.json({ accessToken, refreshToken });
      });
    });
  });
};
