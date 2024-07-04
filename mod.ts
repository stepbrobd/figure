import { imageSize } from "npm:image-size@1.1.1";
import { join } from "jsr:@std/path@0.225.2";

interface MarkdownIt {
  renderer: {
    rules: {
      image: (tokens: Token[], idx: number, options: any, env: any, self: any) => string;
    };
  };
}

interface Token {
  attrSet: (name: string, value: string) => void;
  attrGet: (name: string) => string | null;
}

interface PluginOptions {
  decoding?: boolean;
  base_path?: string;
  image_size?: boolean;
  figure?: boolean;
}

/**
 * Plugin for markdown-it.
 *
 * @param md - The markdown-it instance.
 * @param mdOptions - The options for the markdown-it instance.
 */
function lazy_loading_plugin(md: MarkdownIt, mdOptions: PluginOptions = {}) {
  const defaultImageRenderer = md.renderer.rules.image;

  md.renderer.rules.image = function (tokens: Token[], idx: number, options: any, env: any, self: any) {
    const token = tokens[idx];
    token.attrSet("loading", "lazy");

    if (mdOptions.decoding === true) {
      token.attrSet("decoding", "async");
    }

    if (mdOptions.base_path && mdOptions.image_size === true) {
      const imgSrc = token.attrGet("src") || "";
      const imgPath = join(mdOptions.base_path, imgSrc);
      try {
        const dimensions = imageSize(imgPath);
        if (dimensions.width && dimensions.height) {
          token.attrSet("width", dimensions.width.toString());
          token.attrSet("height", dimensions.height.toString());
        }
      } catch (error) {
        console.error(`Error getting image size for ${imgPath}:`, error);
      }
    }

    const renderedImage = defaultImageRenderer(tokens, idx, options, env, self);

    if (mdOptions.figure === true) {
      const altText = token.attrGet("alt") || "";
      return `<figure>${renderedImage}<figcaption>${altText}</figcaption></figure>`;
    }

    return renderedImage;
  };
}

export default lazy_loading_plugin;