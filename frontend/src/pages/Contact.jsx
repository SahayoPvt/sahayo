import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
const Contact=()=>{
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Fashion Street', 'New York, NY 10001']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri, 9am-6pm']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@modernfashion.com', 'sales@modernfashion.com']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday-Friday: 9am-6pm', 'Saturday: 10am-4pm']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about our products or services? We're here to help and would love to hear from you.
          </p>
        </motion.div>

        {/* Contact Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {contactInfo.map(({ icon: Icon, title, details }) => (
            <div key={title} className="bg-white rounded-lg p-3 shadow-lg text-center">
              <Icon className="w-8 h-8 mx-auto mb-4 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
              {details.map((detail, index) => (
                <p key={index} className="text-gray-600">{detail}</p>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your message here..."
              />
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756836!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact