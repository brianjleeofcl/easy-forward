curl -fsSL 'https://raw.githubusercontent.com/brianjleeofcl/easy-forward/master/device/raspberry-pi/index.js' > index.js

curl -fsSL 'https://raw.githubusercontent.com/brianjleeofcl/easy-forward/master/device/raspberry-pi/package.json' > package.json

npm install

node index.js