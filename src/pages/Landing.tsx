
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Zap, 
  Shield, 
  Users, 
  Download, 
  Mail,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

import Navigation from '../components/Navigation';
import PricingSection from '../components/PricingSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing = ({ onGetStarted }: LandingProps) => {
  const features = [
    {
      icon: FileText,
      title: "Professional Invoices",
      description: "Create beautiful, branded invoices in minutes with our intuitive editor and customizable templates."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate and send invoices instantly. No more waiting around - get paid faster with automated workflows."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security, SSL encryption, and regular backups."
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Keep track of all your clients, their contact information, and complete payment history in one place."
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "Download professional PDFs instantly or send directly via email with custom messaging."
    },
    {
      icon: TrendingUp,
      title: "Payment Tracking",
      description: "Monitor payment status in real-time and never lose track of what's owed with smart notifications."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Users" },
    { number: "1M+", label: "Invoices Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "$100M+", label: "Processed" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content: "Invoicely Pro has completely transformed how I handle billing. What used to take hours now takes minutes!",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Consultant",
      content: "The professional look of my invoices has improved significantly. Clients take me more seriously now.",
      avatar: "MC"
    },
    {
      name: "Emma Wilson",
      role: "Small Business Owner",
      content: "The payment tracking feature alone has saved me countless hours of follow-ups. Highly recommended!",
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <Navigation onGetStarted={onGetStarted} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-violet-500/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 transition-colors">
              <Sparkles className="w-3 h-3 mr-1" />
              Trusted by 50,000+ Freelancers
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Professional Invoicing Made Simple
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-fade-in">
              The ultimate invoicing solution for freelancers and small businesses. 
              Create, send, and track professional invoices in minutes. Get paid faster, work smarter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8 py-4 text-lg transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 mb-16">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Free forever plan
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Setup in 2 minutes
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in">
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage invoices
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your invoicing process and help you get paid faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50/30">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-violet-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by freelancers worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our users have to say about Invoicely Pro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection onGetStarted={onGetStarted} />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to streamline your invoicing?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers and small businesses who trust Invoicely Pro for their invoicing needs.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
