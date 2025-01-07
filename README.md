# Wedding Board Game Visualizer
This project was a labor of love that I put into place for my wedding reception back in December, 2022. Our wedding reception was primarily board games, video games, and other non-dancing activities. Guests were invited to play their favorite games with as many people as possible throughout the night. At each of their tables, a QR code took them to a Google Survey where they could enter data about the game they played: what game, with whom, who won, scores, and more. This data was then fed into a Google Sheet, then scraped and visualized on the frontend (`client/`) up on a projector for all to see. There were 4 primary visualizations, and a live victory notification for those who recently submitted their games. The project was a joyous success (as long as we ignore the fact I had to re-deploy the client 3 times to fix unexpected bugs throughout the night :) )

# Tech Overview
Frontend: React, Bootstrap.js, Highcharts.js for visualizations.
Backend: Express.js, GoogleAPIs.js, Google Sheets+Survey as workflow / datastore (don't overengineer if you don't need it!)
Hosting: Google Cloud Platform Serverless functions, Github Pages


## Installation and Usage
At this point, the project has served its purpose, and has since been shut down and archived. Data hosted here has been de-identified to protect privacy of the guests, but the client can still be run as if you are seeing the results of the night at the end of it all.

```
cd client
npm install
npm start
```