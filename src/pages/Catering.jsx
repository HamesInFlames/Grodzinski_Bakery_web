//src\pages\Catering.jsx
import React from "react";

export default function Catering() {
  return (
    <div className="catering-page bg-[#faf7f2] pb-20">

      {/* HERO */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-amber-100 to-amber-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Catering & Platters
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            From business meetings to family celebrations, Grodzinski Bakery 
            offers a wide range of platters and catering options to make your event 
            memorable and delicious. Fresh, beautifully arranged, and always kosher.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto mt-12 px-6">

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Catering Options
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          All platters are available in various sizes. Perfect for offices, 
          parties, holidays, and community events. Contact us to customize any order.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* PLATTER CARD */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-700">Breakfast Platters</h3>
            <p className="text-gray-600 mt-2">
              Includes pastries, danishes, muffins, and fresh rolls. 
              A perfect way to start any morning event.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-700">Sandwich Platters</h3>
            <p className="text-gray-600 mt-2">
              Freshly prepared sandwiches made with our signature breads. 
              Available vegetarian or deli-style.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-700">Baked Goods Trays</h3>
            <p className="text-gray-600 mt-2">
              Cookies, brownies, rugelach, and more. Great for dessert tables 
              or afternoon gatherings.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-700">Challah & Bread Baskets</h3>
            <p className="text-gray-600 mt-2">
              Beautifully arranged baskets featuring our famous challah, 
              specialty loaves, and rolls.
            </p>
          </div>

        </div>

        {/* CONTACT BUTTON */}
        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full text-lg shadow-md transition"
          >
            Request Catering
          </a>
        </div>

      </section>

    </div>
  );
}
