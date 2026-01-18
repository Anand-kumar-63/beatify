import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock, Star, Scissors, Sparkles, Heart, ChevronLeft, ChevronRight, ArrowRight, Feather, Palette, Gem, Droplets, Gift, Calendar, Quote, MessageCircle, ShieldCheck, Leaf, Award, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page) => {
    if (page === 'location') {
      // Redirect to Google Maps for a central London location (e.g., Covent Garden)
      window.open('https://www.google.com/maps/search/Beauty+Parlour+Covent+Garden+London', '_blank');
      setIsMenuOpen(false);
      return;
    }
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
    { id: 'location', label: 'Location' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Global Styles for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-serif font-bold tracking-tighter cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            THE PARLOUR.
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-sm tracking-widest uppercase hover:text-stone-500 transition-colors ${currentPage === link.id ? 'font-bold border-b-2 border-stone-900' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-8 px-6 flex flex-col space-y-4 border-t border-stone-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-left text-lg font-serif ${currentPage === link.id ? 'text-stone-900 font-bold' : 'text-stone-600'}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="pt-0">
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-white text-xl font-serif font-bold mb-4">THE PARLOUR.</h3>
            <p className="text-sm leading-relaxed mb-4">
              Dedicated to the craft of hairdressing and the art of relaxation.
              Est. 2024.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Twitter} />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Visit Us</h4>
            <p className="text-sm mb-2">123 Vintage Avenue</p>
            <p className="text-sm mb-2">Stylist District, NY 10012</p>
            <p className="text-sm">hello@theparlour.com</p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Hours</h4>
            <div className="text-sm space-y-1">
              <p><span className="w-20 inline-block text-stone-500">Tue - Fri</span> 10am - 7pm</p>
              <p><span className="w-20 inline-block text-stone-500">Saturday</span> 9am - 5pm</p>
              <p><span className="w-20 inline-block text-stone-500">Sun - Mon</span> Closed</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-stone-800 text-xs text-center flex justify-between flex-col md:flex-row items-center">
          <p>&copy; 2024 The Parlour Salon. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with style.</p>
        </div>
      </footer>
    </div>
  );
};

// --- Reusable Booking Component ---

