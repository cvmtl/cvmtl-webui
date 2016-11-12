export function getIcon(type, color) {
  return L.ExtraMarkers.icon({
      icon: 'fa-'+ type,
      markerColor: color,
      shape: 'circle',
      prefix: 'fa'
  });
};
