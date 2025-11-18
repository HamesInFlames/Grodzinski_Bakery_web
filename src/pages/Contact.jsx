import React, { useState } from "react";

function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    details: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us. A team member will follow up shortly.");
    setFormState({
      name: "",
      phone: "",
      email: "",
      location: "",
      details: "",
      message: ""
    });
  };

  return (
    <section className="section section--light">
      <div className="section__inner contact-page">
        <h1>Contact Us</h1>
        <p className="section__text">
          For orders, catering enquiries, or questions about our products,
          please call us or send a message using the form below.
        </p>

        <div className="section__inner--split contact-page__layout">
          <div>
            <h3>Toronto Bakery</h3>
            <p className="contact-page__info">
              Phone: (416) 789-0785<br />
              Address: 3437 Bathurst St, North York, ON
            </p>
            <h3>General Enquiries</h3>
            <p className="contact-page__info">
              Email: info@grodzinskibakery.com
            </p>
            <p className="contact-page__info">
              For larger catering or corporate orders, please include the date,
              approximate number of guests, and whether you need pickup or
              delivery.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name*
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone Number*
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email Address*
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Preferred Location
              <input
                type="text"
                name="location"
                placeholder="e.g., Toronto, Thornhill"
                value={formState.location}
                onChange={handleChange}
              />
            </label>
            <label>
              Pick-Up / Delivery / Enquiry Type
              <input
                type="text"
                name="details"
                placeholder="Pick-up, delivery, catering, product question..."
                value={formState.details}
                onChange={handleChange}
              />
            </label>
            <label>
              Message*
              <textarea
                name="message"
                rows="4"
                value={formState.message}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="btn btn--primary btn--full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
