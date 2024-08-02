// MyButton.tsx
import { extendVariants, Slider } from "@nextui-org/react";

export const MySlider = extendVariants(Slider, {
  variants: {
    // <- modify/add variants
    color: {
      blue: {
        filler: "bg-sliderTrackB",
        track: `border-s-sliderTrackB bg-slate-300`,
        thumb: "bg-sliderTrackB",
      },
      purple: {
        filler: "bg-sliderTrackP",
        track: `border-s-sliderTrackP bg-slate-300`,
        thumb: "bg-sliderTrackP",
      },
      green: {
        filler: "bg-sliderTrackG",
        track: `border-s-sliderTrackG bg-slate-300`,
        thumb: "bg-sliderTrackG",
      },
      yellow: {
        filler: "bg-sliderTrackY",
        track: `border-s-sliderTrackY bg-slate-300`,
        thumb: "bg-sliderTrackY",
      },
      red: {
        filler: "bg-sliderTrackR",
        track: `border-s-sliderTrackR bg-slate-300`,
        thumb: "bg-sliderTrackR",
      },
    },
  },
  defaultVariants: {},
  compoundVariants: [],
});
