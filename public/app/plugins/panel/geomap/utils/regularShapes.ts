import { Fill, RegularShape, Stroke, Style, Circle } from 'ol/style';
import { Registry, RegistryItem } from '@grafana/data';
import { ResourceDimensionConfig } from 'app/features/dimensions/types';

interface MarkerMaker extends RegistryItem {
  make: (color: string, fillColor: string, radius: number) => Style;
  hasFill: boolean;
}

export const circleMarker: MarkerMaker = {
  id: 'circle',
  name: 'Circle',
  hasFill: true,
  make: (color: string, fillColor: string, radius: number) => {
    return new Style({
      image: new Circle({
        stroke: new Stroke({ color: color }),
        fill: new Fill({ color: fillColor }),
        radius: radius,
      }),
    });
  },
};

export const markerMakers = new Registry<MarkerMaker>(() => [
  circleMarker,
  {
    id: 'square',
    name: 'Square',
    hasFill: true,
    make: (color: string, fillColor: string, radius: number) => {
      return new Style({
        image: new RegularShape({
          fill: new Fill({ color: fillColor }),
          stroke: new Stroke({ color: color, width: 1 }),
          points: 4,
          radius: radius,
          angle: Math.PI / 4,
        }),
      });
    },
  },
  {
    id: 'triangle',
    name: 'Triangle',
    hasFill: true,
    make: (color: string, fillColor: string, radius: number) => {
      return new Style({
        image: new RegularShape({
          fill: new Fill({ color: fillColor }),
          stroke: new Stroke({ color: color, width: 1 }),
          points: 3,
          radius: radius,
          rotation: Math.PI / 4,
          angle: 0,
        }),
      });
    },
  },
  {
    id: 'star',
    name: 'Star',
    hasFill: true,
    make: (color: string, fillColor: string, radius: number) => {
      return new Style({
        image: new RegularShape({
          fill: new Fill({ color: fillColor }),
          stroke: new Stroke({ color: color, width: 1 }),
          points: 5,
          radius: radius,
          radius2: radius * 0.4,
          angle: 0,
        }),
      });
    },
  },
  {
    id: 'cross',
    name: 'Cross',
    hasFill: false,
    make: (color: string, fillColor: string, radius: number) => {
      return new Style({
        image: new RegularShape({
          fill: new Fill({ color: fillColor }),
          stroke: new Stroke({ color: color, width: 1 }),
          points: 4,
          radius: radius,
          radius2: 0,
          angle: 0,
        }),
      });
    },
  },
  {
    id: 'x',
    name: 'X',
    hasFill: false,
    make: (color: string, fillColor: string, radius: number) => {
      return new Style({
        image: new RegularShape({
          fill: new Fill({ color: fillColor }),
          stroke: new Stroke({ color: color, width: 1 }),
          points: 4,
          radius: radius,
          radius2: 0,
          angle: Math.PI / 4,
        }),
      });
    },
  },
]);

export enum SVGMarkerType {
  circle = 'img/icons/geo/circle.svg',
  square = 'img/icons/geo/square-shape.svg',
  triangle = 'img/icons/geo/triangle.svg',
  star = 'img/icons/geo/star.svg',
  cross = 'img/icons/geo/plus.svg',
  x = 'img/icons/geo/circle.svg',
}

export const svgMarkerMatch = (svgPath: ResourceDimensionConfig): string | undefined => {
  for (const [key, val] of Object.entries(SVGMarkerType)) {
    if (val === svgPath.fixed) {
      return key;
    }
  }
  return undefined;
};
