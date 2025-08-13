

const gmap = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out to us through any of our office locations or contact methods below.
          </p>
        </div> */}

        

        {/* Office Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Registered Office - Kanpur */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Registered Office</h3>
                <p className="text-sm text-blue-600 font-medium">Kanpur, Uttar Pradesh</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 leading-relaxed">
                  5139, Awas Vikas – 3, Panki Rd, Kalyanpur,<br />
                  Kanpur, Uttar Pradesh – 208017
                </p>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+916392146605" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  +91 639 214 6605
                </a>
              </div>
            </div>
          </div>

          {/* Delhi Office */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Delhi Office</h3>
                <p className="text-sm text-green-600 font-medium">New Delhi, Delhi</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 leading-relaxed">
                  WP 501 D Second Floor, Rishi Complex,<br />
                  Ashok Vihar, Delhi, New Delhi,<br />
                  Delhi 110052
                </p>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+918800855760" className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                  +91-88-00-855-760
                </a>
              </div>
            </div>
          </div>

          {/* Hyderabad Office */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Hyderabad Office</h3>
                <p className="text-sm text-purple-600 font-medium">Hyderabad, Telangana</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 leading-relaxed">
                  Unit No- 201, 8-1328/1/2, 2nd Floor,<br />
                  SATTVA MAGNUS, Shaikpet, Tolichowki,<br />
                  Hyderabad, India, Pin Code- 500008
                </p>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+918143755760" className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                  +91 814 375 5760
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d112077.82725340908!2d77.13652799133682!3d28.616808935921394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sFloor%2C%20Rishi%20Complex%2C%20Ashok%20Vihar%2C%20Delhi%2C%20New%20Delhi%2C%20Delhi%20110052!5e0!3m2!1sen!2sin!4v1685030662048!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              loading="lazy"
              className="w-full"
              title="Homofix Company Office Locations"
            ></iframe>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">General Contact Information</h2>
            <p className="text-gray-600">Have a question? We'd love to hear from you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <a 
                href="mailto:info@homofixcompany.com" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                info@homofixcompany.com
              </a>
            </div>

            {/* Support Hours */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Hours</h3>
              <p className="text-gray-600">Monday - Sunday</p>
              <p className="text-green-600 font-medium">8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default gmap