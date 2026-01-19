import React, { useState } from 'react'
import './App.css'
import profileImg from './assets/profile.jpg'
import undergroundImg from './assets/underground_honey.png'
import fakeEmperorImg from './assets/fake_emperor_honey.png'
import liarFarmerImg from './assets/liar_farmer_honey.png'
import prematureImg from './assets/premature_honey.png'
import escapedBeeImg from './assets/escaped_bee_honey.png'
import digitalGrasshopperImg from './assets/digital_grasshopper_honey.png'
import manukaImg from './assets/manuka.png'
import wildflowerImg from './assets/wildflower.png'
import orangeBlossomImg from './assets/orange_blossom.png'
import lavenderImg from './assets/lavender.png'
import eucalyptusImg from './assets/eucalyptus.png'
import heroImg from './assets/hero.png'

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState('home'); // 'home' or 'checkout' or 'success'
  const [orderInfo, setOrderInfo] = useState({ name: '', address: '', payment: 'Cash on Delivery' });
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    { id: 1, author: "আন্ডারগ্রাউন্ডের যাত্রী", stars: 5, text: "এই মধু খাওয়ার পর থেকে আমি শুধু মাটির নিচেই থাকতে চাই! মাটির উপরের বাতাস এখন আর সহ্য হয় না।" },
    { id: 2, author: "বিখ্যাত ফাঁকিবাজ", stars: 5, text: "১০৪% ভেজাল হওয়ার এমন নিশ্চয়তা আগে কখনো পাইনি, জাস্ট অসাধারণ! ফাঁকিবাজির এক নতুন দিগন্ত খুলে গেল।" },
    { id: 3, author: "মধুর যম", stars: 5, text: "নামে মধু হলেও আসলে অমৃত! খাওয়ার পর মনে হলো আমি পৃথিবীর মায়া কাটিয়ে অন্য জগতে চলে গেছি।" },
    { id: 4, author: "সত্যবাদী মিথ্যুক", stars: 5, text: "১০০% খাঁটি নকল হওয়ার চ্যালেঞ্জ টা আমি গ্রহণ করেছিলাম এবং আমি জয়ী! ফাঁকে ফাঁকে ফাঁকা আওয়াজ শুনতে পাচ্ছি।" }
  ];

  React.useEffect(() => {
    if (view === 'home') {
      const interval = setInterval(() => {
        setActiveReview(prev => (prev + 1) % reviews.length);
      }, 5000);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.reviews-section, .review-card').forEach(el => observer.observe(el));

      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    } else if (view === 'checkout') {
      // Smoothly scroll to the top of the checkout section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view, reviews.length]);

  // Dynamic Circular Favicon Effect
  React.useEffect(() => {
    const setCircularFavicon = () => {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/png';
      link.rel = 'icon';

      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = '/favicon.jpg'; // Load the original square image

      img.onload = () => {
        // Create circle clipping path
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        // Draw image
        ctx.drawImage(img, 0, 0, 64, 64);
        // Update favicon link
        link.href = canvas.toDataURL();
        document.getElementsByTagName('head')[0].appendChild(link);
      };
    };

    setCircularFavicon();
  }, []);

  const scrollToShop = (e) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const shopSection = document.getElementById('shop');
        shopSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      e.preventDefault();
      const shopSection = document.getElementById('shop');
      shopSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const products = [
    { id: 1, name: "মাটির নিচের মধু", price: 15500, description: "এটি খেলে সরাসরি আন্ডারগ্রাউন্ডের টিকিট কনফার্ম।", image: undergroundImg },
    { id: 2, name: "ভেজাল সম্রাট স্পেশাল", price: 12800, description: "১০০% গ্যারান্টিসহ এতে ১% মধুও নেই।", image: fakeEmperorImg },
    { id: 3, name: "মিথ্যুক চাষীর মধু", price: 13200, description: "চাষী শপথ করে বলেছে এটি খাঁটি, তাই বিশ্বাস করবেন না।", image: liarFarmerImg },
    { id: 4, name: "অকাল পক্ব মধু", price: 11500, description: "কাঁচা বয়সেই পেকে লাল হয়ে গেছে।", image: prematureImg },
    { id: 5, name: "পলাতক মৌমাছির মধু", price: 14000, description: "মৌমাছি কামড় দিয়ে পালিয়ে যাওয়ার পর সংগৃহীত।", image: escapedBeeImg },
    { id: 6, name: "ডিজিটাল ফড়িং মধু", price: 10500, description: "সফটওয়্যার দিয়ে তৈরি লিকুইড গোল্ড।", image: digitalGrasshopperImg },
    { id: 7, name: "অন্ধকার রাতের মধু", price: 16000, description: "দিনের আলোতে এটি দেখা যায় না।", image: manukaImg },
    { id: 8, name: "চায়না ফেরত মধু", price: 12500, description: "once খেলে চাইনিজ ভাষা বলতে শুরু করবেন।", image: wildflowerImg },
    { id: 9, name: "বন্য গাধার মধু", price: 11200, description: "যারা বিশ্বাস করে কিনবে তাদের জন্য উৎসর্গ।", image: orangeBlossomImg },
    { id: 10, name: "মহাকাশ ভ্রমণ মধু", price: 18000, description: "খেলে পৃথিবী থেকে উধাও হয়ে যাবেন।", image: lavenderImg },
    { id: 11, name: "পকেট খালি মধু", price: 20000, description: "দাম শুনেই আপনার পকেট হালকা হয়ে যাবে।", image: eucalyptusImg },
    { id: 12, name: "জাদুর কাঠি মধু", price: 14500, description: "আজ খাবেন, কাল আর নিজেকে খুঁজে পাবেন না।", image: heroImg },
    { id: 13, name: "কচ্ছপ গতির মধু", price: 10800, description: "হজম হতে সময় লাগবে মাত্র ১০ বছর।", image: manukaImg },
    { id: 14, name: "ভুতুড়ে মধু", price: 13700, description: "রাতে খাওয়ার সময় পাশে কেউ একজন দাঁড়িয়ে থাকবে।", image: wildflowerImg },
    { id: 15, name: "শেষ বিদায় মধু", price: 19500, description: "আপনার জীবনের শেষ মধু হতে পারে এটি।", image: orangeBlossomImg }
  ];

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount) + '৳';
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setView('success');
    setCart([]);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand-lockup" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          <div className="logo">GOLDEN HARVEST</div>
          <div className="owner-name">Ali Mortaza Sikdar</div>
        </div>
        <ul className="nav-links">
          <li><a href="#home" onClick={() => setView('home')}>Home</a></li>
          <li><a href="#shop" onClick={scrollToShop}>Shop</a></li>
          <li><a href="#reviews" onClick={() => setView('home')}>Reviews</a></li>
        </ul>
        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            Cart
            {cart.length > 0 && (
              <span className="cart-badge">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
            )}
          </button>
          <button onClick={scrollToShop} className="btn-primary" style={{ padding: '0.6rem 1.5rem', marginLeft: '1rem' }}>Shop Now</button>
        </div>
      </nav>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Collection</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? <p className="empty-msg">Your cart is as empty as a winter hive.</p> : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{formatPrice(item.price)}</p>
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="total">
                  <span>Total:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <button className="btn-primary checkout-btn" onClick={() => { setView('checkout'); setIsCartOpen(false); }}>Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'home' && (
        <>
          <header id="home" className="hero">
            <div className="bees-container">
              <div className="bee bee-1">🐝</div>
              <div className="bee bee-2">🐝</div>
              <div className="bee bee-3">🐝</div>
            </div>
            <h1>fake's Liquid Gold</h1>
            <p>খাঁটি জিনিসের দিন শেষ, নকল দিয়েই হোক বাংলাদেশ! আমরা দিচ্ছি চায়নার তৈরি ১০০% অরিজিনাল খাঁটি নকল মধু।</p>
          </header>

          <section className="warning-container">
            <div className="special-warning">
              <p className="warning-text">আলী মোর্তাজা সিকদারের মধু খেলে পাচ্ছেন দ্রুত সময়ে আন্ডারগ্রাউন্ডে যাওয়ার ১৯৮% নিশ্চয়তা।</p>
            </div>
          </section>

          <section id="shop" className="products">
            <h2 className="section-title">Our Premium Selection</h2>
            <div className="product-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <span className="price">{formatPrice(product.price)}</span>
                  <p>{product.description}</p>
                  <button className="btn-secondary add-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </section>

          <section id="reviews" className="reviews-section">
            <h2 className="section-title">What Our Collectors Say</h2>
            <div className="reviews-slider">
              <div className="review-card revealed">
                <div className="stars">{"★".repeat(reviews[activeReview].stars)}</div>
                <p className="review-text">"{reviews[activeReview].text}"</p>
                <p className="review-author">— {reviews[activeReview].author}</p>
              </div>
              <div className="slider-dots">
                {reviews.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === activeReview ? 'active' : ''}`}
                    onClick={() => setActiveReview(index)}
                  ></span>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {view === 'checkout' && (
        <section className="checkout-page">
          <div className="checkout-container">
            <h2>Complete Your Harvest</h2>
            <div className="checkout-grid">
              <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                <h3>Shipping Details</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required value={orderInfo.name} onChange={e => setOrderInfo({ ...orderInfo, name: e.target.value })} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Shipping Address</label>
                  <textarea required value={orderInfo.address} onChange={e => setOrderInfo({ ...orderInfo, address: e.target.value })} placeholder="Street, City, Postal Code" />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select value={orderInfo.payment} readOnly>
                    <option>Cash on Delivery</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary place-order-btn">Place Order ({formatPrice(cartTotal)})</button>
                <button type="button" className="btn-text" onClick={() => setView('home')}>Back to Shop</button>
              </form>
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {cart.map(item => (
                    <div key={item.id} className="summary-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-total">
                  <span>Grand Total:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {view === 'success' && (
        <section className="success-page">
          <div className="success-content">
            <div className="success-icon">🍯</div>
            <h2>Order Recieved!</h2>
            <p>Thank you, {orderInfo.name}. Your liquid gold is being prepared for shipment to {orderInfo.address}. We'll notify you when the bees are on their way!</p>
            <button className="btn-primary" onClick={() => setView('home')}>Continue Shopping</button>
          </div>
        </section>
      )}

      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-logo">GOLDEN HARVEST</div>
          <p>Pure. Raw. Sustainable.</p>
          <div className="social-icons-footer">
            <a href="https://www.facebook.com/ali.mortaza.sikdar" target="_blank" rel="noopener noreferrer" className="social-icon-link facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://www.instagram.com/ali.mortaza.sikdar/" target="_blank" rel="noopener noreferrer" className="social-icon-link instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.56-.483.96-.902 1.382-.419.419-.824.679-1.38.896-.419.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.061-1.805-.256-2.227-.421-.56-.224-.96-.483-1.382-.902-.419-.419-.679-.824-.896-1.38-.164-.419-.36-1.056-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.016-3.585.071-4.85c.055-1.17.249-1.805.415-2.227.217-.56.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0 3.678c-3.405 0-6.162 2.757-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.645-1.44-1.44 0-.794.645-1.439 1.44-1.439.794 0 1.44.645 1.44 1.439z" /></svg>
            </a>
            <a href="https://wa.me/8801888259271" target="_blank" rel="noopener noreferrer" className="social-icon-link whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
          </div>
        </div>
        <p className="copyright">&copy; 2026 Golden Harvest Honey Co. All rights reserved.</p>
        <div className="creator-info">
          <img src={profileImg} alt="Ali Mortaza Sikdar" className="creator-photo" />
          <p className="creator-credit">Created by Ali Mortaza Sikdar</p>
        </div>
      </footer>
      <a href="https://wa.me/8801888259271" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <span className="whatsapp-icon">💬</span>
      </a>
    </div>
  )
}

export default App
