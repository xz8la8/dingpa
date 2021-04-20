type UnloadAssets = () => void;

export default function loadAssets(scripts: string[], styles: string[]): Promise<UnloadAssets> {
  const scriptsMounter = document.createDocumentFragment();
  const stylesMounter = document.createDocumentFragment();
  const scriptElems: HTMLElement[] = [];
  const styleElems: HTMLElement[] = [];

  styles.forEach((style) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = style;
    styleElems.push(link);
    stylesMounter.appendChild(link);
  });

  document.head.appendChild(stylesMounter);

  let loadedCount = 0;

  const promise: Promise<UnloadAssets> = new Promise((resolve, reject) => {
    scripts.forEach((script) => {
      const scriptElem = document.createElement('script');

      scriptElem.onload = () => {
        loadedCount += 1;
        if (loadedCount === scripts.length) {
          resolve(() => {
            scriptElems.forEach((elem) => {
              elem.remove();
            });
            styleElems.forEach((elem) => {
              elem.remove();
            });
          });
        }
      };

      scriptElem.onerror = (e) => {
        reject(e);
      };

      scriptElem.type = 'text/javascript';
      scriptElem.async = false;
      scriptElem.src = script;

      scriptElems.push(scriptElem);
      scriptsMounter.appendChild(scriptElem);
    });
  });

  document.body.appendChild(scriptsMounter);

  return promise;
}
