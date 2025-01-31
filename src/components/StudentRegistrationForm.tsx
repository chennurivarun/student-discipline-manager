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

export function StudentRegistrationForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    department: '',
    year: '',
    semester: '',
    mobile: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.studentId || formData.studentId.length !== 8) {
      toast({
        title: "Invalid Student ID",
        description: "Student ID must be 8 digits",
        variant: "destructive",
      });
      return;
    }

    if (!formData.mobile || !/^[6-9]\d{9}$/.test(formData.mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit Indian mobile number",
        variant: "destructive",
      });
      return;
    }

    // Store in localStorage
    const userData = {
      id: formData.studentId,
      name: formData.fullName,
      role: 'student' as const,
      department: formData.department,
      year: parseInt(formData.year),
      semester: parseInt(formData.semester),
    };

    login(userData);
    toast({
      title: "Registration Successful",
      description: "Welcome to the Student Portal",
    });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-lg max-w-md w-full mx-auto fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center">Student Registration</h2>
        <p className="text-muted-foreground text-center">Enter your details to register</p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Student ID (8 digits)"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          maxLength={8}
          pattern="\d{8}"
          required
        />

        <Input
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          minLength={3}
          maxLength={50}
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

        <div className="grid grid-cols-2 gap-4">
          <Select
            value={formData.year}
            onValueChange={(value) => setFormData({ ...formData, year: value })}
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
            value={formData.semester}
            onValueChange={(value) => setFormData({ ...formData, semester: value })}
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

        <Input
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          pattern="[6-9]\d{9}"
          maxLength={10}
          required
        />

        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
    </form>
  );
}