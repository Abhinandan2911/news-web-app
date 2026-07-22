import { getEmployeesAction } from '@/app/actions/admin';
import EmployeesClient from './EmployeesClient';

export default async function AdminEmployeesPage() {
  const employees = await getEmployeesAction();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-[#e8e4d9] pb-4">
        <h1 className="text-2xl font-serif font-bold text-[#1c1917]">User & Employee Access Control (RBAC)</h1>
        <p className="text-xs text-[#78716c] mt-0.5">
          Assign newsroom roles, manage permissions, and audit team member activity.
        </p>
      </div>

      <EmployeesClient initialEmployees={employees} />
    </div>
  );
}
