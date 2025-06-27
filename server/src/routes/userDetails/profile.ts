// src/routes/profile.ts
import express, { Request, Response } from 'express';
import authToken from '../../utils/authToken';
import supabase from '../../utils/supabaseClient';

const router = express.Router();

router.get('/profile', authToken, async (req: Request, res: Response) => {
  const user = req.user?.userId;

  if (!user || !user) {
    res.status(401).json({ error: 'Unauthorized: User not found in request.' });
    return
  }

  try {
    const { data, error } = await supabase
      .from('driver_information')
      .select('*')
      .eq('id', user)
      .maybeSingle();

    if (error || !data) {
      console.error('[Profile Fetch Error]', error?.message || error);
      res.status(500).json({ error: 'Failed to fetch user profile.' });
      return
    }

    res.status(200).json({
      message: 'User profile fetched successfully.',
      user: data,
    });
    return
  } catch (err: any) {
    console.error('[Unexpected Error]', err.message || err);
    res.status(500).json({ error: 'Server error while fetching profile.' });
    return
  }
});

export { router as profileRouter };
