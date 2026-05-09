import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <AuthLayout 
      title="Welcome to EcoSnap" 
      subtitle="The smartest way to manage your groceries and reduce waste."
    >
      <div className="space-y-6">
        <GoogleSignInButton onClick={login} />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-text-muted">Safe & Secure</span>
          </div>
        </div>

        <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
          <p className="text-xs text-emerald-800 leading-relaxed text-center">
            Join thousands of households turning expiring groceries into delicious dinners tonight.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
