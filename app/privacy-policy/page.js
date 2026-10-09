import Legal from '@/components/Legal';
import { privacy } from '@/data/legal';

export const metadata = { title: 'Privacy Policy', description: 'How Ace Sports collects, uses and protects your information.' };

export default function Page() {
  return <Legal doc={privacy} />;
}
