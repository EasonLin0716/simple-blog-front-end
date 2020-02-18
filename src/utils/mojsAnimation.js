import mojs from '@mojs/core'

export const clapEffect = function(clap, scaleButtonEl, countAnimationEl) {
  const tlDuration = 300
  const triangleBurst = new mojs.Burst({
    parent: clap,
    radius: { 50: 95 },
    count: 5,
    angle: 30,
    children: {
      shape: 'polygon',
      radius: { 6: 0 },
      scale: 1,
      stroke: 'rgba(211,84,0 ,0.5)',
      strokeWidth: 2,
      angle: 210,
      delay: 30,
      speed: 0.2,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      duration: tlDuration
    }
  })
  const circleBurst = new mojs.Burst({
    parent: clap,
    radius: { 50: 75 },
    angle: 25,
    duration: tlDuration,
    children: {
      shape: 'circle',
      fill: 'rgba(149,165,166 ,0.5)',
      delay: 30,
      speed: 0.2,
      radius: { 3: 0 },
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
    }
  })
  const scaleButton = new mojs.Html({
    el: scaleButtonEl,
    duration: tlDuration,
    scale: { 1: 1.3 },
    easing: mojs.easing.out
  }).then({
    duration: tlDuration,
    scale: { 1.3: 1 },
    easing: mojs.easing.out
  })
  const countAnimation = new mojs.Html({
    el: countAnimationEl,
    isShowStart: false,
    isShowEnd: true,
    y: { 0: -30 },
    opacity: { 0: 1 },
    duration: tlDuration
  }).then({
    opacity: { 1: 0 },
    y: -80,
    delay: tlDuration / 2
  })
  const animationTimeline = new mojs.Timeline()
  animationTimeline.add([
    triangleBurst,
    circleBurst,
    countAnimation,
    scaleButton
  ])
  clap.addEventListener('click', () => {
    animationTimeline.replay()
  })
}
