export default function EnableViewTransition() {
  const css = `
        @view-transition {
            navigation: auto;
        }
    `;
  return <style>{css}</style>;
}
