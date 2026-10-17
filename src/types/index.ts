export type ServiceCategory = 'all' | 'dog' | 'cat' | 'spa' | 'styling';

export interface ServiceItem {
  id: string;
  category: ('dog' | 'cat' | 'spa' | 'styling')[];
  badge?: string;
  badgeColor?: string;
  duration: string;
  title: string;
  price: number;
  description: string;
  features: string[];
  imageUrl: string;
}

export type PetType = 'cat' | 'small_dog' | 'medium_dog' | 'large_dog';

export interface PetTypeOption {
  id: PetType;
  name: string;
  subname: string;
  tag: string;
  basePrice: number;
  icon: 'cat' | 'dog';
}

export type FurCondition = 'smooth' | 'tangled_light' | 'tangled_heavy';

export interface FurOption {
  id: FurCondition;
  title: string;
  desc: string;
  price: number;
}

export type PlanPackage = 'classic' | 'spa' | 'cut';

export interface PlanOption {
  id: PlanPackage;
  title: string;
  desc: string;
  price: number;
  time: number;
  tag?: string;
}

export interface AddonOption {
  id: string;
  title: string;
  desc: string;
  price: number;
  time: number;
}

export interface CalculatorState {
  petType: PetType;
  basePrice: number;
  furCondition: FurCondition;
  furPrice: number;
  plan: PlanPackage;
  planPrice: number;
  planTime: number;
  selectedAddons: string[];
  addonPrice: number;
  addonTime: number;
  discount: number;
  totalPrice: number;
  totalTime: number;
}

export interface BookingFormData {
  ownerName: string;
  phone: string;
  petCategory: 'dog' | 'cat';
  petName: string;
  petWeight?: string;
  date: string;
  timeslot: string;
  serviceItem: string;
  notes?: string;
}

export interface BookingTicket {
  id: string;
  owner: string;
  pet: string;
  service: string;
  date: string;
  time: string;
  address: string;
}

export interface TeamMember {
  name: string;
  title: string;
  badge: string;
  experience: string;
  intro: string;
  tags: string[];
  imageUrl: string;
}

export interface Testimonial {
  author: string;
  avatar: string;
  petInfo: string;
  content: string;
  serviceTag: string;
  timeAgo: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EnvironmentZone {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  specs: string[];
  imageUrl: string;
}
