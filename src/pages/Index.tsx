import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { toast } from "sonner";

import Landing from './Landing';
import Dashboard from './Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle, 
  Search, 
  Filter,
  Download,
  Mail,
  Edit,
  Trash2,
  User,
  Calendar,
  Building2
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  address: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  client: Client;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  issueDate: string;
  notes: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      company: 'Smith Design Co.',
      address: '123 Design St, Creative City, CC 12345'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@techstartup.com',
      company: 'Tech Startup Inc.',
      address: '456 Innovation Ave, Tech Valley, TV 67890'
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-001',
      clientId: '1',
      client: clients[0],
      items: [
        {
          id: '1',
          description: 'Website Design',
          quantity: 1,
          rate: 2500,
          amount: 2500
        }
      ],
      subtotal: 2500,
      tax: 250,
      total: 2750,
      status: 'paid',
      dueDate: '2024-01-15',
      issueDate: '2024-01-01',
      notes: 'Thank you for your business!'
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      clientId: '2',
      client: clients[1],
      items: [
        {
          id: '2',
          description: 'Mobile App Development',
          quantity: 40,
          rate: 125,
          amount: 5000
        }
      ],
      subtotal: 5000,
      tax: 500,
      total: 5500,
      status: 'sent',
      dueDate: '2024-02-01',
      issueDate: '2024-01-15',
      notes: 'Payment due within 30 days'
    }
  ]);

  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    email: '',
    company: '',
    address: ''
  });

  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    clientId: '',
    items: [],
    notes: '',
    dueDate: '',
    issueDate: new Date().toISOString().split('T')[0]
  });

  const addClient = () => {
    if (!newClient.name || !newClient.email) {
      toast.error('Name and email are required');
      return;
    }

    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name!,
      email: newClient.email!,
      company: newClient.company || '',
      address: newClient.address || ''
    };

    setClients([...clients, client]);
    setNewClient({ name: '', email: '', company: '', address: '' });
    setShowCreateClient(false);
    toast.success('Client added successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendInvoice = (invoiceId: string) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(inv =>
        inv.id === invoiceId ? { ...inv, status: 'sent' as const } : inv
      )
    );
    toast.success('Invoice sent successfully!');
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(inv =>
        inv.id === invoiceId ? { ...inv, status: 'paid' as const } : inv
      )
    );
    toast.success('Invoice marked as paid!');
  };

  const renderInvoices = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
        <p className="text-gray-600">Manage and track your invoices</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-lg text-gray-900">All Invoices</CardTitle>
              <CardDescription>Manage and track your invoices</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-gray-500">{invoice.issueDate}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{invoice.client.name}</p>
                        <p className="text-sm text-gray-500">{invoice.client.company}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      ${invoice.total.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {invoice.dueDate}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast.success('PDF downloaded!')}
                          className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        {invoice.status === 'draft' && (
                          <Button
                            size="sm"
                            onClick={() => handleSendInvoice(invoice.id)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        )}
                        {invoice.status === 'sent' && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsPaid(invoice.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
          <p className="text-gray-600">Manage your client information</p>
        </div>
        <Button 
          onClick={() => setShowCreateClient(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.company}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    {invoices.filter(inv => inv.clientId === client.id).length} invoices
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Configure your business information and branding</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Business Settings</CardTitle>
          <CardDescription>Configure your business information and branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Your Business Name" />
              </div>
              <div>
                <Label htmlFor="business-email">Business Email</Label>
                <Input id="business-email" type="email" placeholder="contact@yourbusiness.com" />
              </div>
              <div>
                <Label htmlFor="business-phone">Phone Number</Label>
                <Input id="business-phone" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="business-address">Business Address</Label>
                <Textarea id="business-address" placeholder="123 Business St&#10;City, State 12345" />
              </div>
              <div>
                <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                <Input id="tax-rate" type="number" placeholder="10" />
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard invoices={invoices} clients={clients} />;
      case 'invoices':
        return renderInvoices();
      case 'clients':
        return renderClients();
      case 'settings':
        return renderSettings();
      default:
        return <Dashboard invoices={invoices} clients={clients} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onCreateInvoice={() => setShowCreateInvoice(true)}
          onCreateClient={() => setShowCreateClient(true)}
        />
        
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 shadow-sm">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto flex items-center space-x-4">
              <Button 
                onClick={() => setShowCreateInvoice(true)}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>

      <Dialog open={showCreateClient} onOpenChange={setShowCreateClient}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-indigo-900">Add New Client</DialogTitle>
            <DialogDescription>
              Enter the client's information to add them to your database.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client-name" className="text-right">Name</Label>
              <Input
                id="client-name"
                value={newClient.name || ''}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                className="col-span-3"
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client-email" className="text-right">Email</Label>
              <Input
                id="client-email"
                type="email"
                value={newClient.email || ''}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                className="col-span-3"
                placeholder="john@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client-company" className="text-right">Company</Label>
              <Input
                id="client-company"
                value={newClient.company || ''}
                onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                className="col-span-3"
                placeholder="Acme Corp"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client-address" className="text-right">Address</Label>
              <Textarea
                id="client-address"
                value={newClient.address || ''}
                onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                className="col-span-3"
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowCreateClient(false)}>
              Cancel
            </Button>
            <Button onClick={addClient} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Add Client
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-indigo-900">Create New Invoice</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new invoice for your client.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoice-client">Select Client</Label>
                <Select value={newInvoice.clientId || ''} onValueChange={(value) => setNewInvoice({...newInvoice, clientId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} - {client.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="invoice-due-date">Due Date</Label>
                <Input
                  id="invoice-due-date"
                  type="date"
                  value={newInvoice.dueDate || ''}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="invoice-notes">Notes</Label>
              <Textarea
                id="invoice-notes"
                value={newInvoice.notes || ''}
                onChange={(e) => setNewInvoice({...newInvoice, notes: e.target.value})}
                placeholder="Thank you for your business!"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowCreateInvoice(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                toast.success('Invoice creation feature coming soon!'); 
                setShowCreateInvoice(false);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Create Invoice
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Index;
