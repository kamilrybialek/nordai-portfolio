import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (url: string) => void;
  currentImage?: string;
}

const ImageUploader = ({ onImageSelect, currentImage }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreviewUrl(url);
        onImageSelect(url);
      };
      reader.readAsDataURL(file);

      // In a real app, you would upload to a server or cloud storage here
      // For now, we're using data URLs for local preview
      //
      // Example upload code:
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // setPreviewUrl(data.url);
      // onImageSelect(data.url);

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlInput = (url: string) => {
    setPreviewUrl(url);
    onImageSelect(url);
  };

  const clearImage = () => {
    setPreviewUrl('');
    onImageSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Image URL or Upload
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={previewUrl}
            onChange={(e) => handleUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg or upload below"
            className="flex-1 px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {previewUrl && (
            <button
              type="button"
              onClick={clearImage}
              className="px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors cursor-pointer"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </span>
            </>
          )}
        </label>
        <p className="text-xs text-muted-foreground mt-2">
          PNG, JPG, GIF up to 5MB
        </p>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="relative">
          <label className="block text-sm font-medium mb-2">Preview</label>
          <div className="relative rounded-lg overflow-hidden border border-border bg-muted/30">
            {previewUrl.startsWith('data:') || previewUrl.startsWith('http') ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-muted">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Invalid image URL</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery Quick Links */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Common Placeholder Images
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
          ].map((url, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleUrlInput(url)}
              className="aspect-video rounded-md overflow-hidden border-2 border-border hover:border-primary transition-colors"
            >
              <img src={url} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
