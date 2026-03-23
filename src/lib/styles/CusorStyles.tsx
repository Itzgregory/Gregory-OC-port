export class CursorStyles {
  static getStyles(isHovering: boolean, isFilled: boolean) {
    const size = isHovering ? 40 : 8;
    const offset = isHovering ? -20 : -4;

    return {
      container: {
        width: size,
        height: size,
        marginLeft: offset,
        marginTop: offset,
        borderRadius: "50%",
        backgroundColor: this.getBackgroundColor(isHovering, isFilled),
        border: this.getBorder(isHovering, isFilled),
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1), height 0.3s cubic-bezier(0.4,0,0.2,1), margin 0.3s cubic-bezier(0.4,0,0.2,1), background-color 0.3s cubic-bezier(0.4,0,0.2,1), border 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        fontSize: "9px",
        letterSpacing: "0.05em"
      }
    };
  }

  private static getBackgroundColor(isHovering: boolean, isFilled: boolean): string {
    if (isFilled) return "hsl(var(--accent))";
    if (isHovering) return "transparent";
    return "hsl(var(--accent))";
  }

  private static getBorder(isHovering: boolean, isFilled: boolean): string {
    if (isHovering && !isFilled) {
      return "1.5px solid hsl(var(--accent))";
    }
    return "none";
  }
}