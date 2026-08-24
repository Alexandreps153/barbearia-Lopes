import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WorksGallery from '@/components/WorksGallery';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import BookingSection from '@/components/Booking/BookingSection';
import Footer from '@/components/Footer';
import AccessibilityMenu from '@/components/AccessibilityMenu';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <WorksGallery />
        <About />
        <Reviews />
        <BookingSection />
      </main>
      <Footer />
      <AccessibilityMenu />
    </div>
  );
}
