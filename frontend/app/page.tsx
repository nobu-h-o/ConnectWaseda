import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Header from "./components/header";
import Footer from "./components/footer";
import EventTabs from "./components/event-tabs";

export default async function Home() {
  // Check if user is authenticated
  const session = await getServerSession();
  
  // If not authenticated, redirect to the home page
  if (!session) {
    redirect("/home");
  }
  
  // If authenticated, show the current content
  return (
    <main>
      <Header />

      <div className="text-center mt-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Discover Events at <span className="text-[#ff7230]">Waseda</span>
        </h1>
        <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
          Connect with fellow students, find events that match your interests, and make the most of your university experience.
        </p>
      </div>

      <EventTabs />

      <Footer />
    </main>
  );
}

