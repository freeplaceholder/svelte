import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/svelte";
import { configure } from "@freeplaceholder/core";
import Avatar from "../src/Avatar.svelte";

describe("Svelte Avatar component", () => {
  beforeEach(() => {
    configure({ baseUrl: "https://freeplaceholder.com" });
  });

  it("renders an img element", () => {
    const { container } = render(Avatar, { name: "John Doe" });
    expect(container.querySelector("img")).not.toBeNull();
  });

  it("sets correct src with name", () => {
    const { container } = render(Avatar, { name: "John Doe" });
    expect(container.querySelector("img")!.getAttribute("src")).toContain("/avatar/John%20Doe");
  });

  it("sets alt text to name by default", () => {
    const { container } = render(Avatar, { name: "Jane Smith" });
    expect(container.querySelector("img")!.getAttribute("alt")).toBe("Jane Smith");
  });

  it("uses custom alt text", () => {
    const { container } = render(Avatar, { name: "Test", alt: "Custom alt" });
    expect(container.querySelector("img")!.getAttribute("alt")).toBe("Custom alt");
  });

  it("defaults size to 128", () => {
    const { container } = render(Avatar, { name: "Test" });
    const img = container.querySelector("img")!;
    expect(img.getAttribute("width")).toBe("128");
    expect(img.getAttribute("height")).toBe("128");
  });

  it("uses custom size", () => {
    const { container } = render(Avatar, { name: "Test", size: 64 });
    const img = container.querySelector("img")!;
    expect(img.getAttribute("width")).toBe("64");
    expect(img.getAttribute("height")).toBe("64");
  });

  it("applies lazy loading by default", () => {
    const { container } = render(Avatar, { name: "Test" });
    expect(container.querySelector("img")!.getAttribute("loading")).toBe("lazy");
  });

  it("does not apply loading when lazy is false", () => {
    const { container } = render(Avatar, { name: "Test", lazy: false });
    expect(container.querySelector("img")!.getAttribute("loading")).toBeNull();
  });

  it("sets inline placeholder SVG background when lazy", () => {
    const { container } = render(Avatar, { name: "Test", lazy: true });
    const style = container.querySelector("img")!.getAttribute("style") ?? "";
    expect(style).toContain("background-image");
  });

  it("does not set background when lazy is false", () => {
    const { container } = render(Avatar, { name: "Test", lazy: false });
    const style = container.querySelector("img")!.getAttribute("style") ?? "";
    expect(style).not.toContain("background-image");
  });

  it("includes bg in src URL", () => {
    const { container } = render(Avatar, { name: "Test", bg: "10b981" });
    expect(container.querySelector("img")!.getAttribute("src")).toContain("bg=10b981");
  });

  it("includes gradient params in src URL", () => {
    const { container } = render(Avatar, {
      name: "Test", gradient: "radial", from: "ff0000", to: "0000ff",
    });
    const src = container.querySelector("img")!.getAttribute("src") ?? "";
    expect(src).toContain("gradient=radial");
    expect(src).toContain("from=ff0000");
    expect(src).toContain("to=0000ff");
  });

  it("includes via in gradient URL", () => {
    const { container } = render(Avatar, {
      name: "Test", gradient: "to-b", from: "ff0000", via: "00ff00", to: "0000ff",
    });
    expect(container.querySelector("img")!.getAttribute("src")).toContain("via=00ff00");
  });

  it("sets bg color in inline placeholder SVG", () => {
    const { container } = render(Avatar, { name: "Test", bg: "10b981", lazy: true });
    const style = container.querySelector("img")!.getAttribute("style") ?? "";
    expect(style).toContain("%2310b981");
  });

  it("lazy false with no style prop produces no style attribute", () => {
    const { container } = render(Avatar, { name: "Test", lazy: false });
    const style = container.querySelector("img")!.getAttribute("style");
    expect(style === null || style === "").toBe(true);
  });

  it("passes extra data attributes to img", () => {
    const { container } = render(Avatar, { name: "Test", "data-testid": "av" } as any);
    expect(container.querySelector("img")!.getAttribute("data-testid")).toBe("av");
  });

  it("excludes passed style from safeAttrs but uses it in mergedStyle", () => {
    const { container } = render(Avatar, { name: "Test", lazy: false, style: "color: red;" } as any);
    const style = container.querySelector("img")!.getAttribute("style");
    expect(style).toContain("color");
  });
});
