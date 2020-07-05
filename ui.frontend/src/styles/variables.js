const colors = {
  black: '#202020',
  gray: '#696969',
  grayLight: '#EBEBEB',
  grayLighter: '#F7F7F7',
  white: '#FFFFFF',
  yellow: '#FFEA00',
  blue: '#0045FF',
};

const typography = {
  fontFamilySansSerif: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontFamilySerif: 'Georgia, "Times New Roman", Times, serif',

  fontSizeBase: '18px',
  lineHeightBase: 1.5,
};

// Functional Colors
export const theme = {
  ...colors,
  brandPrimary: colors.yellow,
  bodyBg: colors.white,
  textColor: colors.black,
  textColorInverse: colors.grayLight,
  linkColor: colors.blue,

  ...typography,
  fontFamilyBase: typography.fontFamilySansSerif,
  lineHeightComputed: `${Math.floor(
    parseInt(typography.fontSizeBase.replace('px', '')) *
      typography.lineHeightBase,
  )}px`,

  //Layout
  maxWidth: '1024px',

  // Spacing
  gutterPadding: '12px',
};
