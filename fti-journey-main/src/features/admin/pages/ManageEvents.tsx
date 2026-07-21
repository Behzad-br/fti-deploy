import { useState } from 'react';
import { useCMS } from '@/store/CMSContext';
import { Event, GalleryItem } from '@/data/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Upload, Calendar, MapPin, Image as ImageIcon, Link as LinkIcon, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ManageEvents = () => {
  const { cmsData, updateCMSData, uploadImage } = useCMS();
  const { toast } = useToast();

  const [heroTitle, setHeroTitle] = useState(cmsData.eventsHeroTitle);
  const [heroDescription, setHeroDescription] = useState(cmsData.eventsHeroDescription);

  // New Event State
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '', description: '', date: '', time: '', location: '', image: '', category: 'Seminar', status: 'upcoming', registrationLink: ''
  });
  const [isUploadingEventImage, setIsUploadingEventImage] = useState(false);

  // New Gallery Item State
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({
    title: '', date: '', type: 'image', url: ''
  });
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const handleSaveHero = () => {
    updateCMSData({ eventsHeroTitle: heroTitle, eventsHeroDescription: heroDescription });
    toast({ title: "Saved!", description: "Events hero section updated successfully." });
  };

  // --- EVENTS LOGIC ---
  const handleEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingEventImage(true);
      try {
        const imageUrl = await uploadImage(e.target.files[0]);
        setNewEvent(prev => ({ ...prev, image: imageUrl }));
        toast({ title: "Image Uploaded", description: "Event image ready." });
      } catch (error) {
        toast({ title: "Upload Failed", description: "Could not upload image.", variant: "destructive" });
      } finally {
        setIsUploadingEventImage(false);
      }
    }
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.image) {
      toast({ title: "Missing Info", description: "Please provide title, date, and image.", variant: "destructive" });
      return;
    }
    const eventToAdd: Event = {
      ...(newEvent as Event),
      id: Date.now().toString(),
    };
    
    const updatedEvents = [eventToAdd, ...(cmsData.eventsList || [])];
    updateCMSData({ eventsList: updatedEvents });
    setNewEvent({ title: '', description: '', date: '', time: '', location: '', image: '', category: 'Seminar', status: 'upcoming', registrationLink: '' });
    toast({ title: "Event Added", description: "Event published successfully." });
  };

  const removeEvent = (id: string) => {
    const updatedEvents = (cmsData.eventsList || []).filter(e => e.id !== id);
    updateCMSData({ eventsList: updatedEvents });
    toast({ title: "Event Removed", description: "Event has been deleted." });
  };

  // --- GALLERY LOGIC ---
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingGallery(true);
      try {
        const imageUrl = await uploadImage(e.target.files[0]);
        setNewGalleryItem(prev => ({ ...prev, url: imageUrl }));
        toast({ title: "Image Uploaded", description: "Gallery image ready." });
      } catch (error) {
        toast({ title: "Upload Failed", description: "Could not upload image.", variant: "destructive" });
      } finally {
        setIsUploadingGallery(false);
      }
    }
  };

  const addGalleryItem = () => {
    if (!newGalleryItem.title || !newGalleryItem.url) {
      toast({ title: "Missing Info", description: "Please provide title and image.", variant: "destructive" });
      return;
    }
    const itemToAdd: GalleryItem = {
      ...(newGalleryItem as GalleryItem),
      id: `g_${Date.now()}`,
    };
    
    const updatedGallery = [itemToAdd, ...(cmsData.eventGalleryList || [])];
    updateCMSData({ eventGalleryList: updatedGallery });
    setNewGalleryItem({ title: '', date: '', type: 'image', url: '' });
    toast({ title: "Gallery Item Added", description: "Image published to gallery." });
  };

  const removeGalleryItem = (id: string) => {
    const updatedGallery = (cmsData.eventGalleryList || []).filter(g => g.id !== id);
    updateCMSData({ eventGalleryList: updatedGallery });
    toast({ title: "Item Removed", description: "Gallery item deleted." });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Events Page</h1>
          <p className="text-slate-500 mt-1">Control all events, hero texts, and the past events gallery.</p>
        </div>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="mb-6 bg-white border border-slate-200 p-1 rounded-xl shadow-sm h-14">
          <TabsTrigger value="events" className="rounded-lg h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-white font-medium transition-all">Events List</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-lg h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-white font-medium transition-all">Past Events Gallery</TabsTrigger>
        </TabsList>

        {/* EVENTS TAB */}
        <TabsContent value="events" className="space-y-6">
          <Card className="border-primary/20 shadow-sm bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5" /> Add New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Title *</label>
                  <Input placeholder="E.g. UK Education Expo 2024" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newEvent.category} onValueChange={(val: any) => setNewEvent({...newEvent, category: val})}>
                    <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Webinar">Webinar</SelectItem>
                      <SelectItem value="Roadshow">Roadshow</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date *</label>
                  <Input placeholder="E.g. March 25, 2024" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input placeholder="E.g. 10:00 AM - 05:00 PM" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="E.g. Pearl Continental, Lahore" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Short description about the event..." value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} rows={2} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Registration Link</label>
                  <Input placeholder="E.g. /apply or https://google.forms/..." value={newEvent.registrationLink} onChange={e => setNewEvent({...newEvent, registrationLink: e.target.value})} />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Event Image *</label>
                  <div className="flex gap-4 items-center">
                    <Input type="file" accept="image/*" onChange={handleEventImageUpload} disabled={isUploadingEventImage} className="w-full md:w-1/2" />
                    {isUploadingEventImage && <span className="text-sm text-primary animate-pulse">Uploading...</span>}
                    {newEvent.image && <img src={newEvent.image} alt="Preview" className="h-12 w-auto rounded border" />}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={newEvent.status} onValueChange={(val: any) => setNewEvent({...newEvent, status: val})}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="past">Past</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2 flex justify-end mt-4">
                  <Button onClick={addEvent} className="px-8"><Plus className="w-4 h-4 mr-2" /> Publish Event</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>All Events</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(cmsData.eventsList || []).map(event => (
                  <div key={event.id} className="flex items-center gap-4 p-4 border rounded-xl bg-white hover:border-primary/30 transition-colors">
                    <img src={event.image} alt={event.title} className="w-24 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        {event.title} 
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                          {event.status}
                        </span>
                      </h4>
                      <p className="text-sm text-slate-500 line-clamp-1">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {event.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {event.location}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeEvent(event.id)} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
                {!(cmsData.eventsList?.length) && <p className="text-slate-500 text-center py-4">No events added yet.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GALLERY TAB */}
        <TabsContent value="gallery" className="space-y-6">
          <Card className="border-primary/20 shadow-sm bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Add Gallery Image</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Title</label>
                  <Input placeholder="E.g. International Education Expo" value={newGalleryItem.title} onChange={e => setNewGalleryItem({...newGalleryItem, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date/Month</label>
                  <Input placeholder="E.g. March 2024" value={newGalleryItem.date} onChange={e => setNewGalleryItem({...newGalleryItem, date: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Upload Image *</label>
                  <div className="flex gap-4 items-center">
                    <Input type="file" accept="image/*" onChange={handleGalleryUpload} disabled={isUploadingGallery} className="w-full md:w-1/2" />
                    {isUploadingGallery && <span className="text-sm text-primary animate-pulse">Uploading...</span>}
                    {newGalleryItem.url && <img src={newGalleryItem.url} alt="Preview" className="h-12 w-auto rounded border" />}
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end mt-2">
                  <Button onClick={addGalleryItem}><Plus className="w-4 h-4 mr-2" /> Add to Gallery</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Past Events Gallery</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {(cmsData.eventGalleryList || []).map(item => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden border aspect-square bg-slate-50">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-white font-bold text-sm mb-1 leading-tight line-clamp-2">{item.title}</p>
                      <p className="text-white/70 text-xs mb-3">{item.date}</p>
                      <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={() => removeGalleryItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {!(cmsData.eventGalleryList?.length) && <p className="text-slate-500 text-center py-8">No gallery items found.</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageEvents;
