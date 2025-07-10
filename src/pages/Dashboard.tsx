
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  Home
} from 'lucide-react';

interface DashboardProps {
  invoices: any[];
  clients: any[];
}

const Dashboard = ({ invoices, clients }: DashboardProps) => {
  const dashboardStats = {
    totalSent: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
    pending: invoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.total, 0),
    overdue: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back to Home Button */}
      <div className="mb-2">
        <Button onClick={() => window.location.href = '/'} variant="outline" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-violet-600 -mx-6 -mt-6 px-6 pt-6 pb-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
        <p className="text-indigo-100">Here's what's happening with your business today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-indigo-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <div className="p-2 bg-indigo-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">${dashboardStats.totalSent.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +20% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Paid Invoices</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">${dashboardStats.paid.toLocaleString()}</div>
            <div className="flex items-center text-sm text-gray-500">
              <span>85% collection rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">${dashboardStats.pending.toLocaleString()}</div>
            <div className="flex items-center text-sm text-gray-500">
              <span>{invoices.filter(inv => inv.status === 'sent').length} invoices awaiting</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-violet-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
            <div className="p-2 bg-violet-100 rounded-lg">
              <Users className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">{clients.length}</div>
            <div className="flex items-center text-sm text-gray-500">
              <span>Active clients</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" />
              Recent Invoices
            </CardTitle>
            <CardDescription>Your latest invoicing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <div>
                      <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                      <p className="text-sm text-gray-500">{invoice.client.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                    <span className="font-semibold text-gray-900">${invoice.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              Upcoming Due Dates
            </CardTitle>
            <CardDescription>Invoices requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.filter(inv => inv.status === 'sent').slice(0, 4).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">{invoice.client.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Due {invoice.dueDate}</p>
                    <p className="font-semibold text-blue-600">${invoice.total.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
