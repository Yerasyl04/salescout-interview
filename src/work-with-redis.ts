// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library
import { createClient } from 'redis';

async function manageRedis(): Promise<void> {
    const client = createClient();

    client.on('error', (err) => console.error('Redis Client Error', err));

    await client.connect();

    
    await client.set('key1', 'value1');
    await client.set('key2', 'value2');
    await client.set('key3', 'value3');

  
    const keyToRead = 'key2';
    const value = await client.get(keyToRead);

    console.log(`Value for "${keyToRead}": ${value}`);
    
    await client.disconnect();
}

module.exports = { manageRedis };
