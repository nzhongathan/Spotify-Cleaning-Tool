import time
import datetime
import json
import requests
import boto3
import numpy as np

def lambda_handler(event, context):
    """
    Lambda function handler; Goes through files in S3 and finds the outlier songs which have below average "play counts". Adds these to
    Monthly-Output.json
    """

    s3 = boto3.client('s3')
    output = {}
    for key in s3.list_objects(Bucket="spotify-cleaning-bucket")['Contents']:
        if 'Monthly-Output' in key['Key']:
            continue
        jsonFile = json.loads(s3.get_object(Bucket='spotify-cleaning-bucket', Key=key['Key'])['Body'].read().decode('UTF-8'))
        output[key['Key'][:-5]] = []
        songs = jsonFile['Songs']
        cnt_values = np.array(list(songs.values()))
        cnt_values = cnt_values[cnt_values != 0]

        if len(cnt_values) == 0:
            continue
        
        q3, q1 = np.percentile(cnt_values, [75, 25])
        iqr = q3 - q1
        lower = q1 - 1.5 * iqr
        
        for song in songs:
            if songs[song] < lower:
                output[key['Key'][:-5]].append(song)
                #print(song)
        jsonFile['Songs'] = {}
        s3.put_object(Bucket="spotify-cleaning-bucket", Key=key['Key'], Body=(bytes(json.dumps(jsonFile).encode('UTF-8'))))
    s3.put_object(Bucket="spotify-cleaning-bucket", Key="Monthly-Output.json", Body=(bytes(json.dumps(output).encode('UTF-8'))))
