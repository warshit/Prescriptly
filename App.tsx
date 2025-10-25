import React, { useState, useCallback } from 'react';
import { Medicine, CartItem } from './types';
import { extractMedicinesFromImage } from './services/geminiService';
import Header from './components/Header';
import Loader from './components/Loader';
import MedicineCard from './components/MedicineCard';
import Cart from './components/Cart';
import SymptomChecker from './components/SymptomChecker';
import Home from './components/Home';
import About from './components/About';

export type View = 'home' | 'results' | 'cart' | 'symptom-checker' | 'about' | 'tablets';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [previousViewBeforeCart, setPreviousViewBeforeCart] = useState<View>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedMedicines, setExtractedMedicines] = useState<Medicine[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleProcessImage = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const medicines = await extractMedicinesFromImage(file);
      setExtractedMedicines(medicines);
      setView('results');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setView('home'); // Go back home on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = useCallback((targetView: View) => {
    if (targetView === 'home') {
      setExtractedMedicines([]);
      setError(null);
    }
    setView(targetView);
  }, []);

  const handleAddToCart = useCallback((medicine: Medicine) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === medicine.name && item.dosage === medicine.dosage);
      if (existingItem) {
        return prevItems;
      }
      const newItem: CartItem = {
        ...medicine,
        id: `${medicine.name}-${medicine.dosage}-${Date.now()}`,
        cartQuantity: 1,
      };
      return [...prevItems, newItem];
    });
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);
  
  const handleCartClick = () => {
    if (view === 'cart') {
      setView(previousViewBeforeCart);
    } else {
      setPreviousViewBeforeCart(view);
      setView('cart');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader message="AI is analyzing your prescription..." />;
    }
    
    switch (view) {
      case 'home':
        return <Home onProcessImage={handleProcessImage} onNavigate={handleNavigate} />;
      case 'results':
        return (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Detected Medications</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    Please review the items below and add them to your cart.
                </p>
            </div>
            {extractedMedicines.length > 0 ? (
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {extractedMedicines.map((med, index) => (
                   <MedicineCard
                     key={index}
                     medicine={med}
                     onAddToCart={handleAddToCart}
                     isInCart={cartItems.some(item => item.name === med.name && item.dosage === med.dosage)}
                   />
                 ))}
               </div>
            ) : (
                <div className="text-center bg-white p-8 rounded-lg shadow">
                    <p className="text-lg text-gray-600">No medications could be detected. Please try a clearer image.</p>
                    <button onClick={() => handleNavigate('home')} className="mt-4 px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary-dark transition-colors">
                        Try Again
                    </button>
                </div>
            )}
           
          </div>
        );
      case 'cart':
        return <Cart items={cartItems} onRemoveItem={handleRemoveFromCart} onBack={() => setView(previousViewBeforeCart)} />;
      case 'symptom-checker':
        return <SymptomChecker />;
      case 'about':
        return <About />;
      case 'tablets':
        return (
            <div className="text-center p-12 bg-white rounded-lg shadow-md animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800">Browse Medicines</h2>
                <p className="mt-4 text-lg text-gray-600">This feature is coming soon! You'll be able to browse our full catalog of medicines here.</p>
            </div>
        );
      default:
        return <Home onProcessImage={handleProcessImage} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header 
        cartItemCount={cartItems.length} 
        onCartClick={handleCartClick}
        onNavigate={handleNavigate}
        />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 max-w-4xl mx-auto" role="alert">{error}</div>}
        {renderContent()}
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Medical Precision. All rights reserved.</p>
          <p className="mt-1">Disclaimer: This is a demo application. Consult a healthcare professional for medical advice.</p>
      </footer>
    </div>
  );
};

export default App;