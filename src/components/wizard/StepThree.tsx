import { useState } from "react";
import { Space, UploadedFile } from "@/pages/Wizard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

interface StepThreeProps {
  formData: any;
  spaces: Space[];
  files: UploadedFile[];
  additionalNotes: string;
  onBack: () => void;
  onComplete: () => void;
}

export const StepThree = ({ formData, spaces, files, additionalNotes, onBack, onComplete }: StepThreeProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAndBook = async () => {
    setIsSubmitting(true);
    try {
      const filePaths = files.filter(f => f.uploadStatus === 'success').map(f => f.filePath);

      const { error } = await supabase.from('submissions').insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        postal_code: formData.postalCode,
        spaces: spaces,
        additional_notes: additionalNotes,
        file_paths: filePaths,
        status: 'pending',
      });

      if (error) throw error;

      // Invoke edge function to send emails
      await supabase.functions.invoke('send-submission-emails', {
        body: { 
          clientEmail: formData.email,
          clientName: formData.fullName,
          submissionData: { ...formData, spaces, additionalNotes, filePaths }
        }
      });

      toast.success("Your submission was received!");
      
      // Open Calendly in a new tab
      const calendlyUrl = `https://calendly.com/designandsupply/30min?name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}`;
      window.open(calendlyUrl, '_blank');

      onComplete();

    } catch (error: any) {
      toast.error(error.message || "Failed to save submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-semibold text-brand-espresso" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Step 3: Review & Book
        </h2>
        <p className="text-brand-muted mt-1">Review your information, then book your live design call.</p>
      </div>

      {/* Summary Section */}
      <div className="space-y-6 rounded-lg border border-brand-border bg-brand-sand/30 p-6">
        <div className="pb-4 border-b border-brand-border">
          <h3 className="font-semibold text-brand-espresso">Contact Information</h3>
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}
          <p><strong>Postal Code:</strong> {formData.postalCode}</p>
        </div>

        <div className="pb-4 border-b border-brand-border">
          <h3 className="font-semibold text-brand-espresso">Spaces</h3>
          {spaces.map(space => (
            <div key={space.id} className="mt-4 space-y-2">
              <p><strong>{space.name}</strong> ({space.type})</p>
              <p>Ceiling: {space.ceilingHeight} {space.unit || 'in'}</p>
              {space.drawingData && <img src={space.drawingData} alt={`Drawing for ${space.name}`} className="w-full h-auto max-h-48 object-contain rounded-md border border-brand-border mt-2"/>}
              
              {/* Wall Measurements Table */}
              {space.wallMeasurements && space.wallMeasurements.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-brand-muted mb-1">Wall Measurements:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {space.wallMeasurements.map((wall) => (
                      <div key={wall.label} className="flex items-center gap-2 bg-white rounded-md border border-brand-border px-3 py-2">
                        <span className="text-brand-copper font-bold text-sm">{wall.label}</span>
                        <span className="text-brand-espresso text-sm">{wall.length || '—'} {space.unit || 'in'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {additionalNotes && (
          <div className="pb-4 border-b border-brand-border">
            <h3 className="font-semibold text-brand-espresso">Additional Notes</h3>
            <p>{additionalNotes}</p>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-brand-espresso">Uploaded Files</h3>
          <p>{files.length} file(s)</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <button onClick={onBack} disabled={isSubmitting} className="text-sm font-medium text-brand-muted hover:text-brand-espresso transition-colors">Back</button>
        <button 
          onClick={handleSubmitAndBook} 
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center gap-3 bg-brand-copper text-white text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 rounded-full hover:bg-brand-copper-dark transition-all duration-300 shadow-lg disabled:bg-brand-muted"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit & Book Live Design Call'}
          {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </div>
  );
};
