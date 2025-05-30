# directus-extension-image-preview

This Directus custom interface allows to preview images based on other fields.

![Directus Extension Image Preview Overview](/docs/directus-extension-image-preview-overview.png)

## Install

Install directly from Marketplace by searching for Image Preview or alternatively do:

```sh
$ npm run build
$ cp package.json dist directus/extensions/directus-extension-image-preview
```

## Enable the extension

After installing the extension you can add it to any collection inside your Directus project.

### Options

- **Source**: choose the field that has the URL for the image you want to show
- **Alternative Text**: choose a text to display in case the image is missing. Can also be based on another field
- **Width**: defines the width of the image. If no units are passed, "px" will be used
- **Height**: defines the height of the image. If no units are passed, "px" will be used
- **Fit**: defines how image should fit within the dimensions specified above. Defaults to "contain"

Keywords:
directus, interface, extension, image, preview, link, url, external, thumbnail, reactive, calculated, computed, img
