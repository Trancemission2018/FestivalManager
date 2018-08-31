export default {
  methods: {

    getCentre(polygon) {

      // TODO implement this

      let twoTimesSignedArea = 0
      let cxTimes6SignedArea = 0
      let cyTimes6SignedArea = 0

      let length = polygon.length

      let x = function (i) {
        return polygon[i % length][0]
      }
      let y = function (i) {
        return polygon[i % length][1]
      }

      for (let i = 0; i < polygon.length; i++) {
        let twoSA = x(i) * y(i + 1) - x(i + 1) * y(i)
        twoTimesSignedArea += twoSA
        cxTimes6SignedArea += (x(i) + x(i + 1)) * twoSA
        cyTimes6SignedArea += (y(i) + y(i + 1)) * twoSA
      }
      let sixSignedArea = 3 * twoTimesSignedArea
      return [cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea]
    }

  }
}