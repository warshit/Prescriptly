import React from 'react';
import { CartIcon, PillIcon } from './Icons.tsx'; // Added .tsx extension
import { View } from '../App';
import { useAuth } from '../services/AuthContext.tsx'; // Added .tsx extension

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onNavigate: (view: View) => void;
}

const NavLink: React.FC<{ onClick: () => void, children: React.ReactNode }> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="text-gray-600 hover:text-brand-primary font-medium transition-colors px-3 py-2 rounded-md"
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onNavigate }) => {
  // Get auth state and functions from the context
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:5-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <PillIcon className="h-8 w-8 text-brand-primary" />
              <h1 className="ml-2 text-2xl font-bold text-gray-800">
                Medical <span className="text-brand-primary">Precision</span>
              </h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
              <NavLink onClick={() => onNavigate('home')}>Home</NavLink>
              <NavLink onClick={() => onNavigate('tablets')}>Tablets</NavLink>
              <NavLink onClick={() => onNavigate('symptom-checker')}>Symptom Checker</NavLink>
              <NavLink onClick={() => onNavigate('about')}>About</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            {/* == AUTH BUTTONS LOGIC == */}
            <div className="hidden sm:flex items-center space-x-2">
              {user ? (
                // If user is logged in
                <>
                  <span className="text-gray-700 text-sm font-medium">
                    Hi, {user.displayName?.split(' ')[0] || 'User'}
                  </span>
                  <button 
                    onClick={logout} 
                    className="text-gray-600 hover:text-brand-primary font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // If user is logged out
                <>
                  <button 
                    onClick={loginWithGoogle} 
                    className="text-gray-600 hover:text-brand-primary font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={loginWithGoogle} // You can change this to a different signup flow later
                    className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-brand-primary-dark transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
            {/* ========================== */}
            <div className="relative">
                <button
                onClick={onCartClick}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                aria-label="Open cart"
                >
                <CartIcon className="h-7 w-7" />
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center h-6 w-6 text-xs font-bold text-white bg-red-500 rounded-full">
                    {cartItemCount}
                    </span>
                )}
                </button>
                
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;