export class RouteAnimator {
  private map: google.maps.Map;
  private path: google.maps.LatLng[];
  private polyline: google.maps.Polyline;
  private step = 0;
  private numSteps = 200;
  private animationInterval: number | null = null;

  constructor(
    map: google.maps.Map,
    pathCoordinates: google.maps.LatLng[],
    options: google.maps.PolylineOptions = {}
  ) {
    this.map = map;
    this.path = pathCoordinates;
    this.polyline = new google.maps.Polyline({
      ...options,
      path: [],
      map: this.map,
    });
  }

  animate(duration: number = 2000): Promise<void> {
    return new Promise((resolve) => {
      this.step = 0;
      const intervalTime = duration / this.numSteps;

      if (this.animationInterval) {
        clearInterval(this.animationInterval);
      }

      this.animationInterval = window.setInterval(() => {
        const progress = this.step / this.numSteps;
        const numPoints = Math.floor(progress * this.path.length);

        this.polyline.setPath(this.path.slice(0, numPoints));

        if (this.step >= this.numSteps) {
          if (this.animationInterval) clearInterval(this.animationInterval);
          resolve();
        }
        this.step++;
      }, intervalTime);
    });
  }

  getPolyline(): google.maps.Polyline {
    return this.polyline;
  }

  remove() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.polyline.setMap(null);
  }
}
