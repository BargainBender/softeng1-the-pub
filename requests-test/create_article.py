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
  endpoint = "http://localhost:8000/api/articles/"
  token = auth_response.json()["token"]

  headers = {
    "Authorization": f"Bearer {token}"
  }

  data = {
    "title": input("Title: "),
    "content": input("Content: "),
  }

  post_response = requests.post(endpoint, headers=headers, json=data)

  print(f"Status code: {post_response.status_code}")
  print("Response: " + post_response.text)