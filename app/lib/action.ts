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
  const UpdateInvoiceSchema = z.object({
    customer_id: z.string(),
    amount: z.number(),
    status: z.string(),
  });
  
 


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
  formData: FormData,
){
 try {
  await signIn('credentials', formData);
 } catch (error) {
  if (error instanceof AuthError) {
    switch (error.type) {
      case 'CredentialsSignin':
        return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
    }
  }
  throw error;
 }
}
export async function updateInvoice(id: string, formData:FormData) {
  const { customer_id, amount, status } = UpdateInvoiceSchema.parse({
    customer_id: formData.get('customerId'),
    amount: Number(formData.get('amount')),
    status: formData.get('statusbar'),
  });
  const amountInCents = amount * 100;

  await sql`
  UPDATE Invoices
  SET customer_id = ${customer_id}, amount = ${amountInCents}, status = ${status}
  WHERE id = ${id}
  `;
}


export async function deleteInvoice(id:string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}



