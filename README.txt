SITE PRODUCTION - DEFAULT URL + PWA FIX

Changes:
- default Apps Script URL preloaded:
  https://script.google.com/macros/s/AKfycby6yq5D6JGx7mWpU6nvm8InKgMAwO9ii78S0bpFv6aMjBg_RW36_tcXbMB0f3ePZGfnIQ/exec
- default Drive folder ID preloaded:
  1G79CkWu-4Zie7YlXU6m_5ww3PQ7sHKuC
- new devices can pull master sheets before any entry exists
- fixed service worker registration path to sw.js
- fixed manifest icon paths
- added install button support for Android Chrome

Important for install on Android:
- must be opened from GitHub Pages over HTTPS
- open in Chrome on Android
- after uploading, hard refresh once
- if old version is cached, clear site data or uninstall old app first
