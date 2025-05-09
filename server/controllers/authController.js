import bcrypt from 'bcryptjs';
import authModal from '../modal/auth.modal.js';
import { generateAccessToken } from '../utils/generateAccessToken.js';
import { generateRefreshToken } from '../utils/generateRefreshToken.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isUserExists = await authModal.isUserExists(email);
    console.log(isUserExists)

    if (isUserExists) {
      
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = await authModal.createUser({ name, email, hashedPassword });
    console.log("after usercreated")

    if (!userCreated) {
      return res.status(500).json({ message: 'Failed to create user' });
    }

    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Register Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await authModal.getUserByEmail(email);
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    

    await authModal.updateRefreshToken(user.id, refreshToken);
  

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user,
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
