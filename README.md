# WhisperTranscribe

WhisperTranscribe is a web application that allows users to convert audio files to text transcripts. It uses the Whisper API to perform the transcription, and provides a simple and user-friendly interface for users to upload their files and receive their transcripts.

## Requirements and Installation

### FFMPEG
- FFMPEG version 4.4.1
- FFMPEG can be installed using the command `brew install ffmpeg` for Mac users and `sudo apt install ffmpeg` for Linux users and Windows users can download the latest version from [here](https://www.ffmpeg.org/download.html).

### Python
- Python version 3.10.11
- Python dependencies can be installed using the command `pip3 install -r requirements.txt`

### Node
- Latest Node version 16+
- Node dependencies can be installed using the command `cd whispertranscribe-frontend && npm install`

## Running the App

To run the Python Flask app, use the following command:

```bash
python -m flask run
```

To run the React app, use the following command:

```bash
npm run dev
```

The app can be accessed at `http://localhost:3000` in your web browser.

## Usage

To use WhisperTranscribe, simply upload an audio file in the supported format (currently only MP3) using the web interface. The application will convert the file to a text transcript using the Whisper API, and display the transcript on the screen as well as download it as a text file.

## Contributing

Contributions to WhisperTranscribe are welcome! To contribute, follow these steps:

1. Fork the repository.

2. Create a new branch for your feature:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them:

```bash
git add .
git commit -m "Add your commit message here."
```

4. Push your changes to your fork:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request to the main repository.

## License

WhisperTranscribe is licensed under the [MIT License](https://opensource.org/licenses/MIT).
