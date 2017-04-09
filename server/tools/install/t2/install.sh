curl -fsSL 'https://raw.githubusercontent.com/brianjleeofcl/easy-forward/master/device/tessel/main-sync.js' > main.js

curl -fsSL 'https://raw.githubusercontent.com/brianjleeofcl/easy-forward/master/device/tessel/package.json' > package.json

npm install

t2 push main.js