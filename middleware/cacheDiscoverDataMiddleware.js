import * as broadlink from 'node-broadlink';

export const discoverDevice = async () => {
    const [device] = await broadlink.discover();
    
    if (device) {
        await dev.auth();
    }

    return device;
}

let cachedDiscoverData = null;
let cacheLastUpdated = null;

// Middleware to fetch and cache discover data
export const cacheDiscoverDataMiddleware = async (req, res, next) => {
  const cacheTimeout = 10000; // 10 seconds

  // Check if cache is expired or not present
  if (!cachedDiscoverData || (cacheLastUpdated && Date.now() - cacheLastUpdated > cacheTimeout)) {
    try {
      const device = await discoverDevice();
      cachedDiscoverData = device;
      cacheLastUpdated = Date.now();
      console.log('Cache updated');
    } catch (error) {
      console.error('Error fetching discover data:', error);
      return res.status(500).send('Internal Server Error');
    }
  }

  console.log(cachedDiscoverData);
  req.device = cachedDiscoverData;
  next();
};