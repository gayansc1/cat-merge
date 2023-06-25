const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3600;


const { writeFile } = require('fs').promises;
const { join } = require('path');
const request = require('request-promise-native');
const mergeImg = require('merge-img');
const argv = require('minimist')(process.argv.slice(2));


const {
    greeting = 'Hello',
    who = 'You',
    width = 400,
    height = 500,
    color = 'Pink',
    size = 100,
  } = argv;
  
  const firstReq = {
    url: `https://cataas.com/cat/says/${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`,
    encoding: 'binary',
  };
  
  const secondReq = {
    url: `https://cataas.com/cat/says/${who}?width=${width}&height=${height}&color=${color}&s=${size}`,
    encoding: 'binary',
  };



const saveImage = async () => {
    try {
      const firstBody = await makeRequest(firstReq);
  
      // Check if the first request was successful before proceeding with the merge
      if (firstBody.success) {
        const secondBody = await makeRequest(secondReq);
  
        // Check if the second request was successful before proceeding with the merge
        if (secondBody.success) {
          
             mergeAndSaveImages(firstBody.body, secondBody.body, width);
        
        } else {
          console.log('The second request was unsuccessful. Skipping merge operation.');
        }
      } else {
        console.log('The first request was unsuccessful. Skipping merge operation.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const makeRequest = async (reqOptions) => {
    return request.get(reqOptions)
    .then((body) => {
      return { body, success: true };
    })
    .catch((error) => {
      console.error(error);
      return { success: false };
    });
  };
  
  const mergeAndSaveImages = (firstImage, secondImage, width) => {


    mergeImg([ 
        { src: new Buffer(firstImage, 'binary'), x: 0, y:0 }, 
        { src: new Buffer(secondImage, 'binary'), x: width, y: 0 }
      ]).then(img => {
        img.getBuffer('image/jpeg', (err, buffer) => {
              if (err) {
                console.log(err)
                return
              }

              const fileOut = join(process.cwd(), `/cat-card.jpg`);

              writeFile(fileOut, buffer, 'binary').then(()=> {
                console.log("---saved");
              }).catch(err=>{
                console.log("---err", err)
              })
            });
          }); 
  };
  


app.get('/', (req, res) => {
	
	saveImage();
	res.send('Lets merge cats!')
	
	
});
	





app.listen(port, () => console.log(`Express app running on port ${port}!`));