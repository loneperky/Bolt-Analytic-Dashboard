// src/routes/login.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import supabase from '../../utils/supabaseClient';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

interface Auth {
  email: string;
  password: string;
}

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as Auth;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return
  }

  try {
    // Step 1: Login with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log(data)

    if (error || !data.session || !data.user) {
      res.status(401).json({ error: error?.message || 'Invalid credentials' });
      return
    }

    const userId = data.user.id;

    // Step 2: Fetch extra profile info
    const { data: profile, error: profileError } = await supabase
      .from('driver_information')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profileError || !profile) {
      res.status(500).json({ error: 'Failed to fetch user profile after login' });
      return
    }

    // Step 3: Generate your own JWT (optional but recommended)
    const token = jwt.sign(
      { userId: userId, email: data.user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // Step 4: Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // must be true in production
      sameSite: 'none', // ✅ allow cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    // Step 5: Return full user profile to frontend
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: profile.id,
        email: profile.email,
        fullname: profile.fullname,
        phone: profile.phone,
        vehicle_make: profile.vehicle_make,
        vehicle_model: profile.vehicle_model,
        vehicle_year: profile.vehicle_year,
        license_plate: profile.license_plate,
      }
    });
  } catch (err: any) {
    console.error('[Login Error]', err.message || err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

export { router as login };
