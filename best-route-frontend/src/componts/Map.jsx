import React from 'react';

const Map = ({ points }) => {
  // Check if points array is empty
  if (points.length === 0) {
    return null; // or handle the case when there are no points
  }

  // Find the minimum and maximum values for the x and y axes
  const minX = Math.min(...points.map((point) => point.coord_x));
  const minY = Math.min(...points.map((point) => point.coord_y));
  const maxX = Math.max(...points.map((point) => point.coord_x));
  const maxY = Math.max(...points.map((point) => point.coord_y));

  // Calculate the center position
  const centerX = (maxX - minX) / 2 + minX;
  const centerY = (maxY - minY) / 2 + minY;

  // Size of the Cartesian plane
  const width = maxX - minX + 20;
  const height = maxY - minY + 20;

  // Function to convert coordinates from the plane to pixels
  const convertToPixel = (coord_x, coord_y) => ({
    x: (coord_x - centerX) * 20 + width * 10,
    y: (centerY - coord_y) * 20 + height * 10,
  });

  // Function to calculate intermediate points
  const calculateIntermediatePoints = (point1, point2, interval) => {
    const intermediatePoints = [];
    const totalDistance = Math.hypot(point2.x - point1.x, point2.y - point1.y);
    const numberOfIntervals = Math.floor(totalDistance / interval);

    for (let i = 1; i <= numberOfIntervals; i++) {
      const ratio = i / (numberOfIntervals + 1);
      const intermediateX = point1.x + ratio * (point2.x - point1.x);
      const intermediateY = point1.y + ratio * (point2.y - point1.y);
      intermediatePoints.push({ x: intermediateX, y: intermediateY });
    }

    return intermediatePoints;
  };

  // Function to add arrows every 5 pixels
  const addArrows = (points, interval) => {
    const arrowPoints = [];
    for (let i = 1; i < points.length; i++) {
      const currentPoint = points[i - 1];
      const nextPoint = points[i];
      const intermediatePoints = calculateIntermediatePoints(
        currentPoint,
        nextPoint,
        interval
      );
      arrowPoints.push(...intermediatePoints);
    }
    return arrowPoints;
  };

  // Convert all points to pixel coordinates
  const allPoints = points.map((point) =>
    convertToPixel(point.coord_x, point.coord_y)
  );

  // Add arrows to the intermediate points
  const arrowPoints = addArrows(allPoints, 5);

  return (
    <div
      style={{
        position: 'relative',
        width: `${width * 20}px`,
        height: `${height * 20}px`,
      }}
    >
      {/* Line connecting all points */}
      <svg
        height={`${height * 20}px`}
        width={`${width * 20}px`}
        style={{ position: 'absolute' }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>
        <polyline
          points={arrowPoints
            .map((point) => `${point.x},${point.y}`)
            .join(' ')}
          fill="none"
          stroke="black"
          strokeWidth=""
          markerEnd="url(#arrowhead)"
        />
      </svg>

      {/* Points */}
      {points.map((point, index) => {
        const { x, y } = convertToPixel(point.coord_x, point.coord_y);
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                background: 'blue',
                borderRadius: '50%',
              }}
            />
            {point.name && (
              <div style={{ position: 'absolute', left: '15px', top: '-5px' }}>
                {`${point.name} (${point.coord_x}, ${point.coord_y})`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Map;
