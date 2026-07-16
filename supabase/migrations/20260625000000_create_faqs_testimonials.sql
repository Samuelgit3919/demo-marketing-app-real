-- Create faqs table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  avatar TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  project TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for faqs
CREATE POLICY "Allow public read access to faqs"
  ON public.faqs FOR SELECT USING (true);

CREATE POLICY "Admins can manage faqs"
  ON public.faqs FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- RLS Policies for testimonials
CREATE POLICY "Allow public read access to testimonials"
  ON public.testimonials FOR SELECT USING (true);

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- Timestamps triggers
CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed FAQ data from existing static data
INSERT INTO public.faqs (question, answer, category, order_index) VALUES
('How does the online design process work?', 'You start with our 3-Step Space Planner. You add your space, draw a simple layout, enter your wall measurements, and upload photos or videos. Then you meet a designer live online. We share our CAD screen and design your project with you in real time. After the session you get a same-day quote.', 'Process', 0),
('Do I need exact measurements?', 'No. Your measurements just need to be close. The planner helps you enter wall sizes and ceiling height so we have a good starting point. We confirm the final numbers with you during the live design session before anything is built.', 'Process', 1),
('Can I upload photos and videos?', 'Yes. In the planner you can upload photos and videos of your space. This helps us see the room clearly and design more accurately.', 'Process', 2),
('Do I need to be on camera?', 'No. You do not need to be on camera. We share our screen so you can watch the CAD design come to life. You can simply talk to the designer and follow along.', 'Live Design', 3),
('How fast do I get a quote?', 'You get a same-day quote. In most cases we give you the price on the same day as your live design session.', 'Quote', 4),
('Are cabinets fully assembled?', 'Yes. Your cabinets are supplied fully assembled and ready for delivery or install. You do not have to build them yourself.', 'Supply', 5),
('Do you install?', 'Our main focus is designing your project live online and supplying fully assembled cabinets. If you need install help, ask your designer during the session and we will let you know your options.', 'Supply', 6),
('Can I see 3D renders before the build begins?', 'Yes — every project includes a full 3D visualization presented during your design approval meeting. You will be able to see exactly how your closet will look, make any adjustments, and only sign off when you are completely satisfied. No build begins until you have approved the design.', 'Design', 7),
('Do you do closets, kitchens, and garages?', 'Yes. We design and supply custom solutions for closets, kitchens, and garages. You can choose one space or plan multiple spaces with us.', 'Services', 8),
('Can you work with my existing appliances?', 'Yes. For kitchen projects, we can design around your current appliances as long as we have the right sizes and clear photos.', 'Kitchens', 9),
('How long does cabinet delivery take after approval?', 'Delivery timing depends on the project size and finish choices. Your designer will give you a clear timeline after the design is approved.', 'Delivery', 10),
('Can I update my design after the live call?', 'Yes. If you need changes, we can revise the design before final approval. We only move forward once you are happy with the final plan.', 'Design', 11);

-- Seed Testimonial data from existing static data
INSERT INTO public.testimonials (name, location, avatar, rating, review, project, order_index) VALUES
('Sarah Mitchell', 'Beverly Hills, CA', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', 5, 'Design & Supply completely transformed my master bedroom into a dream dressing room. The attention to detail and quality of materials exceeded every expectation. My morning routine has become a true luxury experience.', 'Luxury Dressing Room', 0),
('James Thornton', 'Manhattan, NY', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 5, 'From the initial consultation to the final installation, the team was professional and meticulous. Our walk-in closet now feels like a boutique showroom. Worth every penny.', 'Walk-in Closet System', 1),
('Elena Rodriguez', 'Miami, FL', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 5, 'The sliding wardrobe they designed for our guest room is absolutely stunning. Perfectly measured, beautifully finished. Our guests cannot stop commenting on it.', 'Sliding Wardrobe', 2),
('David Chen', 'San Francisco, CA', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 5, 'I was skeptical that a closet system could change my life, but here we are. The custom storage solutions they created for my home office have tripled my productivity.', 'Office Storage System', 3),
('Amara Williams', 'Chicago, IL', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face', 5, 'As a fashion enthusiast, I needed a closet that could display my collection beautifully. Design & Supply delivered beyond my wildest dreams. Pure luxury.', 'Custom Walk-in Closet', 4);
