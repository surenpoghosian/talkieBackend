cd
git clone https://github.com/surenpoghosian/talkieBackend
git clone https://github.com/suno-ai/bark
cd bark
pip install bark
CUDA_VISIBLE_DEVICES=""  python -m bark --text "Hello, my name is Talkie." --history_prompt "v2/ru_speaker_1" --output_filename "example.wav"
cd
cd talkieBackend
npm install
node api.js