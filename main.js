// Runner app with gunshot sound
// Optional delay setting for performance fix on Audio play
// Developed by Edwin Glaser
// Github.com/openui54u/runner

// We use 2 different ways of Audio due to iPhone's iOS Safari delay

let _div_version = document.getElementById("version");
if (_div_version) {
    _div_version.textContent = 'FullScreen 1.18'
};

let _time = 0;
var _Audio;
var _Audio2;
// var _Audio3;

var source1 ;
var source2 ;

var context;
var bufferLoader;

var StopWatch = {};
StopWatch.status = 0;
var StopWatch_correction = 200; //time for sound to play
let _Interval = {};
let debug = false;

let _div_StopW = document.getElementById("stopwatch");
let _button = document.getElementById("button");
let _div_StopL = document.getElementById("laptext");
let _div_StopM = document.getElementById("marktext");

var arrayLapText = [];
var arrayMarkText = [];
var  arrayLapTime = [];
var synth = window.speechSynthesis;
var voices = [];
var currentvalueOnOff; // on off switch
var currentvalueOnOff_interval = {};
var currentvalueOnOff_timer = 20000;
var countdown_interval = {};
let _currentvalueOnOff_timer = currentvalueOnOff_timer;
var _language = 'UK';

let _div = document.getElementById("text");

//Bleep sound
var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");



// PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("./app/runner/serviceWorker.js", {
                scope: './app/runner/'
            })
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}



// Windows onload  
window.onload = function () {

    language('UK'); // Set the text on introscreen.

    let _intro = document.getElementById("intro");
    let _initsound = document.getElementById("initsound");
    _initsound.addEventListener('click', ()=>{
        InitSound();
        _intro.classList.add('hidden');

        let _fullcontainer = document.getElementById("fullcontainer");
          _fullcontainer .classList.remove('hidden');
          playGunShot();

    })

    // GunsHot
    _Audio = GunShot(); // Create the Audio 

    // On Your Marks, get Set
    // _Audio2 = onYourMarks(); // Create the Audio 

    // let _container = document.getElementById("container");
    _div_version.addEventListener('click', (e) => {
        buttonFullScreen(e)
    });


    var slider = document.getElementById("myRange");
    var slider2 = document.getElementById("myRange2");

    var output = document.getElementById("delay");
    var output2 = document.getElementById("delay2");

    output.innerHTML = slider.value; // Display the default slider value
    output2.innerHTML = slider2.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)

    slider.oninput = function () {
        output.innerHTML = this.value;
        StopWatch_correction = this.value;
    }
    slider2.oninput = function () {
        output2.innerHTML = this.value;
        currentvalueOnOff_timer = this.value * 1000; // ms
    }

    function buttonFullScreen(e) {
        _fullcontainer = document.getElementById("fullcontainer");
        toggleFullScreen(_fullcontainer);
    }


}


function clickButtonLap(e) {
    let _div_StopL = document.getElementById("laptext");

    if (StopWatch.status == 1) {
        StopWatch.now = {};
        StopWatch.now.mi = new Date().getMilliseconds();
        StopWatch.now.s = new Date().getSeconds();
        StopWatch.now.m = new Date().getMinutes();
        StopWatch.now.h = new Date().getHours();

        _time = Date2Milliseconds(StopWatch.now, StopWatch.lap)
        if (_time <= 0) {
            _time = 0
        };
        if (!isNaN(_time)) {
            let _laptime = Milliseconds2TimeString(_time);
            arrayLapText.push(_laptime);
            arrayLapTime.push(_time);
            let _max = Math.max.apply(Math, arrayLapTime);
            if(debug){console.log(_max)};
            let _min = Math.min.apply(Math, arrayLapTime);
            if(debug){console.log(_min)};
            _div_StopL.textContent = arrayLapText.toString().split(',').join("\r\n");
            _div_StopL.scrollTop = _div_StopL.scrollHeight;

        }
        StopWatch.lap = StopWatch.now;
    }

}

