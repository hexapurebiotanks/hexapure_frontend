// components/ContactFormSection.jsx
import React, { useState } from 'react';
import { addContact } from '../../../services/firestoreService.js';
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
};

const ContactFormSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Save to Firestore first
            await addContact(formData);

            // Show success immediately
            setSubmitStatus('success');

            // Send email in background (fire-and-forget)
            fetch('/.netlify/functions/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            }).catch((error) => {
                // Log error silently - don't show to user
                console.error('Email sending failed:', error);
            });

            setTimeout(() => {
                setFormData({
                    name: '',
                    company: '',
                    phone: '',
                    email: '',
                    subject: '',
                    message: '',
                });
                setSubmitStatus(null);
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative w-full">

            {/* Header With Animation */}
            <motion.div
                className="absolute top-0 left-0 w-full h-[350px] bg-primary-dark z-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Background Image - REPLACED WITH IMG TAG FOR PERFORMANCE */}
                <img
                    src="/.netlify/images?url=/images/banner4.jpg&w=1200&fm=webp&q=75"
                    width="1200"
                    height="350"
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Contact form background"
                />
                <motion.div
                    className="absolute inset-0 bg-primary-dark opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1.2 }}
                ></motion.div>

                <motion.div
                    className="relative max-w-7xl mx-auto px-4 pt-16 text-center z-10"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Send us a message.</h2>
                    <p className="text-gray-300 text-sm max-w-2xl mx-auto">
                        Explore sustainable wastewater solutions. Contact us for information on eco-friendly products that revolutionize wastewater treatment standards.
                    </p>
                </motion.div>
            </motion.div>

            {/* Form Container */}
            <motion.div
                className="relative z-10 max-w-4xl mx-auto px-4 pt-48 pb-20"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
            >
                {/* White Card */}
                <motion.div
                    className="bg-white rounded-lg shadow-2xl border-t-4 border-[#2E8B57] p-8 md:p-12"
                    variants={fadeUp}
                >

                    {/* Success / Error Message */}
                    {submitStatus === 'success' && (
                        <motion.div
                            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            Thank you for your message! We'll get back to you soon.
                        </motion.div>
                    )}

                    {submitStatus === 'error' && (
                        <motion.div
                            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            There was an error sending your message. Please try again.
                        </motion.div>
                    )}

                    {/* Form with stagger animation */}
                    <motion.form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >

                        {/* NAME + COMPANY */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={fadeUp} className="space-y-1">
                                <label className="text-sm font-semibold text-black">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
                                />
                            </motion.div>

                            <motion.div variants={fadeUp} className="space-y-1">
                                <label className="text-sm font-semibold text-black">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
                                />
                            </motion.div>
                        </div>

                        {/* PHONE + EMAIL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={fadeUp} className="space-y-1">
                                <label className="text-sm font-semibold text-black">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
                                />
                            </motion.div>

                            <motion.div variants={fadeUp} className="space-y-1">
                                <label className="text-sm font-semibold text-black">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
                                />
                            </motion.div>
                        </div>

                        {/* SUBJECT */}
                        <motion.div variants={fadeUp} className="space-y-1">
                            <label className="text-sm font-semibold text-black">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
                            />
                        </motion.div>

                        {/* MESSAGE */}
                        <motion.div variants={fadeUp} className="space-y-1">
                            <label className="text-sm font-semibold text-black">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
                            ></textarea>
                        </motion.div>

                        {/* SUBMIT BUTTON */}
                        <motion.div className="flex justify-end">
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white font-bold py-3 px-8 rounded text-sm shadow-md
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message »'
                                )}
                            </motion.button>
                        </motion.div>

                    </motion.form>
                </motion.div>

                {/* Social Section */}
                <motion.div
                    className="mt-16 text-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                >
                    <h3 className="text-text-dark text-2xl font-bold mb-6">Follow our social network.</h3>

                    <div className="flex justify-center gap-6">
                        {[
                            { name: "Facebook", href: "https://www.facebook.com/share/1KBv1sT3vV", icon: "facebook" },
                            { name: "Instagram", href: "https://www.instagram.com/hexapurebiotanks", icon: "instagram" },
                            { name: "LinkedIn", href: "#", icon: "linkedin_img" }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.15 }}
                                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
                            >
                                <img src={`/.netlify/images?url=/images/${social.icon}.png&w=50&fm=webp`} alt={social.name} className="w-6 h-6" loading="lazy" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Background Pattern */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/2 z-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#0096C7 2px, transparent 2px)`,
                    backgroundSize: '30px 30px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                transition={{ duration: 1.5 }}
            ></motion.div>
        </div>
    );
};

export default ContactFormSection;
