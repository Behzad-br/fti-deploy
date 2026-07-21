import { useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import type { University } from '@/context/CMSContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, Upload, ImageIcon, Plus, GraduationCap, Globe, Link } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const COUNTRIES = ['Australia', 'Canada', 'Europe', 'USA', 'UK'] as const;
type Country = typeof COUNTRIES[number];

const COUNTRY_FLAGS: Record<Country, string> = {
  Australia: '🇦🇺',
  Canada: '🇨🇦',
  Europe: '🇪🇺',
  USA: '🇺🇸',
  UK: '🇬🇧',
};

const ManageHome = () => {
  const { cmsData, updateCMSData, uploadImage } = useCMS();
  const { toast } = useToast();

  const [heroTitle, setHeroTitle] = useState(cmsData.homeHeroTitle);
  const [heroDescription, setHeroDescription] = useState(cmsData.homeHeroDescription);
  const [heroImage, setHeroImage] = useState(cmsData.homeHeroImage);
  const [successImages, setSuccessImages] = useState(cmsData.homeSuccessImages);
  const [universities, setUniversities] = useState<University[]>(cmsData.homeUniversityPartners);

  // New university form state
  const [newUniName, setNewUniName] = useState('');
  const [newUniLogo, setNewUniLogo] = useState('');
  const [newUniCountry, setNewUniCountry] = useState<Country>('Australia');
  const [activeTab, setActiveTab] = useState<Country>('Australia');
  const [logoInputMode, setLogoInputMode] = useState<'url' | 'upload'>('url');

  const handleSave = () => {
    updateCMSData({
      homeHeroTitle: heroTitle,
      homeHeroDescription: heroDescription,
      homeHeroImage: heroImage,
      homeSuccessImages: successImages,
      homeUniversityPartners: universities,
    });
    toast({ title: '✅ Saved!', description: 'Home page updated successfully.' });
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        const base64Img = await uploadImage(e.target.files[0]);
        setHeroImage(base64Img);
        toast({ title: 'Image ready!', description: "Click 'Save Changes' to apply." });
      } catch {
        toast({ title: 'Error', description: 'Failed to upload image.', variant: 'destructive' });
      }
    }
  };

  const handleSliderImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        const base64Img = await uploadImage(e.target.files[0]);
        setSuccessImages(prev => [...prev, base64Img]);
        toast({ title: 'Image added!', description: "Click 'Save Changes' to apply." });
      } catch {
        toast({ title: 'Error', description: 'Failed to upload image.', variant: 'destructive' });
      }
    }
  };

  const handleUniLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        const base64Img = await uploadImage(e.target.files[0]);
        setNewUniLogo(base64Img);
        toast({ title: 'Logo ready!' });
      } catch {
        toast({ title: 'Error', description: 'Failed to upload logo.', variant: 'destructive' });
      }
    }
  };

  const removeSliderImage = (index: number) => {
    setSuccessImages(prev => prev.filter((_, i) => i !== index));
  };

  const addUniversity = () => {
    if (!newUniName.trim() || !newUniLogo.trim()) {
      toast({ title: 'Missing info', description: 'Please enter university name and logo.', variant: 'destructive' });
      return;
    }
    const newUni: University = {
      id: Date.now().toString(),
      name: newUniName.trim(),
      logo: newUniLogo.trim(),
      country: newUniCountry,
    };
    const updated = [...universities, newUni];
    setUniversities(updated);
    // ✅ Instantly reflect on home page
    updateCMSData({ homeUniversityPartners: updated });
    setNewUniName('');
    setNewUniLogo('');
    toast({ title: '🎓 Added & Live!', description: `${newUni.name} is now showing on the home page.` });
  };

  const removeUniversity = (id: string) => {
    const updated = universities.filter(u => u.id !== id);
    setUniversities(updated);
    // ✅ Instantly reflect on home page
    updateCMSData({ homeUniversityPartners: updated });
    toast({ title: '🗑️ Removed', description: 'University removed from home page.' });
  };

  const filteredUniversities = universities.filter(u => u.country === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Home Page</h1>
          <p className="text-slate-500 mt-1">Edit text, background image, success stories, and university partners.</p>
        </div>
        <Button onClick={handleSave} className="px-8">Save Changes</Button>
      </div>





      {/* Success Stories Slider */}
      <Card>
        <CardHeader>
          <CardTitle>Visa Success Stories Slider</CardTitle>
          <CardDescription>These images appear in the scrolling marquee slider on the home page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {successImages.map((img, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border-2 border-slate-100">
                <img src={img} alt={`Success ${index + 1}`} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="destructive" size="icon" onClick={() => removeSliderImage(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  {index + 1}
                </div>
              </div>
            ))}
            <label className="cursor-pointer relative rounded-xl overflow-hidden border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center h-32 transition-all">
              <input type="file" accept="image/*" className="hidden" onChange={handleSliderImageUpload} />
              <Upload className="w-7 h-7 text-slate-400 mb-1" />
              <span className="text-xs font-medium text-slate-400">Add Photo</span>
            </label>
          </div>
          <p className="text-xs text-slate-400">Hover over an image and click the red button to remove it.</p>
        </CardContent>
      </Card>

      {/* ─── University Partners Manager ─────────────────────────────────── */}
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-orange-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">University Partners</CardTitle>
              <CardDescription>Add or remove university logos shown in the Global Network section on home page.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">

          {/* Add New University Form */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" /> Add New University
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-600 uppercase tracking-wider">University Name *</label>
                <Input
                  placeholder="e.g. University of Toronto"
                  value={newUniName}
                  onChange={e => setNewUniName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-600 uppercase tracking-wider">Country *</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {COUNTRIES.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewUniCountry(c)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold border-2 transition-all flex flex-col items-center gap-0.5 ${
                        newUniCountry === c
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-primary/50'
                      }`}
                    >
                      <span className="text-base">{COUNTRY_FLAGS[c]}</span>
                      <span className="hidden sm:block">{c}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Logo Input */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-600 uppercase tracking-wider">University Logo *</label>
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setLogoInputMode('url')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${logoInputMode === 'url' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                  <Link className="w-3 h-3" /> URL / Domain
                </button>
                <button
                  type="button"
                  onClick={() => setLogoInputMode('upload')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${logoInputMode === 'upload' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                  <Upload className="w-3 h-3" /> Upload Image
                </button>
              </div>

              {logoInputMode === 'url' ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Logo URL  e.g. https://logo.example.com/uni.png"
                    value={newUniLogo}
                    onChange={e => setNewUniLogo(e.target.value)}
                  />
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Tip: Use domain favicon — e.g.
                    <code className="bg-slate-100 px-1 rounded text-[10px]">https://www.google.com/s2/favicons?sz=128&domain=harvard.edu</code>
                  </p>
                </div>
              ) : (
                <label className="cursor-pointer flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 transition-all w-full">
                  {newUniLogo && newUniLogo.startsWith('data:') ? (
                    <img src={newUniLogo} alt="preview" className="w-12 h-12 object-contain rounded-lg border border-slate-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-600">Click to upload logo image</p>
                    <p className="text-xs text-slate-400">PNG, JPG, SVG supported</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleUniLogoUpload} />
                </label>
              )}
            </div>

            {/* Preview + Add Button */}
            <div className="flex items-center gap-4 pt-2">
              {newUniLogo && (
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
                  <img src={newUniLogo} alt="preview" className="w-10 h-10 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div>
                    <p className="text-xs text-slate-400">Preview</p>
                    <p className="text-sm font-semibold text-slate-700">{newUniName || 'University Name'}</p>
                    <p className="text-xs text-primary font-medium">{COUNTRY_FLAGS[newUniCountry]} {newUniCountry}</p>
                  </div>
                </div>
              )}
              <Button onClick={addUniversity} className="ml-auto gap-2">
                <Plus className="w-4 h-4" /> Add University
              </Button>
            </div>
          </div>

          {/* Country Tabs */}
          <div>
            <div className="flex gap-2 flex-wrap mb-4">
              {COUNTRIES.map(c => {
                const count = universities.filter(u => u.country === c).length;
                return (
                  <button
                    key={c}
                    onClick={() => setActiveTab(c)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                      activeTab === c
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40'
                    }`}
                  >
                    {COUNTRY_FLAGS[c]} {c}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === c ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* University Cards Grid */}
            {filteredUniversities.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 font-medium">No universities added for {activeTab} yet.</p>
                <p className="text-slate-400 text-sm mt-1">Use the form above to add one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredUniversities.map(uni => (
                  <div
                    key={uni.id}
                    className="group relative bg-white rounded-2xl border-2 border-slate-100 p-4 flex flex-col items-center gap-2 hover:border-red-200 hover:shadow-md transition-all duration-300"
                  >
                    {/* Logo */}
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src={uni.logo}
                        alt={uni.name}
                        className="w-full h-full object-contain"
                        onError={e => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = 'none';
                          t.parentElement!.innerHTML = `<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">${uni.name.charAt(0)}</div>`;
                        }}
                      />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 text-center leading-tight line-clamp-2">{uni.name}</p>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeUniversity(uni.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-md"
                      title="Remove university"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-slate-400 text-center">
            💡 Hover over a university card to see the remove button. Click <strong>Save Changes</strong> at the top to apply all changes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageHome;
