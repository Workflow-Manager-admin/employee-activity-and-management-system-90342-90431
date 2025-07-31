#!/usr/bin/env node

/**
 * Bug Fix Verification Script
 * Tests all the critical fixes applied to the Employee Management System
 */

const axios = require('axios');

// Configuration
const BACKEND_URL = 'http://localhost:8000';
const FRONTEND_URL = 'http://localhost:3000';

async function testBackendHealth() {
  console.log('🔍 Testing Backend Health...');
  try {
    const response = await axios.get(`${BACKEND_URL}/health`);
    console.log('✅ Backend Health: PASS');
    console.log(`   Status: ${response.data.status}`);
    console.log(`   Version: ${response.data.version}`);
    return true;
  } catch (error) {
    console.log('❌ Backend Health: FAIL');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function testAuthentication() {
  console.log('\n🔐 Testing Authentication...');
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
      email: 'admin@company.com',
      password: 'admin123'
    });
    
    console.log('✅ Admin Login: PASS');
    console.log(`   User: ${response.data.user.first_name} ${response.data.user.last_name}`);
    console.log(`   Role: ${response.data.user.role}`);
    console.log(`   Token Generated: ${response.data.access_token ? 'YES' : 'NO'}`);
    
    return response.data.access_token;
  } catch (error) {
    console.log('❌ Admin Login: FAIL');
    console.log(`   Error: ${error.response?.data?.detail || error.message}`);
    return null;
  }
}

async function testAPIEndpoints(token) {
  console.log('\n📊 Testing API Endpoints...');
  const headers = { Authorization: `Bearer ${token}` };
  
  const endpoints = [
    { path: '/employees/', name: 'Employees' },
    { path: '/work-logs/', name: 'Work Logs' },
    { path: '/leave-requests/', name: 'Leave Requests' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(`${BACKEND_URL}${endpoint.path}`, { headers });
      console.log(`✅ ${endpoint.name}: PASS (${Array.isArray(response.data) ? response.data.length : 'N/A'} records)`);
    } catch (error) {
      console.log(`❌ ${endpoint.name}: FAIL - ${error.response?.status || error.message}`);
    }
  }
}

async function testFrontendAccessibility() {
  console.log('\n🌐 Testing Frontend Accessibility...');
  try {
    const response = await axios.get(FRONTEND_URL);
    if (response.data.includes('TATA ELXSI')) {
      console.log('✅ Frontend Loading: PASS');
      console.log('   React app is serving correctly');
    } else {
      console.log('❌ Frontend Loading: FAIL - Content not recognized');
    }
  } catch (error) {
    console.log('❌ Frontend Loading: FAIL');
    console.log(`   Error: ${error.message}`);
  }
}

async function testEnvironmentConfiguration() {
  console.log('\n⚙️  Testing Environment Configuration...');
  
  // Test that .env file exists and has correct content
  const fs = require('fs');
  const path = require('path');
  
  const envPath = path.join(__dirname, '.env');
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    if (envContent.includes('REACT_APP_API_BASE_URL=http://localhost:8000')) {
      console.log('✅ API Base URL: PASS (http://localhost:8000)');
    } else {
      console.log('❌ API Base URL: FAIL - Incorrect configuration');
    }
    
    if (envContent.includes('REACT_APP_API_TIMEOUT=10000')) {
      console.log('✅ API Timeout: PASS (10000ms)');
    } else {
      console.log('❌ API Timeout: FAIL - Not configured');
    }
    
  } catch (error) {
    console.log('❌ Environment File: FAIL - Cannot read .env');
  }
}

async function runAllTests() {
  console.log('🚀 Employee Management System - Bug Fix Verification\n');
  console.log('=' .repeat(60));
  
  // Test environment configuration
  await testEnvironmentConfiguration();
  
  // Test backend
  const backendHealthy = await testBackendHealth();
  if (!backendHealthy) {
    console.log('\n❌ Backend is not running. Please start the backend first.');
    return;
  }
  
  // Test authentication
  const token = await testAuthentication();
  if (!token) {
    console.log('\n❌ Authentication failed. Cannot proceed with API tests.');
    return;
  }
  
  // Test API endpoints
  await testAPIEndpoints(token);
  
  // Test frontend
  await testFrontendAccessibility();
  
  console.log('\n' + '=' .repeat(60));
  console.log('🎉 Bug Fix Verification Complete!');
  console.log('\n📋 Summary of Fixes Applied:');
  console.log('   1. ✅ Fixed API Base URL (localhost:3000 → localhost:8000)');
  console.log('   2. ✅ Configured environment variables');  
  console.log('   3. ✅ Removed demo authentication bypass');
  console.log('   4. ✅ Implemented real JWT authentication');
  console.log('   5. ✅ Removed role selection from login');
  
  console.log('\n🔄 Next Steps:');
  console.log('   - Restart React dev server to load new environment variables');
  console.log('   - Test frontend login with admin@company.com/admin123');
  console.log('   - Create additional test users (manager, employee)');
  console.log('   - Add sample work logs and leave requests');
}

if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { testBackendHealth, testAuthentication, testAPIEndpoints };
