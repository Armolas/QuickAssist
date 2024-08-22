import unittest
from flask import Flask, json
from flask_jwt_extended import create_access_token
from app import create_app, db
from app.models.user import User
from app.models.provider import Provider
from app.models.booking import Booking
from app.models.service import Service
from datetime import datetime

class BookingTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()

        # Create all tables
        db.create_all()

        # Create a test user and service
        self.user = User(
            firstName='Test',
            lastName='User',
            email='testuser@example.com',
            address='Test Address',
            phoneNumber='1234567890',
            password='password'
        )
        self.provider = Provider(
            firstName='Test',
            lastName='Provider',
            email='testprovider@example.com',
            address='Provider Address',
            phoneNumber='0987654321',
            gender='Female',
            age=23,
            skills=[],
            about='about test provider',
            chargePerHour=200,
            password='password'
        )
        self.service = Service(name="Test Service", description="Test Service Description")
        db.session.add(self.user)
        db.session.add(self.provider)
        db.session.add(self.service)
        db.session.commit()

        # Generate a valid token
        self.token = create_access_token(identity=self.user.id)

        # Headers with the token
        self.headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_booking(self):
        data = {
            "date": datetime.now().strftime("%Y-%m-%dT%H:%M"),
            "service": self.service.name,
            "user_id": self.user.id,
            "status": "Active",
            "provider_id": self.provider.id,  # Assume the user is also the provider for this test
            "description": "Test Booking Description"
        }
        response = self.client.post('/api/v1/bookings/', headers=self.headers, data=json.dumps(data))
        self.assertEqual(response.status_code, 201)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], 'Booking created successfully')

    def test_get_all_bookings(self):
        # First, create a booking
        booking = Booking(date=datetime.now(), service_id=self.service.id, user_id=self.user.id, provider_id=self.provider.id, description="Test Booking Description", status='Active')
        db.session.add(booking)
        db.session.commit()

        response = self.client.get('/api/v1/bookings/', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['status'], 'success')
        self.assertTrue(len(response_data['data']) > 0)

    def test_get_single_booking(self):
        # First, create a booking
        booking = Booking(date=datetime.now(), service_id=self.service.id, user_id=self.user.id, provider_id=self.provider.id, description="Test Booking Description", status='Active')
        db.session.add(booking)
        db.session.commit()

        response = self.client.get(f'/api/v1/bookings/{booking.id}', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], 'Booking retrieved successfully')

    def test_update_booking(self):
        # First, create a booking
        booking = Booking(date=datetime.now(), service_id=self.service.id, user_id=self.user.id, provider_id=self.provider.id, description="Test Booking Description", status='Active')
        db.session.add(booking)
        db.session.commit()

        data = {
            "description": "Updated Booking Description"
        }
        response = self.client.put(f'/api/v1/bookings/{booking.id}', headers=self.headers, data=json.dumps(data))
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], 'Booking updated successfully')

    def test_delete_booking(self):
        # First, create a booking
        booking = Booking(date=datetime.now(), service_id=self.service.id, user_id=self.user.id, provider_id=self.provider.id, description="Test Booking Description", status='Active')
        db.session.add(booking)
        db.session.commit()

        response = self.client.delete(f'/api/v1/bookings/{booking.id}', headers=self.headers)
        self.assertEqual(response.status_code, 203)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], f'Booking deleted successfully')


if __name__ == '__main__':
    unittest.main()
