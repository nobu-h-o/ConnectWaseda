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

      <div className="topText">
        <h1>Friendship Starts Here.</h1>
        <p>Sick of spending lunch break alone?</p>
        <p>Want to join events catered to your interests?</p>
        <p>Join and host events of your own now!</p>
      </div>

      <div className="joinButton">
        <p>JOIN NOW</p>
      </div>

      <EventTabs />

      <Footer />
    </main>
  );
}

