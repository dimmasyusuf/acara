import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: 'max-w-md shadow-none',
        },
      }}
    />
  );
}
