import requests
import sys
import json
from datetime import datetime

class AetherXAPITester:
    def __init__(self):
        # Use the public backend URL from environment
        self.base_url = "https://cinematic-scroll-172.preview.emergentagent.com/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })
        
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {name}: {details}")

    def test_api_health(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Status: {response.status_code}, Message: {data.get('message', 'No message')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:100]}"
                
            self.log_test("API Health Check", success, details)
            return success, response.json() if success else {}
            
        except requests.exceptions.RequestException as e:
            self.log_test("API Health Check", False, f"Connection error: {str(e)}")
            return False, {}

    def test_newsletter_subscribe(self, email, name=None):
        """Test newsletter subscription"""
        try:
            payload = {"email": email}
            if name:
                payload["name"] = name
                
            response = requests.post(
                f"{self.base_url}/newsletter/subscribe",
                json=payload,
                timeout=10,
                headers={"Content-Type": "application/json"}
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Status: {response.status_code}, Success: {data.get('success')}, Message: {data.get('message')[:50]}..."
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:100]}"
                
            self.log_test(f"Newsletter Subscribe ({email})", success, details)
            return success, response.json() if success else {}
            
        except requests.exceptions.RequestException as e:
            self.log_test(f"Newsletter Subscribe ({email})", False, f"Connection error: {str(e)}")
            return False, {}

    def test_newsletter_duplicate(self, email):
        """Test duplicate email handling"""
        try:
            # Subscribe same email twice
            payload = {"email": email}
            
            # Second subscription should fail
            response = requests.post(
                f"{self.base_url}/newsletter/subscribe",
                json=payload,
                timeout=10,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                # Should succeed but with success=false for duplicate
                success = data.get('success') == False and 'already' in data.get('message', '').lower()
                details = f"Correctly handled duplicate: {data.get('message')[:50]}..."
            else:
                success = False
                details = f"Unexpected status: {response.status_code}"
                
            self.log_test("Newsletter Duplicate Email", success, details)
            return success
            
        except requests.exceptions.RequestException as e:
            self.log_test("Newsletter Duplicate Email", False, f"Connection error: {str(e)}")
            return False

    def test_newsletter_count(self):
        """Test newsletter subscription count endpoint"""
        try:
            response = requests.get(f"{self.base_url}/newsletter/count", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                count = data.get('count', 0)
                details = f"Status: {response.status_code}, Count: {count}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:100]}"
                
            self.log_test("Newsletter Count", success, details)
            return success, data if success else {}
            
        except requests.exceptions.RequestException as e:
            self.log_test("Newsletter Count", False, f"Connection error: {str(e)}")
            return False, {}

    def test_invalid_email(self):
        """Test invalid email validation"""
        try:
            response = requests.post(
                f"{self.base_url}/newsletter/subscribe",
                json={"email": "invalid-email"},
                timeout=10,
                headers={"Content-Type": "application/json"}
            )
            
            # Should return 422 for validation error
            success = response.status_code == 422
            details = f"Status: {response.status_code} (Expected 422 for invalid email)"
            
            self.log_test("Invalid Email Validation", success, details)
            return success
            
        except requests.exceptions.RequestException as e:
            self.log_test("Invalid Email Validation", False, f"Connection error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run complete test suite"""
        print("🚀 Starting AetherX Backend API Tests")
        print("="*50)
        
        # Test API health
        health_ok, _ = self.test_api_health()
        if not health_ok:
            print("❌ API health check failed - cannot proceed with other tests")
            return self.get_summary()
        
        # Test newsletter functionality
        test_email = f"test.user.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
        
        # Test valid subscription
        subscribe_ok, _ = self.test_newsletter_subscribe(test_email, "Test User")
        
        # Test duplicate email
        if subscribe_ok:
            self.test_newsletter_duplicate(test_email)
        
        # Test subscription count
        self.test_newsletter_count()
        
        # Test invalid email
        self.test_invalid_email()
        
        return self.get_summary()

    def get_summary(self):
        """Return test summary"""
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        
        summary = {
            "total_tests": self.tests_run,
            "passed": self.tests_passed,
            "failed": self.tests_run - self.tests_passed,
            "success_rate": f"{success_rate:.1f}%",
            "test_results": self.test_results
        }
        
        print("\n" + "="*50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed ({success_rate:.1f}%)")
        print("="*50)
        
        return summary

if __name__ == "__main__":
    tester = AetherXAPITester()
    summary = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if summary['failed'] == 0 else 1)