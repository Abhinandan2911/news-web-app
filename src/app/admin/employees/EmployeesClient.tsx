'use client';

import { useState } from 'react';
import { Profile, UserRole } from '@/types/news';
import { updateUserRoleAction } from '@/app/actions/admin';
import { UserCheck, Shield, UserX, Award } from 'lucide-react';

interface EmployeesClientProps {
  initialEmployees: Profile[];
}

export default function EmployeesClient({ initialEmployees }: EmployeesClientProps) {
  const [employees, setEmployees] = useState(initialEmployees);

  async function handleRoleChange(id: string, newRole: UserRole) {
    await updateUserRoleAction(id, newRole);
    setEmployees(employees.map(e => e.id === id ? { ...e, role: newRole } : e));
  }

  return (
    <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl overflow-hidden shadow-xs">
      <table className="w-full text-left text-xs text-[#1c1917] font-serif border-collapse">
        <thead className="bg-[#f7f4ed] border-b border-[#e8e4d9] text-[11px] uppercase font-bold text-[#78716c] tracking-wider">
          <tr>
            <th className="p-4">Employee / User</th>
            <th className="p-4">Bio & Title</th>
            <th className="p-4">Assigned Role</th>
            <th className="p-4">Submissions</th>
            <th className="p-4 text-right">Role Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e8e4d9]">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-[#fcfaf5] transition">
              <td className="p-4 font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e2ddd3] text-[#1c1917] font-bold text-xs flex items-center justify-center font-sans">
                  {emp.full_name?.charAt(0) || emp.username.charAt(0)}
                </div>
                <div>
                  <span className="block font-bold text-[#1c1917] text-sm">{emp.full_name || emp.username}</span>
                  <span className="block text-[11px] text-[#78716c] font-mono">@{emp.username}</span>
                </div>
              </td>
              <td className="p-4 text-[#44403c] text-xs max-w-xs">{emp.bio || 'Newsroom contributor'}</td>
              <td className="p-4 font-sans">
                <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase border ${
                  emp.role === 'admin' ? 'bg-red-100 text-red-800 border-red-300' :
                  emp.role === 'editor' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                  emp.role === 'author' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                  'bg-gray-100 text-gray-800 border-gray-300'
                }`}>
                  {emp.role === 'author' ? 'Employee Writer' : emp.role}
                </span>
              </td>
              <td className="p-4 text-xs font-bold text-[#1c1917]">
                {emp.role === 'author' ? '12 articles' : 'N/A'}
              </td>
              <td className="p-4 text-right">
                <select
                  value={emp.role}
                  onChange={(e) => handleRoleChange(emp.id, e.target.value as UserRole)}
                  className="px-2.5 py-1 bg-[#f7f4ed] border border-[#e2ddd3] rounded text-xs text-[#1c1917] font-sans focus:outline-none focus:border-[#b71c1c]"
                >
                  <option value="author">Author / Employee Writer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="reader">Public Reader</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
