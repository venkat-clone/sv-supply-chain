// app/sidebar/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "User", path: "/dashboard/User" },
  { name: "Order", path: "/dashboard/Order" },
  { name: "Permission", path: "/dashboard/Permission" },
  { name: "ExtraCharge", path: "/dashboard/ExtraCharge" },
  { name: "Role", path: "/dashboard/Role" },
];
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "/");
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-900 border-r border-gray-700 p-6 flex flex-col shadow-md">
      <div className="text-2xl font-extrabold text-white mb-8 tracking-wide">
        Dashboard
      </div>
      <nav className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
        <ul className="space-y-2">
          {navItems.map(({ name, path }) => {
            const regPath =
              path === "/"
                ? /^\/$/
                : path.endsWith("/")
                ? new RegExp(`^${escapeRegex(path)}`)
                : new RegExp(`^${escapeRegex(path)}(/|$)`);

            const isActive = regPath.test(pathname);

            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`block px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
