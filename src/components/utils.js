/* Utility functions for processing Near Earth Object NEO data.*/

/* transformData: Converts raw api data into a structured format with essential propertiesname, min and max estimated diameters, and orbiting body  */
export const transformData = (data) => {
  return data.map((neo) => ({
    name: neo.name,
    minDiameter: neo.estimated_diameter.kilometers.estimated_diameter_min,
    maxDiameter: neo.estimated_diameter.kilometers.estimated_diameter_max,
    orbitingBody: neo.close_approach_data[0]?.orbiting_body || "Unknown",
  }));
};
/* sortDataByAverageDiameter: Sorts the NEO data in descending order based on the average diameter to prioritize larger objects.*/
export const sortDataByAverageDiameter = (data) => {
  return [...data].sort((a, b) => {
    const avgA = (a.minDiameter + a.maxDiameter) / 2;
    const avgB = (b.minDiameter + b.maxDiameter) / 2;
    return avgB - avgA;
  });
};
