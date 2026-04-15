import Navbar from "@/components/navbar";
import PackagesDetailsClient from "./packageDetailsClient";
import Footer from "@/components/footer";

export default async function PackagesDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <PackagesDetailsClient id={Number(id)} />
      <Footer />
    </>
  );
}
