import { supabase } from "@/lib/supabaseClient";

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const apiCache = new Map<string, CacheEntry<any>>();

async function cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const entry = apiCache.get(key);
  if (entry && entry.expiresAt > now) {
    return entry.value;
  }

  const value = await fetcher();
  apiCache.set(key, {
    value,
    expiresAt: now + CACHE_TTL_MS,
  });

  return value;
}

export function clearCache(keys?: string | string[]) {
  if (!keys) {
    apiCache.clear();
    return;
  }

  const keyList = typeof keys === "string" ? [keys] : keys;
  keyList.forEach((key) => apiCache.delete(key));
}

export async function getCompanyInfo() {
  return cached("getCompanyInfo", async () => {
    const { data: company } = await supabase
      .from("company")
      .select()
      .eq("id", 1)
      .single();
    return company;
  });
}

export async function getContactInfo() {
  return cached("getContactInfo", async () => {
    const { data: contact } = await supabase
      .from("contact")
      .select()
      .eq("id", 1)
      .single();
    return contact;
  });
}

export async function getContactSocials(): Promise<any[]> {
  return cached("getContactSocials", async () => {
    const { data: socials } = await supabase
      .from("social_links")
      .select()
      .eq("contact_id", 1);
    return socials || [];
  });
}

export async function getSiteImages(): Promise<any[]> {
  return cached("getSiteImages", async () => {
    const { data: siteImages } = await supabase.from("site_images").select();
    return siteImages || [];
  });
}

export async function getServices(): Promise<any[]> {
  return cached("getServices", async () => {
    const { data: services } = await supabase.from("services").select();
    return services || [];
  });
}

export async function getWhyChooseUs(): Promise<any[]> {
  return cached("getWhyChooseUs", async () => {
    const { data: whyChooseUs } = await supabase
      .from("why_choose_us")
      .select();
    return whyChooseUs || [];
  });
}

export async function getCompanyStats(): Promise<any[]> {
  return cached("getCompanyStats", async () => {
    const { data: companyStats } = await supabase.from("company_stats").select();
    return companyStats || [];
  });
}

export async function getLocations(): Promise<any[]> {
  return cached("getLocations", async () => {
    const { data: locations } = await supabase.from("locations").select();
    return locations || [];
  });
}

export async function getLocationById(id: number): Promise<any> {
  return cached(`getLocationById:${id}`, async () => {
    const { data: location } = await supabase
      .from("locations")
      .select()
      .eq("id", id)
      .single();
    return location || {};
  });
}

export async function getLocationsHighLights(
  locationId: number,
): Promise<any[]> {
  return cached(`getLocationsHighLights:${locationId}`, async () => {
    const { data: locations } = await supabase
      .from("location_highlights")
      .select()
      .eq("location_id", locationId);
    return locations || [];
  });
}

export async function getLocationBestFor(locationId: number): Promise<any[]> {
  return cached(`getLocationBestFor:${locationId}`, async () => {
    const { data: bestFor } = await supabase
      .from("location_best_for")
      .select()
      .eq("location_id", locationId);
    return bestFor || [];
  });
}

export async function getLocationWhatToSee(locationId: number): Promise<any[]> {
  return cached(`getLocationWhatToSee:${locationId}`, async () => {
    const { data: bestFor } = await supabase
      .from("location_what_to_see")
      .select()
      .eq("location_id", locationId);
    return bestFor || [];
  });
}

export async function getLocationRelatedPackages(
  locationId: number,
): Promise<any[]> {
  return cached(`getLocationRelatedPackages:${locationId}`, async () => {
    const { data } = await supabase
      .from("location_packages")
      .select(
        `
      id,
      location_id,
      package_id,
      packages (*)
    `,
      )
      .eq("location_id", locationId);
    return data || [];
  });
}

export async function getAllPackages(): Promise<any[]> {
  return cached("getAllPackages", async () => {
    const { data: packages } = await supabase.from("packages").select();
    return packages || [];
  });
}

export async function getPackageById(id: number): Promise<any> {
  return cached(`getPackageById:${id}`, async () => {
    const { data: package_data } = await supabase
      .from("packages")
      .select()
      .eq("id", id)
      .single();
    return package_data || {};
  });
}

export async function getPopularPackages(): Promise<any[]> {
  return cached("getPopularPackages", async () => {
    const { data: popularPackages } = await supabase.from("packages").select();
    return popularPackages || [];
  });
}

export async function getPackageHighlights(id: number): Promise<any[]> {
  return cached(`getPackageHighlights:${id}`, async () => {
    const { data: highlights } = await supabase
      .from("package_highlights")
      .select()
      .eq("package_id", id);
    return highlights || [];
  });
}

export async function getPackageInclusions(id: number): Promise<any[]> {
  return cached(`getPackageInclusions:${id}`, async () => {
    const { data: inclusions } = await supabase
      .from("package_inclusions")
      .select()
      .eq("package_id", id);
    return inclusions || [];
  });
}

export async function getPackageItinerary(id: number): Promise<any[]> {
  return cached(`getPackageItinerary:${id}`, async () => {
    const { data: itinerary } = await supabase
      .from("package_itinerary")
      .select()
      .eq("package_id", id);
    return itinerary || [];
  });
}

export async function getTeamDetails(): Promise<any[]> {
  return cached("getTeamDetails", async () => {
    const { data: team } = await supabase.from("team").select();
    return team || [];
  });
}

export async function getTestimonials(): Promise<any[]> {
  return cached("getTestimonials", async () => {
    const { data: testimonials } = await supabase.from("testimonials").select();
    return testimonials || [];
  });
}

export async function getFAQs(): Promise<any[]> {
  return cached("getFAQs", async () => {
    const { data: faqs } = await supabase
      .from("faqs")
      .select()
      .order("id", { ascending: false });
    return faqs || [];
  });
}

export async function getGalleryItems(): Promise<any[]> {
  return cached("getGalleryItems", async () => {
    const { data: gallery } = await supabase
      .from("gallery")
      .select()
      .order("created_date", { ascending: false });
    return gallery || [];
  });
}

export async function addTestimonial(testimonial: {
  name: string;
  review: string;
  location: string;
  rating: number;
}) {
  const { data, error } = await supabase
    .from("testimonials")
    .insert([testimonial])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  clearCache("getTestimonials");
  return data;
}
