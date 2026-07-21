import { useState, useEffect } from 'react';
import { useCMS } from '@/store/CMSContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus, GripVertical } from 'lucide-react';

interface Branch {
  city: string;
  title: string;
  country: string;
  flagCode: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}

const defaultBranches: Branch[] = [
  { city: 'Gujranwala', title: 'Head Office', country: 'Pakistan', flagCode: 'pk', address: 'Opposite Punjab Group of Colleges, Sialkot Bypass Road, Near Garden Town, Gujranwala', phone: '+92 (0) 300 744 2732', email: 'info@fti4success.com', mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.1475734363294!2d74.2089456!3d32.1813197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2a33fd372379%3A0xe539f379f67a6d89!2sFTI%20Consultants!5e0!3m2!1sen!2spk!4v1709477000000!5m2!1sen!2spk' },
  { city: 'London', title: 'UK Office', country: 'United Kingdom', flagCode: 'gb', address: 'Barking Enterprise Centre, IG11 8FG, London', phone: '+44 74 2995 0775', email: 'london@fti4success.com', mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.594777!2d0.0768!3d51.5385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a6666666666f%3A0x6666666666666666!2sBarking%20Enterprise%20Centre!5e0!3m2!1sen!2suk!4v1709477100000!5m2!1sen!2suk' }
];

const ManageContact = () => {
  const { cmsData, updateCMSData } = useCMS();
  const { toast } = useToast();

  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    if (cmsData.contactBranches && Array.isArray(cmsData.contactBranches) && cmsData.contactBranches.length > 0) {
      setBranches(cmsData.contactBranches);
    } else {
      setBranches(defaultBranches);
    }
  }, [cmsData.contactBranches]);

  const handleSave = () => {
    updateCMSData({ contactBranches: branches });
    toast({ title: "Saved!", description: "Locations updated successfully." });
  };

  const addBranch = () => {
    setBranches([...branches, { city: '', title: '', country: '', flagCode: '', address: '', phone: '', email: '', mapUrl: '' }]);
  };

  const updateBranch = (index: number, field: keyof Branch, value: string) => {
    const newBranches = [...branches];
    newBranches[index] = { ...newBranches[index], [field]: value };
    setBranches(newBranches);
  };

  const removeBranch = (index: number) => {
    if (confirm('Are you sure you want to remove this location?')) {
      setBranches(branches.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Locations</h1>
          <p className="text-slate-500 mt-1">Add, edit, or remove office locations shown on the Contact page.</p>
        </div>
        <Button onClick={handleSave} size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-bold">Save Changes</Button>
      </div>

      <div className="space-y-4">
        {branches.map((branch, index) => (
          <Card key={index} className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 py-3 px-4 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-slate-400" />
                <CardTitle className="text-sm font-bold text-slate-700">
                  {branch.city ? `${branch.city} Branch` : 'New Branch'}
                </CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeBranch(index)} className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 px-2">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 grid md:grid-cols-2 gap-4 bg-white">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">City Name</label>
                <Input value={branch.city} onChange={(e) => updateBranch(index, 'city', e.target.value)} placeholder="e.g. Gujranwala" className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Office Title</label>
                <Input value={branch.title} onChange={(e) => updateBranch(index, 'title', e.target.value)} placeholder="e.g. Head Office" className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Country Name</label>
                <Input value={branch.country} onChange={(e) => updateBranch(index, 'country', e.target.value)} placeholder="e.g. Pakistan" className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Flag Code (flagcdn)</label>
                <Input value={branch.flagCode} onChange={(e) => updateBranch(index, 'flagCode', e.target.value)} placeholder="e.g. pk or gb" className="h-9 text-sm" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-500">Full Address</label>
                <Input value={branch.address} onChange={(e) => updateBranch(index, 'address', e.target.value)} placeholder="Full physical address" className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Phone Number</label>
                <Input value={branch.phone} onChange={(e) => updateBranch(index, 'phone', e.target.value)} placeholder="e.g. +92 300 1234567" className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Email Address</label>
                <Input value={branch.email} onChange={(e) => updateBranch(index, 'email', e.target.value)} placeholder="e.g. info@fti.com" className="h-9 text-sm" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-500">Google Map Embed URL (src)</label>
                <Input value={branch.mapUrl} onChange={(e) => updateBranch(index, 'mapUrl', e.target.value)} placeholder="https://www.google.com/maps/embed?..." className="h-9 text-sm" />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addBranch} variant="outline" className="w-full h-12 border-dashed border-2 border-slate-300 text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 font-bold transition-all">
          <Plus className="mr-2 h-5 w-5" /> Add New Location
        </Button>
      </div>
    </div>
  );
};

export default ManageContact;
