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
  endpoint = f"http://localhost:8000/api/{username}/"

  headers = {
    "Authorization": f"Bearer {token}"
  }

  # Only editable fields for now
  data = {
    "is_active": True,
    # "profile_picture": "https://api.dicebear.com/7.x/notionists-neutral/svg?seed=wFApuyCZvY",
  }
  
  put_response = requests.put(endpoint, headers=headers, json=data)
  print(put_response.text)
  print(put_response.status_code)