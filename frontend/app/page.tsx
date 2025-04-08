import Header from "./components/header"
import Footer from "./components/footer"
import EventTabs from "./components/event-tabs"

export default function Home() {
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
  )
}

