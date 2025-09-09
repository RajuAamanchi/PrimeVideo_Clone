
# Prime Video (React)

A small Prime Video clone built with React. It showcases category-wise carousels using React Slick and a popup video player using React Player.

---

## Preview

Video demo:
  ![IPL Dashboard Preview]( https://assets.ccbp.in/frontend/content/react-js/prime-video-output.mp4  )

---

## Features

- Two carousels: **Action Movies** and **Comedy Movies** (React Slick)
- Click a **thumbnail** to open a popup and play the video (reactjs-popup + react-player)
- Next/Previous buttons on each carousel to navigate movie thumbnails
- Simple, responsive layout

---

## Data Model

`App` provides `moviesList`, an array of items:

| Key          | Type   | Notes                          |
|--------------|--------|--------------------------------|
| id           | String | Unique id                      |
| thumbnailUrl | String | Image URL for the thumbnail    |
| videoUrl     | String | YouTube/watch or MP4 URL       |
| categoryId   | String | "ACTION" or "COMEDY"           |

---

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn

### Install & Run

```bash
# Install deps
npm install

# Install UI libs used in this project
npm install react-slick slick-carousel reactjs-popup react-player react-icons

# Start the dev server
npm start
````

React Slick CSS must be imported once (already handled in the MoviesSlider component).
React Popup base CSS must be imported where it’s used.

---

## Implementation Files

Use these files/paths in `src/components`:

* `src/components/PrimeVideo/index.js`
* `src/components/PrimeVideo/index.css`
* `src/components/MoviesSlider/index.js`
* `src/components/MovieItem/index.js`
* `src/components/MovieItem/index.css`

---

## How It Works

* **React Slick** renders 4 thumbnails per frame by default (with responsive fallbacks).
* Clicking a thumbnail opens a **modal popup**.
* Inside the popup, **React Player** displays the corresponding video with standard controls.

Basic popup wiring (example):

```jsx
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

<Popup
  modal
  trigger={<img src={thumbnailUrl} alt="thumbnail" />}
  className="popup-content"
>
  {/* modal content goes here */}
</Popup>
```

---

## Testing & Requirements (Important)

To match the spec and automated tests:

* One frame of each slider should show **4 thumbnails**
* All thumbnail images must have `alt="thumbnail"`
* The popup close button must have `data-testid="closeButton"`
* Use **IoMdClose** from **react-icons** for the Close icon

  ```jsx
  import {IoMdClose} from 'react-icons/io'
  ```

---

## Component Structure

* **PrimeVideo**
  Renders banner and two sections (Action, Comedy). Filters `moviesList` by `categoryId` and passes data to `MoviesSlider`.

* **MoviesSlider**
  Renders a `Slider` (react-slick) containing `MovieItem` thumbnails. Handles next/previous navigation.

* **MovieItem**
  Renders a thumbnail. On click, opens a popup with `ReactPlayer` to play the video. Close button uses `IoMdClose`.

---

## Quick Tips

* React Slick docs: [https://react-slick.neostack.com](https://react-slick.neostack.com)
* reactjs-popup docs: [https://react-popup.elazizi.com/](https://react-popup.elazizi.com/)
* React Player docs: [https://github.com/CookPete/react-player](https://github.com/CookPete/react-player)

To avoid autoplay issues in modals, keep playback **user-initiated** (use `controls`, don’t set `playing` on mount).

---

## Accessibility

* Provide meaningful `alt` text for images (the spec requires `alt="thumbnail"` for movie thumbnails and `alt="prime video"` for the banner).
* The popup container can have `role="dialog"` and an `aria-label`.

---

## Resources

* Banner image: [https://assets.ccbp.in/frontend/react-js/prime-video-img.png](https://assets.ccbp.in/frontend/react-js/prime-video-img.png) (use `alt="prime video"`)

* Colors:

  * `#000000` (background)
  * `#ffffff` (text)
  * `#231f20` (icons)

* Font: Roboto

---

## Troubleshooting

* **YouTube not playing**

  * Use a normal watch URL with React Player (it converts internally), or an **embed** URL in an `<iframe>`.
  * Disable ad blockers on `localhost`.
  * If your network blocks YouTube, test with a direct MP4: `https://www.w3schools.com/html/mov_bbb.mp4`

* **Carousel styling**

  * Ensure these CSS files are imported once:

    ```jsx
    import 'slick-carousel/slick/slick.css'
    import 'slick-carousel/slick/slick-theme.css'
    ```

* **Popup stacking**

  * If the popup sits behind other UI, increase overlay z-index in your CSS.

---

## License

This project is for learning purposes. Replace or extend this section with your preferred license if you plan to publish.

```

If you want, I can also add a tiny “Project Structure” tree and badges at the top.
```
