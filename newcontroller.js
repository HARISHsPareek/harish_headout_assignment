import fs from 'fs';
import path from 'path';

const folderPath = path.join(path.resolve('tmp', 'data'));

function createFile(fileName) {
    const filePath = path.join(folderPath, fileName);
  
    if (!fs.existsSync(filePath)) {
      const fileSizeInBytes = 100 * 1024 * 1024; // 100MB
      const writeStream = fs.createWriteStream(filePath, 'utf-8');
  
      for (let i = 0; i < fileSizeInBytes; i += 1024) {
        const chunk = generateRandomText(Math.min(1024, fileSizeInBytes - i));
        writeStream.write(chunk);
      }
  
      writeStream.end();
    }
  }

function generateRandomText(size) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    text += characters.charAt(randomIndex);
  }

  return text;
}

// export const getReq =  (req, res) => {
//   const { n, m } = req.query;

//   if (!n) {
//     return res.status(400).json({ error: 'Missing required parameter: n' });
//   }

//   const fileName = `${n}.txt`;
//   createFile(fileName);

//   const filePath = path.join(folderPath, fileName);
//   console.log('File Path:', filePath);

//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       return res.status(404).json({ error: 'File not found' });
//     }

//     if (m) {
//       // If both n and m are provided, read the specified line
//       readLine(filePath, parseInt(m, 10), res);
//     } else {
//       // If only n is provided, return the entire file content
//       readFile(filePath, res);
//     }
//   });
// };
export const getReq = async (req, res) => {
    const { n, m } = req.query;
  
    if (!n) {
      return res.status(400).json({ error: 'Missing required parameter: n' });
    }
  
    const fileName = `${n}.txt`;
  
    // Use try-catch block for error handling
    try {
      // Use await to wait for the createFile function to complete
      await createFile(fileName);
  
      const filePath = path.join(folderPath, fileName);
      console.log('File Path:', filePath);
  
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          return res.status(404).json({ error: 'File not found' });
        }
  
        // Rest of your code here
        if (m) {
          // If both n and m are provided, read the specified line
          readLine(filePath, parseInt(m, 10), res);
        } else {
          // If only n is provided, return the entire file content
          readFile(filePath, res);
        }
      });
    } catch (error) {
      // Handle errors from createFile function
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

function readLine(filePath, lineNumber, res) {
  const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  let currentLine = 0;

  stream.on('data', (chunk) => {
    const lines = chunk.split('\n');

    for (const line of lines) {
      currentLine++;

      if (currentLine === lineNumber) {
        stream.destroy();
        return res.status(200).send(line);
      }
    }
  });

  stream.on('end', () => {
    res.status(404).json({ error: 'Line number exceeds the file length' });
  });
}

function readFile(filePath, res) {
    // Specify encoding as 'utf-8'
    const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  
    res.setHeader('Content-Type', 'text/plain'); // Adjust the Content-Type based on your file type, e.g., 'text/plain' for text files
  
    stream.pipe(res);
  
    stream.on('error', (err) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
  }
