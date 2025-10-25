import React from 'react';
import ImageUploader from './ImageUploader';
import { View } from '../App';

interface HomeProps {
  onProcessImage: (file: File) => void;
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onProcessImage, onNavigate }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Medical <span className="text-brand-primary-dark">Precision</span>
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-600">
          Your AI Health Assistant. Upload prescriptions, check symptoms, and manage your health with confidence.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => document.getElementById('uploader-section')?.scrollIntoView({ behavior: 'smooth' })} 
            className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary-dark transition-all transform hover:scale-105"
          >
            Upload Prescription
          </button>
          <button 
            onClick={() => onNavigate('symptom-checker')} 
            className="w-full sm:w-auto px-8 py-3 bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary-dark transition-all transform hover:scale-105"
          >
            Check Symptoms
          </button>
        </div>
      </section>

      {/* Uploader Section */}
      <section id="uploader-section" className="py-16 md:py-20 bg-white rounded-xl shadow-lg my-12">
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Process Your Prescription
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Let our AI read your prescription and find your medicines in seconds.
          </p>
        </div>
        <ImageUploader onProcessImage={onProcessImage} />
      </section>
      
      {/* Placeholder Sections */}
      <section className="py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Trending Health Articles</h2>
          <p className="mt-3 text-lg text-gray-500">Stay informed with the latest in health and wellness.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center text-gray-700">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Health News</h3>
            <p>This feature is coming soon.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Wellness Tips</h3>
            <p>This feature is coming soon.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Medicine Guides</h3>
            <p>This feature is coming soon.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;