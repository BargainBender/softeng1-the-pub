import requests

endpoint = "http://localhost:8000/api/users/"

data = {
  "username": input("Username: "),
  "password": input("Password: "),
  "confirmed_password": input("Confirm password: "),
  "first_name": input("First name: "),
  "last_name": input("Last name: "),
  "email": input("Email: ")
}

post_response = requests.post(endpoint, json=data)  
print(post_response.text)
print(post_response.status_code)