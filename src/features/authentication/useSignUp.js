import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signUp as signUpApi } from '../../services/apiAuth';

export function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success('Account created successfully');
      navigate('/login');
    },
    onError: error => {
      console.error('ERROR', error);
      toast.error('Provided email or password is incorrect');
    },
  });

  return {
    signUp,
    isPending,
  };
}
