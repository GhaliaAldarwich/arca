import { Camera, Color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


const COLORS = [
"#DC2626",
"#D97706",
"#059669",
"#7C3AED",
"#DB2777",

];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number ) : string {
  return COLORS[connectionId % COLORS.length ];
};

export function pointerEventToCanvasPoint (
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g
    .toString(16)
    .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}


export function resizeBounds(
  bounds: XYWH,
  corner: Side,
  point: Point
): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  };
  
  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);

  }

  if((corner & Side.Right) === Side.Right) {
  result.x = Math.min(point.x, bounds.x);
  result.width = Math.abs(point.x - bounds.x);

  }

  if((corner & Side.Top) === Side.Top ) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ( (corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y );
    result.height = Math.abs(point.y - bounds.y);

  }


  return result;
};

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point,
) {
  const rect = {
    x: Math.min(a.x, b.x), // Finds the smallest coordinate to set as the Origin (x, y).
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x), // Calculates the absolute distance
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for ( const layerId of layerIds ) {
    const layer = layers.get(layerId);

    if ( layer == null) {
      continue;
    }

    const {x, y , height , width} = layer;

    if(
      rect.x + rect.width > x && // Is the right edge of your selection box further right than the left edge of the shape?
      rect.x < x + width && // Is the left edge of your selection box further left than the right edge of the shape?
      rect.y + rect.height > y && // Is the bottom edge of your selection box lower than the top edge of the shape?
      rect.y < y + height  // Is the top edge of your selection box higher than the bottom edge of the shape?
    ) {
      ids.push(layerId); // If all four conditions are True, the shape is mathematically "inside" or "touching" your selection box,
      //  and its id is added to the list of selected items.
    }
  }
  return ids;
};

export function getContrastingTextColor(color: Color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
};

export function penPointsToPathLayer(
  points: number[][],
  color: Color,

): PathLayer {

  if(points.length < 2 ){
    throw new Error("Cannot transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for ( const point of points) {
    const [x,y] = point;

    if(left > x) {
      left = x; // If the mouse is at 500, 500 is smaller than Infinity
    }

    if(top > y ) {
      top= y;
    }

    if(right < x ) {  // bigger than Negative Infinity
      right = x;
    }

    if(bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x- left, y- top , pressure]), // Point 1: 500 - 500 = 0 
    // Point 2: 510 - 500 = 10 I have a line that is 10 pixels long starting at 0.
  };
};

export function getSvgPathFromStroke(stroke: number[][]): string {
  if (!stroke.length) return "";

  const d = stroke.reduce<Array<string | number>>(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(
        x0,
        y0,
        (x0 + x1) / 2,
        (y0 + y1) / 2
      );
      return acc;
    },
    ["M", stroke[0][0], stroke[0][1], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}

