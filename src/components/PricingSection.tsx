
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';

interface PricingSectionProps {
  onGetStarted: () => void;
}

const PricingSection = ({ onGetStarted }: PricingSectionProps) => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'Forever',
      description: 'Perfect for getting started',
      icon: Zap,
      features: [
        'Up to 5 invoices per month',
        'Basic invoice templates',
        'PDF export',
        'Email invoice delivery',
        'Client management',
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$12',
      period: 'per month',
      description: 'For growing businesses',
      icon: Crown,
      features: [
        'Unlimited invoices',
        'Custom branding & logo',
        'Advanced templates',
        'Payment tracking',
        'Recurring invoices',
        'Expense tracking',
        'Reports & analytics',
        'Priority support',
      ],
      buttonText: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$29',
      period: 'per month',
      description: 'For established businesses',
      icon: Sparkles,
      features: [
        'Everything in Professional',
        'Multi-user access',
        'Advanced reporting',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'White-label solution',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your business needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-indigo-50 to-violet-50 ring-2 ring-indigo-500' 
                  : 'bg-white'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={onGetStarted}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  } transition-all duration-300 hover:scale-105`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
