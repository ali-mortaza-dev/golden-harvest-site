import React, { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
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
  const [orderInfo, setOrderInfo] = useState({ name: '', phone: '', address: '', payment: 'Cash on Delivery' });
  const [lastOrderItems, setLastOrderItems] = useState([]);
  const [activeReview, setActiveReview] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'সালাম ভাই! 🍯 আমি আপনার মধু মামা। একদম খাঁটি (নকল) মধুর খবর জানতে চান নাকি? 😂 আড্ডা দিন প্রাণ খুলে! 🚀' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [userName, setUserName] = useState('');
  const rocketSound = useRef(null);

  useEffect(() => {
    rocketSound.current = new Audio('https://cdn.pixabay.com/audio/2025/02/26/audio_febae8992b.mp3');
    rocketSound.current.preload = 'auto';
  }, []);

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
    { id: 8, name: "চায়না ফেরত মধু", price: 12500, description: " খেলে চাইনিজ ভাষা বলতে শুরু করবেন।", image: wildflowerImg },
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

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      orderInfo,
      items: cart,
      totalAmount: cartTotal
    };

    // Record order in backend
    try {
      fetch('/api/record-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch (err) {
      console.error("Failed to record order:", err);
    }

    setLastOrderItems([...cart]);
    setView('success');
    setCart([]);
  };

  const sendTelegramNotification = async () => {
    console.log("Telegram: Starting notification process...");

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8577666021:AAHO1vN5Je8CHC9aDgy5NtbfxxOgAh6ehzU';
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '6378979397';

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Telegram: Bot Token or Chat ID missing!");
      return;
    }

    const itemsSummary = lastOrderItems.length > 0
      ? lastOrderItems.map(item => `• ${item.name} x ${item.quantity}`).join('\n')
      : "No items listed";

    const totalAmount = lastOrderItems.reduce((t, i) => t + (i.price * i.quantity), 0);
    const total = new Intl.NumberFormat('en-IN').format(totalAmount) + '৳';

    const message = `<b>🚀 MISSILE LOADED &amp; READY! 🚀</b>\n\n` +
      `<b>👤 Customer:</b> ${orderInfo.name || 'Anonymous'}\n` +
      `<b>📞 Phone:</b> ${orderInfo.phone || 'Not provided'}\n` +
      `<b>📍 Address:</b> ${orderInfo.address || 'No address'}\n\n` +
      `<b>📦 Items:</b>\n${itemsSummary}\n\n` +
      `<b>💰 Total:</b> ${total}\n` +
      `<b>💳 Payment:</b> ${orderInfo.payment}\n\n` +
      `<b>🕹️ Target:</b> BEDROOM BED 🛌`;

    console.log("Telegram: Sending request to API...");
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Telegram: Notification sent successfully!", data);
      } else {
        console.error("Telegram: API returned an error:", data);
      }
    } catch (error) {
      console.error("Telegram: Network or unexpected error:", error);
    }
  };

  const handleFire = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Haptic Feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 200]);
    }

    // Play Rocket Sound
    if (rocketSound.current) {
      rocketSound.current.currentTime = 0;
      rocketSound.current.play().catch(e => console.log("Audio play failed:", e));
    }

    // Send Telegram Notification
    sendTelegramNotification();
  };

  const CHAT_LOGIC = {
    greetings: [
      "ওয়ালাইকুম আসসালাম ভাই! 🍯 মধু মামা আপনার সেবায় হাজির। এক কাপ মধুর চা হবে নাকি? 😂",
      "সালাম! 🐝 কি খবর ভাই? মধু মামার ডিজিটাল ঘরে আপনার স্বাগতম। 😎",
      "হেলো হেলো! 🚀 মধু মামা একদম রেডি। কিছু কি অর্ডার করবেন না শুধু গল্প? 💥"
    ],
    privacy: [
      "আপনার তথ্য আমাদের সুরক্ষিত ডাটাবেসে জমা হচ্ছে যাতে আমরা আপনার রকেটটি সঠিক ঠিকানায় পাঠাতে পারি! 🍯 (ভয়ের কিছু নেই, আমরা দয়ালু চোর!)",
      "ভাই, তথ্য সব আমাদের সিন্দুক আর ডাটাবেসে সাবধানে আছে। রকেট ডেলিভারি দিতে তো ঠিকানা লাগবেই! 🚀😂",
      "আপনার সিক্রেট তথ্য সিকদার এআই-এর ডিজিটাল পেটে হজম হয়ে যাচ্ছে, যাতে সার্ভিস বেস্ট হয়! 🍯💥"
    ],
    ordering: [
      "ভাই, অর্ডার বাটনে চাপ দিলে ফোনটা একটু কাঁপবে আর রকেটের আওয়াজ হবে—বাস এইটুকুই! 🚀 কোনো রিস্ক নেই, কারণ এটা একটা ফান প্রজেক্ট। 💥",
      "মধু অর্ডার করা মানেই জীবনের ঝুঁকি নেওয়া... সরি, জীবনের স্বাদ পরিবর্তন করা! 😂 জাস্ট অর্ডার করে দেখুন! 😎",
      "আরে ভাই, অর্ডার করতে ভয় কিসের? সিকদার ভাই আছে না? 🍯 রকেটের গতিতে মধু যাবে (মনে মনে)! 🚀💥"
    ],
    quality: [
      "আমাদের মধু এতটাই খাঁটি যে মৌমাছিও নিজের চাক চিনে আসতে পারে না! 😂🍯",
      "১০০% খাঁটি নকল হওয়ার চ্যালেঞ্জ টা আমি গ্রহণ করেছি। 🐝 খাঁটি জিনিস তো বাজারে অনেক আছে, আমাদেরটা স্পেশাল! 😎",
      "এই মধু খেয়ে যদি আপনার পাখা না গজায়, তবে বুঝবেন মধুটা ১% কম ভেজাল ছিল! 🚀😂"
    ],
    jokes: [
      "মৌমাছি কেন চশমা পরে? কারণ তারা 'বি' (Bee) দেখে! 😂🍯",
      "সিকদার ভাইয়ের মধু খেলে রাগ কমে যায়, কারণ দাঁত সব মধুতে আটকে যায়! 😋💥",
      "একদিন এক মৌমাছি সিকদার ভাইকে বলল, 'ভাই আপনার মধু তো আমার চেয়েও বেশি মিষ্টি!' সিকদার ভাই বলল, 'হবে না? আমি তো চিনি মেশাতে ভুলি না!' 😂🍯🚀"
    ],
    default: [
      "হাহাহা! 🍯 আপনার কথা শুনে মধু মামার ডিজিটাল কলিজা জুড়িয়ে গেল। 😂 সাথে থাকুন, আরও মজা হবে! 🚀",
      "উফ! ভাই আপনি তো হেব্বি রসিক মানুষ। 😂 মধু মামার মতো মিষ্টি কথাবার্তা! 🍯",
      "হুমমম... আপনার কথা শুনে মৌমাছিরাও কনফিউজ হয়ে গেছে! 🐝 কিন্তু মধু মামা সবসময় রেডি! 😎💥",
      "ভাই, আপনি তো ডিজিটাল দুনিয়ার রকেট! 🚀 মধু মামার পক্ষ থেকে এক ডালি শুভেচ্ছা। 😂"
    ]
  };

  const SECRET_OFFERS = [
    "১ কেজি মধুর সাথে একটি কাল্পনিক রকেট ফ্রি! 🚀 জাস্ট অর্ডার বাটনে ক্লিক করে ম্যাজিকটা দেখুন!",
    "আজকের স্পেশাল: মধু কিনলেই আপনার ফোনের স্ক্রিন দিয়ে মধুর সুঘ্রাণ বের হবে! 👃🍯 ট্রাই করে দেখুন!",
    "অফার অফার! মধু কিনলে সিকদার ভাইয়ের পক্ষ থেকে একটা ভার্চুয়াল কোলাকুলি একদম ফ্রি! 🤗😂",
    "১০ কেজি মধু অর্ডার করলে সরাসরি মঙ্গলে যাওয়ার টিকিট পাওয়ার সম্ভাবনা ১০,০০০% কমে যাবে! 🛸💥",
    "মধু কিনলে পাবেন ১০০ বছর পর্যন্ত মিষ্টি কথা শোনার অদৃশ্য গ্যারান্টি কার্ড! 📜✨",
    "আমাদের মধু খেলে আপনি আয়নায় নিজেকে মৌমাছির মতো সুন্দর দেখতে পাবেন! 🐝😎"
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');

    // Local Logic Engine
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let response = "";

      // Context: Name Discovery
      if (lower.includes("আমার নাম") || lower.includes("i am") || lower.includes("im ")) {
        const parts = lower.split(/নাম|am|im/i);
        if (parts.length > 1) {
          const name = parts[1].trim();
          setUserName(name);
          response = `${name} ভাই! 🍯 দারুন নাম তো আপনার। একদম মধু মামার পছন্দের নাম! 😂 কি সেবা করতে পারি? 🚀`;
        }
      }

      if (!response) {
        let category = "default";
        if (lower.includes("তথ্য") || lower.includes("জমা") || lower.includes("কোথায়") || lower.includes("privacy")) {
          category = "privacy";
        } else if (lower.includes("অর্ডার") || lower.includes("কিভাবে") || lower.includes("order")) {
          category = "ordering";
        } else if (lower.includes("সালাম") || lower.includes("হ্যালো") || lower.includes("hi") || lower.includes("hello") || lower.includes("assalam")) {
          category = "greetings";
        } else if (lower.includes("মধু") || lower.includes("খাঁটি") || lower.includes("quality") || lower.includes("honey")) {
          category = "quality";
        } else if (lower.includes("মজা") || lower.includes("জোকস") || lower.includes("joke") || lower.includes("funny")) {
          category = "jokes";
        }

        const pool = CHAT_LOGIC[category];
        const randomIdx = Math.floor(Math.random() * pool.length);
        response = pool[randomIdx];

        // Add context if name is known
        if (userName && Math.random() > 0.5) {
          response = `${userName} ভাই, মধু মামা বলছি, ` + response;
        }
      }

      setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 600);
  };

  const handleSecretOffer = () => {
    const randomIdx = Math.floor(Math.random() * SECRET_OFFERS.length);
    const offer = SECRET_OFFERS[randomIdx];
    setChatMessages(prev => [...prev, { role: 'ai', text: offer }]);
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
            <h1>Fake's Liquid Gold</h1>
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
                  <label>Phone Number</label>
                  <input type="tel" required value={orderInfo.phone} onChange={e => setOrderInfo({ ...orderInfo, phone: e.target.value })} placeholder="018XXXXXXXX" />
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
            <p>ধন্যবাদ {orderInfo.name}, "অপেক্ষা করুন! আপনার ভেজাল মধু এখন সরাসরি মিসাইলে লোড করা হয়েছে 🚀। জাস্ট 'ফায়ার' 🕹️বাটনে চাপ দিলেই রকেটের গতিতে সরাসরি আপনার বেডরুমের খাটে ল্যান্ড করবে।"</p>
            <button className="btn-fire" onClick={handleFire}>FIRE 🕹️</button>
            <div style={{ marginTop: '2rem' }}>
              <button className="btn-primary" onClick={() => setView('home')}>Continue Shopping</button>
            </div>
          </div>
        </section>
      )}

      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-logo">GOLDEN HARVEST</div>
          <p>কমদামি পণ্য বেশি দামে পাওয়ার একমাত্র অবিশ্বস্ত প্ল্যাটফর্ম।</p>
          <div className="social-icons-footer">
            <a href="https://www.facebook.com/ali.mortaza.sikdar" target="_blank" rel="noopener noreferrer" className="social-icon-link facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://www.instagram.com/ali.mortaza.sikdar/" target="_blank" rel="noopener noreferrer" className="social-icon-link instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.56-.483.96-.902 1.382-.419.419-.824.679-1.38.896-.419.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.061-1.805-.256-2.227-.421-.56-.224-.96-.483-1.382-.902-.419-.419-.679-.824-.896-1.38-.164-.419-.36-1.056-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.016-3.585.071-4.85c.055-1.17.249-1.805.415-2.227.217-.56.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0 3.678c-3.405 0-6.162 2.757-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.645-1.44-1.44 0-.794.645-1.439 1.44-1.439.794 0 1.44.645 1.44 1.439z" /></svg>
            </a>
          </div>
        </div>
        <p className="copyright">&copy; 2026 Golden Harvest Honey Co. All rights reserved.</p>
        <div className="creator-info">
          <img src={profileImg} alt="Ali Mortaza Sikdar" className="creator-photo" />
          <p className="creator-credit">Created by Ali Mortaza Sikdar</p>
        </div>
      </footer>

      {/* AI Chatbot */}
      <div className={`ai-chat-container ${isChatOpen ? 'open' : ''}`}>
        <button className="ai-chat-float" onClick={() => setIsChatOpen(!isChatOpen)}>
          <div className="ai-tooltip">মধু মামার সাথে চ্যাট করুন</div>
          <svg viewBox="0 0 100 100" className="premium-logo">
            <defs>
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#F4D03F', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#B87333', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#gold-grad)" stroke="#2c1e12" strokeWidth="2" />
            <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" fill="#2c1e12" />
            <text x="50" y="85" textAnchor="middle" fill="#2c1e12" fontSize="12" fontWeight="900" fontFamily="Outfit">MADHU MAMA</text>
          </svg>
        </button>

        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-avatar">🍯</div>
              <div className="chat-title">
                <h4>Madhu Mama AI</h4>
                <span>Online & Sweet</span>
              </div>
              <button className="close-chat" onClick={() => setIsChatOpen(false)}>&times;</button>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  <div className="message-bubble">{msg.text}</div>
                </div>
              ))}
              <div className="special-offer-area">
                <button className="btn-secret-offer" onClick={handleSecretOffer}>گোপন অফার দেখুন 🎁</button>
              </div>
            </div>
            <form className="chat-input-area" onSubmit={handleChatSubmit}>
              <input
                type="text"
                placeholder="আপনার বার্তা লিখুন..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit">✈️</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
