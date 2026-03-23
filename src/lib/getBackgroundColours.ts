export const getBackgroundStyle = (index: number) => {
    const backgrounds = [
      { bg: "hsl(var(--ink-primary))", titleColor: "hsl(var(--background))", metaColor: "hsl(var(--ink-muted))" },
      { bg: "hsl(var(--background-hover))", titleColor: "hsl(var(--ink-primary))", metaColor: "hsl(var(--ink-muted))" },
      { bg: "hsl(var(--accent))", titleColor: "hsl(var(--background))", metaColor: "hsla(40,33%,96%,0.7)" },
      { bg: "hsl(var(--background))", titleColor: "hsl(var(--ink-primary))", metaColor: "hsl(var(--ink-muted))" },
    ];
    return backgrounds[index % backgrounds.length];
  };