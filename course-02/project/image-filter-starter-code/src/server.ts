import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

 
  interface IFilteredImageRequest extends express.Request {
    params: {	   
       query: {
          image_url: string;
    	  };
      }	  
  }
  
  app.get( "/filteredimage", async ( req: IFilteredImageRequest , res, next ) => {
    let {image_url} = req.query;
    if (!image_url) {
      return res.status(422).send("Bad request - missing required parameters");	   
    }	    
    let result = await filterImageFromURL(image_url);
    res.status(200).sendFile(result,(err) => {
      if(err){
        console.log(err);
      }
      deleteLocalFiles([result])
    });
  } );

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();