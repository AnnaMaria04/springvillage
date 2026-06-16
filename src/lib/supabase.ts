import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Cottage = {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  price_per_night: number;
  amenities: string[];
  cover_image: string;
  featured: boolean;
};

export type CottageImage = {
  id: string;
  cottage_id: string;
  url: string;
  alt: string;
  sort_order: number;
};

export type Booking = {
  id: string;
  cottage_id: string;
  guest_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
  total_price: number;
  message?: string;
  created_at: string;
};

export type Review = {
  id: string;
  cottage_id: string;
  booking_id?: string;
  author: string;
  rating: number;
  body: string;
  stay_type?: string;
  created_at: string;
  approved: boolean;
};
