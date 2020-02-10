<script></script>
<style>
  button {
    font-size: 14px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    padding: 0;
    border-width: 1px;
    border-radius: 4px;
    /* side color */ background-color: purple;
    /* outer border */ border-color: black;
    padding-bottom: 2px;
  }
  button > span {
    display: block;
    border-radius: 4px;
    margin: 0;
    padding: 0.3rem;
    color: white;
    /* surface border */ border: 1px solid pink;
    /* surface color */ background-color: purple;
  }
  button:hover {
    /* hover outer border color */ border-color: palevioletred;
  }
  button:hover > span {
    /* hover surface color */ background-color: darkmagenta;
  }
  button:not(:disabled):not(.disabled):active {
    /* active outer border */ border-color: palevioletred;
    padding-bottom: 0px;
    margin-top: 2px !important;
    outline: none;
    box-shadow: none;
    /* active side color */ background-color: purple;
  }
  button:not(:disabled):not(.disabled):active > span {
    /* active surface color */ background-color: darkmagenta;
  }
</style>

<button 
  role="button"
  on:click 
  on:mouseenter 
  on:mouseleave
>
  <span>
    <slot></slot>
  </span>
</button>