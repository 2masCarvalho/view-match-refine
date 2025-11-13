import React, { useState, useRef, useEffect } from "react";

const ROLES = ["Manager", "Administrator", "Resident", "Other"];

export default function LeadCaptureModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    condo: "",
    units: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        open &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  function validate() {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your full name.";
    if (!form.email.trim() || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.email))
      newErrors.email = "Please enter a valid corporate email.";
    if (!form.role) newErrors.role = "Please select your role/position.";
    return newErrors;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    // Simulate submit (replace with API call)
    onClose();
    // Optionally show a success message here
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 relative animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">
          Transform your condominium management with automation!
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Get a personalized demo and discover how Domly can simplify your
          operations.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block font-medium mb-1">Full Name *</label>
            <input
              name="name"
              type="text"
              className={`w-full border rounded px-3 py-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Corporate Email *</label>
            <input
              name="email"
              type="email"
              className={`w-full border rounded px-3 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Role/Position *</label>
            <select
              name="role"
              className={`w-full border rounded px-3 py-2 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm">{errors.role}</span>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Condominium Name *</label>
            <input
              name="condo"
              type="text"
              className="w-full border rounded px-3 py-2 border-gray-300"
              value={form.condo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Number of Units (optional)
            </label>
            <input
              name="units"
              type="number"
              min="1"
              className="w-full border rounded px-3 py-2 border-gray-300"
              value={form.units}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Contact Phone (optional)
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full border rounded px-3 py-2 border-gray-300"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Message / Interest (optional)
            </label>
            <textarea
              name="message"
              className="w-full border rounded px-3 py-2 border-gray-300"
              rows={3}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 rounded hover:bg-primary/90 transition"
          >
            I Want to Learn More
          </button>
        </form>
      </div>
    </div>
  );
}
