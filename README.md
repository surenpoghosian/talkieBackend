### How to Run

You need to setup cuda and all required files for your gpu before you execute next commands 

1. clone this directory with command       `git clone https://github.com/surenpoghosian/talkieBackend`
2. go to talkieBackend folder
3. run `pip install bark`
4. run  -> `CUDA_VISIBLE_DEVICES=""  python -m bark --text "Hello, my name is Talkie." --history_prompt "v2/ru_speaker_1" --output_filename "example.wav"`
after command execution is finished you'll see `example.wav` file in same directory open it and check the result

for running on CPU -> `CUDA_VISIBLE_DEVICES="" `
for running on GPU -> `CUDA_VISIBLE_DEVICES=0 `
