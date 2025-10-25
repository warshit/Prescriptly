import React from 'react';
import { CartItem } from '../types';
import { TrashIcon, BackIcon } from './Icons';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onBack: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemoveItem, onBack }) => {
  const totalPrice = items.reduce((total, item) => total + (12.34 * item.cartQuantity), 0).toFixed(2); // Using a dummy price

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-brand-primary hover:text-brand-primary-dark">
            <BackIcon className="h-5 w-5 mr-1" />
            Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200">
            {items.map(item => (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.dosage} - {item.quantity}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-700 mr-4">${(12.34 * item.cartQuantity).toFixed(2)}</span>
                  <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-4 border-t">
            <div className="flex justify-between items-center text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <button
              onClick={() => alert('Checkout is not implemented in this demo.')}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;