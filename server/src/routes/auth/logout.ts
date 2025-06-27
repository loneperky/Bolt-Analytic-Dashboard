// src/routes/logout.ts
import express, { Request, Response } from 'express';
import supabase from '../../utils/supabaseClient';

const router = express.Router();

router.post('/logout', async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.auth.signOut();

    // Clear custom backend token
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    if (error) {
      console.error('[Logout Error]', error.message);
      res.status(500).json({ error: 'Logout failed from Supabase.' });
      return
    }

    res.status(200).json({ message: 'User logged out successfully.' });
    return
  } catch (err: any) {
    console.error('[Logout Server Error]', err.message || err);
    res.status(500).json({ error: 'Logout failed on server.' });
    return
  }
});

export { router as logout };
