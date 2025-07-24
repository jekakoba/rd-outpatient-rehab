# Vite -based assembly template

This project is a web -developed template based on [Vite] (https://vitejs.dev/), supporting components, styles on SCSS, optimization of images, as well as a flexible HTML management system through `Posttml`. This template is suitable for creating modern, fast and light websites.

## Basic features

 - ** Component structure HTML **- Use `@vituum/vite-plugin-posthtml` and additional plugins to work with HTML components.
 -** SCSS styles **-automatic import styles of components with `SRC/HTML/Components/` using `vite-plugin-suss-glob-import`.
 -** CSS ** Optimization-Use `vite-Plugin-Purgecss` to remove unnecessary CSS-stilers when assembling.
 - ** image processing **- automatic compression of images and creation of Webp versions with `vite-plugin-imagemin`.
 - ** SVG and fonts ** - font conversion and creation of icon font with SVG using `SVGTOFONT '.

## Settings

 - ** Snippets **: at the root of the project is `Snippets.json`, which contains the recommended snow 5 for ease of work with the template.
 - ** Template configuration **: `TEMPlate.config.js` - Configuration file for template settings.
 -** Font conversion **: SVG-Icons are added to FONTS-Convert/Icons/`, and TTF fonts are added in the FONTS-Convert/` fonts. The conversion results are stored in `SRC/assets/fonts/`.

## scripts

- `yarn d` - Starts the development server.
- `yarn b` - Collects a project for production.
- `yarn p` -Starts the server to view the bill.
- `yarn f` - Generates icon font (if new icons are added) and converts fonts.
- `yarn i` - Generates only icon font (useful for updating or adding icons).

## Documentation

- /documentation/docs.html