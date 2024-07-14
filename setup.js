import * as broadlink from 'node-broadlink';
import {promises as fs} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getConfigInfo = async () => {
    const info = await fs.readFile(path.join(__dirname, 'lanConfig.json'));
    
    return JSON.parse(info);
}

const setup = async () => {
    const {ssid, password} = await getConfigInfo();
    
    //Security mode options are (0 = none, 1 = WEP, 2 = WPA1, 3 = WPA2, 4 = WPA1/2)
    broadlink.setup(ssid, password, 3);
}

setup().then(() => console.log('Setup succesfull!')).catch((err) => console.log('Setup error:', err))
