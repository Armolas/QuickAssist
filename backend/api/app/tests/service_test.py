import unittest
from flask import Flask, json
from app import create_app, db
from app.models.service import Service
from app.models.provider import Provider

class ServiceTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()

        # Create all tables
        db.create_all()

        # Create a test user (who is a provider)
        self.user = Provider(
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
        db.session.add(self.user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_service(self):
        data = {
            "name": "Test Service",
            "description": "Test Service Description"
        }
        response = self.client.post('/api/v1/services/', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], 'Service created successfully')

    def test_get_all_services(self):
        # First, create a service
        service = Service(name="Test Service", description="Test Service Description")
        db.session.add(service)
        db.session.commit()

        response = self.client.get('/api/v1/services/')
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['status'], 'success')
        self.assertTrue(len(response_data['data']) > 0)

    def test_get_single_service(self):
        # First, create a service
        service = Service(name="Test Service", description="Test Service Description")
        db.session.add(service)
        db.session.commit()

        response = self.client.get(f'/api/v1/services/{service.id}')
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], f'Service {service.name} retrieved successfully')

    def test_update_service(self):
        # First, create a service
        service = Service(name="Test Service", description="Test Service Description")
        db.session.add(service)
        db.session.commit()

        data = {
            "name": "Updated Service",
            "description": "Updated Description"
        }
        response = self.client.put(f'/api/v1/services/{service.id}', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], f'Service Updated Service updated successfully')

    def test_delete_service(self):
        # First, create a service
        service = Service(name="Test Service", description="Test Service Description")
        db.session.add(service)
        db.session.commit()

        response = self.client.delete(f'/api/v1/services/{service.id}')
        self.assertEqual(response.status_code, 203)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['message'], f'Service Test Service deleted successfully')

    def test_get_service_providers(self):
        # First, create a service
        service = Service(name="Test Service", description="Test Service Description")
        service.providers.append(self.user)
        db.session.add(service)
        db.session.commit()

        response = self.client.get(f'/api/v1/services/{service.id}/providers')
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_data['status'], 'success')
        self.assertTrue(len(response_data['data']) > 0)
        self.assertEqual(response_data['data'][0]['firstName'], self.user.firstName)


if __name__ == '__main__':
    unittest.main()
