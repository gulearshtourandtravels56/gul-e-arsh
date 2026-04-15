export interface Database {
  public: {
    Tables: {
      company: {
        Row: {
          id: number;
          name: string;
          tagline: string | null;
          description: string | null;
          mission: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['company']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['company']['Insert']>;
      };

      company_stats: {
        Row: {
          id: number;
          company_id: number;
          value: string | null;
          label: string | null;
        };
        Insert: Omit<Database['public']['Tables']['company_stats']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['company_stats']['Insert']>;
      };

      site_images: {
        Row: {
          id: number;
          key: string;
          url: string | null;
        };
        Insert: Omit<Database['public']['Tables']['site_images']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['site_images']['Insert']>;
      };

      contact: {
        Row: {
          id: number;
          phone: string | null;
          email: string | null;
          address: string | null;
          address_link: string | null;
        };
        Insert: Omit<Database['public']['Tables']['contact']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['contact']['Insert']>;
      };

      social_links: {
        Row: {
          id: number;
          contact_id: number;
          platform: string | null;
          url: string | null;
        };
        Insert: Omit<Database['public']['Tables']['social_links']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['social_links']['Insert']>;
      };

      services: {
        Row: {
          id: number;
          title: string | null;
          description: string | null;
          icon: string | null;
        };
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };

      why_choose_us: {
        Row: {
          id: number;
          title: string | null;
          description: string | null;
          icon: string | null;
        };
        Insert: Omit<Database['public']['Tables']['why_choose_us']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['why_choose_us']['Insert']>;
      };

      testimonials: {
        Row: {
          id: number;
          name: string | null;
          review: string | null;
          location: string | null;
          rating: number | null;
        };
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };

      packages: {
        Row: {
          id: number;
          title: string;
          location: string | null;
          duration: string | null;
          price: string | null;
          price_value: number | null;
          description: string | null;
          short_description: string | null;
          image: string | null;
          category: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['packages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['packages']['Insert']>;
      };

      package_highlights: {
        Row: {
          id: number;
          package_id: number;
          highlight: string | null;
        };
        Insert: Omit<Database['public']['Tables']['package_highlights']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['package_highlights']['Insert']>;
      };

      package_inclusions: {
        Row: {
          id: number;
          package_id: number;
          inclusion: string | null;
        };
        Insert: Omit<Database['public']['Tables']['package_inclusions']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['package_inclusions']['Insert']>;
      };

      package_itinerary: {
        Row: {
          id: number;
          package_id: number;
          day: number | null;
          title: string | null;
          details: string | null;
        };
        Insert: Omit<Database['public']['Tables']['package_itinerary']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['package_itinerary']['Insert']>;
      };

      locations: {
        Row: {
          id: number;
          name: string;
          subtitle: string | null;
          altitude: string | null;
          distance_from_srinagar: string | null;
          description: string | null;
          long_description: string | null;
          best_time: string | null;
          image: string | null;
        };
        Insert: Omit<Database['public']['Tables']['locations']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['locations']['Insert']>;
      };

      location_highlights: {
        Row: {
          id: number;
          location_id: number;
          highlight: string | null;
        };
        Insert: Omit<Database['public']['Tables']['location_highlights']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['location_highlights']['Insert']>;
      };

      location_best_for: {
        Row: {
          id: number;
          location_id: number;
          tag: string | null;
        };
        Insert: Omit<Database['public']['Tables']['location_best_for']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['location_best_for']['Insert']>;
      };

      location_what_to_see: {
        Row: {
          id: number;
          location_id: number;
          title: string | null;
          image: string | null;
          description: string | null;
        };
        Insert: Omit<Database['public']['Tables']['location_what_to_see']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['location_what_to_see']['Insert']>;
      };

      location_packages: {
        Row: {
          id: number;
          location_id: number;
          package_id: number;
        };
        Insert: Omit<Database['public']['Tables']['location_packages']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['location_packages']['Insert']>;
      };

      gallery: {
        Row: {
          id: number;
          title: string | null;
          location: string | null;
        };
        Insert: Omit<Database['public']['Tables']['gallery']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['gallery']['Insert']>;
      };

      faqs: {
        Row: {
          id: number;
          question: string | null;
          answer: string | null;
        };
        Insert: Omit<Database['public']['Tables']['faqs']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['faqs']['Insert']>;
      };

      team: {
        Row: {
          id: number;
          name: string | null;
          role: string | null;
          bio: string | null;
          photo: string | null;
        };
        Insert: Omit<Database['public']['Tables']['team']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['team']['Insert']>;
      };

      team_socials: {
        Row: {
          id: number;
          team_id: number;
          platform: string | null;
          url: string | null;
        };
        Insert: Omit<Database['public']['Tables']['team_socials']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['team_socials']['Insert']>;
      };
    };
  };
}