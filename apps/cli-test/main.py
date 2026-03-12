#!/usr/bin/env python3
import json
import os
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import requests

# ==== CONFIG ====
CLIENT_ID = "e75d64e2-6dce-426d-85ea-72ebaa656730"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"  # optional for public clients
AUTH_URL = "http://localhost:4000/auth/authorize"
TOKEN_URL = "http://localhost:4000/auth/token"
SCOPES = "read write"
REDIRECT_URI = "http://localhost:5000/callback"

# ==== HTTP SERVER ====
auth_code = None

class CallbackHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        global auth_code
        query = urllib.parse.urlparse(self.path).query
        params = urllib.parse.parse_qs(query)
        auth_code = params.get("code", [None])[0]

        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(b"<h1>Authorization complete. You can close this window.</h1>")

def start_local_server():
    server = HTTPServer(("localhost", 5000), CallbackHandler)
    print("Waiting for authorization...")
    server.handle_request()  # handle a single request
    server.server_close()

def exchange_code_for_tokens(code):
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    response = requests.post(TOKEN_URL, data=data)
    response.raise_for_status()
    return response.json()

# ==== MAIN FLOW ====
def authenticate():
    # Open browser for user authorization
    params = {
        "response_type": "code",
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "scope": SCOPES
    }
    url = AUTH_URL + "?" + urllib.parse.urlencode(params)
    webbrowser.open(url)

    # Start local server to capture code
    start_local_server()
    if not auth_code:
        raise RuntimeError("Authorization failed or was canceled.")

    # Exchange code for tokens
    tokens = exchange_code_for_tokens(auth_code)
    return tokens

if __name__ == "__main__":
    tokens = authenticate()
    print("Access Token:", tokens["access_token"])
