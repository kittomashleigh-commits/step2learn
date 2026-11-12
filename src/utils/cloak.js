export const CLOAK_PRESETS = {
  'none': {
    title: 'Nova Unblocked Arcade',
    favicon: '/favicon.svg'
  },
  'google-docs': {
    title: 'Google Docs - Unit 3 World History Notes',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  'google-classroom': {
    title: 'Classes - Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  'canvas': {
    title: 'Dashboard - Canvas LMS',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  },
  'wikipedia': {
    title: 'Cellular respiration - Wikipedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  },
  'desmos': {
    title: 'Desmos | Graphing Calculator',
    favicon: 'https://www.desmos.com/favicon.ico'
  }
};

export const DEFAULT_CLOAK_CONFIG = {
  preset: 'none',
  customTitle: '',
  customFavicon: '',
  panicKey: 'Escape',
  panicAction: 'disguise',
  panicRedirectUrl: 'https://classroom.google.com'
};

export function applyCloak(config) {
  let title = 'Nova Unblocked Arcade';
  let favicon = CLOAK_PRESETS['none'].favicon;

  if (config.preset !== 'none') {
    const p = CLOAK_PRESETS[config.preset];
    if (p) {
      title = p.title;
      favicon = p.favicon;
    }
  }

  if (config.customTitle && config.customTitle.trim()) {
    title = config.customTitle.trim();
  }
  if (config.customFavicon && config.customFavicon.trim()) {
    favicon = config.customFavicon.trim();
  }

  document.title = title;

  let link = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = favicon;
}
