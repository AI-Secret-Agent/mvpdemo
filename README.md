# AI Secret Agent Demo

## Basic Overview and Quick Setup

This is a Demonstation of Open AI API Integration for Content Generation using Node.js and Google Sheets. 

We are Using Next.js as a framework for deployment and routing.

###This is designed to be as simple to setup and to use as possible. 

## Basic Requirements

Google Account

OpenAI API Key


# Simple Quick Setup Guide

### Clone Repository, Copy Sheet, Add Variables and Run Function.  That's it!

This Can Be Deployed for Free on Replit or a Number of App Hosting Platforms.  Your Primary Concern with Free Platforms will Likely Be Timeout on the Open AI Request.  

### Replit is easy to deploy and seems to handle requests.  It may not handle a longer request such as GPT4 or any 32k model.

### Vercel has a free limit of 10 seconds, if you upgrade it will be 60 seconds which should be more than enough.

## You can deploy to vercel with one click

### Vercel One-Click Deploy  <a name="vercel"></a>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/aisecretagent/mvpdemo)

### Both these methods will install all needed dependencies and will only require you to add your variables.
#### For the Deployment Your Env Variables are
OPENAI_KEY  -  yourkey
PORT  -    3000  or another if you're using that for something

The Google Sheet has a Script that requires it's own variables "Script Properties"

