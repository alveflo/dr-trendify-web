<div>
    <div class="loader loader1"></div>
    <div class="loader loader2"></div>
</div>

<style>
@-webkit-keyframes bar1 {
  from, to {
    height: 1.1em;
  }
  50% {
    height: 2.7em;
  }
}
@keyframes bar1 {
  from, to {
    height: 1.1em;
  }
  50% {
    height: 2.7em;
  }
}
@-webkit-keyframes bar2 {
  from, to {
    height: 1.5em;
  }
  50% {
    height: 2em;
  }
}
@keyframes bar2 {
  from, to {
    height: 1.5em;
  }
  50% {
    height: 2em;
  }
}
@-webkit-keyframes bar3 {
  from, to {
    height: 2em;
  }
  50% {
    height: 1.5em;
  }
}
@keyframes bar3 {
  from, to {
    height: 2em;
  }
  50% {
    height: 1.5em;
  }
}
@-webkit-keyframes bar4 {
  from, to {
    height: 2.7em;
  }
  50% {
    height: 1.1em;
  }
}
@keyframes bar4 {
  from, to {
    height: 2.7em;
  }
  50% {
    height: 1.1em;
  }
}
.loader {
  display: inline-block;
  line-height: 5em;
}
.loader::before, .loader::after {
  -webkit-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  background-color: lightgrey;
  border-radius: .5em;
  content: '';
  display: inline-block;
  width: 0.5em;
}

.loader1::before {
  -webkit-animation-name: bar1;
          animation-name: bar1;
  margin-right: .3em;
}
.loader1::after {
  -webkit-animation-name: bar2;
          animation-name: bar2;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
}

.loader2::before {
  -webkit-animation-name: bar3;
          animation-name: bar3;
  margin-right: .4em;
}
.loader2::after {
  -webkit-animation-name: bar4;
          animation-name: bar4;
}

</style>