function clickButtonMark(e) {
    let _div_StopM = document.getElementById("marktext");

    if (StopWatch.status == 1) {
        StopWatch.now = {};
        StopWatch.now.mi = new Date().getMilliseconds();
        StopWatch.now.s = new Date().getSeconds();
        StopWatch.now.m = new Date().getMinutes();
        StopWatch.now.h = new Date().getHours();

        _time = Date2Milliseconds(StopWatch.now, StopWatch.start)
        if (_time <= 0) {
            _time = 0
        };
        if (!isNaN(_time)) {
            let _marktime = Milliseconds2TimeString(_time);
            arrayMarkText.push(_marktime);
            _div_StopM.textContent = arrayMarkText.toString().split(',').join("\r\n");
            _div_StopM.scrollTop = _div_StopM.scrollHeight;

        }
    }

}

function clickButton(e) {

    // Stop with gunshot
    if (StopWatch.status == 1 && _time <= 1000 && _time != 0) {
        resetGunShot();
        // resetOnYourMarks();
        playGunShot();
    }

    // reset START/STOP
    if (StopWatch.status == 1 && _time == 0) {
        refreshpage();
        return;
    }


    if (debug) {
        console.log("pressed")
    };

    if (_div) {
        // 0 1 2 0
        switch (StopWatch.status) {
            case 0: //Start
            // InitSound();
                resetGunShot();
                // resetOnYourMarks();
                // playonYourMarks();
                // InitSound();
                source1.start(0); //OnYourMarks
                let _gunshottimer = 8500 + Math.random() * 1500;
                if (debug) {
                    console.log(_gunshottimer)
                };
                setTimeout((e) => {

                    if (StopWatch.status == 1) {
                        // resetGunShot();
                        // resetOnYourMarks();
                        playGunShot();
                        // InitSound();
                        // source2.start(0);

                        setTimeout((e) => {
                            StopWatch.start = {};
                            StopWatch.start.mi = new Date().getMilliseconds();
                            StopWatch.start.s = new Date().getSeconds();
                            StopWatch.start.m = new Date().getMinutes();
                            StopWatch.start.h = new Date().getHours();
                            StopWatch.lap = StopWatch.start;

                            _Interval = setInterval(refresh, 10);
                        }, StopWatch_correction);
                    }
                }, _gunshottimer)

                if (debug) {
                    console.log(_Interval, StopWatch.start)
                };
                _div.textContent = 'STOP';
                break;
            case 1: // Running->Stop
            InitSound();
                clearInterval(_Interval);

                StopWatch.end = {};
                StopWatch.end.mi = new Date().getMilliseconds();
                StopWatch.end.s = new Date().getSeconds();
                StopWatch.end.m = new Date().getMinutes();
                StopWatch.end.h = new Date().getHours();
                _div.textContent = 'RESET';
                if (debug) {
                    console.log(_Interval, StopWatch.end)
                };

                break;
            case 2: // Reset
            InitSound();
                StopWatch = {};
                StopWatch.status = -1;
                _div.textContent = 'START';
                _time = 0;
                clearInterval(_Interval);
                if (debug) {
                    console.log(_Interval)
                };
                arrayLapText = [];
                arrayMarkText = [];

                break;
            default:
                break;
        }
    };
    ++StopWatch.status;
    refresh();

}

function refresh() {


    if (_div_StopW) {

        StopWatch.now = {};
        StopWatch.now.mi = new Date().getMilliseconds();
        StopWatch.now.s = new Date().getSeconds();
        StopWatch.now.m = new Date().getMinutes();
        StopWatch.now.h = new Date().getHours();

        switch (StopWatch.status) {
            case 0: // Waiting for START
                _time = 0;
                _div_StopW.textContent = _time;
                _button.classList.remove("reset");
                _button.classList.add("start");
                _div_StopW.textContent = _div_StopL.textContent = _div_StopM.textContent = '00:00:00.00';
                break;
            case 2: // STOP waiting for RESET

                _button.classList.remove("stop");
                _button.classList.add("reset");
                if (StopWatch.end && StopWatch.end) {
                    _time = Date2Milliseconds(StopWatch.end, StopWatch.start);
                    if (_time <= 0) {
                        _time = 0
                    };
                    if (!isNaN(_time)) {
                        _div_StopW.textContent = Milliseconds2TimeString(_time);
                        if (debug) {
                            console.log(_div_StopW.textContent)
                        };
                    }
                    if (debug) {
                        console.log(_Interval, StopWatch.start, StopWatch.end, _time)
                    };
                } else {
                    _div_StopW.textContent = '00:00:00.00'
                };

                break;
            case 1: // RUnning waiting for STOP
                _button.classList.remove("start");
                _button.classList.add("stop");
                // _div.textContent = 'STOP'  


                if (_time < 1000 && _time != 0) {
                    _div.textContent = '>>STOP<<'
                } else {
                    _div.textContent = 'STOP'
                }

                if (StopWatch.now) {
                    _time = Date2Milliseconds(StopWatch.now, StopWatch.start)
                    if (_time <= 0) {
                        _time = 0
                    };
                    if (!isNaN(_time)) {
                        _div_StopW.textContent = Milliseconds2TimeString(_time);
                    }
                } else {
                    _div_StopW.textContent = '00:00:00.00'
                };


                break;

            default:
                break;
        }
        // }
    }
} // function

