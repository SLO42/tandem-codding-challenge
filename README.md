# tandem-coding-challenge using node 12.18.3 
 node > 14 seems to give generic error for padLevels.
 
Trivia night at the local apprenticeship application (Tandem)

CLI game using json array for questions

If you have docker, you can run the dockerscript.sh to launch the application

# For a node environment :

if you dont have node version 12.18.3 you can switch to that version using nvm (node version manager)


```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source ~/.bashrc
```
after that you should be able to see the nvm version with
```nvm --version```
Then you can install the node version with:
```nvm install 12.18.3```
And in doing so it should switch the current version of node to 12.18.3

```node npm run setup``` | to install node packages ( npm i )

```javascript npm start```  | start the trivia game ( node . )

# For a docker environment 

Run dockerscript.sh
