import type { Metadata } from "next";
import HomePage from "./components/HomePage";

export const metadata: Metadata = {
  title: "Home"
}

export default function Home() {
  return (
    <HomePage/>
  );
}
