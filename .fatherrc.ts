export default {
  disableTypeCheck: true,
  cjs: { type: "babel", lazy: true },
  esm: {
    type: "babel",
    importLibToEs: true,
  },
  pkgs: [
    'app',
    'dingpa',
    'shared'
  ],
};
