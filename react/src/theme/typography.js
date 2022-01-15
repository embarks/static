import { css, createGlobalStyle } from "styled-components"
import AnticTtf from "../../assets/Antic-Regular.ttf"
import AnonymousProTtf from "../../assets/AnonymousPro-Regular.ttf"
import BerkshireSwash from "../../assets/BerkshireSwash-Regular.ttf"

const FONT_SIZES_PX = [11, 12, 14, 16, 20]

export const FontOverrides = createGlobalStyle`
@font-face {
  font-family: "Antic";
  src: url(${AnticTtf});
  font-weight: normal;
  font-size: normal;
}

@font-face {
  font-family: "BerkshireSwash";
  src: url(${BerkshireSwash});
  font-weight: normal;
  font-size: normal;
}

@font-face {
  font-family: "AnonymousPro";
  src: url(${AnonymousProTtf});
  font-weight: normal;
  font-size: normal;

  h1, h2 {
    font-family: 'BerkshireSwash', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }

  input, textarea, select {
    font-family: 'AnonymousPro', 'Courier New', Courier, monospace
  }

  code {
    font-family: 'AnonymousPro', 'Courier New', Courier, monospace;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-family: 'Antic', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    ${({ theme }) => theme.fonts.presets.default}
  }
}`

export default {
  presets: {
    default:
      // todo @embarks use theme
      css`
        font-family: "Antic", sans-serif;
        font-size: 18px;
        line-height: 1.5;
      `,
    fancy: css`
      font-size: 18px;
      font-family: "BerkshireSwash", serif;
    `,
    inline: css`
      font-family: "Antic", sans-serif;
      font-size: 18px;
      line-height: 22px;
      vertical-align: baseline;
    `,
  },
  sizes: FONT_SIZES_PX.map((v) => `${v}px`),
}
