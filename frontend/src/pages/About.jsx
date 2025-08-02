import { motion } from 'framer-motion';
import { Users, Award, Package, Heart } from 'lucide-react';

const About=()=>{
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Package, label: 'Products', value: '5,000+' },
    { icon: Heart, label: 'Reviews', value: '25,000+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Story</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Founded in 2010, we've grown from a small boutique to a leading fashion destination,
            always staying true to our core values of quality, style, and customer satisfaction.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900 ">{value}</h3>
              <p className="text-gray-600">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-10 -mt-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-96"
          >
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
              alt="Our team working"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='md:-mt-44'
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We believe that everyone deserves to look and feel their best. Our mission is to provide
              high-quality, fashionable clothing that empowers individuals to express their unique style
              with confidence.
            </p>
            <p className="text-gray-600">
              We're committed to sustainable practices and ethical manufacturing, ensuring that our
              fashion-forward approach doesn't compromise our responsibility to the planet and its people.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-16">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO & Founder',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
              },
              {
                name: 'Michael Chen',
                role: 'Creative Director',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Head of Design',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
              }
            ].map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600 ">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
export default About