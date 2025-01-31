import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto fade-in">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Student Discipline Management System
        </h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive platform for managing student disciplinary records and maintaining academic integrity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/students/register')}
            className="slide-in"
            style={{ animationDelay: '200ms' }}
          >
            Student Registration
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/staff/register')}
            className="slide-in"
            style={{ animationDelay: '400ms' }}
          >
            Staff Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;