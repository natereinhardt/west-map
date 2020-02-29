from apiclient import discovery
import httplib2
from oauth2client import client
from pip._vendor.urllib3 import request
from urllib import request
import sys


# (Receive auth_code by HTTPS POST)
POST={}
args=sys.stdin.read().split('&')

for arg in args:
    t=arg.split('=')
    if len(t)>1: k, v=arg.split('='); POST[k]=v

auth_code = POST.get('auth_code')


# Set path to the Web application client_secret_*.json file you downloaded from the
# Google API Console: https://console.developers.google.com/apis/credentials
CLIENT_SECRET_FILE = '/Applications/XAMPP/xamppfiles/htdocs/client_secret.json'

# Exchange auth code for access token, refresh token, and ID token
credentials = client.credentials_from_clientsecrets_and_code(
    CLIENT_SECRET_FILE,
    ['https://www.googleapis.com/auth/drive.appdata', 'profile', 'email'],
    auth_code)

# Call Google API
http_auth = credentials.authorize(httplib2.Http())
drive_service = discovery.build('drive', 'v3', http=http_auth)
files = drive_service.files().list().execute()
appfolder = drive_service.files().get(fileId='appfolder').execute()


# Get profile info from ID token
userid = credentials.id_token['sub']
email = credentials.id_token['email']
print("email" + email)