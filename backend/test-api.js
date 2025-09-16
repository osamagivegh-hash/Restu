const axios = require('axios');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Test meals endpoint
    console.log('\n2. Testing meals endpoint...');
    const mealsResponse = await axios.get(`${BASE_URL}/api/meals`);
    console.log('✅ Meals response:', {
      success: mealsResponse.data.success,
      count: mealsResponse.data.data?.meals?.length || 0,
      total: mealsResponse.data.data?.total || 0
    });

    // Test ads endpoint
    console.log('\n3. Testing ads endpoint...');
    const adsResponse = await axios.get(`${BASE_URL}/api/ads/active`);
    console.log('✅ Ads response:', {
      success: adsResponse.data.success,
      count: adsResponse.data.data?.length || 0
    });

    // Test admin ads endpoint
    console.log('\n4. Testing admin ads endpoint...');
    const adminAdsResponse = await axios.get(`${BASE_URL}/api/ads/admin`);
    console.log('✅ Admin ads response:', {
      success: adminAdsResponse.data.success,
      count: adminAdsResponse.data.data?.ads?.length || 0
    });

    console.log('\n🎉 All API tests passed!');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

testAPI();
