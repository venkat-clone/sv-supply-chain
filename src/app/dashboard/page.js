// app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="p-8">
            <h1 className="text-4xl font-bold mb-8">Welcome to the Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Link
    key="User"
    href="/dashboard/User"
    className="block p-6 rounded-lg border border-gray-700 bg-gray-900 text-white text-center text-lg font-semibold hover:bg-blue-700 transition"
>
    User
</Link>
<Link
    key="Order"
    href="/dashboard/Order"
    className="block p-6 rounded-lg border border-gray-700 bg-gray-900 text-white text-center text-lg font-semibold hover:bg-blue-700 transition"
>
    Order
</Link>
<Link
    key="Permission"
    href="/dashboard/Permission"
    className="block p-6 rounded-lg border border-gray-700 bg-gray-900 text-white text-center text-lg font-semibold hover:bg-blue-700 transition"
>
    Permission
</Link>
<Link
    key="ExtraCharge"
    href="/dashboard/ExtraCharge"
    className="block p-6 rounded-lg border border-gray-700 bg-gray-900 text-white text-center text-lg font-semibold hover:bg-blue-700 transition"
>
    ExtraCharge
</Link>
            </div>
        </main>
    );
}
