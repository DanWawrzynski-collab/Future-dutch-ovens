/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronRight, Star, ArrowLeft, CreditCard, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';

const ProductImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);
  const fallback = "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=800"; // High quality Dutch Oven fallback

  return (
    <img 
      src={error ? fallback : src} 
      alt={alt} 
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

// --- Components ---

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-black' : 'text-white'}`}>
          FUTURE <span className="font-light italic">DUTCH OVENS</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className={`text-sm uppercase tracking-widest font-medium hover:opacity-70 ${isScrolled ? 'text-black' : 'text-white'}`}>Collection</Link>
          <a href="#" className={`text-sm uppercase tracking-widest font-medium hover:opacity-70 ${isScrolled ? 'text-black' : 'text-white'}`}>Innovation</a>
          <a href="#" className={`text-sm uppercase tracking-widest font-medium hover:opacity-70 ${isScrolled ? 'text-black' : 'text-white'}`}>About</a>
        </div>

        <Link to="/cart" className={`relative p-2 rounded-full transition-colors ${isScrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-2xl font-serif italic mb-6">Future Dutch Ovens</h2>
        <p className="text-gray-400 max-w-md leading-relaxed">
          Redefining the culinary cornerstone. Aero-Iron technology brings professional-grade performance to the modern home kitchen.
        </p>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-gray-500">Shop</h3>
        <ul className="space-y-4 text-sm">
          <li><Link to="/" className="hover:text-gray-300 transition-colors">All Products</Link></li>
          <li><a href="#" className="hover:text-gray-300 transition-colors">Aero-Iron Series</a></li>
          <li><a href="#" className="hover:text-gray-300 transition-colors">Accessories</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-gray-500">Support</h3>
        <ul className="space-y-4 text-sm">
          <li><a href="#" className="hover:text-gray-300 transition-colors">Shipping & Returns</a></li>
          <li><a href="#" className="hover:text-gray-300 transition-colors">Care & Use</a></li>
          <li><a href="#" className="hover:text-gray-300 transition-colors">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
      <p>© 2026 Future Dutch Ovens. All rights reserved.</p>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ProductImage 
            src="https://photos.fife.usercontent.google.com/pw/AP1GczOfMQVHe72TLH45xpKPJ8MHc3XP3FmjbOvTV6HVEHDJ_oo7TwVkzzI=w546-h287-s-no?authuser=0" 
            alt="Hero" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] font-bold mb-4 block text-gray-300">Introducing Aero-Iron</span>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-tight mb-8">
              The Future of <br /> Slow Cooking.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed">
              Lighter than traditional cast iron. Superior heat retention. 
              The Aero-Iron series is designed for the next generation of chefs.
            </p>
            <div className="flex flex-wrap gap-6">
              <a 
                href="#collection" 
                className="inline-block bg-white text-black px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors"
              >
                Shop Collection
              </a>
              <a 
                href="#innovation" 
                className="inline-block border border-white text-white px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all"
              >
                Our Innovation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-serif mb-8 italic">Aero-Iron™ Technology</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our proprietary Aero-Iron process creates a high-density, lightweight core that retains heat 40% longer than standard cast iron while weighing 30% less.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-serif italic text-xl">01</div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Molecular Bonding</h4>
                    <p className="text-sm text-gray-500">Dual-layer enamel is molecularly bonded to the iron core for lifetime durability.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-serif italic text-xl">02</div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Precision Casting</h4>
                    <p className="text-sm text-gray-500">Each piece is individually cast in a single-use sand mold for unique character and precision.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <ProductImage 
                src="https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?auto=format&fit=crop&q=80&w=800" 
                alt="Innovation" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-xl max-w-xs hidden md:block">
                <p className="font-serif italic text-xl mb-2">"The most significant advancement in cookware in 50 years."</p>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400">— Culinary Tech Monthly</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-4xl font-serif mb-4">Aero-Iron Series</h2>
              <p className="text-gray-500">Innovative design meets timeless craftsmanship.</p>
            </div>
            
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-4 mt-8 md:mt-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full border transition-all ${
                    filter === cat 
                    ? 'bg-black text-white border-black' 
                    : 'bg-transparent text-gray-400 border-gray-200 hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="product-image-container mb-6 relative">
                      <ProductImage 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                        {product.color}
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-serif mb-1 group-hover:underline">{product.name}</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</p>
                      </div>
                      <p className="text-lg font-medium">${product.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductDetailPage = ({ addToCart }: { addToCart: (p: Product) => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm uppercase tracking-widest font-bold text-gray-400 hover:text-black mb-12 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="bg-gray-50 aspect-square overflow-hidden rounded-lg">
              <ProductImage 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-50 aspect-square rounded-lg overflow-hidden opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                  <ProductImage src={`https://picsum.photos/seed/dutch-oven-detail-${i}/400/400`} alt="Detail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 block">{product.series}</span>
              <h1 className="text-5xl font-serif mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-gray-500">(128 Reviews)</span>
              </div>
              <p className="text-3xl font-medium text-gray-900">${product.price}</p>
            </div>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Size</h3>
                  <div className="px-4 py-2 border border-black inline-block text-sm font-bold">{product.category}</div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Color</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: product.color.toLowerCase().includes('obsidian') ? '#1a1a1a' : product.color.toLowerCase().includes('arctic') ? '#f0f0f0' : product.color.toLowerCase().includes('copper') ? '#b87333' : product.color.toLowerCase().includes('sage') ? '#77815c' : '#1e3a8a' }}></div>
                    <span className="text-sm font-medium">{product.color}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <ChevronRight size={14} className="mr-2 text-black" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-black text-white py-5 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ cart, updateQuantity, removeFromCart }: { 
  cart: CartItem[], 
  updateQuantity: (id: string, delta: number) => void,
  removeFromCart: (id: string) => void
}) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-24 text-center">
        <h2 className="text-3xl font-serif mb-6">Your cart is empty</h2>
        <Link to="/" className="inline-block bg-black text-white px-8 py-3 text-sm uppercase tracking-widest font-bold">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <ProductImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">{item.category} • {item.color}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >-</button>
                      <span className="px-4 py-1 text-sm font-bold border-x border-gray-200">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >+</button>
                    </div>
                    <p className="font-bold">${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-sm sticky top-32">
              <h2 className="text-xl font-serif mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
              <Link 
                to="/checkout" 
                className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors block text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ cart, clearCart }: { cart: CartItem[], clearCart: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsSubmitting(true);

    // Flattening the payload for better compatibility with Google Sheets scripts
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      productName: cart.map(item => `${item.name} (${item.quantity})`).join(', '),
      quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
      totalAmount: total,
      timestamp: new Date().toLocaleString()
    };

    try {
      // Sending data to Google Apps Script. 
      // Using 'no-cors' mode as Apps Script redirects often cause CORS issues in browsers,
      // but the data is still sent successfully.
      await fetch('https://script.google.com/macros/s/AKfycbylFOT5lHrrW7M55l-Fl3egFl4PnLKC_GHmccVK-t3DesQZG8KXPk4dBHElklsMyWY/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      // Open PayPal in a new tab
      window.open(`https://paypal.me/DanielWawrzynski/${total}`, '_blank');
      
      // Show success message and clear cart
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Checkout submission error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-48 pb-24 text-center px-4 min-h-screen bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-white p-12 rounded-lg shadow-sm"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={40} />
          </div>
          <h1 className="text-3xl font-serif mb-4">Order Submitted</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you! Your order details have been recorded. 
            A new tab has been opened for your PayPal payment. 
            If it didn't open automatically, please check your browser's popup blocker.
          </p>
          <div className="space-y-4">
            <a 
              href={`https://paypal.me/DanielWawrzynski/${total}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-white px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-blue-700 transition-colors"
            >
              Open PayPal Again
            </a>
            <Link to="/" className="block w-full border border-black text-black px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-12 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-serif mb-8">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">First Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Last Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Address</label>
                <input 
                  required
                  type="text" 
                  className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">City</label>
                  <input 
                    required
                    type="text" 
                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">ZIP Code</label>
                  <input 
                    required
                    type="text" 
                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                    value={formData.zipCode}
                    onChange={e => setFormData({...formData, zipCode: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="pt-8">
                <h2 className="text-xl font-serif mb-6">Payment</h2>
                <div className="border border-black p-4 flex items-center justify-between rounded cursor-pointer bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full border-4 border-black"></div>
                    <span className="font-bold text-sm uppercase tracking-widest">PayPal</span>
                  </div>
                  <div className="text-blue-600 font-bold italic text-xl">PayPal</div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-black text-white py-5 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors mt-8 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? 'Processing...' : `Complete Order ($${total})`}
              </button>
            </form>
          </div>

          {/* Order Summary Mini */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-serif mb-6">Your Order</h2>
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <ProductImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex items-start space-x-4">
              <CreditCard className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">Secure Checkout</h4>
                <p className="text-xs text-blue-800 leading-relaxed">Your transaction is encrypted and secured by PayPal's industry-leading protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: show a toast or redirect
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cartCount={cartCount} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
