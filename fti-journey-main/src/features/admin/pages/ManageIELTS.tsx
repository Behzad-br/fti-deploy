import { useState } from 'react';
import { useCMS } from '@/store/CMSContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ManageIELTS = () => {
  const { cmsData, updateCMSData, uploadImage } = useCMS();
  const { toast } = useToast();
  
  const [heroTitle, setHeroTitle] = useState(cmsData.ieltsHeroTitle);
  const [heroDescription, setHeroDescription] = useState(cmsData.ieltsHeroDescription);
  const [successImages, setSuccessImages] = useState(cmsData.ieltsSuccessImages);

  const handleSave = () => {
    updateCMSData({
      ieltsHeroTitle: heroTitle,
      ieltsHeroDescription: heroDescription,
      ieltsSuccessImages: successImages,
    });
    toast({
      title: "Success",
      description: "IELTS Page content updated successfully!",
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64Img = await uploadImage(e.target.files[0]);
        setSuccessImages([...successImages, base64Img]);
      } catch (error) {
        toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...successImages];
    newImages.splice(index, 1);
    setSuccessImages(newImages);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Manage IELTS Page</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>



      <Card>
        <CardHeader>
          <CardTitle>Success Stories Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {successImages.map((img, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border">
                <img src={img} alt={`Success ${index}`} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="destructive" size="icon" onClick={() => removeImage(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="relative rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center h-32 hover:bg-slate-50 cursor-pointer">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
              <div className="flex flex-col items-center text-slate-400">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-xs font-medium">Upload Image</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageIELTS;
