
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Temporary login credentials for demo
  const DEMO_CREDENTIALS = {
    student: { id: '12345678', password: 'student123' },
    staff: { id: 'STAFF123', password: 'staff123' }
  };

  const handleLogin = async (role: 'student' | 'staff', id: string, password: string) => {
    setIsLoading(true);
    
    // Demo authentication logic
    const validCredentials = role === 'student' 
      ? (id === DEMO_CREDENTIALS.student.id && password === DEMO_CREDENTIALS.student.password)
      : (id === DEMO_CREDENTIALS.staff.id && password === DEMO_CREDENTIALS.staff.password);

    if (validCredentials) {
      const userData = role === 'student' 
        ? {
            id,
            name: 'Demo Student',
            role: 'student' as const,
            department: 'CSE',
            year: 2,
            semester: 3,
          }
        : {
            id,
            name: 'Demo Staff',
            role: 'staff' as const,
            department: 'CSE',
          };

      login(userData);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md space-y-8 fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to manage student records</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
          
          <TabsContent value="student">
            <LoginCard
              title="Student Login"
              description="Use your student ID to sign in"
              onSubmit={(id, password) => handleLogin('student', id, password)}
              demoCredentials={DEMO_CREDENTIALS.student}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="staff">
            <LoginCard
              title="Staff Login"
              description="Use your staff ID to sign in"
              onSubmit={(id, password) => handleLogin('staff', id, password)}
              demoCredentials={DEMO_CREDENTIALS.staff}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Don't have an account?</p>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate('/students/register')}>
              Student Registration
            </Button>
            <Button variant="outline" onClick={() => navigate('/staff/register')}>
              Staff Registration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginCard = ({ 
  title, 
  description, 
  onSubmit, 
  demoCredentials, 
  isLoading 
}: { 
  title: string;
  description: string;
  onSubmit: (id: string, password: string) => void;
  demoCredentials: { id: string; password: string };
  isLoading: boolean;
}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(id, password);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-sm text-muted-foreground mt-4">
            <p>Demo credentials:</p>
            <p>ID: {demoCredentials.id}</p>
            <p>Password: {demoCredentials.password}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Index;