refresh();

function Date2Milliseconds(d, t) {

    let _return = 0;

    if (d && t) {
        _return = ((d.mi + d.s * 1000 + d.m * 60 * 1000 + d.h * 3600 * 1000) -
            (t.mi + t.s * 1000 + t.m * 60 * 1000 + t.h * 3600 * 1000));
    }

    return _return

}

function Milliseconds2TimeString(m) {
    let _mod = 0;
    let _h = Math.floor(m / (3600 * 1000));
    _mod = m - (3600 * 1000) * _h;

    let _m = Math.floor(_mod / (60 * 1000));
    _mod = _mod - (60 * 1000) * _m;

    let _s = Math.floor(_mod / 1000);
    _mod = _mod - _s * 1000;

    let _mi = Math.floor(_mod);

    return `${pad(_h,2)}:${pad(_m,2)}:${pad(_s,2)}.${pad(_mi,3)}`;


}

function pad(num, size) {
    var s = "0000000000" + num;
    return s.substring(s.length - size);
}

function playGunShot() {
    _Audio.play();
}

function GunShot() {
    _Audio = new Audio('Loud_Gunshot.mp3');
    _Audio.pause();
    _Audio.currentTime = 0;
    _Audio.volume = 1;
    return _Audio;
}

function resetGunShot() {
    // _Audio = new Audio('Loud_Gunshot.mp3');
    _Audio.pause();
    _Audio.currentTime = 0;
    _Audio.volume = 1;
    //  return _Audio;
}

function onYourMarks() {

    switch (_language) {
        case 'NL':
            _Audio2 = new Audio('opuwplaatsenklaar.m4a');
            break;
        default:
            _Audio2 = new Audio('onyourmarksgetset.m4a');
            break;
    }
  
    _Audio2.pause();
    _Audio2.currentTime = 0;
    _Audio2.volume = 0.8;
    return _Audio2;
}

function resetOnYourMarks() {

    // _Audio2 = new Audio('onyourmarksgetset.m4a');
    if(_Audio2){
    _Audio2.pause();
    _Audio2.currentTime = 0;
    _Audio2.volume = 0.8;
    }
    // return _Audio2;
}

function playonYourMarks() {
    if (StopWatch.status == 0 && _Audio2) {
        _Audio2.play();
    }
}


// function speakset() {
//     _Audio3 = new Audio('getset.m4a');
//     _Audio3.pause();
//     return _Audio3;
// }



function onoff(b) {

    let _onoff = document.getElementById("onoff");
    // Force off
    if (b) {
        _onoff.value = ">> On >>";
    }

    currentvalueOnOff = document.getElementById('onoff').value;
    if (currentvalueOnOff == "[ ] Off") {
        InitSound();
        document.getElementById("onoff").value = ">> On >>";
        beep();

        StopWatch.status = 2;
        clickButton();

        _currentvalueOnOff_timer = currentvalueOnOff_timer + 0000;
        currentvalueOnOff_interval = setInterval(startrepeat, _currentvalueOnOff_timer);
        countdown_interval = setInterval(countdown, 1000);

        _onoff.classList.remove("start");
        _onoff.classList.add("stop");

    } else {
        beep();
        document.getElementById("onoff").value = "[ ] Off";
        _onoff.classList.remove("stop");
        _onoff.classList.add("start");
        refreshpage();
    }
}

function refreshpage() {

    clearInterval(currentvalueOnOff_interval);
    clearInterval(countdown_interval)
    clearInterval(_Interval);

    if(_Audio){
    _Audio.pause();
    _Audio.currentTime = 0};
    if(_Audio2){
    _Audio2.pause();
    _Audio2.currentTime = 0};

    StopWatch.status = 1; // Trigger from RESET
    _time = 99999999;
    clickButton();
    StopWatch.status = 0;

    StopWatch.status = 1; // Trigger from RESET
    _time = 99999999;
    clickButton();
    StopWatch.now = {};
    StopWatch.end = {};
    StopWatch.start = {};
    StopWatch.lap = {};


}

