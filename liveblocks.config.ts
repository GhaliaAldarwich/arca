import { 
  createClient,
  LiveList,
  LiveObject,
  LiveMap,
 } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Layer , Color  } from "@/types/canvas"

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});


export type Presence = {
  cursor?: { x: number; y: number } | null;
  selection: string[];
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  penColor: Color | null;

};


export type Shape = LiveObject<{
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
}>;

export type Storage = {

  Layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
};


export type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};


export const {
  RoomProvider,
  useOthers,
  useOthersMapped,
  useSelf,
  useMutation,
  useStorage,
  useHistory,
  useUndo,
  useRedo,
  useCanUndo,
  useCanRedo,
  useOthersConnectionIds,
} = createRoomContext<Presence, Storage, UserMeta>(client);
