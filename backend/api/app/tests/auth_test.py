import unittest
from flask import Flask
from flask_jwt_extended import create_access_token
from app import create_app, db
from app.models.user import User
from app.models.provider import Provider

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()  # Use your testing configuration
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        
        # Create a test user and provider
        self.test_user = User(
            firstName='Test',
            lastName='User',
            email='testuser@example.com',
            address='Test Address',
            phoneNumber='1234567890',
            password='password'
        )
        self.test_provider = Provider(
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
        db.session.add(self.test_user)
        db.session.add(self.test_provider)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_auth(self):
        access_token = create_access_token(identity=self.test_user.id)
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        response = self.client.get('/api/v1/auth/', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertIn('authenticated', response.json)

    def test_register_user(self):
        data = {
            'firstName': 'New',
            'lastName': 'User',
            'email': 'newuser@example.com',
            'address': 'New Address',
            'phoneNumber': '1122334455',
            'password': 'newpassword',
            'password2': 'newpassword',
            'user_type': 'user'
        }
        response = self.client.post('/api/v1/auth/register', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn('User newuser@example.com registered successfully', response.json['message'])

    def test_register_provider(self):
        data = {
            'firstName': 'New',
            'lastName': 'Provider',
            'email': 'newprovider@example.com',
            'address': 'New Provider Address',
            'phoneNumber': '9988776655',
            'password': 'newpassword',
            'password2': 'newpassword',
            'user_type': 'provider',
            'skills': [],
            'gender': 'Female',
            'age': 30,
            'about': 'About new provider'
        }
        response = self.client.post('/api/v1/auth/register', json=data)
        self.assertEqual(response.status_code, 201)

        self.assertIn('Provider newprovider@example.com registered successfully', response.json['message'])

    def test_register_user(self):
        data = {
            'firstName': 'New',
            'lastName': 'User',
            'email': 'newuser@example.com',
            'address': 'New Address',
            'phoneNumber': '1122334455',
            'password': 'newpassword',
            'password2': 'newpassword',
            'user_type': 'user'
        }
        response = self.client.post('/api/v1/auth/register', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn('User newuser@example.com registered successfully', response.json['message'])

    def test_register_provider(self):
        data = {
            'firstName': 'New',
            'lastName': 'Provider',
            'email': 'newprovider@example.com',
            'address': 'New Provider Address',
            'phoneNumber': '9988776655',
            'password': 'newpassword',
            'password2': 'newpassword',
            'user_type': 'provider',
            'skills': [],
            'gender': 'Female',
            'age': 30,
            'about': 'About new provider'
        }
        response = self.client.post('/api/v1/auth/register', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn('Provider newprovider@example.com registered successfully', response.json['message'])

    def test_verify_email_get(self):
        response = self.client.get('/api/v1/auth/verify-email', query_string={'email': self.test_user.email})
        self.assertEqual(response.status_code, 200)
        self.assertIn('Your OTP for verification has been sent to your email', response.json['message'])

    def test_reset_password_get(self):
        response = self.client.get('/api/v1/auth/reset-password', query_string={'email': self.test_user.email})
        self.assertEqual(response.status_code, 200)
        self.assertIn('Your OTP for password reset has been sent to your mail', response.json['message'])

if __name__ == '__main__':
    unittest.main()