module.exports = {
  pwa: {
    name: 'Learning Management System',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#0D47A1',
    manifestOptions: {
      theme_color: '#0D47A1',
      background_color: '#0D47A1',
      appleMobileWebAppCapable: 'yes',
      appleTouchStartupImage: 'img/icons/icon-192x192.png',
      display: 'fullscreen',
      scope: '/',
      start_url: '/',
      description: 'Monsterlabs',
      icons: [
        {
          src: '/img/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/img/icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: '/img/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: '/img/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    iconPaths: {
      favicon32: 'icons/favicon-32x32.png',
      favicon16: 'icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/icon-192x192.png',
      maskIcon: '/img/icons/icon-192x192.png',
      msTileImage: '/img/icons/icon-192x192.png'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }
}
