
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Globe, Heart } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Users,
      title: 'User-Centric',
      description: 'We build with our users in mind, creating intuitive solutions that make invoicing effortless.',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Every feature is crafted with attention to detail, ensuring professional results every time.',
    },
    {
      icon: Globe,
      title: 'Global Ready',
      description: 'Support for multiple currencies and tax systems to serve businesses worldwide.',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built by freelancers, for freelancers. We understand the challenges you face.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Invoicely Pro
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to simplify invoicing for freelancers and small businesses worldwide. 
            Born from the frustration of complex billing software, we created a solution that's both 
            powerful and beautifully simple.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2023 by a team of experienced freelancers and entrepreneurs, 
                Invoicely Pro was born from a simple observation: invoicing shouldn't be complicated.
              </p>
              <p className="text-gray-700 leading-relaxed">
                After years of struggling with bloated, expensive invoicing software, we decided 
                to build something different. Something that puts user experience first, without 
                sacrificing the powerful features businesses need to grow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">50K+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">1M+</div>
                <div className="text-gray-600">Invoices Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">$100M+</div>
                <div className="text-gray-600">Processed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
