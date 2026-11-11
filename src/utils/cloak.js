export const CLOAK_PRESETS = {
  'none': {
    title: 'Nova Unblocked Arcade',
    favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M6 12h4m-2-2v4m7-3a1 1 0 11-2 0 1 1 0 012 0zm3 2a1 1 0 11-2 0 1 1 0 012 0zM4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z'/></svg>"
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
