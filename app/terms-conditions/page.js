import Legal from '@/components/Legal';
import { terms } from '@/data/legal';

export const metadata = { title: 'Terms & Conditions', description: 'Terms and conditions for orders placed with Ace Sports.' };

export default function Page() {
  return <Legal doc={terms} />;
}
