import { Service } from '../types';

export const ServicesData: Service[] = [
  // Hair
  {
    id: 'h1',
    category: 'Hair',
    name: 'Royal Haircut & Style',
    description: 'Precision cut tailored to your face shape, finished with a signature Queen blowout.',
    priceStart: 15,
    image: 'https://picsum.photos/400/500?random=1'
  },
  {
    id: 'h2',
    category: 'Hair',
    name: 'Protein & Keratin Treatment',
    description: 'Restore shine and strength with our premium Brazilian protein treatments.',
    priceStart: 80,
    image: 'https://picsum.photos/400/500?random=2'
  },
  {
    id: 'h3',
    category: 'Hair',
    name: 'Couture Coloring',
    description: 'Full color, balayage, or highlights using top-tier international brands.',
    priceStart: 45,
    image: 'https://picsum.photos/400/500?random=3'
  },
  // Nails
  {
    id: 'n1',
    category: 'Nails',
    name: 'Gel Extensions & Art',
    description: 'Durable, beautiful extensions with custom nail art designs.',
    priceStart: 25,
    image: 'https://picsum.photos/400/500?random=4'
  },
  {
    id: 'n2',
    category: 'Nails',
    name: 'Classic Manicure & Pedicure',
    description: 'Complete nail care with cuticle treatment and polish.',
    priceStart: 15,
    image: 'https://picsum.photos/400/500?random=5'
  },
  // Bridal
  {
    id: 'b1',
    category: 'Bridal',
    name: 'Full Bridal Package',
    description: 'The ultimate Queen experience: Hair, Makeup, Lashes, Nails, and Skincare prep.',
    priceStart: 250,
    image: 'https://picsum.photos/400/500?random=6'
  },
  {
    id: 'b2',
    category: 'Bridal',
    name: 'Engagement Glam',
    description: 'Soft yet stunning glam for your special engagement party.',
    priceStart: 100,
    image: 'https://picsum.photos/400/500?random=7'
  },
  // Lashes
  {
    id: 'l1',
    category: 'Lashes & Brows',
    name: 'Volume Lashes',
    description: 'Dramatic, fluffy volume lashes for a captivating look.',
    priceStart: 35,
    image: 'https://picsum.photos/400/500?random=8'
  },
  // Skincare
  {
    id: 's1',
    category: 'Skincare',
    name: 'Deep Cleansing Facial',
    description: 'Rejuvenate your skin with deep pore cleansing and hydration.',
    priceStart: 30,
    image: 'https://picsum.photos/400/500?random=9'
  },
  // Academy
  {
    id: 'a1',
    category: 'Academy',
    name: 'Professional Beauty Course',
    description: '3-month intensive certification in hair, makeup, and salon management.',
    priceStart: 500,
    image: 'https://picsum.photos/400/500?random=10'
  }
];

export const ServiceCategories = Array.from(new Set(ServicesData.map(s => s.category)));
