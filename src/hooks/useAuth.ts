import { useSuspenseQuery } from '@tanstack/react-query';
import { supabase } from '../api/supabaseClient';

const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data?.user;
};

export const useAuth = () => {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
};
