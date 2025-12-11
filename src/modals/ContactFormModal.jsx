// components/ContactFormModal.jsx
import React, { useState } from 'react';
import apiService from '../services/apiService.js';

const ContactFormModal = ({ isOpen, onClose }) => {
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
            const result = await apiService.sendContactForm(formData);
            setSubmitStatus('success');

            // Reset form and close modal after success
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
                onClose();
            }, 3000); // Increased timeout to show success message longer
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    // --- Tailwind Modal Structure ---
    return (
        // Modal Overlay (Backdrop)
        <div
            // Removed overflow-y-auto from overlay
            className="fixed inset-0 z-[9999] flex items-center justify-center
               bg-black bg-opacity-70 backdrop-blur-sm p-4"
            onClick={onClose}
        >


            {/* Modal Container (Scroll classes removed) */}
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto
                           overflow-hidden transform transition-all duration-300 scale-100 opacity-100 h-[100%] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing on form click
            >
                {/* Modal Header (No longer needs to be sticky) */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-2xl font-extrabold text-[#2E8B57]">Get in Touch 👋</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        aria-label="Close modal"
                    >
                        {/* Simple X close icon */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Modal Body (Form) */}
                <div className="p-6 md:p-8">
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Your message has been sent successfully! We will get back to you soon.
                            </div>
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Failed to send message. Please try again.
                            </div>
                        </div>
                    )}

                    <p className="text-gray-600 mb-6 text-sm">
                        Fill out the form below and we will get back to you as soon as possible.
                    </p>
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Name and Company (Two-Column Layout) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] transition-colors"
                            />
                            <input
                                type="text"
                                name="company"
                                placeholder="Company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] transition-colors"
                            />
                        </div>

                        {/* Phone and Email (Two-Column Layout) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] transition-colors"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] transition-colors"
                            />
                        </div>

                        {/* Subject Input (Full Width) */}
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] transition-colors"
                        />

                        {/* Message Textarea (Full Width) */}
                        <textarea
                            rows="5"
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] transition-colors resize-none"
                        ></textarea>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#2E8B57] hover:bg-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message »'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactFormModal;
