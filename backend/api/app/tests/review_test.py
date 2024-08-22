import unittest
from flask import json
from app import create_app, db
from app.models.review import Review
from app.models.provider import Provider
from flask_jwt_extended import create_access_token
import uuid

class ReviewTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()

        # Create all tables
        db.create_all()

        # Use a unique email for each test run
        self.provider_email = f'testprovider_{uuid.uuid4().hex}@example.com'
        self.provider = Provider(
            firstName='Test',
            lastName='Provider',
            email=self.provider_email,
            address='Provider Address',
            phoneNumber='0987654321',
            gender='Female',
            age=23,
            skills=[],
            about='About test provider',
            chargePerHour=200,
            password='password'
        )
        db.session.add(self.provider)
        db.session.commit()

        self.token = create_access_token(identity=self.provider.id)

        # Headers with the token
        self.headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_get_all_reviews(self):
        # Create a sample review
        review = Review(provider_id=self.provider.id, review="Great service", rating=5)
        db.session.add(review)
        db.session.commit()

        response = self.client.get('/api/v1/reviews/', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['status'], 'success')
        self.assertTrue(len(response_data['data']) > 0)

    def test_create_review(self):
        data = {
            "provider_id": self.provider.id,
            "review": "Excellent service!",
            "rating": 5
        }
        response = self.client.post('/api/v1/reviews/', data=json.dumps(data), headers=self.headers)
        self.assertEqual(response.status_code, 201)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], 'Review created successfully')
        self.assertEqual(response_data['data']['review'], 'Excellent service!')

    def test_get_single_review(self):
        # Create a sample review
        review = Review(provider_id=self.provider.id, review="Good service", rating=4)
        db.session.add(review)
        db.session.commit()

        response = self.client.get(f'/api/v1/reviews/{review.id}', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], 'Review retrieved successfully')
        self.assertEqual(response_data['data']['review'], 'Good service')

    def test_update_review(self):
        # Create a sample review
        review = Review(provider_id=self.provider.id, review="Okay service", rating=3)
        db.session.add(review)
        db.session.commit()

        update_data = {
            "review": "Updated review",
            "rating": 4
        }
        response = self.client.put(f'/api/v1/reviews/{review.id}', data=json.dumps(update_data), headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], 'Review updated successfully')
        self.assertEqual(response_data['data']['review'], 'Updated review')

    def test_delete_review(self):
        # Create a sample review
        review = Review(provider_id=self.provider.id, review="Mediocre service", rating=2)
        db.session.add(review)
        db.session.commit()

        response = self.client.delete(f'/api/v1/reviews/{review.id}', headers=self.headers)
        self.assertEqual(response.status_code, 203)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], 'Review deleted successfully')

if __name__ == '__main__':
    unittest.main()
