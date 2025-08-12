'use client'; //pengunaan useactionstate harus mencantumkan ini

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { useState } from 'react';
import { authenticate } from '@/app/lib/action'; //autentikasi

export default function LoginPage() {
    const [errorMessage, formAction, isPending]= useActionState(
        authenticate,
        undefined,
    );
    const [showPassword, setShowPassword] = useState(false);

    return (
        //baris kode header
        <main className="flex min-h-screen flex-col p-6 bg-gradient-to-t from-sky-900 to-sky-100">
            <div className="flex h-100  justify-center pl-6 rounded-lg  p-1  md:h-30">
                <Image
                    src="/logo/uia-logo.png"
                    width={200}
                    height={160}
                    className="hidden md:block"
                    alt="Banner UIA"
                />
            </div>
            {/*baris kode form login*/}
            <div className="grid grid-cols-1 md:grid-cols-2  w-auto h-auto  m-auto  item-stretch p-1  rounded-lg ">
            <Image
                    src="/logo/bg-coba2.jpg"
                    width={400}
                    height={400}
                    className=" hidden md:block h-full object-cover rounded-l-lg"
                    alt="sijomok login"
            />
                <form action={formAction} className="space-y-0">
                    <div className="flex-1  h-full bg-gray-50 px-6 pb-4 pt-8 rounded-r-lg">
                        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                            Silakan Masuk dengan akun Anda.
                        </h1>
                        <div className="w-full">
                            <div>
                                <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email"
                    >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Ketikkan alamat email"
                                    required
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray"></AtSymbolIcon>
                    </div>
                    </div>
                    <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                    >
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Ketikkan Kata Sandi"
                                    required
                                    minLength={6}   
                    />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus: text-gray-900"/>
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-[19px] w-[18px]" />
                                    ) : (
                                        <EyeIcon className="h-[18px] w-[18px]" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 ">
                        {/* Checkbox */}
                      <div className="flex items-center">  
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-50"
                        />
                        {/* Icon dan Label */}
                        <label htmlFor="rememberMe" className="flex items-center ml-2 text-sm text-gray-600">
                            Remember Me
                        </label>
                        </div>
                        <div className="flex font-times font-semibold text-blue-800 hover:text-blue-400 place-self-start hover:place-self-end">
                            Lupa Password?
                        </div>
                    </div>              
                    <Button className="mt-7 w-full " aria-disabled={isPending}>
                    Masuk <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                    </Button>
                    <div className="mt-5 flex justify-center text-xs font-sans" >
                       Kok ga punya akun? Cepetan <Link href="/signup" className="font-times font-semibold text-blue-800 hover:text-blue-400 underline ml-1 "> Daftar </Link>
                    </div>
                    <div className="flex h-8 items-end space-x-1">
                     {errorMessage &&(
                    <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                    )}
                    </div>

                </div>
            </form>
        </div>
    </main >

    );
}