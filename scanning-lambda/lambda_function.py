import time
import datetime
import json
import requests
import boto3
import botocore

def lambda_handler(event, context):
    """
    Lambda function handler; Goes through all files in S3 and pulls the most recently played songs from the last hour and 
    records the counts in the user's json file
    """

    s3 = boto3.client('s3')
    
    for key in s3.list_objects(Bucket="spotify-cleaning-bucket")['Contents']:
        if 'Monthly-Output' in key['Key']:
            continue
        jsonFile = json.loads(s3.get_object(Bucket='spotify-cleaning-bucket', Key=key['Key'])['Body'].read().decode('UTF-8'))
        
        headers = {'Authorization': 'Bearer ' + get_token(jsonFile['App Token'], jsonFile['Refresh Token']),
                               'Content-Type': 'application/json', 'Accept': 'application/json'}
                               
        jsonFile = check_new_songs(jsonFile, headers)
        
        after = int(time.mktime((datetime.datetime.now() - datetime.timedelta(hours=1)).timetuple()) * 1000)
        params = {'limit': 50, 'after': after}
        songs = requests.get('https://api.spotify.com/v1/me/player/recently-played', headers=headers, params=params)
    
        for song in songs.json()['items']:
            if song['track']['id'] + '/' + song['track']['name'] in jsonFile["Songs"]:
                jsonFile["Songs"][song['track']['id'] + '/' + song['track']['name']] += 1
    
        s3.put_object(Bucket="spotify-cleaning-bucket", Key=key['Key'], Body=(bytes(json.dumps(jsonFile).encode('UTF-8'))))
    
    
def get_token(app_token, refresh_token):
    """
    Used to get authorization token for the current user to access user's private data
    """

    data = {'grant_type': 'refresh_token', 'refresh_token': refresh_token}

    headers = {'Authorization': 'Basic ' + app_token}
    p = requests.post('https://accounts.spotify.com/api/token', data=data, headers=headers)

    spotifyToken = p.json()
    
    return spotifyToken['access_token']

def check_new_songs(jsonFile, headers):
    """
    Checks if new songs have been added to the playlist that need to be added to the JSON file
    """

    params = {'limit':50, 'offset': 0}
    r = requests.get('https://api.spotify.com/v1/playlists/' + jsonFile['Playlist Id'] + '/tracks', headers=headers, params=params)

    while len(r.json()['items']) != 0:
        for song in r.json()['items']:
            if song['track']['id'] + '/' + song['track']['name'] not in jsonFile['Songs']:
                jsonFile['Songs'][song['track']['id'] + '/' + song['track']['name']] = 0
        params['offset'] += 50
        r = requests.get('https://api.spotify.com/v1/playlists/' + jsonFile['Playlist Id'] + '/tracks', headers=headers, params=params)
    
    return jsonFile