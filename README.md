
# Backlink Analyzer

A React and Express-based application designed specifically for cryptic hunters who frequently need to identify and verify backlinks. This tool helps users recognize URLs from various platforms, such as social media, file-sharing, and document sites, by matching them to known patterns. It aims to streamline the process of quickly identifying the source of a backlink. This also works for **discord invites** (checks if they are valid or not also!) and a lot more websites.

## Demo
![image](https://github.com/user-attachments/assets/9d8c4b70-c56e-4c84-be8c-ffe35658ec2b)

lRCF2c5MUsI is the backlink for the video https://www.youtube.com/watch?v=lRCF2c5MUsI, entering lRCF2c5MUsI will automatically go through several websites and find the best matches. 
## Features

- **Link Pattern Matching**: Detects links from various services (e.g., Pastebin, YouTube, Google Drive).
- **Regex Validation**: Validates input links using a series of regular expressions for common URL formats.
- **URL Checking**: Verifies if URLs are accessible using an API hosted on Vercel.
- **React Frontend**: A user-friendly interface for entering and analyzing links with real-time feedback.
- **Express Backend**: Serves as the API for validating and checking URL patterns.

## Tech Stack

- **Frontend**: React, Axios, React-Toastify for notifications.
- **Backend**: Express, CORS middleware, Axios for HTTP requests.
- **Deployment**: Vercel (API backend), locally for development.

## Project Structure

- **`/client`**: Contains the React frontend.
- **`/server`**: Contains the Express backend API.
