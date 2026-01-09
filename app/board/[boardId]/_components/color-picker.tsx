"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";
import { Pipette} from "lucide-react";


interface ColorPickerProps {

    onChange: (color: Color) => void;
};


export const ColorPicker = ({
    onChange,
}: ColorPickerProps ) => {
    const AnyColorButton = ({ onChange }: { onChange: (c: Color) => void }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center group">
      <input
        type="color"
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
        onChange={(e) => {
          const hex = e.target.value;
          onChange({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16),
          });
        }}
      />
      <div className="w-8 h-8 rounded-md border border-neutral-300 flex items-center justify-center bg-white group-hover:bg-neutral-50 transition shadow-sm">
        <Pipette className="w-4 h-4 text-neutral-500" />
      </div>
    </div>
  );
};


    return (
        <div
        className="flex flex-wrap gap-2 items-center max-w-[164px] 
        pr-2 mr-2 border-r border-neutral-200"
        >
            <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
            <ColorButton color={{ r: 239, g: 60, b: 165 }} onClick={onChange} />
            <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
            <ColorButton color={{ r: 231, g: 76, b: 60 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 249, b: 196 }} onClick={onChange} />
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
            <AnyColorButton onChange={onChange} />

        </div>
    )
};

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
};

const ColorButton = ({
    onClick,
    color,
}: ColorButtonProps) => {
    return (
       <button
        className="w-8 h-8 items-center flex justify-center 
        hover:opacity-75 transition"
        onClick={() => onClick(color)}
       >
        <div className="h-8 w-8 rounded-md border border-neutral-300"
        style={{background: colorToCss(color)}}  />

    

       </button>
    )
}