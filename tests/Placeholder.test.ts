import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/svelte";
import { configure } from "@freeplaceholder/core";
import Placeholder from "../src/Placeholder.svelte";

describe("Svelte Placeholder component", () => {
  beforeEach(() => {
    configure({ baseUrl: "https://freeplaceholder.com" });
  });

  it("renders an img element", () => {
    const { container } = render(Placeholder, { width: 600, height: 400 });
    expect(container.querySelector("img")).not.toBeNull();
  });

  it("sets correct src with width and height", () => {
    const { container } = render(Placeholder, { width: 600, height: 400 });
    expect(container.querySelector("img")!.getAttribute("src")).toContain("600x400");
  });

  it("sets default alt text", () => {
    const { container } = render(Placeholder, { width: 300, height: 200 });
    expect(container.querySelector("img")!.getAttribute("alt")).toBe("300×200 placeholder");
  });

  it("uses custom alt text", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, alt: "Custom alt" });
    expect(container.querySelector("img")!.getAttribute("alt")).toBe("Custom alt");
  });

  it("applies lazy loading by default", () => {
    const { container } = render(Placeholder, { width: 100, height: 100 });
    expect(container.querySelector("img")!.getAttribute("loading")).toBe("lazy");
  });

  it("does not apply loading when lazy is false", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, lazy: false });
    expect(container.querySelector("img")!.getAttribute("loading")).toBeNull();
  });

  it("sets inline placeholder SVG background when lazy", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, lazy: true });
    const style = container.querySelector("img")!.getAttribute("style") ?? "";
    expect(style).toContain("background-image");
  });

  it("does not set background when lazy is false", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, lazy: false });
    const style = container.querySelector("img")!.getAttribute("style") ?? "";
    expect(style).not.toContain("background-image");
  });

  it("includes bg in src URL", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, bg: "3b82f6" });
    expect(container.querySelector("img")!.getAttribute("src")).toContain("bg=3b82f6");
  });

  it("includes gradient params in src URL", () => {
    const { container } = render(Placeholder, {
      width: 100, height: 100, gradient: "to-r", from: "3b82f6", to: "ec4899",
    });
    const src = container.querySelector("img")!.getAttribute("src") ?? "";
    expect(src).toContain("gradient=to-r");
    expect(src).toContain("from=3b82f6");
    expect(src).toContain("to=ec4899");
  });

  it("includes via in gradient URL", () => {
    const { container } = render(Placeholder, {
      width: 100, height: 100, gradient: "to-r", from: "3b82f6", via: "8b5cf6", to: "ec4899",
    });
    expect(container.querySelector("img")!.getAttribute("src")).toContain("via=8b5cf6");
  });

  it("sets bg color in inline placeholder SVG", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, bg: "ff0000", lazy: true });
    const style = container.querySelector("img")!.getAttribute("style") ?? "";
    expect(style).toContain("background-image");
    expect(style).toContain("%23ff0000");
  });

  it("lazy false with no style prop produces no style attribute", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, lazy: false });
    const style = container.querySelector("img")!.getAttribute("style");
    expect(style === null || style === "").toBe(true);
  });

  it("passes extra data attributes to img", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, "data-testid": "ph" } as any);
    expect(container.querySelector("img")!.getAttribute("data-testid")).toBe("ph");
  });

  it("excludes passed style from safeAttrs but uses it in mergedStyle", () => {
    const { container } = render(Placeholder, { width: 100, height: 100, lazy: false, style: "color: red;" } as any);
    const style = container.querySelector("img")!.getAttribute("style");
    expect(style).toContain("color");
  });
});
