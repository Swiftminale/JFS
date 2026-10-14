import { getContent } from '@/lib/contentService';
import CoffeeExperience from '@/components/public/CoffeeExperience';

export const revalidate = 0;

export default function CoffeePage() {
  const data = getContent();
  return <CoffeeExperience data={data} />;
}

