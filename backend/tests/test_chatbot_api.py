"""
Test suite for AetherX Chatbot API endpoints
Tests: POST /api/chat, GET /api/chat/history/{session_id}, DELETE /api/chat/history/{session_id}
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestChatbotAPI:
    """Chatbot API endpoint tests"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test session ID"""
        self.test_session_id = f"TEST_session_{uuid.uuid4().hex[:12]}"
        yield
        # Cleanup: delete test chat history
        try:
            requests.delete(f"{BASE_URL}/api/chat/history/{self.test_session_id}")
        except:
            pass
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "AetherX" in data["message"]
        print(f"API root message: {data['message']}")
    
    def test_chat_endpoint_sends_message(self):
        """Test POST /api/chat - sending a message and getting AI response"""
        payload = {
            "session_id": self.test_session_id,
            "message": "Hello, what is AetherX?"
        }
        response = requests.post(f"{BASE_URL}/api/chat", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "response" in data, "Response should contain 'response' field"
        assert "session_id" in data, "Response should contain 'session_id' field"
        assert data["session_id"] == self.test_session_id
        assert len(data["response"]) > 0, "Response should not be empty"
        print(f"AI Response received: {data['response'][:100]}...")
    
    def test_chat_endpoint_invalid_payload(self):
        """Test POST /api/chat with missing fields"""
        # Missing message
        response = requests.post(f"{BASE_URL}/api/chat", json={"session_id": "test"})
        assert response.status_code == 422, "Should return 422 for missing message"
        
        # Missing session_id
        response = requests.post(f"{BASE_URL}/api/chat", json={"message": "hello"})
        assert response.status_code == 422, "Should return 422 for missing session_id"
    
    def test_chat_history_get(self):
        """Test GET /api/chat/history/{session_id} - retrieving chat history"""
        # First send a message
        payload = {
            "session_id": self.test_session_id,
            "message": "Test message for history"
        }
        requests.post(f"{BASE_URL}/api/chat", json=payload)
        
        # Then get history
        response = requests.get(f"{BASE_URL}/api/chat/history/{self.test_session_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert "history" in data
        assert "session_id" in data
        assert data["session_id"] == self.test_session_id
        
        # Should have at least 2 messages (user + assistant)
        assert len(data["history"]) >= 2, f"Expected at least 2 messages, got {len(data['history'])}"
        print(f"History has {len(data['history'])} messages")
    
    def test_chat_history_empty_session(self):
        """Test GET history for non-existent session"""
        response = requests.get(f"{BASE_URL}/api/chat/history/nonexistent_session_123")
        assert response.status_code == 200
        data = response.json()
        assert data["history"] == [] or len(data["history"]) == 0
    
    def test_chat_history_delete(self):
        """Test DELETE /api/chat/history/{session_id} - clearing chat history"""
        # First send a message
        payload = {
            "session_id": self.test_session_id,
            "message": "Test message to delete"
        }
        requests.post(f"{BASE_URL}/api/chat", json=payload)
        
        # Delete history
        response = requests.delete(f"{BASE_URL}/api/chat/history/{self.test_session_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert "deleted" in data
        assert "session_id" in data
        print(f"Deleted {data['deleted']} messages")
        
        # Verify history is empty
        verify_response = requests.get(f"{BASE_URL}/api/chat/history/{self.test_session_id}")
        verify_data = verify_response.json()
        assert len(verify_data["history"]) == 0, "History should be empty after delete"
    
    def test_chat_conversation_context(self):
        """Test that chat maintains conversation context"""
        session = f"TEST_context_{uuid.uuid4().hex[:8]}"
        
        try:
            # First message
            requests.post(f"{BASE_URL}/api/chat", json={
                "session_id": session,
                "message": "My name is TestUser"
            })
            
            # Second message asking about previous context
            response = requests.post(f"{BASE_URL}/api/chat", json={
                "session_id": session,
                "message": "What features does AetherX offer?"
            })
            
            assert response.status_code == 200
            data = response.json()
            assert len(data["response"]) > 0
            print("Context test passed - got response")
        finally:
            # Cleanup
            requests.delete(f"{BASE_URL}/api/chat/history/{session}")


class TestNewsletterAPI:
    """Newsletter subscription API tests"""
    
    def test_newsletter_subscribe_new_email(self):
        """Test subscribing with a new email"""
        test_email = f"TEST_user_{uuid.uuid4().hex[:8]}@example.com"
        
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": test_email,
            "name": "Test User"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "id" in data
        print(f"Subscribed: {test_email}")
    
    def test_newsletter_subscribe_invalid_email(self):
        """Test subscribing with invalid email format"""
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": "not-an-email",
            "name": "Test"
        })
        
        assert response.status_code == 422, "Should return 422 for invalid email"
    
    def test_newsletter_count(self):
        """Test getting subscriber count"""
        response = requests.get(f"{BASE_URL}/api/newsletter/count")
        
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        print(f"Current subscriber count: {data['count']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
