import Navbar from "@/components/navbar";
import LocationDetailsClient from "./locationDetailsClient";
import Footer from "@/components/footer";

export default async function LocationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <LocationDetailsClient id={Number(id)} />
      <Footer />
    </>
  );
}