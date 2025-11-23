//este codigo foi escrito assim pq estamos a usar sem backend, com o backend o codigo que deve ser usado está em baixo em comentário.

/*
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A password deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

    const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      await login(data.email, data.password);

      toast({ title: 'Login efetuado', description: 'Bem-vindo de volta!' });
      navigate('/condominios');
    } catch (error) {
      toast({
        title: 'Erro ao entrar',
        description: error instanceof Error ? error.message : 'Credenciais inválidas',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Entrar na Domly</CardTitle>
          <CardDescription>
            Introduza as suas credenciais para aceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.pt"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'A entrar...' : 'Entrar'}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Já tens uma licença?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Introduz
              </Link>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Não tens uma licença?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Contacta-nos!
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};


*/

// React core and useful libraries
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';            // For navigation and linking within the app
import { useForm } from 'react-hook-form';                       // Handling forms/reactive state for user input
import { zodResolver } from '@hookform/resolvers/zod';           // Connector for Zod schema validation in react-hook-form
import { z } from 'zod';                                         // Schema validation library

// UI Components (custom for your project)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';                        // Icon for branding

// Custom hooks/contexts (for authentication and notifications)
import { useAuth } from '@/context/AuthContext';                 // Handles login, user info (custom context)
import { toast } from '@/hooks/use-toast';                       // Shows feedback/popups
import { supabase } from '@/supabaseClient';                     // Import your preconfigured Supabase client

// 1. Define a schema for validating login form input (email and password) using Zod
const loginSchema = z.object({
  email: z.string().email('Email inválido'),                    // Email: required & must be valid
  password: z.string().min(6, 'A password deve ter pelo menos 6 caracteres'), // Password: required & min 6 characters
});

// 2. Infer the form data types from the schema (TypeScript)
type LoginFormData = z.infer<typeof loginSchema>;

// 3. Export your LoginPage component
export const LoginPage: React.FC = () => {
  // Routing (navigate after login), custom auth logic
  const navigate = useNavigate();
  const { login } = useAuth();

  // Local state for loading spinner (disables button/input during submission)
  const [isLoading, setIsLoading] = React.useState(false);

  // 4. Set up form logic: registering fields, handling submit, and tracking validation errors
  const {
    register,                                  // Connects input fields to react-hook-form
    handleSubmit,                              // Handles form submit
    formState: { errors },                     // Object with any validation errors for the form 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),        // Use the Zod schema for validation
  });

  // 5. Handle what happens on form submission
  const onSubmit = async (data: LoginFormData) => {
  setIsLoading(true);  // Show loading spinner while waiting for response
  try {
    // 1. Try to log in using Supabase Auth (email & password)
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) throw error; // If login fails, go to catch block

    // 2. If successful, show a success toast/pop-up
    toast({
      title: 'Login efetuado',
      description: 'Bem-vindo de volta!',
    });

    // 3. Redirect user to the main dashboard or protected route
    navigate('/condominios');
  } catch (error) {
    // Show error toast if login fails
    toast({
      title: 'Erro ao entrar',
      description: 'Credenciais inválidas ou erro do servidor',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false); // Always turn off loading spinner when done
  }
};


  // 6. Render the whole login screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary" />    {/* Logo/Icon */}
          </div>
          <CardTitle className="text-2xl">Entrar na Domly</CardTitle>
          <CardDescription>
            Introduza as suas credenciais para aceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Main login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.pt"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'A entrar...' : 'Entrar'}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Já tens uma licença?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Introduz
              </Link>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Não tens uma licença?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Contacta-nos!
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
