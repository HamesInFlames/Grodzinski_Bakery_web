// src/components/ContactForm.jsx
import React, { useState } from "react";

export default function ContactForm({ 
  onSubmit,
  showExtendedFields = false,
  submitButtonText = "Send Message",
  successMessage = "Thank you for reaching out! We'll get back to you soon.",
  title = "Send Us a Message"
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
      {title && <h3>{title}</h3>}
      
      <label>
        Name *
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
        Email *
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
            Phone Number *
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
            <select
              name="details"
              value={formState.details}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select an enquiry type...</option>
              <option value="General Question">General Question</option>
              <option value="Custom Cake Order">Custom Cake Order</option>
              <option value="Catering Inquiry">Catering Inquiry</option>
              <option value="Product Availability">Product Availability</option>
              <option value="Wholesale/Business">Wholesale/Business</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </>
      )}

      <label>
        Message *
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
        <div className="contact-form__alert contact-form__alert--success">
          {successMessage}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="contact-form__alert contact-form__alert--error">
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

