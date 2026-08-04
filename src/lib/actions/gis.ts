"use server";

import { getGisLayer } from "@/lib/data/gis";
import type { GisLayerKey } from "@/lib/types/gis";

export async function getGisLayerAction(layer: GisLayerKey) {
  return getGisLayer(layer);
}
