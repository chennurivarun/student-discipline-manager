
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { User, UserPlus, School, Phone, Lock } from 'lucide-react';

const departments = ['CSE', 'ECE', 'ME', 'CE'];

interface FormData {
  studentId: string;
  fullName: string;
  email: string;
  password: string;
  department: string;
  year: string;
  semester: string;
  mobile: string;
}

export function StudentRegistrationForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Validate email format
      if (!data.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate password length
      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email.toLowerCase().trim(), // Normalize email
        password: data.password,
        options: {
          data: {
            name: data.fullName,
            role: 'student',
            department: data.department,
            year: parseInt(data.year),
            semester: parseInt(data.semester),
          },
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6 glass-card p-8 rounded-lg max-w-md w-full mx-auto fade-in"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Student Registration</h2>
          <p className="text-muted-foreground">Enter your details to register</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              {...register("studentId", { 
                required: true,
                pattern: /^\d{8}$/
              })}
              placeholder="Student ID (8 digits)"
              className="pl-10"
            />
            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="relative">
            <Input
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="pl-10"
            />
            <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="relative">
            <Input
              {...register("email", { 
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
              type="email"
              placeholder="Email Address"
              className="pl-10"
            />
            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="relative">
            <Input
              {...register("password", { 
                required: true,
                minLength: 6
              })}
              type="password"
              placeholder="Password"
              className="pl-10"
            />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="relative">
            <Select
              onValueChange={(value) => setValue("department", value)}
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

          <div className="grid grid-cols-2 gap-4">
            <Select
              onValueChange={(value) => setValue("year", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    Year {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => setValue("semester", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Input
              {...register("mobile", {
                required: true,
                pattern: /^[6-9]\d{9}$/
              })}
              placeholder="Mobile Number"
              className="pl-10"
            />
            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
}
