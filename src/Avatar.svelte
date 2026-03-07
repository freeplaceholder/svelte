<script lang="ts">
  import { avatarPlaceholderSvg, avatarUrl, toAvatarOptions } from "@freeplaceholder/core";
  import type {
    BorderStyle,
    FontWeight,
    GradientDirection,
    ImageFormat,
    LetterSpacing,
    Rounded,
    TextDecoration,
  } from "@freeplaceholder/core";

  export let name: string;
  export let size: number = 128;
  export let format: ImageFormat | undefined = undefined;
  export let bg: string | undefined = undefined;
  export let gradient: GradientDirection | undefined = undefined;
  export let from: string | undefined = undefined;
  export let via: string | undefined = undefined;
  export let to: string | undefined = undefined;
  export let textColor: string | undefined = undefined;
  export let textDecoration: TextDecoration | undefined = undefined;
  export let letterSpacing: LetterSpacing | string | undefined = undefined;
  export let fontWeight: FontWeight | undefined = undefined;
  export let opacity: number | undefined = undefined;
  export let grayscale: boolean | undefined = undefined;
  export let blur: number | undefined = undefined;
  export let brightness: number | undefined = undefined;
  export let contrast: number | undefined = undefined;
  export let hueRotate: number | undefined = undefined;
  export let invert: boolean | undefined = undefined;
  export let saturate: number | undefined = undefined;
  export let sepia: boolean | undefined = undefined;
  export let border: number | undefined = undefined;
  export let borderColor: string | undefined = undefined;
  export let borderStyle: BorderStyle | undefined = undefined;
  export let rounded: Rounded | number | undefined = undefined;
  export let lazy: boolean = true;
  export let alt: string | undefined = undefined;

  $: src = avatarUrl(
    toAvatarOptions({
      name, size, format, bg, gradient, from, via, to, textColor, textDecoration,
      letterSpacing, fontWeight, opacity, grayscale, blur,
      brightness, contrast, hueRotate, invert, saturate,
      sepia, border, borderColor, borderStyle, rounded,
    }),
  );
  $: altText = alt ?? name;
  $: inlinePlaceholder = lazy ? avatarPlaceholderSvg(size, bg) : undefined;
  $: bgStyle = inlinePlaceholder
    ? `background-image: url("${inlinePlaceholder}"); background-size: cover;`
    : "";
  $: mergedStyle = bgStyle + ($$restProps.style ?? "");
  $: safeAttrs = Object.fromEntries(Object.entries($$restProps).filter(([k]) => k !== "style"));
</script>

<img
  {src}
  alt={altText}
  width={size}
  height={size}
  loading={lazy ? "lazy" : undefined}
  style={mergedStyle || undefined}
  {...safeAttrs}
/>
