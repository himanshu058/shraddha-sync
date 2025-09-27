import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-sacred-gradient p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-accent mx-auto mb-4" />
          <h1 className="font-heading text-6xl font-bold text-devotion mb-2">404</h1>
          <h2 className="font-heading text-2xl font-semibold text-accent mb-4">
            Path Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The sacred path you seek does not exist in our temple grounds.
          </p>
        </div>
        
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-temple-gradient text-white shadow-sacred hover:shadow-temple transition-sacred"
          size="lg"
        >
          <Home className="h-4 w-4 mr-2" />
          Return to Temple
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
