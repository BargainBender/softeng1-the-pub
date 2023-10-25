import requests
from getpass import getpass

auth_endpoint = "http://localhost:8000/auth/"
username = input("Username: ")

auth_response = requests.post(auth_endpoint, json={
  "username": username, 
  "password": getpass()
})

print(auth_response.json())

if auth_response.status_code == 200:
  token = auth_response.json()["token"]
  endpoint = "http://localhost:8000/api/settings/"
  
  headers = {
    "Authorization": f"Bearer {token}"
  }
  
  get_response = requests.get(endpoint, headers=headers)

  data = get_response.json()
  
  data['password'] = input("New password: ")
  data['confirmed_password'] = input("Confirm new password: ")

  put_response = requests.put(endpoint, headers=headers, json=data) 
  print(put_response.text)
  print(put_response.status_code)