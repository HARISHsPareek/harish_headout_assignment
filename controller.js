import fs from 'fs';
import path from 'path';


const folderPath = path.join(path.resolve('tmp','data'));  

// Ensure the data folder exists
// if (!fs.existsSync(folderPath)) {
//   fs.mkdirSync(folderPath, { recursive: true });
// }
  

 function createFile(fileName) {
    const filePath = path.join(folderPath, fileName);
  
//     // Check if the file already exists
//     if (!fs.existsSync(filePath)) {
//       const fileSizeInBytes = 100 * 1024 * 1024; // 100MB
//       const buffer = Buffer.alloc(fileSizeInBytes);
  
//       fs.writeFileSync(filePath, buffer,'utf-8');
//     }
if (!fs.existsSync(filePath)) {
    const fileSizeInBytes = 100 * 1024 * 1024; // 100MB
    const fileContent = generateRandomText(fileSizeInBytes);
  
    fs.writeFileSync(filePath, fileContent, 'utf-8');
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
  
  
  // Create 30 files (1.txt, 2.txt, ..., 30.txt)
//   for (let i = 1; i <= 30; i++) {
    
//   }
  

// export const getReq = (req, res) => {
//     const { n, m } = req.query;
//     if (!n) {
//       return res.status(400).json({ error: 'Missing required parameter: n' });
//     }
//     createFile(`${n}.txt`);
//     const filePath = path.join(path.resolve('tmp', 'data', `${n}.txt`));
//     console.log('File Path:', filePath);
  
//     fs.access(filePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ error: 'File not found' });
//       }
  
//       if (m) {
//         // If both n and m are provided, read the specified line
//         readLine(filePath, parseInt(m, 10), res);
//       } else {
//         // If only n is provided, return the entire file content
//         readFile(filePath, res);
//       }
//     });
//   };

// function readLine(filePath, lineNumber, res) {
//     const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
//     let currentLine = 0;
  
//     stream.on('data', (chunk) => {
//       const lines = chunk.split('\n');
  
//       for (const line of lines) {
//         currentLine++;
  
//         if (currentLine === lineNumber) {
//           stream.destroy();
//           return res.status(200).send(line);
//         }
//       }
//     });
  
//     stream.on('end', () => {
//       res.status(404).json({ error: 'Line number exceeds the file length' });
//     });
//   }
  
//   function readFile(filePath, res) {
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//       if (err) {
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
  
//       res.status(200).send(data);
//     });
//   }
  
export const getReq = (req, res) => {
    const { n, m } = req.query;
    if (!n) {
      return res.status(400).json({ error: 'Missing required parameter: n' });
    }
    createFile(`${n}.txt`)
  
    const filePath = path.join(path.resolve('tmp', 'data', `${n}.txt`));
    console.log('File Path:', filePath);
  
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      if (m) {
        // If both n and m are provided, read the specified line
        readLine(filePath, parseInt(m, 10), res);
      } else {
        // If only n is provided, return the entire file content
        readFile(filePath, res);
      }
    });
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
    const data = fs.readFileSync(filePath, 'utf-8');
  
    res.status(200).send(data);
  }
  