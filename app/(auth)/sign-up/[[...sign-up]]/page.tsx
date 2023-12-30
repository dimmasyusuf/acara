import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          card: 'max-w-md shadow-none',
        },
      }}
    />
  );
}
