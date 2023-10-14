import requests

endpoint = "http://localhost:8000/api/user/tester"
get_response = requests.get(endpoint)
print(get_response.text)
print(get_response.status_code)