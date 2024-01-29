const bestRoute = {
  async calculate(initialPoint, coordinates) {
    // Check if the list of coordinates is empty
    if (
      coordinates.length === 0 ||
      typeof initialPoint.coord_x === 'undefined' ||
      typeof initialPoint.coord_y === 'undefined'
    )
      return null

    // Array sorted with the closest points
    const closestWay = [initialPoint]

    // Sorting loop for coordinates
    while (closestWay.length < coordinates.length + 1) {
      let minDistance = Number.MAX_VALUE // Initialize with a very large value
      let closestPoint = null

      // Find the coordinate closest to the last added coordinate
      for (let i = 0; i < coordinates.length; i++) {
        if (!closestWay.includes(coordinates[i])) {
          const currentDistance = bestRoute.euclideanDistance(
            closestWay[closestWay.length - 1],
            coordinates[i]
          )

          // Check if the current distance is less than the minimum distance found so far
          if (currentDistance < minDistance) {
            minDistance = currentDistance
            closestPoint = coordinates[i]
          }
        }
      }

      // Add the closest coordinate to the closestWay array
      closestWay.push(closestPoint)
    }

    closestWay.push({ coord_x: 0, coord_y: 0 })

    return closestWay
  },

  euclideanDistance(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.coord_x - point1.coord_x, 2) +
        Math.pow(point2.coord_y - point1.coord_y, 2)
    )
  }
}

export default bestRoute
