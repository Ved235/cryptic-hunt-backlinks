import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './App.css';

const App = () => {
  const [inputLink, setInputLink] = useState('');
  const [results, setResults] = useState([]);

  const patterns = [
    {
      "name": "ControlC Pastebin",
      "regex": "^[a-z0-9]{8}$",
      "type": "controlc paste",
      "url": "https://controlc.com/$URL"
    },
    {
      "name": "Wheel of names spinwheel",
      "regex": "^[a-z0-9]{3}(-)[a-z0-9]{3}$",
      "type": "spinwheel",
      "url": "https://wheelofnames.com/xsg-cqf"
    },
    {
      "name": "ctxt.io link",
      "regex": "^(2\/)[a-zA-Z0-9_-]{10}$",
      "type": "ctxt.io link",
      "url": "https://ctxt.io/$URL"
    },
    {
      "name": "ctxt.io link",
      "regex": "^[a-zA-Z0-9-]{10}$",
      "type": "ctxt.io link",
      "url": "https://ctxt.io/2/$URL"
    },
    {
      "name": "Spotify User",
      "regex": "^[a-zA-Z0-9]{25,28}$",
      "type": "spotify",
      "url": "https://open.spotify.com/user/$URL"
    },
    {
      "name": "Spotify Track",
      "regex": "^[a-zA-Z0-9]{22}$",
      "type": "spotify",
      "url": "https://open.spotify.com/track/$URL"
    },
    {
      "name": "Spotify Playlist",
      "regex": "^[a-zA-Z0-9]{22}$",
      "type": "spotify",
      "url": "https://open.spotify.com/playlist/$URL"
    },
    {
      "name": "Notion Document",
      "regex": "^[a-z0-9]{32}$",
      "type": "notion.so document",
      "url": "https://notion.so/$URL"
    },
    {
      "name": "Imgflip",
      "regex": "^[a-zA-Z0-9]{7}$",
      "type": "Meme Image",
      "url": "https://imgflip.com/i/$URL"
    },
    {
      "name": "Google Forms",
      "regex": "^[a-zA-Z0-9_-]{44}$",
      "type": "Google Forms",
      "url": "https://docs.google.com/forms/d/$URL"
    },
    {
      "name": "Google Forms",
      "regex": "^[a-zA-Z0-9_-]{17}$",
      "type": "Google Forms (shortened)",
      "url": "https://forms.gle/$URL"
    },
    {
      "name": "Google Spreadsheet",
      "regex": "^[a-zA-Z0-9_-]{33}$",
      "type": "Google Docs Spreadsheet",
      "url": "https://docs.google.com/spreadsheets/d/$URL"
    },
    {
      "name": "Google Presentation",
      "regex": "^[a-zA-Z0-9_-]{44}$",
      "type": "Google Docs Presentation",
      "url": "https://docs.google.com/presentation/d/$URL"
    },
    {
      "name": "Google Drive",
      "regex": "^[a-zA-Z0-9_-]{33}$",
      "type": "Drive Folder",
      "url": "https://drive.google.com/drive/u/0/folders/$URL/"
    },
    {
      "name": "Google Drive",
      "regex": "^[a-zA-Z0-9_-]{33}$",
      "type": "Drive File",
      "url": " https://drive.google.com/file/d/$URL"
    },
    {
      "name": "IMDB",
      "regex": "^[t0-9]{9}$",
      "type": "IMDB title link",
      "url": "https://www.imdb.com/title/$URL"
    },
    {
      "name": "Pinterest",
      "regex": "^[0-9]{18}$",
      "type": "Pinterest Image Pin",
      "url": "https://www.pinterest.com/pin/$URL/"
    },
    {
      "name": "Whatsapp",
      "regex": "^[a-zA-Z0-9]{22}$",
      "type": "Whatsapp Invite Link",
      "url": "https://chat.whatsapp.com/$URL"
    },
    {
      "name": "Whatsapp",
      "regex": "^[a-zA-Z0-9]{22}$",
      "type": "Whatsapp Web Invite Link",
      "url": "https://web.whatsapp.com/accept?code=$URL"
    },
    {
      "name": "Imgur",
      "regex": "^[a-zA-Z0-9]{7}$",
      "type": "Image Album",
      "url": "https://imgur.com/a/$URL"
    },
    {
      "name": "Imgur",
      "regex": "^[a-zA-Z0-9]{7}$",
      "type": "Image",
      "url": "https://imgur.com/$URL"
    },
    {
      "name": "Imgur",
      "regex": "^[a-zA-Z0-9]{7}$",
      "type": "Image",
      "url": "https://i.imgur.com/$URL.jpg"
    },
    {
      "name": "Imgpile",
      "regex": "^[a-zA-Z0-9]{6}$",
      "type": "Image",
      "url": "https://imgpile.com/i/$URL"
    },
    {
      "name": "YouTube",
      "regex": "^[a-zA-Z0-9_-]{11}$",
      "type": "Video",
      "url": "https://youtu.be/$URL"
    },
    {
      "name": "YouTube",
      "regex": "^PLL[a-zA-Z0-9_-]{31}$",
      "type": "Video Playlist",
      "url": "https://www.youtube.com/playlist?list=$URL"
    },
    {
      "name": "YouTube",
      "regex": "^[a-zA-Z0-9_-]{24}$",
      "type": "YouTube Channel",
      "url": "https://www.youtube.com/channel/$URL"
    },
    {
      "name": "TinyURL",
      "regex": "^[a-z0-9]{7}$",
      "type": "Shortened Link",
      "url": "https://tinyurl.com/$URL"
    },
    {
      "name": "Goo.gl",
      "regex": "^[a-z0-9]{5}$",
      "type": "Shortened Link",
      "url": "https://goo.gl/$URL"
    },
    {
      "name": "Bitly",
      "regex": "^[a-zA-Z0-9]+$",
      "type": "Shortened Link",
      "url": "https://bit.ly/$URL"
    },
    {
      "name": "Pastebin",
      "regex": "^[a-zA-Z0-9]{8}$",
      "type": "Text",
      "url": "http://pastebin.com/$URL"
    },
    {
      "name": "Mediafire",
      "regex": "^[a-z0-9]{15}$",
      "type": "File",
      "url": "http://www.mediafire.com/file/$URL/"
    },
    {
      "name": "MEGA",
      "regex": "^[a-zA-Z0-9_-]{8}\\![a-zA-Z0-9_-]{43}$",
      "type": "File",
      "url": "https://mega.nz/#!$URL"
    },
    {
      "name": "MEGA",
      "regex": "^#\\![a-zA-Z0-9_-]{8}\\![a-zA-Z0-9_-]{43}$",
      "type": "File",
      "url": "https://mega.nz/$URL"
    },
    {
      "name": "MEGA",
      "regex": "^[a-zA-Z0-9_-]{8}\\![a-zA-Z0-9_-]{22}$",
      "type": "File Folder",
      "url": "https://mega.nz/#F!$URL"
    },
    {
      "name": "MEGA",
      "regex": "^#F\\![a-zA-Z0-9_-]{8}\\![a-zA-Z0-9_-]{22}$",
      "type": "File Folder",
      "url": "https://mega.nz/$URL"
    },
    {
      "name": "Gyazo",
      "regex": "^[a-z0-9]{32}$",
      "type": "Image",
      "url": "https://gyazo.com/$URL"
    },
    {
      "name": "Dailymotion",
      "regex": "^[a-zA-Z0-9]{19}$",
      "type": "Video",
      "url": "http://www.dailymotion.com/video/$URL"
    },
    {
      "name": "Vimeo",
      "regex": "^\\d{9}$",
      "type": "Video",
      "url": "https://vimeo.com/$URL"
    },
    {
      "name": ".onion",
      "regex": "^[a-z0-9]{16}$",
      "type": "Tor Link (Requires Tor)",
      "url": "http://$URL.onion/"
    },
    {
      "name": "Facebook",
      "regex": "^\\d{15}$",
      "type": "Facebook Profile",
      "url": "https://www.facebook.com/profile.php?id=$URL"
    },
    {
      "name": "Reddit",
      "regex": "^[a-zA-Z0-9]{6}$",
      "type": "Reddit Post",
      "url": "https://redd.it/$URL"
    },
    {
      "name": "Lightshot",
      "regex": "^[a-z0-9]{6}$",
      "type": "Image",
      "url": "http://prnt.sc/$URL"
    },
    {
      "name": "Dropbox",
      "regex": "^[a-z0-9_-]{15}$",
      "type": "File",
      "url": "https://www.dropbox.com/s/$URL/"
    },
    {
      "name": "Discord",
      "regex": "^[a-zA-Z0-9]{8,10}$",
      "type": "Discord Invite",
      "url": "https://discord.gg/$URL"
    },
    {
      "name": "Google Docs",
      "regex": "^[a-zA-Z0-9_-]{44}$",
      "type": "Document",
      "url": "https://docs.google.com/document/d/$URL/"
    },
    {
      "name": "Vocaroo",
      "regex": "^[a-zA-Z0-9_-]{12}$",
      "type": "Audio",
      "url": "http://vocaroo.com/$URL"
    },
    {
      "name": "Clyp",
      "regex": "^[a-z0-9]{8}$",
      "type": "Audio",
      "url": "https://clyp.it/$URL"
    },
    {
      "name": "Instagram",
      "regex": "^[a-zA-Z0-9_-]{11}$",
      "type": "Instagram Post",
      "url": "https://www.instagram.com/p/$URL/"
    },
    {
      "name": "ISBN",
      "regex": "^(978|979)\\d{10}$",
      "type": "Book",
      "url": "http://www.isbnsearch.org/isbn/$URL"
    }
  ]

  const analyzeLink = async () => {
    try {
      const matchedPatterns = patterns.filter((pattern) => {
        const regex = new RegExp(pattern.regex);
        return regex.test(inputLink);
      });

      const validResults = [];

      for (const pattern of matchedPatterns) {
        const url = pattern.url.replace('$URL', inputLink);
        const name = pattern.name;
        try {
          const response = await axios.get('/check-url', { params: { url, name } });
          if (response.data.exists) {
            validResults.push({
              name: pattern.name,
              type: pattern.type,
              url,
            });
          }
        } catch (error) {
          // Ignore the error and move on to the next pattern
        }
      }

      setResults(validResults);
    } catch (error) {
      toast.error('Error analyzing link');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <center>
      <div className="card">
      <center>
        <h1>Backlink Analyzer</h1>
       
        <div className="input-container">
          <label htmlFor="inputLink">Enter a link:</label>
          <input
            type="text"
            id="inputLink"
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
          />
        </div>
      
        <button onClick={analyzeLink}>Analyze</button>
        </center>
        {results.length > 0 && (
          <div className="results">
            <h2>Results:</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    {result.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </center>
    </div>
  );
};

export default App;
