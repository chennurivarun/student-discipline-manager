import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const departments = ['CSE', 'ECE', 'ME', 'CE'];

export function StaffRegistrationForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate staff ID
    const staffId = `STAFF-${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
    
    // Store in localStorage
    const userData = {
      id: staffId,
      name: formData.name,
      role: 'staff' as const,
      department: formData.department,
    };

    login(userData);
    toast({
      title: "Registration Successful",
      description: `Welcome! Your Staff ID is ${staffId}`,
    });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-lg max-w-md w-full mx-auto fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center">Staff Registration</h2>
        <p className="text-muted-foreground text-center">Enter your details to register</p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Select
          value={formData.department}
          onValueChange={(value) => setFormData({ ...formData, department: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
    </form>
  );
}