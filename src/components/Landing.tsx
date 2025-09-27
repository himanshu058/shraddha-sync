import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Users, Shield, QrCode } from 'lucide-react';
import templeHero from '@/assets/temple-hero.jpg';

const Landing = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAuth = () => {
    document.getElementById('auth-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${templeHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            श्री मंदिर
            <span className="block text-3xl md:text-4xl mt-2 text-secondary">
              Sacred Pilgrimage Management
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up">
            Experience seamless temple visits with digital crowd management
          </p>

          {showScrollButton && (
            <Button 
              onClick={scrollToAuth}
              size="lg"
              className="bg-temple-gradient text-white border-none shadow-glow hover:shadow-temple animate-glow"
            >
              Get Started
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>

        {!showScrollButton && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/70" />
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-20 bg-sacred-gradient">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-primary mb-16">
            Divine Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="temple-card p-8 text-center">
              <QrCode className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-4">Digital Tickets</h3>
              <p className="text-muted-foreground">
                Book your darshan with QR-based digital tickets for seamless entry
              </p>
            </div>
            
            <div className="temple-card p-8 text-center">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-4">Crowd Management</h3>
              <p className="text-muted-foreground">
                Real-time crowd monitoring for a peaceful temple experience
              </p>
            </div>
            
            <div className="temple-card p-8 text-center">
              <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-4">Safety First</h3>
              <p className="text-muted-foreground">
                Advanced safety protocols and emergency management systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-devotion mb-8">
            Begin Your Sacred Journey
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose your path to access the divine management system
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/devotee/login'}
              className="bg-temple-gradient text-white shadow-sacred hover:shadow-temple transition-sacred"
            >
              Devotee Login
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/admin/login'}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-sacred"
            >
              Admin Portal
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;