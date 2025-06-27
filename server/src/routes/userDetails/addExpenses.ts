// src/routes/expenses.ts
import express, { Request, Response } from 'express';
import supabase from '../../utils/supabaseClient';
import authToken from '../../utils/authToken';

const router = express.Router();

router.post('/add', authToken, async (req: Request, res: Response) => {
  const user = req.user?.userId;

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return
  }

  const { category, amount, description, date } = req.body;

  if (!category || !amount) {
    res.status(400).json({ error: 'Category and amount are required.' });
    return
  }

  try {
    const { data,error } = await supabase
      .from('driver_expenses')
      .insert([
        {
          driver_id: user,
          category,
          amount,
          date: date || new Date().toISOString(),
          description: description || null,
        }
      ]);

    if (error) {
      console.error('[Insert Expense Error]', error.message);
      res.status(500).json({ error: 'Failed to save expense.' });
      return
    }
    res.status(201).json({ message: 'Expense saved successfully',data });
  } catch (err: any) {
    console.error('[Unexpected Error]', err.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

export { router as AddExpenses };
