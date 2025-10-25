import React from 'react';
import { Medicine } from '../types';
import { PlusIcon, PillIcon } from './Icons';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
  isInCart: boolean;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onAddToCart, isInCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-5">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <PillIcon className="h-8 w-8 text-brand-secondary" />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="text-xl font-bold text-gray-800">{medicine.name}</h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              {medicine.dosage && <p><strong>Dosage:</strong> {medicine.dosage}</p>}
              {medicine.quantity && <p><strong>Quantity:</strong> {medicine.quantity}</p>}
              {medicine.frequency && <p><strong>Frequency:</strong> {medicine.frequency}</p>}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={() => onAddToCart(medicine)}
            disabled={isInCart}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-secondary hover:bg-brand-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 transition-colors"
          >
            {isInCart ? (
              'Added to Cart'
            ) : (
              <>
                <PlusIcon className="h-5 w-5 mr-2" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;