[Copy This Sheet](https://docs.google.com/spreadsheets/d/1YPAEO9TYhBnivo54E5FnzVqMi_mSS57fSCniDsaLYjQ/edit?usp=sharing)

Add The Script Properties

wpurl  -  the url of your wordpress blog urlofblog.com  (https:// is NOT needed)
wpkey - this is your application pass in the form of  username:password  (create in user profile)
proxyurl  -  this is the adress of your deployed app, https://yourappname.vercel.app/api/demo (https:// is required here the enpoint is /api/demo  https://yourappurl/api/demo

When you deploy it and you visit the endpoint you should see {"message":"Method not allowed"}  this means the node is up and rejecting your attempt to "GET"

Add tasks and prompts in the Sheet, you can run generatecontent function and it will send a post request, which will post the response to your WordPress as a Draft.

If you get a html response, try removing or adding the / from the proxy url in your sheet properties (sometimes one works, sometimes the other)
If you get a 401 error that means it is working and rejecting the authentication you should check that you have the correct OPENAI API key, check whitespaces, and make sure the proxy url has https:// if it's not a secure connection or your key is invalid you will get this error.

Those are the most common issues, we will add a detailed troubleshooting guide as we move forward.  Good Luck!

# Table of Contents
1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Setup](#setup)
4. [Vercel](#vercel)
5. [How to Use](#how-to-use)
    1. [Headers](#headers)
    2. [Body](#body)
    3. [Server Response](#server-response)
6. [Google App Script Usage](#google-app-script-usage)
7. [OpenAI Node.js and Google Apps Script Components](#components)
    1. [Installation & Setup](#installation-setup)
    2. [Node.js Server](#nodejs-server)
    3. [Google Apps Script](#google-apps-script)
8. [Usage](#usage)

# Project Overview <a name="project-overview"></a>
This application is a Node.js express server that interacts with OpenAI's API to generate responses from OpenAI API. It also integrates with WordPress and Google Sheets.

The Node.js server exposes a POST endpoint at which receives a set of parameters in the request body and headers. It then uses these parameters to make a POST request to OpenAI's API and returns the generated text to the client.

The Google App Script generates content and uses the Node.js server to communicate with OpenAI's API.

# Requirements <a name="requirements"></a>
- Node.js v12 or newer
- npm (comes with Node.js)
- Google Sheets
- OpenAI API Key
- Next.js

# Setup <a name="setup"></a>

### Clone and Deploy

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project in your terminal and run `npm install` to install all the dependencies.
3. Create a `.env` file in the root directory (or the ui) of the project and add your OpenAI API key and port number.
4. Run the Node.js server using the `npm start` command.

```bash
git clone https://github.com/aisecretagent/mvpdemo
```

Install the Vercel CLI:

```bash
npm i -g vercel
```

Then run the app at the root of the repository:

```bash
vercel dev
```

You can obtain a copy of the Demo Sheet at https://docs.google.com/spreadsheets/d/1YPAEO9TYhBnivo54E5FnzVqMi_mSS57fSCniDsaLYjQ/edit?usp=sharing
For the Google App Script, you will need to set up the necessary properties and use the `generateContent()` function to generate content and interact with the Node.js server. 

## Headers <a name="headers"></a>
The following headers are required for the POST request:

- `sourcerow`: The row of the Google Sheet from where the data originates.
- `wpurl`: The URL of your WordPress site.
- `userkey`: Your WordPress user key.
- `posttype`: The type of post to be created in WordPress.

## Body <a name="body"></a>
The body should be a JSON object with the following fields:

- `model`: The OpenAI model to use for generating text.
- `maxTokens`: The maximum number of tokens to generate.
- `defaultTitle`: The default title for the generated content.

## Server Response <a name="server-response"></a>
The server will respond with a JSON object containing:

- The ID of the created WordPress post (`id`), if the target platform is WordPress.
- The source row (`sourcerow`) from which the post was made (used for feedback)
- An error message (`message`), if an error occurred during the process. 

# Google App Script Usage <a name="google-app-script-usage"></a>
The Google App Script includes several functions that interact with the Node.js server to generate content. The script is designed to be used with Google Sheets, with specific sheets and cell ranges being used to provide input data and control the script's behavior.

Before using the script, make sure to set up the script properties using the `setPropertiesFromSheet()` function and Google Sheets. The properties include the wordpress url credentials and proxy URL. 

The `generateContent()` function will iterate over all the tasks in Column B and generate content using the Node.js server and OpenAI's API. It uses the specified OpenAI model, post type, prompts, temperature, and token limit

# OpenAI Node.js, Next.js, and Google Apps Script Components <a name="components"></a>

This project includes three major components:

1. A Node.js application serving as a backend server, making requests to the OpenAI API.
2. A Next.js application to handle routing and deployment of the application.
3. A Google Apps Script code running in Google Sheets, interfacing with the Node.js backend to generate and manage content.

## Installation & Setup <a name="installation-setup"></a>
Follow the steps to set up and install the project.

## Node.js Server <a name="nodejs-server"></a>
The Node.js application exposes an endpoint (`/api/demo`) that accepts POST requests. This endpoint:

1. Extracts variables from request headers and body.
2. Makes a request to the OpenAI API using these parameters.
3. On receiving a response from the OpenAI API, it processes the response sending it to WordPress as a draft post or page.

## Next.js Application <a name="nextjs-app"></a>
The Next.js application:

1. Handles routing, making it easier to navigate different parts of the application.
2. Provides a framework for server-side rendering, improving the performance of the application.
3. Allows for easy deployment of the application on Vercel or any platform that supports Next.js.

## Google Apps Script <a name="google-apps-script"></a>
The Google Apps Script code:

1. Sets up and manages script properties using the 'Properties' sheet in your Google Sheets document. These properties include keys, URLs, and other configuration values.
2. Defines a function `generateContent()` that fetches content from the sheet, constructs the appropriate API call, and sends a POST request to the Node.js server.
3. On receiving the response, it logs the response details moving posted content from the task list and adding the post ID next to it. It also provides errors for debugging purposes.

# Usage <a name="usage"></a>
Once the Node.js server is running and the Google Apps Script code is set up, you can start using the application. The general flow is:

1. Fill Column B of your Google Sheets document with tasks, set up model, prompts, temperature, and if it is to be a post or a a page.
2. In Google Sheets, click on Extensions -> Apps Script.
3. In the Apps Script Editor, select `generateContent` and click on the play icon to run the function.
4. The function will process any content in B column, making API calls for each cell content, posting to wordpress and logging responses.

## Fully Modular Limited Release Version Coming Soon!

This is a Demo Version of the Full Modular MVP Version.  Releasing in Limited Quantities Soon! 

For More Info Check out http://discord.aisecretagent.com and subscribe to the AI-News-Alerts and AI-Secret-Agent-Blog-Alerts so you don't miss it!  It's too good to sell to everyone! 

So make sure you sign up and don't miss your chance!

Good luck with the Demo

If you have questions or problems, hit up the Discord.

See You Soon

Shawn

