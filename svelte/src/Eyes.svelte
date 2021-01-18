<script>
  import { onMount } from "svelte"
  import { tweened } from "svelte/motion"
  import { backOut } from "svelte/easing"

  export let express
  export let close = false
  export let eyes = {
    left: null,
    right: null
  }
  let eyePos = {
    left: null,
    right: null,
    elem: {
      left: null,
      right: null
    }
  }

  let div, rect, narrow
  let x = tweened(50, {
    duration: 400,
    easing: backOut
  })
  let y = tweened(50, {
    duration: 400,
    easing: backOut
  })
  let sx = `${$x}%`
  let sy = `${$y}%`

  function resetRects () {
    if (div) rect = div.getBoundingClientRect()
    narrow = rect && rect.width && rect.width < 500
    for (const side in eyes) {
      const eye = eyes[side]
      if (eye) {
        const eyeRect = eye.getBoundingClientRect()
        eyePos[side] = eyeRect
      }
    }
  }

  onMount(resetRects)

  $: {
    if (!close) {
      sx = `${$x > 100 ? 100 : $x < 0 ? 0 : $x}%`
      sy = `${$y > 100 ? 100 : $y < 0 ? 0 : $y}%`
    }
  }

  function isTouchingEye(side, { touchX, touchY }) {
    for (const side in eyes) {
      const eye = eyePos.elem[side]
      if (eye) {
        const eyeRect = eye.getBoundingClientRect()
        eyePos[side] = eyeRect
      }
    }
    const {
      top,
      right,
      bottom, 
      left
    } = eyePos[side]
    
    const isTouching = (
      touchX > left && 
      touchX < right && 
      touchY < bottom && 
      touchY > top
    )

    return isTouching
  }

  function blinkOnTouch ({ touchX, touchY }) {
    for (const side in eyes) {
      const eye = eyes[side]
      if (eye) {
        const close = mouseEnterEye(eye)
        const open = mouseLeaveEye(eye)
        if (isTouchingEye(side, { touchX, touchY })) close(event)
        else open(event)
      }
    }
  }

  function handleTouch (event) {
    const touchX = event.changedTouches[0].clientX
    const touchY = event.changedTouches[0].clientY
    blinkOnTouch({ touchX, touchY })

    handleMousemove({
      ...event,
      clientX: touchX,
      clientY: touchY
    })
  }

  function handleMousemove (event) {
    if (!close) {
      $x = (event.clientX - rect.left) / rect.width * 100
      $y = (event.clientY - rect.top) / rect.height * 100
    }
  }

  function mouseEnterEye (eye) {
    return () => {
      eye.classList.add("closed")
    }
  }

  function mouseLeaveEye (eye) {
    return () => {
      eye.classList.remove("closed")
    }
  }

  function touchEye (eye) {
    const doMouseEnter = mouseEnterEye(eye)
    return (event) => {
      doMouseEnter(event)
    }
  }

</script>

<style>
  .outer {
    position: relative;
    background: blue;
    height: 300px;
    width: 500px;
    background-clip: content-box;
    padding: 15px;
    border: dotted black 1px;
    border-radius: 4px;
  }
  .detec {
    /* 
  * instead of attempting to complicate matters with more divs around the eye 
  ** containers, absolutely position an element over the eyes that uses the same
  * formula
   */
    position: absolute;
    z-index: 3;
    height: 100px;
    width: 100%;
    top: 50%;
    text-align: center;
  }
  .detec .eye {
    background: none;
    top: 0;
    z-index: 1000;
  }
  .eyes {
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    white-space: nowrap;
  }
  .eye {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    top: 50%;
    height: 100px;
    width: 200px;
    background: #ffffcc;
    overflow: hidden;
    z-index: 2;
    transform: translateX(20px) translateY(-50px);
    transition: all 0.2s;
    transition-property: height, transform, margin;
    transition-timing-function: ease-out;
  }
  .eye {
    margin-right: 40px;
  }
  :global(.closed), .close {
    height: 0px !important;
    margin: 50px 40px 50px 0;
    transform: translateX(20px) translateY(-25px);
  }
  .close {
    margin: 25px 40px 25px 0;
  }
  .pupil {
    transition: width 0.3s, height 0.3s, border-width 0.3s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: #000;
    border: 9px solid #996600;
    border-radius: 50%;
    content: " ";
  }
  div.container {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }
  .express > .eye {
    height: 60px;
    transform: translateX(20px) translateY(-30px);
    margin-bottom: 30px;
  }
  .express > .eye > .pupil {
    border-width: 6px;
    width: 53px;
    height: 53px;
  }
</style>

<svelte:window on:resize={resetRects} />
<div class="outer">
  <div class="container"
    on:mousemove={handleMousemove}
    on:touchmove={handleTouch}
    on:touchend={handleTouch}
  >
    <div class="eyes" bind:this={div} class:express>
      <div class="detec">
        <div class="eye"
          class:narrow
          bind:this={eyePos.elem.left}
          on:mouseenter={mouseEnterEye(eyes.left)}
          on:mouseleave={mouseLeaveEye(eyes.left)}
          on:touchmove={touchEye(eyes.left)}
        ></div>
        {#if !narrow}
          <div class="eye"
            bind:this={eyePos.elem.right}
            on:mouseenter={mouseEnterEye(eyes.right)}
            on:mouseleave={mouseLeaveEye(eyes.right)}
            on:touchmove={touchEye(eyes.right)}
          ></div>
        {/if}
      </div>
      <div class="eye"
        class:narrow
        class:close
        bind:this={eyes.left}
        >
        <div
          class="pupil"
          style="
            top:{sy};
            left:{sx};
            transform: translate(-{sx}, -{sy})
          "
        >
        </div>
      </div>
      {#if !narrow}
      <div class="eye" class:close bind:this={eyes.right}>
        <div
          class="pupil"
          style="
            top: {sy};
            left: {sx};
            transform: translate(-{sx}, -{sy})
          "
        >
      </div>
    </div>
    {/if}
    </div>
    <slot>
    </slot>
  </div>
</div>