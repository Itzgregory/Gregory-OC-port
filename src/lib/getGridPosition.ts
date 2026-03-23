export const getGridPosition = (index: number) => {
    const positions = [
      "md:col-span-2 md:row-span-1", // First item - full width
      "md:col-span-1 md:row-span-1", // Second item
      "md:col-span-1 md:row-span-1", // Third item
      "md:col-span-2 md:row-span-1", // Fourth item - full width
    ];
    return positions[index % positions.length];
  };