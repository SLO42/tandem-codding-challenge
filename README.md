# tandem-coding-challenge using node 12.18.3 
 node > 14 seems to give generic error for padLevels.
 
 node < 12 seems to get upset at functions like:
 ```javascript
  getResults = () => {...};
 ```
 
Trivia night at the local apprenticeship application (Tandem)

CLI game using json array for questions

If you have docker, you can run the dockerscript.sh to launch the application

# For a node environment :

If you dont have node version 12.18.3 you can switch to that version using nvm (node version manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source ~/.bashrc
```
After that you should be able to see the nvm version with
```bash
nvm --version
```
Then you can install the node version with:
```bash
nvm install 12.18.3
```
And in doing so it should switch the current version of node to 12.18.3

Next move into the app folder where the project is located.
```bash
 cd app/
```

Then run the setup and start the game

to install node packages ( npm i )
```bash 
 npm run setup
```

start the trivia game ( node . )
```bash
npm start
``` 

# For a docker environment :
If you are not root, Docker might say "Permission denied", and in doing so you'll need to run the docker commands as sudo.
```bash
sudo docker build -t tandem-coding-challenge .
sudo docker run -it --rm tandem-coding-challenge
```
Other wise you can just run:
```bash
./dockerscript.sh
```
