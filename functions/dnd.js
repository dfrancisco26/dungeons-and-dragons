// i would make this file called dnd-classes.js, for ease of maintainability

const fetch = require('node-fetch');
require('dotenv').config();


const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async () => {
  
  try {

    const response = await fetch (`https://api.open5e.com/classes`, 
    );
    const data = await response.json();
    const json = JSON.stringify({ data });
    
    return {
      statusCode: 200,
      headers, 
      body: json };
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
