import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  address?: string;
}

const SupabaseDemo: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('clients').select('*');
      if (error) {
        setError(error.message);
      } else {
        setClients(data || []);
      }
      setLoading(false);
    };
    fetchClients();
  }, []);

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Clients from Supabase</h2>
      {clients.length === 0 ? (
        <div>No clients found.</div>
      ) : (
        <ul className="space-y-2">
          {clients.map(client => (
            <li key={client.id} className="p-2 border rounded">
              <div className="font-semibold">{client.name}</div>
              <div className="text-sm text-gray-600">{client.email}</div>
              {client.company && <div className="text-sm">{client.company}</div>}
              {client.address && <div className="text-xs text-gray-500">{client.address}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupabaseDemo; 