function startrepeat() {

    // Start
    // Stop 
    // Refresh
    clickButton();
    if (StopWatch.status == 2) {
        clickButton();
        _currentvalueOnOff_timer = currentvalueOnOff_timer;
        countdown_interval = setInterval(countdown, 1000);
    }


}



function beep() {
    snd.play();
}

function countdown() {

    if (StopWatch.now) {
        _currentvalueOnOff_timer = _currentvalueOnOff_timer - 1000;
        _time = _currentvalueOnOff_timer;
        if (_time <= 0) {
            _time = 0
            clearInterval(countdown_interval);
            _currentvalueOnOff_timer = 0;
        };
        if (!isNaN(_time)) {
            _div_StopW.textContent = Milliseconds2TimeString(_time);
            if (StopWatch.status == 0 && _currentvalueOnOff_timer > 0 && _currentvalueOnOff_timer <= 5000) {
                beep();
            }
        }
    }
}


// https://stackoverflow.com/questions/7836204/chrome-fullscreen-api

function isFullScreen() {
    return (document.fullScreenElement && document.fullScreenElement !== null) ||
        document.mozFullScreen ||
        document.webkitIsFullScreen;
}


function requestFullScreen(element) {
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen();
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
}

function exitFullScreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
}

function toggleFullScreen(element) {
    if (isFullScreen())
        exitFullScreen();
    else
        requestFullScreen(element || document.documentElement);
}

async function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

function clickButtonOnYourMarks() {
    // resetOnYourMarks();
    // resetGunShot();
    // playonYourMarks();
    InitSound();
    //   try{
    //   source1.pause();
    //   source1.currentTime = 0;}
    //   catch{
    //   }
      source1.start(0);
}

function clickButtonGunShot() {
    resetGunShot();
    // resetOnYourMarks();
    playGunShot();
}




function InitSound(){
  // Fix up prefixing
//   window.AudioContext = window.AudioContext || window.webkitAudioContext;
//   context = new AudioContext();

  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
 
  bufferLoader = new BufferLoader(
    context,
    [
      'onyourmarksgetset.m4a',
      'opuwplaatsenklaar.m4a'
    //   'Loud_Gunshot.mp3',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
 source1 = context.createBufferSource();
//  source2 = context.createBufferSource();
 switch (_language) {
     case 'NL':
        source1.buffer = bufferList[1];
         break
     default:
        source1.buffer = bufferList[0];
         break;
 }
 
//   source2.buffer = bufferList[1];
// source3.buffer = bufferList[2];

var analyser = context.createAnalyser();
  source1.connect(analyser);
  analyser.connect(context.destination);
//   source2.connect(context.destination);
//   source1.start(0); //play
//   source2.start(0); //play
}

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }
  
  BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
  
    var loader = this;
  
    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }
  
    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }
  
    request.send();
  }
  
  BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  }

function language(l){
    _language = l; // global save
    let _UK = `
    <p>- Runner - </p> 
    <p>Runs best on Android - Chrome</p>
    <p>Runs best on Safari - iOS</p>
    <p>Add to StartScreen to experience FullScreen App</p>
    <p>(After clicking you will hear 1 gunshot to test sound)</p>
    <p>v1.18  https://openui54u.github.io/RUNNER/</p>
    <p>Press somewhere on this page to use this beta app.</p> `;

    let _NL = `
    <p>- Runner - </p> 
    <p>Werkt het beste op Android - Chrome</p>
    <p>Werkt het beste op Safari - iOS</p>
    <p>Gebruik "Toevoegen aan Startscherm" voor FullScreen App</p>
    <p>(Na het klikken op deze pagina hoor je een startshot om geluid te testen)</p>
    <p>v1.18 https://openui54u.github.io/RUNNER/</p>
    <p>Druk ergens op deze pagina om deze beta(test) app te gebruiken</p> `;

    let _initsound = document.getElementById("initsound");

switch (l) {
    case 'NL':
        _initsound.innerHTML = _NL;
        break;
    default:
        _initsound.innerHTML = _UK;
        break;
}



}  
// End of MAIN.js