const BookingCTA = ({ styleType }) => {
  const handleWhatsApp = () => window.open('https://wa.me/1234567890', '_blank');
  const handleEmail = () => window.location.href = 'mailto:hello@theparlour.com';

  if (styleType === 'luxury') {
    return (
      <section className="py-24 bg-stone-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready for your transformation?</h2>
          <p className="text-stone-400 mb-10 text-lg max-w-2xl mx-auto">
            Appointments are exclusively booked via direct message to ensure a personalized experience from the very start.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={handleWhatsApp} className="flex items-center justify-center gap-3 bg-white text-stone-900 px-8 py-4 font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors">
              <MessageCircle size={20} /> Book via WhatsApp
            </button>
            <button onClick={handleEmail} className="flex items-center justify-center gap-3 border border-stone-600 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
              <Mail size={20} /> Book via Email
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (styleType === 'minimal') {
    return (
      <section className="py-24 bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-4 block">Secure Your Spot</span>
          <h2 className="text-3xl font-serif mb-8 text-stone-900">Start Your Journey With Us</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <MessageCircle size={18} /> WhatsApp
            </button>
            <button onClick={handleEmail} className="flex items-center justify-center gap-2 bg-stone-800 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Mail size={18} /> Email Us
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (styleType === 'image') {
    return (
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1521590832169-7dad1a9b708c?q=80&w=2574&auto=format&fit=crop" alt="Booking Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
           <h2 className="text-4xl md:text-5xl font-serif mb-6">Create Your Moment</h2>
           <p className="text-xl text-stone-200 mb-10 font-light">Let's craft the perfect look for you.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={handleWhatsApp} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all">
              <MessageCircle size={18} /> Message on WhatsApp
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  return null;
};

// --- Page Components ---

const HomePage = ({ navigateTo }) => {
  // Hero Carousel State
  const [heroSlide, setHeroSlide] = useState(0);
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2574&auto=format&fit=crop",
      title: "Effortless Beauty",
      subtitle: "For the modern woman."
    },
    {
      url: "https://images.unsplash.com/photo-1560066984-12186d30e9d7?q=80&w=2574&auto=format&fit=crop",
      title: "Expert Styling",
      subtitle: "Find your signature look."
    },
    {
      url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop",
      title: "Luxury Spa",
      subtitle: "Relax. Rejuvenate. Refresh."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section Grid */}
      <div className="pt-24 pb-6 px-4 md:px-6 h-auto min-h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Hero Carousel (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden shadow-sm group">
            {heroImages.map((slide, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                   <h2 className="text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4 text-stone-200 animate-slide-up">Welcome to The Parlour</h2>
                   <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight animate-slide-up-delay">
                     {slide.title}
                   </h1>
                   <p className="text-xl font-light mb-8 animate-slide-up-delay-2">{slide.subtitle}</p>
                   <button 
                     onClick={() => navigateTo('services')}
                     className="bg-white text-stone-900 px-8 py-3 text-sm font-bold tracking-widest hover:bg-stone-200 transition-colors uppercase animate-fade-in-up"
                   >
                     View Menu
                   </button>
                </div>
              </div>
            ))}
            
            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {heroImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setHeroSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === heroSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          {/* Side Offers (Spans 1 column on desktop) */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-[500px] lg:h-[600px]">
            
            {/* Offer 1 */}
            <div className="flex-1 bg-stone-900 rounded-lg relative overflow-hidden group cursor-pointer" onClick={() => navigateTo('services')}>
               <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                 <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
               </div>
               <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 text-white border border-stone-700/50 m-2 rounded">
                 <Gift size={32} className="mb-4 text-stone-300" />
                 <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-stone-400">First Time Visit?</h3>
                 <p className="text-3xl font-serif mb-2">Get 20% Off</p>
                 <p className="text-stone-400 text-sm mb-6">On your first haircut or color service.</p>
                 <span className="inline-block bg-white text-stone-900 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider">
                   CODE: NEW20
                 </span>
               </div>
            </div>

            {/* Offer 2 */}
            <div className="flex-1 bg-stone-200 rounded-lg relative overflow-hidden group cursor-pointer" onClick={() => navigateTo('services')}>
               <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src="https://images.unsplash.com/photo-1519699047748-40ba526a6f78?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 text-stone-900 border border-stone-300/50 m-2 rounded">
                 <Calendar size={32} className="mb-4 text-stone-500" />
                 <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-stone-500">Bridal Season</h3>
                 <p className="text-3xl font-serif mb-2">Book Early</p>
                 <p className="text-stone-600 text-sm mb-6">Secure your date for 2024 weddings now.</p>
                 <span className="text-xs font-bold border-b border-stone-900 pb-1 uppercase tracking-wider">
                   Inquire Now
                 </span>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Scissors className="mx-auto mb-6 text-stone-400" size={32} />
          <h3 className="text-3xl font-serif mb-6">Our Philosophy</h3>
          <p className="text-lg text-stone-600 leading-relaxed font-light">
            We believe that a salon visit is a sacred ritual of self-care. 
            It is a pause in your busy life, and a chance to feel empowered and radiant. 
            Our stylists are artists, dedicated to enhancing your unique feminine style.
          </p>
        </div>
      </section>

      {/* The Ritual Section (Process) */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="bg-stone-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Heart className="text-stone-300" size={24} />
              </div>
              <h4 className="text-xl font-serif mb-4">Connect</h4>
              <p className="text-stone-400 text-sm leading-relaxed px-4">
                Every appointment begins with a one-on-one consultation to understand your lifestyle, hair type, and personal aesthetic.
              </p>
            </div>
             <div>
              <div className="bg-stone-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Feather className="text-stone-300" size={24} />
              </div>
              <h4 className="text-xl font-serif mb-4">Unwind</h4>
              <p className="text-stone-400 text-sm leading-relaxed px-4">
                Sink into our chairs and enjoy a signature scalp massage and premium refreshments while we work our magic.
              </p>
            </div>
             <div>
              <div className="bg-stone-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Sparkles className="text-stone-300" size={24} />
              </div>
              <h4 className="text-xl font-serif mb-4">Reveal</h4>
              <p className="text-stone-400 text-sm leading-relaxed px-4">
                Walk out feeling refreshed, confident, and equipped with the knowledge to maintain your new look at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Slider */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif mb-4">Our Expertise</h3>
            <p className="text-stone-500">Discover our range of premium hair services.</p>
          </div>
          <HomeServiceSlider navigateTo={navigateTo} />
        </div>
      </section>

      {/* The Edit (Trends/Blog Teaser) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">The Edit</span>
              <h3 className="text-3xl font-serif">Trending Now</h3>
            </div>
            <button onClick={() => navigateTo('gallery')} className="hidden md:flex items-center text-sm font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-1 hover:border-stone-900 transition-all">
              View Gallery <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
              <div className="overflow-hidden h-[400px] mb-6">
                <img src="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2670&auto=format&fit=crop" alt="Trend 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <span className="text-xs text-stone-500 uppercase tracking-widest mb-2 block">Hair Health</span>
              <h4 className="text-2xl font-serif mb-2 group-hover:text-stone-600 transition-colors">The Glass Hair Trend</h4>
              <p className="text-stone-600 text-sm leading-relaxed">Achieving that impossible mirror-like shine is easier than you think with our new keratin treatments.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="overflow-hidden h-[400px] mb-6">
                <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop" alt="Trend 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
               <span className="text-xs text-stone-500 uppercase tracking-widest mb-2 block">Skincare</span>
              <h4 className="text-2xl font-serif mb-2 group-hover:text-stone-600 transition-colors">The Sustainable Glow</h4>
              <p className="text-stone-600 text-sm leading-relaxed">Why we're switching to 100% plant-based facial oils for that dewy, natural summer look.</p>
            </div>
          </div>
        </div>
      </section>

      {/* From The Director */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/2">
                <img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=2678&auto=format&fit=crop" alt="Director" className="w-full h-[500px] object-cover grayscale" />
             </div>
             <div className="w-full md:w-1/2">
               <Quote size={40} className="text-stone-300 mb-6" />
               <h3 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">"We don't just change how you look. We change how you feel."</h3>
               <p className="text-stone-600 text-lg leading-relaxed mb-8 font-light">
                 Beauty is deeply personal. It's about finding that balance between what's trending and what feels authentically you. My team and I are here to guide you on that journey.
               </p>
               <div className="flex items-center gap-4">
                 <div className="h-px w-12 bg-stone-900"></div>
                 <span className="font-bold uppercase tracking-widest text-sm">Elena Voss, Creative Director</span>
               </div>
             </div>
           </div>
        </div>
      </section>
      
      {/* Luxury Booking CTA */}
      <BookingCTA styleType="luxury" />
    </div>
  );
};

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      title: "Hair Services",
      icon: Scissors,
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2684&auto=format&fit=crop",
      services: [
        { name: "Haircut & Style", price: "$45-75", description: "Professional haircuts tailored to your face shape and style preferences." },
        { name: "Hair Coloring", price: "$80-150", description: "Vibrant hair color treatments with expert application." },
        { name: "Hair Smoothening", price: "$100-200", description: "Keratin treatments for smooth, shiny, healthy hair." },
        { name: "Hair Spa", price: "$60-100", description: "Deep conditioning and rejuvenating hair spa treatments." },
      ]
    },
    {
      title: "Skin Care",
      icon: Droplets,
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop",
      services: [
        { name: "Facial Treatment", price: "$65-120", description: "Customized facials tailored to your unique skin type." },
        { name: "Deep Cleansing", price: "$55-95", description: "Professional deep cleansing and pore treatment." },
        { name: "Skin Rejuvenation", price: "$100-180", description: "Advanced treatments to restore skin's natural glow." },
        { name: "Chemical Peel", price: "$75-150", description: "Safe and effective skin resurfacing treatment." },
      ]
    },
    {
      title: "Nail Care",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2670&auto=format&fit=crop",
      services: [
        { name: "Manicure", price: "$30-50", description: "Classic or gel manicure with complete nail care." },
        { name: "Pedicure", price: "$35-60", description: "Relaxing pedicure with foot massage and care." },
        { name: "Nail Art", price: "$40-80", description: "Creative and artistic nail design services." },
        { name: "Nail Extension", price: "$50-100", description: "Professional nail extensions with various styles." },
      ]
    },
    {
      title: "Makeup Services",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2671&auto=format&fit=crop",
      services: [
        { name: "Party Makeup", price: "$50-100", description: "Glamorous makeup for parties and special events." },
        { name: "Bridal Makeup", price: "$150-300", description: "Comprehensive bridal makeup package for your special day." },
        { name: "Makeup Tutorial", price: "$60-90", description: "Professional makeup tips and application training." },
        { name: "SFX Makeup", price: "$80-200", description: "Special effects makeup for events and productions." },
      ]
    },
    {
      title: "Spa & Wellness",
      icon: Feather,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2670&auto=format&fit=crop",
      services: [
        { name: "Body Massage", price: "$70-120", description: "Relaxing full body massage therapy." },
        { name: "Aromatherapy", price: "$80-130", description: "Therapeutic massage with essential oils." },
        { name: "Facial Massage", price: "$45-75", description: "Rejuvenating facial and neck massage." },
        { name: "Sauna Session", price: "$25-40", description: "Relaxing sauna experience for detox and wellness." },
      ]
    },
    {
      title: "Bridal Packages",
      icon: Gem,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop",
      services: [
        { name: "Full Bridal Package", price: "$500-1000", description: "Complete bridal preparation with all services included." },
        { name: "Pre-Wedding Package", price: "$300-600", description: "Multi-session preparation leading up to the wedding." },
        { name: "Bridal Party Package", price: "$400-800", description: "Makeup and styling for the entire bridal party." },
        { name: "Reception Touch-up", price: "$100-200", description: "Professional touch-ups throughout the day." },
      ]
    },
  ];

  const signatures = [
    {
      title: "The Executive Escape",
      price: "$145",
      desc: "Perfect for the busy professional. Includes a blowout, gel manicure, and express facial in under 90 minutes.",
      image: "https://images.unsplash.com/photo-1560066984-12186d30e9d7?q=80&w=2574&auto=format&fit=crop"
    },
    {
      title: "Bridal Radiance",
      price: "$350",
      desc: "A trial run for hair and makeup plus a deep conditioning treatment to prep your locks for the big day.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "The Weekend Reboot",
      price: "$210",
      desc: "Recharge with a full body aromatherapy massage followed by our signature scalp spa ritual.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  const faqs = [
    { q: "Do I need to book a consultation first?", a: "For color corrections and bridal services, a consultation is required. For cuts and basic styling, you can book directly." },
    { q: "What brands do you use?", a: "We exclusively use Oribe, Kevin Murphy, and sustainable organic lines for our skincare treatments." },
    { q: "What is your cancellation policy?", a: "We ask for 24 hours notice for all cancellations. Late cancellations may be subject to a 50% service fee." },
    { q: "Do you offer group bookings?", a: "Yes! We love hosting bridal parties and girls' days out. Please email us to coordinate large groups." }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };


  return (
    <div className="animate-fade-in pt-24 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Service Menu</h1>
          <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
            Curated treatments designed to enhance your natural beauty. We invite you to explore our comprehensive menu of services, each performed with precision and care.
          </p>
        </div>

        {/* Signature Experiences */}
        <div className="mb-24">
          <div className="text-center mb-10">
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Curated For You</span>
             <h2 className="text-2xl font-serif mb-2">Signature Experiences</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatures.map((sig, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="h-64 overflow-hidden mb-6 relative">
                  <img src={sig.image} alt={sig.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
                    Top Pick
                  </div>
                </div>
                <div className="text-center px-4">
                  <h3 className="font-serif text-xl mb-2">{sig.title}</h3>
                  <div className="text-stone-400 font-bold mb-3">{sig.price}</div>
                  <p className="text-stone-500 text-sm leading-relaxed">{sig.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-stone-100 mb-24"></div>

        {/* Tabbed Menu */}
        <div className="mb-24">
           <div className="text-center mb-12">
             <h2 className="text-2xl font-serif">A La Carte Menu</h2>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Sidebar - Tabs */}
            <div className="lg:col-span-3">
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-hide">
                {categories.map((cat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-left whitespace-nowrap transition-all duration-300 border-l-4 ${activeTab === idx ? 'bg-stone-50 border-stone-900 text-stone-900 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50/50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon size={18} className={activeTab === idx ? 'text-stone-900' : 'opacity-50'} />
                      <span className="uppercase tracking-widest text-xs md:text-sm">{cat.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content Area - Split View */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" key={activeTab}>
                {/* Decorative Image for Active Tab */}
                <div className="h-64 md:h-full min-h-[400px] relative rounded-lg overflow-hidden shadow-sm">
                  <img src={categories[activeTab].image} alt={categories[activeTab].title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-stone-900/10"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-3xl font-serif">{categories[activeTab].title}</h2>
                  </div>
                </div>

                {/* Service List */}
                <div className="flex flex-col justify-center">
                  <div className="space-y-8">
                    {categories[activeTab].services.map((service, sIdx) => (
                      <ServiceItem 
                          key={sIdx}
                          title={service.name}
                          price={service.price}
                          description={service.description}
                      />
                    ))}
                  </div>
                  <div className="mt-12 pt-6 border-t border-stone-100">
                      <p className="text-xs text-stone-400 italic">
                        Consultations are complimentary. Prices may vary by stylist.
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Standards Section */}
        <section className="mb-24 bg-stone-50 p-12 md:p-16 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Why Choose Us</span>
              <h2 className="text-3xl font-serif mb-6 text-stone-900">Our Standard of Excellence</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Leaf className="text-stone-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-stone-800 mb-1">Organic & Sustainable</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">We carefully select products that are kind to you and the planet. No harsh chemicals, just pure, effective ingredients.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="text-stone-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-stone-800 mb-1">Hygiene First</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">We adhere to hospital-grade sanitation protocols. Your safety and comfort are our absolute priority.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Award className="text-stone-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-stone-800 mb-1">Expert Artists</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">Our team undergoes continuous advanced training to stay ahead of trends and techniques.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full min-h-[400px]">
              <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=2811&auto=format&fit=crop" alt="Salon Interior" className="w-full h-full object-cover rounded shadow-md grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="mb-24 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <HelpCircle size={32} className="mx-auto text-stone-300 mb-4" />
            <h2 className="text-2xl font-serif">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200 rounded p-4 cursor-pointer hover:border-stone-400 transition-colors bg-stone-50/50" onClick={() => toggleFaq(idx)}>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-stone-800">{faq.q}</h4>
                  {openFaq === idx ? <ChevronUp size={18} className="text-stone-500"/> : <ChevronDown size={18} className="text-stone-500"/>}
                </div>
                {openFaq === idx && (
                  <p className="mt-3 text-stone-600 text-sm leading-relaxed animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="pt-12 border-t border-stone-100">
           <div className="text-center mb-10">
              <h2 className="text-2xl font-serif mb-4">Client Love</h2>
              <div className="flex justify-center space-x-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-stone-900 text-stone-900" />)}
              </div>
           </div>
           <TestimonialCarousel />
        </section>
        
        {/* Minimal Booking CTA */}
        <BookingCTA styleType="minimal" />
      </div>
    </div>
  );
};

const GalleryPage = () => {
  // Data for the Ambiance & Services Carousel
  const ambianceSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2574&auto=format&fit=crop",
      title: "The Sanctuary",
      subtitle: "A modern oasis designed for your ultimate relaxation."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560066984-12186d30e9d7?q=80&w=2574&auto=format&fit=crop",
      title: "Artistry in Motion",
      subtitle: "Watch our master stylists craft your perfect look."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=2680&auto=format&fit=crop",
      title: "Premium Care",
      subtitle: "We use only the finest organic treatments for your hair and skin."
    },
     {
      id: 4,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2669&auto=format&fit=crop",
      title: "Spa Suites",
      subtitle: "Private rooms for facials and therapeutic massages."
    }
  ];

  // Data for the Customer Look Carousel
  const clientSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop",
      title: "Blonde Ambition",
      subtitle: "A stunning balayage transformation."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2671&auto=format&fit=crop",
      title: "Bridal Elegance",
      subtitle: "Timeless makeup for the perfect day."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1519699047748-40ba526a6f78?q=80&w=2574&auto=format&fit=crop",
      title: "Rich Brunette",
      subtitle: "Deep gloss and volume treatments."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1492106087820-71f171ce71d0?q=80&w=2574&auto=format&fit=crop",
      title: "Sun-Kissed Glow",
      subtitle: "Natural highlights and soft waves."
    }
  ];

  // Data for the Offers Carousel
  const offerSlides = [
    {
      id: 1,
      title: "New Client Special",
      description: "Enjoy 20% off your first cut and color service.",
      bgImage: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2684&auto=format&fit=crop",
      code: "WELCOME20"
    },
    {
      id: 2,
      title: "Refer a Friend",
      description: "Both you and your friend receive a complimentary deep conditioning treatment.",
      bgImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop",
      code: "FRIENDSHIP"
    },
    {
      id: 3,
      title: "Spring Refresh",
      description: "Book a balayage package and get a free gloss upgrade.",
      bgImage: "https://images.unsplash.com/photo-1492106087820-71f171ce71d0?q=80&w=2574&auto=format&fit=crop",
      code: "SPRINGGLOW"
    }
  ];

  return (
    <div className="animate-fade-in pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">The Gallery</h1>
          <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
            Step into our world. A visual journey through our luxurious sanctuary, our premium services, and the beautiful women we are privileged to serve.
          </p>
        </div>

        {/* Section 1: Services & Place */}
        <div className="mb-32">
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Our Atmosphere</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-stone-900">The Sanctuary & Services</h2>
            <p className="text-stone-600 max-w-2xl leading-relaxed">
              Immerse yourself in an atmosphere of tranquility and luxury. From our sun-drenched lounge to our private spa suites, every corner is meticulously designed for your relaxation. Experience the art of beauty in a space that feels like a retreat from the city.
            </p>
          </div>
          <ImageCarousel slides={ambianceSlides} />
        </div>

        {/* Section 2: Customer After-Look */}
        <div className="mb-32">
          <div className="mb-10 text-center md:text-left flex flex-col md:items-end">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Client Diaries</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-stone-900">Real Transformations</h2>
            <p className="text-stone-600 max-w-2xl leading-relaxed text-center md:text-right">
              The true measure of our craft is the smile of a satisfied client. Witness the artistry of our stylists through these real transformations. Whether it's a bold new color or a subtle refinement, we unlock the confidence and radiance in every woman.
            </p>
          </div>
          <ImageCarousel slides={clientSlides} />
        </div>

        {/* Offers Section - Kept for utility but visually separated */}
        <div className="mb-12 pt-12 border-t border-stone-100">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif mb-4">Current Exclusives</h2>
            <p className="text-stone-500">Limited time opportunities to treat yourself.</p>
          </div>
          <OfferCarousel slides={offerSlides} />
        </div>
        
        {/* Image Booking CTA */}
        <BookingCTA styleType="image" />
      </div>
    </div>
  );
};

// --- Carousel Components ---

const TestimonialCarousel = () => {
  const [curr, setCurr] = useState(0);
  
  const reviews = [
    {
      id: 1,
      text: "The only place I trust with my hair. The atmosphere is calming, the coffee is great, and the cut is always perfect.",
      author: "Sarah J. Miller",
      role: "Loyal Client"
    },
    {
      id: 2,
      text: "I booked the bridal package for my big day and felt absolutely radiant. The team is so professional and kind.",
      author: "Emily R. Chen",
      role: "Bride"
    },
    {
      id: 3,
      text: "Best facial I've had in the city. My skin was glowing for weeks afterwards. Highly recommend the rejuvenation treatment.",
      author: "Jessica T.",
      role: "Skincare Enthusiast"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurr((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="relative max-w-2xl mx-auto px-4">
      {/* Card Style Container */}
      <div className="bg-white p-8 md:p-12 shadow-md border border-stone-100 rounded-lg relative overflow-hidden">
        <Quote size={32} className="absolute top-8 left-8 text-stone-200" />
        
        <div className="h-[200px] flex items-center justify-center relative">
          {reviews.map((review, index) => (
            <div 
              key={review.id}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out text-center ${index === curr ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}
            >
              <blockquote className="text-xl md:text-2xl font-serif italic mb-6 text-stone-800 leading-relaxed">
                "{review.text}"
              </blockquote>
              <cite className="not-italic flex flex-col items-center">
                <span className="text-sm font-bold tracking-widest uppercase text-stone-900">{review.author}</span>
                <span className="text-xs text-stone-500 mt-1 uppercase tracking-wide">{review.role}</span>
              </cite>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurr(i)}
              className={`transition-all duration-300 rounded-full ${i === curr ? 'bg-stone-800 w-2 h-2' : 'bg-stone-200 w-2 h-2 hover:bg-stone-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const HomeServiceSlider = ({ navigateTo }) => {
  const scrollRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Skin Services",
      description: "Rejuvenating facials and advanced skincare treatments for a radiant, healthy glow.",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Nail Services",
      description: "Luxury manicures and pedicures featuring premium polish and intricate nail art.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Bridal Makeup",
      description: "Flawless, long-lasting makeup application tailored specifically for your special day.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2671&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Hair Styling",
      description: "From precision cuts to bespoke coloring, our experts completely transform your look.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by one card width (approximate, adjusted for margins)
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Controls */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-lg text-stone-900 hover:bg-stone-900 hover:text-white transition-all -ml-4 md:-ml-8 opacity-0 group-hover:opacity-100 disabled:opacity-0"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-lg text-stone-900 hover:bg-stone-900 hover:text-white transition-all -mr-4 md:-mr-8 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          <div 
            key={service.id} 
            className="min-w-[85%] md:min-w-[calc(33.333%-2rem)] bg-white shadow-sm snap-center group/card cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            onClick={() => navigateTo('services')}
          >
            <div className="h-64 overflow-hidden relative">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover/card:bg-stone-900/10 transition-colors duration-300"></div>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-xl font-serif mb-3 group-hover/card:text-stone-600 transition-colors">{service.title}</h4>
              <p className="text-stone-500 text-sm mb-6 leading-relaxed line-clamp-2">{service.description}</p>
              <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase border-b border-stone-200 pb-1 group-hover/card:border-stone-900 transition-all">
                Explore <ArrowRight size={12} className="ml-2 group-hover/card:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageCarousel = ({ slides }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  return (
    <div className="relative overflow-hidden w-full h-[500px] group bg-stone-100">
      <div className="flex transition-transform ease-out duration-500 h-full" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((s) => (
          <div key={s.id} className="min-w-full h-full relative">
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-12 text-white">
              <h3 className="text-2xl font-serif">{s.title}</h3>
              <p className="text-stone-200">{s.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev} className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-lg transition-all transform hover:scale-110">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-lg transition-all transform hover:scale-110">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 bg-white rounded-full ${curr === i ? "p-1.5" : "bg-opacity-50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const OfferCarousel = ({ slides }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  return (
    <div className="relative w-full h-[400px] bg-stone-900 overflow-hidden">
       <div className="flex transition-transform ease-out duration-500 h-full" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((s) => (
          <div key={s.id} className="min-w-full h-full relative flex items-center">
            {/* Background Image with blur/dim */}
            <div className="absolute inset-0 z-0">
              <img src={s.bgImage} alt="" className="w-full h-full object-cover opacity-40" />
            </div>
            
            {/* Content Card */}
            <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-6">
              <div className="border border-white/30 bg-white/10 backdrop-blur-sm p-10 md:p-14">
                <span className="inline-block px-4 py-1 border border-stone-300 text-stone-200 text-xs font-bold tracking-widest uppercase mb-6">
                  Special Offer
                </span>
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">{s.title}</h3>
                <p className="text-lg text-stone-200 mb-8">{s.description}</p>
                <div className="inline-block bg-white text-stone-900 px-6 py-3 font-mono font-bold tracking-widest text-sm">
                  CODE: {s.code}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

       {/* Controls - simple arrow style */}
       <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
        <button onClick={prev} className="p-2 border border-white/20 text-white hover:bg-white hover:text-stone-900 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="p-2 border border-white/20 text-white hover:bg-white hover:text-stone-900 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const handleWhatsApp = () => window.open('https://wa.me/1234567890', '_blank');
  const handleEmail = () => window.location.href = 'mailto:hello@theparlour.com';

  return (
    <div className="animate-fade-in pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-8">Get in Touch</h1>
            <p className="text-stone-600 mb-12 text-lg">
              We'd love to hear from you. Book an appointment, ask a question, or just say hello.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="text-stone-400 mt-1" size={20} />
                <div>
                  <h3 className="font-bold uppercase tracking-wide text-sm mb-1">Location</h3>
                  <p className="text-stone-600">123 Vintage Avenue<br/>Stylist District, NY 10012</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-stone-400 mt-1" size={20} />
                <div>
                  <h3 className="font-bold uppercase tracking-wide text-sm mb-1">Phone</h3>
                  <p className="text-stone-600">(212) 555-0199</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="text-stone-400 mt-1" size={20} />
                <div>
                  <h3 className="font-bold uppercase tracking-wide text-sm mb-1">Email</h3>
                  <p className="text-stone-600">hello@theparlour.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="text-stone-400 mt-1" size={20} />
                <div>
                  <h3 className="font-bold uppercase tracking-wide text-sm mb-1">Hours</h3>
                  <p className="text-stone-600 text-sm">
                    Tue - Fri: 10am - 7pm<br/>
                    Sat: 9am - 5pm<br/>
                    Sun - Mon: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Booking Options */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif mb-6">Book Your Appointment</h3>
            <p className="text-stone-500 mb-6">We handle all our bookings directly to provide you with the best personal service.</p>
            
            <div 
              onClick={handleWhatsApp}
              className="group cursor-pointer bg-white p-8 shadow-sm border border-stone-100 hover:border-green-500 hover:shadow-md transition-all flex items-center gap-6"
            >
              <div className="bg-green-100 p-4 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <MessageCircle size={32} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">WhatsApp Us</h4>
                <p className="text-stone-500 text-sm group-hover:text-stone-700">Instant response for quick bookings.</p>
              </div>
              <ArrowRight className="ml-auto text-stone-300 group-hover:text-green-600 transition-colors" />
            </div>

            <div 
              onClick={handleEmail}
              className="group cursor-pointer bg-white p-8 shadow-sm border border-stone-100 hover:border-stone-900 hover:shadow-md transition-all flex items-center gap-6"
            >
              <div className="bg-stone-100 p-4 rounded-full text-stone-600 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                <Mail size={32} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email Us</h4>
                <p className="text-stone-500 text-sm group-hover:text-stone-700">Perfect for detailed inquiries.</p>
              </div>
              <ArrowRight className="ml-auto text-stone-300 group-hover:text-stone-900 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ServiceItem = ({ title, price, description }) => (
  <div className="flex justify-between items-start group cursor-default">
    <div className="flex-1 pr-8">
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="font-serif text-lg text-stone-900 group-hover:text-stone-600 transition-colors font-medium">{title}</h3>
        <span className="font-bold text-stone-900 text-sm whitespace-nowrap ml-4">{price}</span>
      </div>
      <p className="text-stone-500 text-sm leading-relaxed mb-2">{description}</p>
      <a href="#" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors inline-flex items-center">
        Learn More <ArrowRight size={10} className="ml-1" />
      </a>
    </div>
  </div>
);

const SocialIcon = ({ Icon }) => (
  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white transition-all">
    <Icon size={16} />
  </a>
);

export default App;