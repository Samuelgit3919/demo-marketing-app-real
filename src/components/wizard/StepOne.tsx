import { useState, Dispatch, SetStateAction } from "react";
import { Space } from "@/pages/Wizard";
import { Plus, X } from "lucide-react";

interface StepOneProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    postalCode: string;
  };
  setFormData: (data: any) => void;
  spaces: Space[];
  setSpaces: Dispatch<SetStateAction<Space[]>>;
  onNext: () => void;
}

export const StepOne = ({ formData, setFormData, spaces, setSpaces, onNext }: StepOneProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateName = (name: string) => name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePhone = (phone: string) => phone.trim() === "" || (phone.replace(/\D/g, "").length === 10 && /^\d+$/.test(phone.replace(/\D/g, "")));
  const validatePostalCode = (code: string) => {
    const cleaned = code.replace(/\s|-/g, "").toUpperCase();
    return /^\d{5}$/.test(cleaned) || /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleaned);
  };

  const isFormValid = () => {
    return (
      validateName(formData.fullName) &&
      validateEmail(formData.email) &&
      (formData.phone.trim() === "" || validatePhone(formData.phone)) &&
      validatePostalCode(formData.postalCode)
    );
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "phone") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, phone: numbersOnly });
      setErrors(prev => ({
        ...prev,
        phone: numbersOnly.length > 0 && numbersOnly.length !== 10
          ? "Phone must be exactly 10 digits"
          : "",
      }));
      return;
    }

    if (field === "postalCode") {
      const cleaned = value.replace(/\s|-/g, "").toUpperCase();
      setFormData({ ...formData, postalCode: cleaned });
      setErrors(prev => ({
        ...prev,
        postalCode: cleaned.length > 0 && !validatePostalCode(cleaned)
          ? "Please enter a valid US or Canadian postal code"
          : "",
      }));
      return;
    }

    setFormData({ ...formData, [field]: value });

    setErrors(prev => {
      const next = { ...prev };
      if (field === "fullName") {
        next.fullName = value.trim().length > 0 && !validateName(value)
          ? "Name must be at least 2 letters"
          : "";
      } else if (field === "email") {
        next.email = value.trim().length > 0 && !validateEmail(value)
          ? "Email must contain @ and a valid domain (.com/.ca/.net/.org)"
          : "";
      }
      return next;
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.fullName)) {
      newErrors.fullName = "Name must be at least 2 letters";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email must contain @ and a valid domain (.com/.ca/.net/.org)";
    }
    if (formData.phone.trim() !== "" && !validatePhone(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }
    if (!validatePostalCode(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid US or Canadian postal code";
    }
    if (spaces.length === 0) {
      newErrors.spaces = "Please add at least one space";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const addSpace = () => {
    const newSpace: Space = {
      id: crypto.randomUUID(),
      name: `New Space ${spaces.length + 1}`,
      type: "Closet",
      ceilingHeight: "96",
    };
    setSpaces([...spaces, newSpace]);
    setErrors(prev => { const { spaces, ...rest } = prev; return rest; });
  };

  const removeSpace = (id: string) => {
    setSpaces(spaces.filter((s) => s.id !== id));
  };

  const updateSpace = (id: string, field: keyof Space, value: string) => {
    setSpaces(spaces.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <form onSubmit={handleNext} className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-semibold text-brand-espresso" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Step 1: Contact & Spaces
        </h2>
        <p className="text-brand-muted mt-1">First, let's get your contact information and what spaces you'd like to design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-espresso">Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className={`w-full p-3 border rounded-md text-brand-espresso focus:ring-2 focus:ring-brand-copper/30 focus:border-brand-copper outline-none transition-all ${errors.fullName ? "border-red-500" : "border-brand-border"}`}
            placeholder="Your full name"
          />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-espresso">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full p-3 border rounded-md text-brand-espresso focus:ring-2 focus:ring-brand-copper/30 focus:border-brand-copper outline-none transition-all ${errors.email ? "border-red-500" : "border-brand-border"}`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-espresso">Postal Code *</label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
            className={`w-full p-3 border rounded-md text-brand-espresso focus:ring-2 focus:ring-brand-copper/30 focus:border-brand-copper outline-none transition-all ${errors.postalCode ? "border-red-500" : "border-brand-border"}`}
            placeholder="A1A1A1 or 12345"
            maxLength={7}
          />
          {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-espresso">Phone (optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`w-full p-3 border rounded-md text-brand-espresso focus:ring-2 focus:ring-brand-copper/30 focus:border-brand-copper outline-none transition-all ${errors.phone ? "border-red-500" : "border-brand-border"}`}
            placeholder="1234567890"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      {/* Add Spaces */}
      <div className="pt-6">
        <h3 className="text-xl font-semibold text-brand-espresso" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Your Spaces</h3>
        <p className="text-brand-muted mt-1">Add each space you want to design. You can add multiple.</p>
        {errors.spaces && <p className="text-xs text-red-500 mt-2">{errors.spaces}</p>}

        <div className="space-y-4 mt-4">
          {spaces.map((space) => (
            <div key={space.id} className="flex items-center gap-4 p-4 bg-brand-sand/50 rounded-lg border border-brand-border">
              <input
                type="text"
                value={space.name}
                onChange={(e) => updateSpace(space.id, "name", e.target.value)}
                className="flex-grow bg-transparent focus:outline-none text-brand-espresso"
              />
              <select
                value={space.type}
                onChange={(e) => updateSpace(space.id, "type", e.target.value as Space["type"])}
                className="bg-transparent focus:outline-none text-brand-muted"
              >
                <option>Closet</option>
                <option>Kitchen</option>
                <option>Garage</option>
              </select>
              <button onClick={() => removeSpace(space.id)} className="text-red-500 hover:text-red-700">
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addSpace}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-copper hover:text-brand-copper-dark transition-colors"
        >
          <Plus size={16} />
          Add Another Space
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`inline-flex items-center justify-center gap-3 text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg ${
            isFormValid()
              ? "bg-brand-copper text-white hover:bg-brand-copper-dark"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue to Measure
        </button>
      </div>
    </form>
  );
};
