import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const testRegistration = async () => {
    console.log("--- Testing Registration ---");
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
            name: "Test User " + Date.now(),
            email: `test_${Date.now()}@example.com`,
            password: "password123"
        });
        console.log("✅ Registration Successful:", response.data);
        return response.data.user;
    } catch (error) {
        console.error("❌ Registration Failed:", error.response?.data || error.message);
    }
};

const testLogin = async (email) => {
    console.log("\n--- Testing Login ---");
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email: email,
            password: "password123"
        });
        console.log("✅ Login Successful:", response.data);
    } catch (error) {
        console.error("❌ Login Failed:", error.response?.data || error.message);
    }
};

const runTests = async () => {
    const user = await testRegistration();
    if (user) {
        await testLogin(user.email);
    }
};

runTests();
