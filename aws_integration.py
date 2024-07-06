import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('TrafficData')
    
    for record in event['Records']:
        payload = json.loads(record['body'])
        sensor_id = payload['sensor_id']
        timestamp = payload['timestamp']
        traffic_count = payload['traffic_count']
        
        table.put_item(
            Item={
                'sensor_id': sensor_id,
                'timestamp': timestamp,
                'traffic_count': traffic_count
            }
        )
        
    return {
        'statusCode': 200,
        'body': json.dumps('Data processed successfully')
    }
