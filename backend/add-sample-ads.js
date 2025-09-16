const mongoose = require('mongoose');
const Ad = require('./models/Ad');
require('dotenv').config();

const sampleAds = [
  {
    title: "عرض خاص - خصم 20%",
    description: "احصل على خصم 20% على جميع الوجبات الرئيسية",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "https://example.com/special-offer",
    position: "hero",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  {
    title: "قائمة الطعام الجديدة",
    description: "اكتشف أطباقنا الجديدة المميزة",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    position: "menu",
    isActive: true,
    startDate: new Date()
  },
  {
    title: "توصيل مجاني",
    description: "توصيل مجاني للطلبات أكثر من 100 ريال",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    position: "footer",
    isActive: true,
    startDate: new Date()
  }
];

async function addSampleAds() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oriental-restaurant');
    console.log('Connected to MongoDB');

    // Clear existing ads
    await Ad.deleteMany({});
    console.log('Cleared existing ads');

    // Add sample ads
    const ads = await Ad.insertMany(sampleAds);
    console.log(`Added ${ads.length} sample ads`);

    // Display the added ads
    ads.forEach((ad, index) => {
      console.log(`${index + 1}. ${ad.title} (${ad.position})`);
    });

    console.log('\n✅ Sample ads added successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error adding sample ads:', error);
    process.exit(1);
  }
}

addSampleAds();
