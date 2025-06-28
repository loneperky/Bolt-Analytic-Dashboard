// src/routes/signup.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import supabase from '../../utils/supabaseClient';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

interface AuthBody {
  email: string;
  password: string;
  fullname: string;
  phone?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  licensePlate?: string;
}

router.post('/signup', async (req: Request, res: Response) => {

  const {
    email,
    password,
    fullname,
    phone,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    licensePlate,
  } = req.body as AuthBody;

  if (!email || !password || !fullname) {
    res.status(400).json({ error: 'Email, password, and fullname are required.' });
    return
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullname },
      },
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return
    }

    const user = data?.user;

    if (!user || !user.id || !user.email) {
      res.status(500).json({ error: 'Signup succeeded but user object is incomplete.' });
      return
    }

    console.log('About to insert into table with:', {
      id: user.id,
      email: user.email,
      fullname,
      phone,
      vehicle_make: vehicleMake,
      vehicle_model: vehicleModel,
      vehicle_year: vehicleYear,
      license_plate: licensePlate,
      created_at: new Date().toISOString()
    });


    const { error: dbError } = await supabase
      .from('driver_information')
      .insert([
        {
          id: user.id,
          email: user.email,
          fullname: fullname,
          phone: phone ?? null,
          vehicle_make: vehicleMake ?? null,
          vehicle_model: vehicleModel ?? null,
          vehicle_year: vehicleYear ?? null,
          license_plate: licensePlate ?? null,
          created_at: new Date().toISOString(),
        },
      ]);

    if (dbError) {
      console.error('[Database Error]', dbError);
      res.status(500).json({ error: 'Failed to save user information.' });
      return;
    }


    const token = jwt.sign(
      { userId: user.id, email: user.email, fullname },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: 'Signup successful',
      user: {
        id: user.id,
        email: user.email,
        fullname,
      },
      token,
    });
    console.log('User signed up:', req.body);
    console.log('Signup successful:', user.id);
  } catch (err: any) {
    console.error('[Signup Error]', err?.response?.data || err.message || err);
    res.status(500).json({ error: 'Server error during signup.' });
    return
  }
});

export { router as signup };
