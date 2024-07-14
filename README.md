# broadlink
Basic React+Node app for using Broadlink Smart Hubs in local networks

It's using 'node-broadlink' library under the hood

https://www.npmjs.com/package/node-broadlink

Setup a new device on your local wireless network:

Long press the reset button until the blue LED is blinking quickly.

Long press again until blue LED is blinking slowly.

Manually connect to the WiFi SSID named BroadlinkProv.

Provide your ssid and network password for a 2.4 GHz network in the lanConfig.json file.

Run setup()

Reset device and connect to the local network

Run npm start

Access the web interface on http://localhost:3000

Enter learning mode will configure the device to learn IR commands. Once it has received Ir data, you can store it in a command and send that command later on from the Web Interface
