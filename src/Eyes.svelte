<script>
  import {tweened} from 'svelte/motion'
  import { backOut } from 'svelte/easing';

  let touching = false
  let eyes = {
    left: null,
    right: null
  }
  let div, rect, mobile
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

  $: {
    if (div) rect = div.getBoundingClientRect()
    sx = `${$x > 100 ? 100 : $x < 0 ? 0 : $x}%`
    sy = `${$y > 100 ? 100 : $y < 0 ? 0 : $y}%`
    mobile = rect && rect.width && rect.width < 800
  }

  function resize () { 
    rect = div.getBoundingClientRect() 
  }

  function handleClick (event) {
    handleMousemove(event)
  }

  function handleTouch (event) {
    handleMousemove({
      clientX: event.changedTouches[0].clientX,
      clientY: event.changedTouches[0].clientY
    })
  }

  
  function handleMousemove (event) {
    x.set((event.clientX - rect.left) / rect.width * 100)
    y.set((event.clientY - rect.top) / rect.height * 100)
  }

  function mouseEnterEye (eye) {
    return (event) => {
      eye.classList.add('closed')
    }
  }

  function mouseLeaveEye (eye) {
    return (event) => {
      eye.classList.remove('closed')
    }
  }

  function touchEye (eye) {
    const doMouseEnter = mouseEnterEye(eye)
    return (event) => {
      doMouseEnter()
      setTimeout(() => {
        mouseLeaveEye(eye)
      }, 1000)
    }
  }

</script>

<style>
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
    transform: translateY(-50px);
    transition: all 0.2s;
    transition-property: height, transform, margin;
    transition-timing-function: ease-out;
  }
  .eye {
    margin-right: 40px;
  }
  .eye.mobile {
    margin-right: 0px
  }
  :global(.closed) {
    height: 0px !important;
    margin: 50px 0;
    transform: translateY(25px);
  }
  .pupil {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: #000;
    border: 10px solid #996600;
    border-radius: 50%;
    content: " ";

  }
  div.container {
    overflow: hidden;
    width: 100%; 
    height: 100%;

    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }
</style>

<svelte:window on:resize={resize} />
<div class="container"
  on:mousemove={handleMousemove}
  on:click={handleClick}
  on:touchmove={handleTouch}
  on:touchstart={handleTouch}
>
  <div class="eyes" bind:this={div}>
    <div class="detec">
      <div class="eye {mobile ? 'mobile' : ''}"
        on:mouseenter={mouseEnterEye(eyes.left)}
        on:mouseleave={mouseLeaveEye(eyes.left)}
        on:touchstart={touchEye(eyes.left)}
      ></div>
      {#if !mobile}
        <div class="eye"
          on:mouseenter={mouseEnterEye(eyes.right)}
          on:mouseleave={mouseLeaveEye(eyes.right)}
          on:touchstart={touchEye(eyes.right)}
        ></div>
      {/if}
    </div>
    <div class="eye {mobile ? 'mobile' : ''}"
      bind:this={eyes.left}>
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
    {#if !mobile}

    <div class="eye" bind:this={eyes.right}>
      <div
        class="pupil"
        style="
          top: {sy};
          left: {sx};
          transform: translate(-{sx}, -{sy})"
      >
    </div>
  </div>
  {/if}
  </div>
</div>