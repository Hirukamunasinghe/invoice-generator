
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  Plus,
  User,
  Sparkles
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Invoices", 
    url: "invoices",
    icon: FileText,
  },
  {
    title: "Clients",
    url: "clients", 
    icon: Users,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCreateInvoice: () => void;
  onCreateClient: () => void;
}

export function AppSidebar({ activeTab, setActiveTab, onCreateInvoice, onCreateClient }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getNavClass = (tabKey: string) => {
    const isActive = activeTab === tabKey;
    return isActive 
      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium shadow-lg" 
      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200";
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-200 p-4 bg-gradient-to-r from-indigo-50 to-violet-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Invoicely Pro
              </h1>
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 text-xs border-violet-200">
                <Sparkles className="w-3 h-3 mr-1" />
                Freelancer Edition
              </Badge>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`${getNavClass(item.url)} rounded-lg transition-all duration-200 hover:scale-105`}
                    onClick={() => setActiveTab(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && <span className="font-medium">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="text-gray-500 text-xs font-semibold mb-3 px-2">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-3">
              <Button 
                onClick={onCreateInvoice}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white justify-start shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
              <Button 
                variant="outline"
                onClick={onCreateClient}
                className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300 justify-start transition-all duration-300 hover:scale-105"
                size="sm"
              >
                <User className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200 bg-gray-50">
        {!isCollapsed && (
          <div className="text-xs text-gray-500 text-center">
            © 2024 Invoicely Pro - Powering your business
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
