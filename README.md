# e-gui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Fejlesztés (így történt)

# Font awesome telepítése
```json
  "dependencies": {
    "@fortawesome/fontawesome-free": "^5.15.2",ű...
    }
```
ezt követően hozzáadtam a szükséges beállításokat a main.ts-ben
```html
main.ts
// fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
```
használata:
```html
<i class="fas fa-arrow-left"></i>
```

# axios 
http kérésekhez

npm install --save axios vue-axios

```javascript
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
...

Vue.use(VueAxios, axios)
```

# vueutify
mindent szépen beállít, de csak commit után, mert mindent felülírhat
```javascript
vue add vuetify
```
