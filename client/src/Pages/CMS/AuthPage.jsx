import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import { Button } from './Components/ui/button';
import { Alert, AlertDescription } from "./Components/ui/alert";
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent, 
    CardFooter 
  } from "./Components/ui/card";
  import { Input } from "./Components/ui/input";

export const AuthPage = () => {
  const [mode, setMode] = useState('login'); // login, register, forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message);
        }

        setSuccess('Registration successful! Please log in.');
        setMode('login');
      } 
      else if (mode === 'login') {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message);
        }

        login(data.token, data.isAdmin);
        navigate('/cms');
      }
      else if (mode === 'forgot') {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message);
        }

        setSuccess('Password reset email sent. Please check your inbox.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Optional Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/logo.png" 
            alt="BluStyles Logo" 
            className="h-16 w-auto"
          />
        </div>

        <Card className="w-full shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 
               mode === 'register' ? 'Create Your Account' : 
               'Reset Your Password'}
            </CardTitle>
            <p className="text-center text-sm text-gray-600">
              {mode === 'login' ? 'Sign in to access the client management system' :
               mode === 'register' ? 'Sign up to get started with the system' :
               'Enter your email to receive a reset link'}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
                <AlertDescription className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="bg-green-50 text-green-900 border-green-200">
                <AlertDescription className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-gray-900"
                />
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-gray-900"
                  />
                </div>
              )}

              {mode === 'register' && (
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="text-gray-900"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                  : 
                  mode === 'login' ? 'Sign In' :
                  mode === 'register' ? 'Create Account' :
                  'Send Reset Link'
                }
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 border-t border-gray-200 pt-4">
            {mode === 'login' && (
              <>
                <Button
                  variant="link"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Forgot your password?
                </Button>
                <Button
                  variant="link"
                  onClick={() => setMode('register')}
                  className="text-sm text-gray-600 hover:text-gray-700"
                >
                  Don't have an account? Sign up
                </Button>
              </>
            )}

            {(mode === 'register' || mode === 'forgot') && (
              <Button
                variant="link"
                onClick={() => setMode('login')}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Back to login
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;