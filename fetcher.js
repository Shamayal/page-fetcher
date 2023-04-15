const request = require('request'); // to use request library and make the HTTP request
const readline = require('readline'); // to use request library and make the HTTP request
const fs = require('fs'); // Node's fs module to write the file

let urlArg = process.argv[2]; // URL command line argument
let filePathArg = process.argv[3]; // local file path command line argument

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(urlArg, (error, response, body) => {
  fs.writeFile(filePathArg, body, function(err) {
    if (err) {
      console.log("Error: The file path does not exist.")
      process.exit();
    } else if (fs.existsSync(filePathArg)){
      rl.question(`This file path already exists, type and enter "y" if you would like to overwrite ${filePathArg}: `, (key) => {
        if (key === "y") {
          console.log(`Downloaded and saved ${body.length} bytes to ${filePathArg}`);
          process.exit();
        }
      });
    } else {
      console.log(`Downloaded and saved ${body.length} bytes to ${filePathArg}`);
      process.exit();
    }
  });
});