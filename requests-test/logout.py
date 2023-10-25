import requests
from getpass import getpass

auth_endpoint = "http://localhost:8000/auth/"
print("Log in first to log out")
username = input("Username: ")

auth_response = requests.post(auth_endpoint, json={
  "username": username, 
  "password": getpass()
})

print(auth_response.json())

if auth_response.status_code == 200:
  token = auth_response.json()["token"]
  endpoint = f"http://localhost:8000/logout/"

  headers = {
    "Authorization": f"Bearer {token}"
  }

  logout_response = requests.get(endpoint, headers=headers)
  print(logout_response.json())