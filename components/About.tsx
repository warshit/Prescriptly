import React from 'react';

const About: React.FC = () => {
    return (
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
                About Medical <span className="text-brand-primary">Precision</span>
            </h2>
            
            <div className="space-y-8 text-lg text-gray-700">
                <div>
                    <h3 className="text-2xl font-bold text-brand-primary-dark mb-2">Our Mission</h3>
                    <p>
                        To revolutionize healthcare access by leveraging artificial intelligence to create a seamless, accurate, and user-friendly digital pharmacy experience. We aim to empower patients by simplifying prescription management and providing instant access to vital medication information.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-brand-primary-dark mb-2">How It Works</h3>
                    <p>
                        Our platform combines cutting-edge Optical Character Recognition (OCR) and Natural Language Processing (NLP) to digitize and understand medical prescriptions. Simply upload an image, and our AI will extract the necessary details, cross-reference them with our database, and prepare your cart for a quick and easy checkout.
                    </p>
                </div>
                
                <div>
                    <h3 className="text-2xl font-bold text-brand-primary-dark mb-2">Our Vision</h3>
                    <p>
                        We envision a future where healthcare is not just reactive but proactive, personalized, and accessible to everyone. By integrating AI into everyday health management, we are building a foundation for smarter, safer, and more efficient healthcare for all.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
