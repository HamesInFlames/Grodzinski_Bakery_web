// src/components/ContactForm.jsx
import React, { useState } from "react";

export default function ContactForm({ 
  onSubmit,
  showExtendedFields = false,
  submitButtonText = "Send Message",
  successMessage = "Thank you for reaching out! We'll get back to you soon."
}) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    details: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (onSubmit) {
        await onSubmit(formState);
      }
      
      setSubmitStatus('success');
      setFormState({
        name: "",
        email: "",
        phone: "",
        location: "",
        details: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name*
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Your full name"
        />
      </label>

      <label>
        Email*
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="your.email@example.com"
        />
      </label>

      {showExtendedFields && (
        <>
          <label>
            Phone Number*
            <input
              type="tel"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="(416) 123-4567"
            />
          </label>

          <label>
            Preferred Location
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="e.g., Toronto, Thornhill"
            />
          </label>

          <label>
            Enquiry Type
            <input
              type="text"
              name="details"
              value={formState.details}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Pick-up, delivery, catering, product question..."
            />
          </label>
        </>
      )}

      <label>
        Message*
        <textarea
          name="message"
          rows="4"
          value={formState.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Tell us about your enquiry, order details, or any questions you have..."
        />
      </label>

      {submitStatus === 'success' && (
        <div className="p-3 mb-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          {successMessage}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-3 mb-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          There was an error submitting your message. Please try again or call us directly.
        </div>
      )}

      <button 
        type="submit" 
        className="btn btn--primary btn--full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : submitButtonText}
      </button>
    </form>
  );
}

