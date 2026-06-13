import { useParams, Navigate } from "react-router-dom";
import { galleryItems } from "@/data/gallery";
import GalleryAlbumViewer from "@/components/sections/GalleryAlbumViewer";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/layout/Footer";

export default function GalleryDetailPage() {
  const { id } = useParams<{ id: string }>(); // This will capture the slug in the URL (e.g. "/gallery/belmont-walk-in")
  
  const item = galleryItems.find((g) => g.slug === id);
  if (!item) {
    return <Navigate to="/gallery" replace />;
  }

  // Find related items (excluding current and matching the same category)
  const related = galleryItems
    .filter((g) => g.id !== item.id && g.category === item.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navigation />
      <div className="flex-1">
        <GalleryAlbumViewer item={item} related={related} />
      </div>
      <Footer />
    </div>
  );
}
