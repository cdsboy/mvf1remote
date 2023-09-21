# mvf1remote

This is a react + tailwindcss simple remote control for [MultiViewer Motosports Desktop Client](https://multiviewer.app/).

Currently it supports one layout, and simple media controls and stream selection. It is currently hard coded to F1.

### Setup

Running mvf1remote requires compiling the SPA and hosting the static files alongside a proxy on the /api route pointed to your MV graphql api.

Compiling the Javascript requires NPM. Simply run `npm run build` and copy the `/dist` folder to your web server's static file directory.

### Usage

mvf1remote manages stream layout and currently supports a single 4k layout. This can be customized primarily in `/src/screens.js`.

To start a stream, open MV, pick your stream, start live timings, and open a single stream window. mvf1remote will automatically detect and move the window.

### Screenshots

![Layout Screen](/assets/home.jpg)

![Stream Screen](/assets/stream_control.jpg)
