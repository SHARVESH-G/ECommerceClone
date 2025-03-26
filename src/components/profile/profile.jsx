import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn' },
];

const signIn = async (provider) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ error: `${provider.id} Error!!!` });
    }, 500);
  });
  return promise;
};

export default function OAuthSignInPage() {
  const theme = useTheme();
  return (
      <SignInPage signIn={signIn} providers={providers} />
  );
}
