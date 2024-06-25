import { Metadata } from "next";
import Dépenses from "@/components/Dashboard/Dépenses";

export const metadata: Metadata = {
  title: "SaaS Organizer",
};

export default function Home() {
  return (
    <>
      <Dépenses />
    </>
  );
}
