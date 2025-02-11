
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
      // Enhanced validation for email
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate password length
      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Prepare user metadata
      const metadata = {
        name: data.fullName.trim(),
        role: 'student',
        department: data.department,
        year: data.year ? parseInt(data.year) : null,
        semester: data.semester ? parseInt(data.semester) : null,
      };

      // Sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password,
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
            {errors.studentId && (
              <p className="text-sm text-red-500 mt-1">Please enter a valid 8-digit student ID</p>
            )}
          </div>

          <div className="relative">
            <Input
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="pl-10"
            />
            <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">Full name is required</p>
            )}
          </div>

          <div className="relative">
            <Input
              {...register("email", { 
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
              })}
              type="email"
              placeholder="Email Address"
              className="pl-10"
            />
            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>
            )}
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
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">Password must be at least 6 characters</p>
            )}
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
            {errors.mobile && (
              <p className="text-sm text-red-500 mt-1">Please enter a valid mobile number</p>
            )}
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
