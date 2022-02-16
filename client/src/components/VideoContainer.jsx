import React from 'react'
import './Video1.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import audio_bar from './Audio_Bar.png'

var context = new AudioContext();
export const resumeAudioContext = () => {
    context.resume()
}

export const VideoContainer = () => {
    const newVideo = useSelector(state => state.video.newVideo);
    var analyser = context.createAnalyser(); //we create an analyser

    function draw() {
        var ctx2 = document.getElementById('c2').getContext("2d");
        var array = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(array);
        ctx2.clearRect(0, 0, 512, 512);
        var average = 0;
        var max = 0;
        for (var i = 0; i < array.length; i++) {
            var a = Math.abs(array[i] - 128);
            average += a;
            max = Math.max(max, a);
        }
        average /= array.length;
    
        ctx2.fillStyle = '#9acd32';
        ctx2.fillRect(0, 300, 18, -average * 10);
        requestAnimationFrame(draw);
    }

    useEffect(() => {
        var video5 = context.createMediaElementSource(document.getElementById('video5'));
        analyser.smoothingTimeConstant = 0.9;
        analyser.fftSize = 512; //the total samples are half the fft size.
        video5.connect(analyser);
        analyser.connect(context.destination);
        draw()
        return () => {
            video5.disconnect();
            analyser.disconnect();
            video5 = null;

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div > <video crossOrigin="anonymous" id='video5' src={newVideo} width='400' height='300' controls type="video/mp4"></video></div>
                <div style={{ marginLeft: 5 }}> <canvas width="18" height="300" id="c2"></canvas></div>
                <div style={{ marginLeft: -20 }}> <img alt='' src={audio_bar} width="40" height="300" ></img></div>
            </div>
        </>
    )
}
export default VideoContainer;


