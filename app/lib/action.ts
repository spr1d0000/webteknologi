'use server';

import { signIn } from 'auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const CreateInvoice = () => {
    // kode fungsi
  };
  export default CreateInvoice;
  
// ...

export async function authenticate(
    _prevState: string | undefined,
    formData: FormData,

) {
try {
await signIn('credentials', formData);
} catch (error) {
if (error instanceof AuthError) {
    switch (error.type) {
    case 'CredentialsSignin' :
        return 'Invalid credentials. ';
    default:
        return 'Something went wrong. ';
    }
}
throw error;
}
}