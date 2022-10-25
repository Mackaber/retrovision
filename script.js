var aur = null;
var video_started = false
var filters = 
{
    'saturate' : {
        name: 'Saturation',
        value: '1.0',
        getValue: v => parseInt(v)/10.0
    },
    'blur' : {
        name: 'Blur',
        value: '0px',
        getValue: v => `${v}px`
    },
    'brightness' : {
        name: 'Brightness',
        value: '1.0',
        getValue: v => parseInt(v)/10.0
    },
    'contrast' : {
        name: 'Contrast',
        value: '1.0',
        getValue: v => parseInt(v)/10.0
    },
}

let source = document.getElementById("source")

source.addEventListener('change', ev => {
   let src = ev.target.value
   document.getElementById(src).classList.remove('hide')
   if(src == 'video') {
    document.getElementById("recorded").classList.add('hide')
    video_started ? undefined : start_video()
   } else 
    document.getElementById("video").classList.add('hide')
})

let filterables = document.getElementsByClassName('filterable')

Object.keys(filters).forEach(k => {
    let range = document.getElementById(`${k}_range`)
    let label = document.getElementById(`${k}_label`)

    range.addEventListener('input', ev => {
        filters[k].value = filters[k].getValue(ev.target.value)
        label.innerHTML = `${filters[k].name}: ${filters[k].value}`
        filter_str = ""
        Object.keys(filters).forEach(filter => {
            filter_str += `${filter}(${filters[filter].value}) `
        })
        Array.from(filterables).forEach(flt => flt.style.filter = filter_str)
    })
})

function start_video() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    var constraints = {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false
    };

    navigator.mediaDevices.getUserMedia( {audio: constraints, video: true}).then((stream) => {
        //this.isMicEnabled = true;
        //var mediaStreamSource = this.audioContext.createMediaStreamSource( stream );
        //mediaStreamSource.connect(this.audioContext.destination);

        video = document.getElementById('video');

        video.srcObject = stream;
        video.play();
        video_started = true
    }).catch(err =>{
        console.error("Error getting audio stream from getUserMedia. Make sure you're on https." + err );
        return null;
    });
}