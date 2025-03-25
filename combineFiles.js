const fs = require("fs");
const path = require("path");

// Specify the absolute path for the output file (outside your current folder)
const outputFilePath = path.join(__dirname, "combined-file.txt"); // Update this path to your preferred location

// Directory to search for .tsx files
const directoryToSearch = path.join(
  __dirname,
  "weather-frontend/skydeck/src/app"
); // Update this path to your target directory

// Function to recursively find all .tsx files in the given directory
const getAllTSXFiles = (dir) => {
  let results = [];

  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Recurse into subdirectories
      results = results.concat(getAllTSXFiles(filePath));
    } else if (filePath.endsWith(".tsx")) {
      // Add .tsx files to the results
      results.push(filePath);
    }
  });

  return results;
};

// Get all .tsx files in the directory (and subdirectories)
const filesToCombine = getAllTSXFiles(directoryToSearch);

// Create or clear the output file
fs.writeFileSync(outputFilePath, ""); // Clear the output file if it exists

// Loop through each file and append its content to the output file
filesToCombine.forEach((file) => {
  const fileContent = fs.readFileSync(file, "utf-8");
  fs.appendFileSync(outputFilePath, `\n\n// === Contents of ${file} ===\n`);
  fs.appendFileSync(outputFilePath, fileContent);
  //console.log(`Added ${file} to combined file.`);
});

console.log(`All .tsx files have been combined into ${outputFilePath}`);
