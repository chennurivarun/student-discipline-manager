
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
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
import { User, Lock, School } from 'lucide-react';

const departments = ['CSE', 'ECE', 'ME', 'CE'];

export function StaffRegistrationForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Enhanced validation for email
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate password length
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Basic validation
      if (!formData.name || !formData.department) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare user metadata
      const metadata = {
        name: formData.name.trim(),
        role: 'staff',
        department: formData.department
      };

      // Sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      });
      navigate('/auth');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-lg max-w-md w-full mx-auto fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center">Staff Registration</h2>
        <p className="text-muted-foreground text-center">Enter your details to register</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="pl-10"
          />
          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="relative">
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="pl-10"
          />
          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="relative">
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="pl-10"
          />
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="relative">
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData({ ...formData, department: value })}
          >
            <SelectTrigger className="pl-10">
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
          <School className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
}
