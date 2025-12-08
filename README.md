# Traffic Accident Visualization

This project visualizes traffic accidents in Xinzhu, Taiwan using D3, DC.js, Crossfilter, and the Google Maps JavaScript API. The visualization is fully client-side and reads data from `accidentXY.tsv`/`accidentXY_light.tsv`.

## Files
- `docs/index.html` – page markup and third-party includes.
- `docs/css/traffic.css` – styling for the map, navigation, and filter controls.
- `docs/js/traffic.js` – client-side logic for maps, charts, and navigation text.
- `docs/accidentXY.tsv` and `docs/accidentXY_light.tsv` – tabular datasets consumed by the page.

## Running locally
No build step is required. Serve the `docs/` directory as static files and open `index.html` in a browser:

```sh
python -m http.server 8000 --directory docs
# then browse to http://localhost:8000/
```

The page loads data directly from the TSV files and requires internet access for external libraries and Google Maps.

## Deploying to GitHub Pages
The site is ready to publish from the `docs/` folder on the `main` branch.

1. Ensure GitHub Pages is enabled with source set to “Deploy from a branch” and folder `docs/` on `main`.
2. Push to `main`; the included workflow (`.github/workflows/pages.yml`) uploads `docs/` and publishes it to the GitHub Pages environment.
3. Access the site at `https://<your-user>.github.io/traffic/` (replace `traffic` if the repository name differs).

## Development workflow
LiveScript, Stylus, and Jade sources have been removed. Make changes directly in the formatted HTML, JS, and CSS files listed above. There is no longer a Gulp pipeline; if you prefer automation (for example, formatting), add npm scripts instead of reintroducing the old Gulp tasks.
