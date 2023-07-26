const fs = require('fs');
require('dotenv').config();
const express = require("express");
var cors = require("cors");
const app = express();
const { exec } = require('child_process');
const process = require('node:process')
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const util = require('util');
const execAsync = util.promisify(exec);

const port = 6969;

app.use(express.json());
app.use(cors());

async function streamLogs(command) {
    return new Promise((resolve, reject) => {
      const childProcess = exec(command);
  
      childProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
  
      childProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
  
      childProcess.on('error', (error) => {
        console.error(`Error: ${error.message}`);
        reject(error);
      });
  
      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });
    });
  }


app.post('/api/generate_audio', async (req, res) => {
    try {
        const payload = req.body;
        const barkDir = "/home/elliot/bark"
        process.chdir(barkDir)
        const audioName = "Talkie_" + uuidv1() + ".wav";
        const command2 = `CUDA_VISIBLE_DEVICES="" python -m bark --text "${payload.text}" --history_prompt "v2/ru_speaker_1" --output_filename "${audioName}"`;
        
        try {    
            await execAsync("cd /home/elliot/bark")
            await streamLogs(command2);

            const audioFilePath = `${barkDir}/${audioName}`;
            fs.readFile(audioFilePath, (err, data) => {
                if (err) {
                    console.error(`Error reading audio file: ${err}`);
                    return res.status(500).json({ error: 'Failed to read audio file' });
                }

                res.setHeader('Content-Type', 'audio/wav');
                res.setHeader('Content-Disposition', `attachment; filename="${audioName}"`);
                res.setHeader('Content-Length', data.length);

                res.send(data);

                fs.unlink(audioFilePath, (err) => {
                    if (err) {
                        console.error(`Error deleting audio file: ${err}`);
                    }
                });
            });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to execute the command' });
        }
    } catch (error) {
        console.log(error);
        const response = {
            "error": JSON.stringify(error)
        };
        res.status(423).json(response);
    }
});


app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});
