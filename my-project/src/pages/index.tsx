import Navigation from "@/components/Navigation";
import AboutMe from "../components/AboutMe";


export default function AboutMePage() {
    return (<div className="space-y-14 lg:space-y-24 dark:bg-gray-800">
            <Navigation/>
    <main className="max-w-4xl mx-auto antialiased">
      <AboutMe/>
    </main>
  </div>)
}