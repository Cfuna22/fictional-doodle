
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminNotificationBell from './AdminNotificationBell';

const AdminHeader = () => {
  const handleLogout = () => {
    // For now, just show a toast - will be implemented with Supabase auth later
    console.log('Logout clicked');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Moses Snacks Express - Admin
        </h1>
        
        <div className="flex items-center gap-4">
          <AdminNotificationBell />
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>Moses Ochieng</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
