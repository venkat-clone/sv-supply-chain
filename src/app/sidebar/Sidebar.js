// app/sidebar/Sidebar.tsx
'use client';

import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white p-4">
            <nav>
                <ul className="space-y-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>
        </aside>
    );
}
