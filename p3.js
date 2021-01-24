/*
Author: George Khankeldian
Project: CS 559 Programming Assignment 3
File: p3.js
*/

function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;

  var movement = 0;

  function draw() {
    canvas.width = canvas.width;

    // use the sliders to get the angles
    var mouthSlider = slider1.value;
    var moveSpeed = slider2.value;

    function setTran(Tx) {
        context.setTransform(Tx[0],Tx[1],Tx[3],Tx[4],Tx[6],Tx[7]);
    }

    //timer that allow the animations to play in real time
    movement = (movement + (1 * moveSpeed)) % 1200;

    //creates the text that says Poyo Time in different sizes based on movement
    context.font = "100px Impact";

    var kirbyText = mat3.create();

    if(movement % 300 < 150) {

        mat3.scale(kirbyText, kirbyText, [2, 2]);
        setTran(kirbyText);

        context.fillText("POYO TIME", 20, 100);
    } else {

        setTran(kirbyText);

        context.fillText("POYO TIME", 240, 170);
    }
    
    //constantly moves Kirby to the right based on movement
    var KirbyToCanvas = mat3.create();
    mat3.fromTranslation(KirbyToCanvas, [movement, 0]);
    setTran(KirbyToCanvas);

    //draws/Animates Kirby
    function kirby(KirbyToCanvas) {
        context.lineWidth = 3;

        var kirbyBase = mat3.create();
        mat3.fromTranslation(kirbyBase, [-100, 170]);
        var kirbyTorso = mat3.create();
        mat3.multiply(kirbyTorso, KirbyToCanvas, kirbyBase);

        //back hand
        var kirbyBackHand = mat3.create();
        mat3.rotate(kirbyBackHand, kirbyBackHand, ((movement % 60) * Math.PI / 180 ) - 220);
        mat3.multiply(kirbyBackHand, kirbyTorso, kirbyBackHand);
        setTran(kirbyBackHand);

        context.beginPath();
        context.strokeStyle = "#000000";
        context.fillStyle = "#fd99a7";
        context.lineWidth = 3;

        context.ellipse(-100, 0, 30, 20, 0, Math.PI / 3, Math.PI * 1.65);
        context.fill();
        context.stroke();
        context.closePath();

        //back leg
        var kirbyBackLeg = mat3.create();
        mat3.rotate(kirbyBackLeg, kirbyBackLeg, ((movement % 60) * Math.PI / 180) - 70);
        mat3.multiply(kirbyBackLeg, kirbyTorso, kirbyBackLeg);
        setTran(kirbyBackLeg);

        context.beginPath();
        context.fillStyle = "#dd0459";

        context.ellipse(0, 100, 50, 30, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();

        //torso
        setTran(kirbyTorso);

        context.beginPath();
        context.fillStyle = "#fd99a7";
        context.arc(0, 0, 100, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();

        //creates Kirby's mouth
        kirbyMouth(kirbyTorso);

        //front hand
        var kirbyFrontHand = mat3.create();
        mat3.rotate(kirbyFrontHand, kirbyFrontHand, ((-movement % 60) * Math.PI / 180 ) - 200);
        mat3.multiply(kirbyFrontHand, kirbyTorso, kirbyFrontHand);
        setTran(kirbyFrontHand);

        context.beginPath();
        context.fillStyle = "#fd99a7";

        context.ellipse(-100, 0, 30, 20, 0, Math.PI / 3, Math.PI * 1.65);
        context.fill();
        context.stroke();
        context.closePath();

        //front leg
        var kirbyFrontLeg = mat3.create();
        mat3.rotate(kirbyFrontLeg, kirbyFrontLeg, ((-movement % 60) * Math.PI / 180) - 270);
        mat3.multiply(kirbyFrontLeg, kirbyTorso, kirbyFrontLeg);
        setTran(kirbyFrontLeg);

        context.beginPath();
        context.fillStyle = "#dd0459";

        context.ellipse(0, 100, 50, 30, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();

        //creates Kirby's eyes
        kirbyEyes(kirbyTorso);

        //creates air particles when Kirby opens his mouth
        drawAir(kirbyTorso);
    }

    //Creates Kirby's eyes and moves the eyes when the mouth opens
    function kirbyEyes(kirbyTorso) {
        var kirbyEyeX = 80;
        var kirbyEyeY = 0;

        var kirbyEyes = mat3.create();
        mat3.rotate(kirbyEyes, kirbyEyes, (-mouthSlider - 10) * Math.PI / 180);
        mat3.multiply(kirbyEyes, kirbyTorso, kirbyEyes);
        setTran(kirbyEyes);

        context.beginPath();
        context.fillStyle = "#000000";
        context.ellipse(kirbyEyeX, kirbyEyeY, 10, 20, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#007dff";
        context.ellipse(kirbyEyeX, kirbyEyeY, 7, 17, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(kirbyEyeX, kirbyEyeY, 9, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#ffffff";
        context.ellipse(kirbyEyeX, kirbyEyeY - 8, 6, 9, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

    //creates Kirby's mouth and changes the size of Kirby's mouth
    function kirbyMouth(kirbyTorso) {
        var kirbyMouth = mat3.create();
        mat3.scale(kirbyMouth, kirbyMouth, [Math.max(mouthSlider / 2.5, 0), Math.max(mouthSlider, 0)]);
        mat3.multiply(kirbyMouth, kirbyTorso, kirbyMouth);
        setTran(kirbyMouth);

        context.beginPath();
        context.fillStyle = "#000000";
        context.ellipse((90 - mouthSlider / 2.5) / Math.max(mouthSlider / 2.5, 0), 0, 1.1, 1.05, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#aa1751";
        context.ellipse((90 - mouthSlider / 2.5) / Math.max(mouthSlider / 2.5, 0), 0, 1, 1, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

    //creates air particles when Kirby opens his mouth
    function drawAir(kirbyTorso) {
        var airBase = mat3.create();
        mat3.translate(airBase, kirbyTorso, [150, 0]);

        var airSpin = mat3.create();
        mat3.rotate(airSpin, airSpin, movement * 1 * Math.PI / 180);
        mat3.scale(airSpin, airSpin, [Math.max(mouthSlider / 60, 0), Math.max(mouthSlider / 60, 0)]);
        mat3.multiply(airSpin, airBase, airSpin);
        setTran(airSpin);

        context.beginPath();
        context.strokeStyle = "#000000";
        context.fillStyle = randRGB();

        for (var i = 0; i < 20; i++) {
            context.rect(100*Math.random() - 50, 100*Math.random() - 50, 10, 10);
        }

        context.fill();
        context.stroke();
        context.closePath();
    }

    //creates random colors for the air particles created in drawAir()
    function randRGB() {
        return 'rgb(' + 255*Math.random() + ',' + 255*Math.random() + ',' + 255*Math.random() + ')';
    }

    //call to create Kirby
    kirby(KirbyToCanvas);

    window.requestAnimationFrame(draw);
  }
  window.requestAnimationFrame(draw);
}
window.onload = setup;