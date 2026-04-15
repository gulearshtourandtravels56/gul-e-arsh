import { supabase } from "@/lib/supabaseClient";

export async function getCompanyInfo() {
  // company with id 1
  const { data: company } = await supabase
    .from("company")
    .select()
    .eq("id", 1)
    .single();
  return company;
}

export async function getContactInfo() {
  // company with id 1
  const { data: contact } = await supabase
    .from("contact")
    .select()
    .eq("id", 1)
    .single();
  return contact;
}

export async function getContactSocials(): Promise<any[]> {
  // contact_id = 1
  const { data: socials } = await supabase
    .from("social_links")
    .select()
    .eq("contact_id", 1);
  return socials || [];
}

export async function getSiteImages(): Promise<any[]> {
  // company with id 1
  const { data: siteImages } = await supabase.from("site_images").select();
  return siteImages || [];
}

export async function getServices(): Promise<any[]> {
  const { data: services } = await supabase.from("services").select();
  return services || [];
}

export async function getWhyChooseUs(): Promise<any[]> {
  const { data: whyChooseUs } = await supabase.from("why_choose_us").select();
  return whyChooseUs || [];
}

export async function getCompanyStats(): Promise<any[]> {
  const { data: companyStats } = await supabase.from("company_stats").select();
  return companyStats || [];
}

export async function getLocations(): Promise<any[]> {
  const { data: locations } = await supabase.from("locations").select();
  return locations || [];
}

export async function getLocationById(id: number): Promise<any> {
  const { data: location } = await supabase.from("locations").select().eq("id", id).single();
  return location || {};
}

export async function getLocationsHighLights(
  locationId: number,
): Promise<any[]> {
  const { data: locations } = await supabase
    .from("location_highlights")
    .select()
    .eq("location_id", locationId);
  return locations || [];
}

export async function getLocationBestFor(locationId: number): Promise<any[]> {
  const { data: bestFor } = await supabase
    .from("location_best_for")
    .select()
    .eq("location_id", locationId);
  return bestFor || [];
}

export async function getLocationWhatToSee(locationId: number): Promise<any[]> {
  const { data: bestFor } = await supabase
    .from("location_what_to_see")
    .select()
    .eq("location_id", locationId);
  return bestFor || [];
}

export async function getLocationRelatedPackages(
  locationId: number,
): Promise<any[]> {
  const { data } = await supabase
    .from("location_packages")
    .select(
      `
      id,
      location_id,
      package_id,
      packages (*)
    `
    )
    .eq("location_id", locationId);
  return data || [];
}

export async function getAllPackages(): Promise<any[]> {
  const { data: packages } = await supabase.from("packages").select();
  return packages || [];
}
export async function getPackageById(id: number): Promise<any> {
  const { data: package_data } = await supabase
    .from("packages")
    .select()
    .eq("id", id)
    .single();
  return package_data || {};
}
export async function getPopularPackages(): Promise<any[]> {
  // data.packages.filter((pkg) => pkg.category === "popular").length > 0
  //   ? data.packages.filter((pkg) => pkg.category === "popular")
  //   : data.packages.slice(0, 3);
  const { data: popularPackages } = await supabase.from("packages").select();
  return popularPackages || [];
}
export async function getPackageHighlights(id: number): Promise<any[]> {
  const { data: highlights } = await supabase
    .from("package_highlights")
    .select()
    .eq("package_id", id);
  return highlights || [];
}
export async function getPackageInclusions(id: number): Promise<any[]> {
  const { data: inclusions } = await supabase
    .from("package_inclusions")
    .select();
  return inclusions || [];
}
export async function getPackageItinerary(id: number): Promise<any[]> {
  const { data: itinerary } = await supabase.from("package_itinerary").select();
  return itinerary || [];
}

export async function getTeamDetails(): Promise<any[]> {
  const { data: team } = await supabase.from("team").select();
  return team || [];
}

export async function getTestimonials(): Promise<any[]> {
  const { data: testimonials } = await supabase.from("testimonials").select();
  return testimonials || [];
}
