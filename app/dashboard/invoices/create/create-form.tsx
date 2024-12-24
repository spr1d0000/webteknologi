import { CustomerField } from 'app/lib/definitions';
import Link from 'next/link';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from 'app/ui/button';
import createInvoice from 'app/lib/action';


export default function Form({ customers}: {customers: CustomerField}) {
    return (
        <form action={createInvoice}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Choose customer
                    </label>
                    <div className="relative">
                        <select
                        id="customer"
                        name="customerId"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placehorder:text-gray-500"
                        defaultValue=""
                        >
                            
                            <option value="" disabled>
                                Select a customer
                                </option>
                                {Array.isArray(customers) &&
                                     customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                 </option>
                                ))}

                        </select>
                    </div>
                </div>
            </div>
        </form>
    )
}