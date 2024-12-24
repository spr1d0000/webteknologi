import Form from 'app/ui/dashboard/invoices/create-form';
import Breadcrumbs from 'app/ui/dashboard/invoices/breadcrumbs';
import { fetchCustomers  } from 'app/lib/data';

export default async function Page() {
    const customers = await fetchCustomers();

    return(
        <main>
            <Breadcrumbs 
            breadcrumbs={[
                { label: 'invoices', href: '/dashboard/invoices' },
                { 
                    label: 'Create Invoices',
                     href: '/dashboard/invoices/create', 
                    active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
    
}