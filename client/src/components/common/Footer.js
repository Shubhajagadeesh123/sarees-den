import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#f5e6d3] pt-16 pb-8 font-serif">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Branding, Links, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand and Socials */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-[#7b1e1e] mb-4 tracking-tighter uppercase">
              SAREES DEN
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Preserving the art of hand-woven elegance since 1995. Every weave tells a story of tradition and timeless beauty.
            </p>
            <div className="flex gap-4 text-gray-500">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#7b1e1e] transition-colors text-sm"
              >
                Instagram
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#7b1e1e] transition-colors text-sm"
              >
                Facebook
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#7b1e1e] transition-colors text-sm"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links Navigation */}
          <div className="grid grid-cols-2 gap-8 md:col-span-1">
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-[#7b1e1e]">All Collection</Link></li>
                <li><Link to="/" className="hover:text-[#7b1e1e]">Kanjeevaram</Link></li>
                <li><Link to="/" className="hover:text-[#7b1e1e]">Banarasi</Link></li>
                <li><Link to="/" className="hover:text-[#7b1e1e]">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-[#7b1e1e]">Our Story</Link></li>
                <li><Link to="/" className="hover:text-[#7b1e1e]">Shipping Policy</Link></li>
                <li><Link to="/" className="hover:text-[#7b1e1e]">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-[#7b1e1e]">FAQs</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-1">
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Never Miss a Sale</h4>
            <p className="text-sm text-gray-600 mb-6">
              Get exclusive promotions and product updates by signing up for our newsletter.
            </p>
            <form className="flex border-b border-black pb-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent w-full outline-none text-sm font-sans"
                required
              />
              <button type="submit" className="text-sm font-bold uppercase tracking-widest hover:text-[#7b1e1e] transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} SAREES DEN. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-gray-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-black">Terms of Service</Link>
            <Link to="/" className="hover:text-black">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;