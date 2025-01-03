'use server';

import { signIn } from 'auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    statusbar: z.enum(['pending', 'paid']),
    date: z.string(),
  });

  const CreateInvoice = FormSchema.omit({ id: true, date: true }

  );
export async function createInvoice(formData: FormData) {
    const { customerId, amount, statusbar } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      statusbar: formData.get('statusbar'),
    });
    
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO Invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${statusbar}, ${date})
    `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  
  
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          console.error('Invalid credentials.');
          break;
        default:
          console.error('Something went wrong.');
      }
    }
    
    throw error;
  }
}
 

