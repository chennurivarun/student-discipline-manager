
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

  const handleLogin = async (role: 'student' | 'staff', email: string, password: string) => {
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-8 fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Sign in to manage student records</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass-morphism">
            <TabsTrigger value="student" className="data-[state=active]:bg-primary/20">Student</TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-primary/20">Staff</TabsTrigger>
          </TabsList>
          
          <TabsContent value="student" className="mt-4">
            <LoginCard
              title="Student Login"
              description="Use your email to sign in"
              onSubmit={(email, password) => handleLogin('student', email, password)}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="staff" className="mt-4">
            <LoginCard
              title="Staff Login"
              description="Use your email to sign in"
              onSubmit={(email, password) => handleLogin('staff', email, password)}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Don't have an account?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/students/register')}
              className="glass-morphism hover:bg-primary/20 text-primary"
            >
              Student Registration
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/staff/register')}
              className="glass-morphism hover:bg-primary/20 text-primary"
            >
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
  isLoading 
}: { 
  title: string;
  description: string;
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="gradient-border">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(email, password);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-morphism bg-transparent"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-morphism bg-transparent"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full glass-morphism hover:bg-primary/20" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
