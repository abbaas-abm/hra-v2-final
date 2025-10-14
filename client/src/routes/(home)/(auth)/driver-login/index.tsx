import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/driverAuth';
import { useDriverAuth } from '@/context/DriverAuthContext';
import { toast } from 'sonner';

export const Route = createFileRoute('/(home)/(auth)/driver-login/')({
  component: DriverLoginPage,
  head: () => ({
    meta: [
      {title: 'Driver Login | HRA Transportation Authentication'}
    ]
  })
})

function DriverLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {login} = useDriverAuth();

  const {isPending, mutateAsync} = useMutation({
    mutationFn: loginUser,
    mutationKey: ['user-authentication'],
    onSuccess: (data) => {
      login(data.token, {
        email: data.email,
        _id: data._id,
        name: data.name
      });
      navigate({to: '/dashboard/driver'});
      toast.success('Login Succesful!');
    },
    onError: (err:any) => {
       setError(err?.message || 'Something went wrong')
    }
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync({email, password})
    navigate({to: '/dashboard/driver'})
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 sm:p-6">
      <div className="w-full max-w-sm p-6 space-y-8 bg-white rounded-xl shadow-lg border border-yellow-500">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-3xl font-bold text-yellow-400">Driver Login</h2>
          <p className="text-sm text-yellow-400">
            Log in to your account
          </p>
          {error && <>
            <p className="text-center w-full text-red-700 bg-red-300 py-2 px-4 rounded-lg">
              {error}
            </p>
          </>}
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white ${isPending ? `bg-gray-300` : `bg-yellow-400`} border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
              disabled={isPending}
            >
              {isPending ? 'Logging In...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm">
            <a href="#" className="font-medium text-yellow-400 hover:text-yellow-500">
              Don't have an account yet?
            </a>
            <span className="text-white">{" "}</span>
            <Link to="/driver-registration" className="font-medium text-yellow-400 hover:text-yellow-500">
              Register.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
