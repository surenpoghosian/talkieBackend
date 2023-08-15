### How to Run

You need to setup cuda and all required files for your gpu before you execute next commands 

1. **Clone this repo** with command       `git clone https://github.com/surenpoghosian/talkieBackend`
2. `cd talkieBackend` 
3. **run** `pip install bark`
4. **run** `CUDA_VISIBLE_DEVICES=""  python -m bark --text "Hello, my name is Talkie." --history_prompt "v2/ru_speaker_1" --output_filename "example.wav"`


after command execution is finished you'll see `example.wav` file in same directory open it and check the result

for running on **CPU**  `CUDA_VISIBLE_DEVICES="" `
for running on **GPU**  `CUDA_VISIBLE_DEVICES=0 `

**Install dependencies** `npm install`
**Run the api** `node api.js` 
**You can reach it on** `http://localhost:6969` 

there is one `post request` which require `{"text" : "Hello, my name is Talkie." }` argument in the request body






### Easier way to setup project
You still need to setup the gpu environment on your device (cude etc.)

**Move setup.sh to home directory** 
**grant access by** `chmod +x setup.sh` 
**run** `./setup.sh`

 You can read setup.sh file, all the steps are visible there.
 If anything isnot clear ask ChatGpt to explain what happens in setup.sh




helpful resurce for cuda setup (see pip3 install part)

 https://publish.reddit.com/embed?url=https://www.reddit.com/r/singularity/comments/12udgzh/bark_text2speechbut_with_custom_voice_cloning/jh893db/

`pip3 install numpy --pre torch torchvision torchaudio --force-reinstall --index-url https://download.pytorch.org/whl/nightly/cu118`
