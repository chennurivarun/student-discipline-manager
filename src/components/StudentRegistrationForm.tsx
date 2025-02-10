
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { User, UserPlus, School, Phone } from 'lucide-react';

const departments = ['CSE', 'ECE', 'ME', 'CE'];

interface FormData {
  studentId: string;
  fullName: string;
  department: string;
  year: string;
  semester: string;
  mobile: string;
}

export function StudentRegistrationForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: data.studentId,
        name: data.fullName,
        role: 'student' as const,
        department: data.department,
        year: parseInt(data.year),
        semester: parseInt(data.semester),
      };

      login(userData);
      toast({
        title: "Registration Successful",
        description: "Welcome to the Student Portal",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later",
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
