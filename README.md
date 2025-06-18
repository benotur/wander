# WANDER

WANDER is a web application for tracking, visualizing, and comparing your travel history around the world. Users can mark countries they've visited, lived in, or wish to visit, and see their stats visualized on an interactive world map. You can also compare your travel stats with other users and share your "passport" with friends.

## Features

- **Interactive World Map:** Visualize visited, lived, and wish-to-visit countries using Mapbox.
- **Country Menu:** Easily mark countries by continent and category (visited, lived, wish).
- **Travel Stats:** See your travel stats by continent and as a percentage of the world.
- **Profile Management:** Register, log in, change username/password, and delete your account.
- **Passport Modal:** View and share your unique passport code and stats.
- **Comparison Tool:** Compare your travel stats with other users using their passport codes.
- **Responsive Design:** Works well on both desktop and mobile devices.

## Tech Stack

- **Frontend:** HTML, CSS ([styles/main.css](styles/main.css), [styles/compare.css](styles/compare.css)), JavaScript ([scripts/app.js](scripts/app.js), [scripts/compare.js](scripts/compare.js))
- **Backend:** Firebase Realtime Database ([scripts/firebase-config.js](scripts/firebase-config.js))
- **Map:** Mapbox GL JS

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/wander.git
   cd wander
   ```

2. **Open `index.html` in your browser.**
   - No build step required; all dependencies are loaded via CDN.

3. **Register a new account** or log in with an existing one.

4. **Mark countries** you've visited, lived in, or wish to visit using the menu.

5. **View your stats** by clicking the Passport button.

6. **Compare with others:** Use the "Compare with others" button in the Passport modal, or open [compare.html](compare.html) directly.

## Project Structure

```
.
├── compare.html
├── index.html
├── marker.png
├── marker white.png
├── data/
│   ├── countries.json
│   └── countryLookup.json
├── scripts/
│   ├── app.js
│   ├── compare.js
│   └── firebase-config.js
└── styles/
    ├── main.css
    └── compare.css
```

## Customization

- **Firebase:** The app uses Firebase for authentication and data storage. Update the Firebase config in [`scripts/firebase-config.js`](scripts/firebase-config.js) if you want to use your own Firebase project.
- **Mapbox:** The map uses a Mapbox access token. Replace the token in [`scripts/app.js`](scripts/app.js) if needed.

## License

MIT License

---

**Enjoy tracking and sharing your travels
=======
Demo: https://wander-project.netlify.app/
>>>>>>> 23f9454ee2d4d2aa3b3cde19860bb8d7a8f758d7
