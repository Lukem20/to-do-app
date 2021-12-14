// Must npm install got@9.6.0
import got from 'got';

// Get filepath to data directory.
const dataURL = 'https://dev-lukes-app.pantheonsite.io/wp-json/twentytwentyone-child/v1/special';

// Function returns all user IDs from json objects in array.
export async function getAllIds () {

    // Load contents into string.
  let jsonString; 
  try {
    // Uses 'got' asynchoronously to retrieve via https our json data from wp site
    jsonString =  await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }
    // Convert that string into json array object using parse() method.
  const jsonObj = JSON.parse(jsonString.body);
    // Use map() method to extract just ID properties into new array of object values.
  return jsonObj.map ( item => {
    return {
      params : {
        id: item.ID.toString()
      }
    }
  });
}

  // Return a list of people sorted by their names and return their IDs.
export async function getSortedList () {
    // Load json file contents into string.
  let jsonString; 
  try {
    // Uses got asynchoronously to retrieve via https our json data from wp site
    jsonString =  await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }


    // Convert string from file into json object
  const jsonObj = JSON.parse( jsonString.body );
    // Sort json array by name property.
  jsonObj.sort ( function (a, b) {
    return a.post_title.localeCompare(b.name);
  });

    // Use map() on the array to extract just the ID and name properties into a new array of objects.
  return jsonObj.map( item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
}

  // Asynchrounous function to get the complete data for one person.
export async function getData ( idRequested ) {
    // Load contents into string.
  let jsonString; 
  try {
    // Uses got asynchoronously to retrieve via https our json data from wp site
    jsonString =  await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }

    // Convert that string into json array object using parse() method.
  const jsonObj = JSON.parse( jsonString.body );
    // Find object value in array that has matching ID, returns an array with one element in it.
  const objMatch = jsonObj.filter( obj => {
      return  obj.ID.toString() === idRequested;
    }
  );

    // Extract object value in filtered array if any.
  let objReturned;
  if ( objMatch.length > 0 ) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }

  return objReturned;
}