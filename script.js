$(function(){

    //======== UI =========//
    //default to smtiv selected
    document.querySelector('#buttonfour').classList.add('selection');

    //save file name
    $(function(){
        $("#savefile").change(function() {
        filename = this.files[0].name;
        $("#savelabel").text(filename);
        console.log(filename);
        });
    });     

//reset file
    $('#resetlabel').click(function(){
        $("#savefile").value = '';
        $("#savelabel").text('Select savefile');
    });

    //game selector
    document.querySelectorAll('.toggle').forEach(button => {
        button.addEventListener('click', e => {
        let targ = `#${e.target.dataset.ref}`;
        const targ_button = "button";
        // set them all to hidden
        document.querySelectorAll('.toggled').forEach(div => div.classList.add('hide'));
        document.querySelectorAll('.game_sel').forEach(div => div.classList.remove('selection'));
        // reveal the one we want
        document.querySelector(targ).classList.remove('hide');
        document.querySelector(`#${targ_button.concat(e.target.dataset.ref)}`).classList.add('selection');
        //document.querySelector(targ_button).classList.add('sel')

        });
    });

    //alignment sliders
    const $align4 = document.getElementById('align4');
    const $alignapoc_light = document.getElementById('alignapoc_light');
    const $alignapoc_dark = document.getElementById('alignapoc_dark');

    //apocalypse light
    $alignapoc_light.min = 0;
    $alignapoc_light.max = 100;
    $alignapoc_light.value = 50;
    $alignapoc_light.step = 1;
    $alignapoc_light.marksEnabled = true;
    $alignapoc_light.marksCount = 21;
    $alignapoc_light.movingTooltip = true;
    $alignapoc_light.distanceToPointer = 30;
    $alignapoc_light.toolipWidth = 50;
    $alignapoc_light.tootipHeight = 50;
    $alignapoc_light.tooltipBg = "#808080";
    $alignapoc_light.tooltipTextColor = "#000000";

    //apocalypse dark
    $alignapoc_dark.min = 0;
    $alignapoc_dark.max = 100;
    $alignapoc_dark.value = 50;
    $alignapoc_dark.step = 1;
    $alignapoc_dark.marksEnabled = true;
    $alignapoc_dark.marksCount = 21;
    $alignapoc_dark.movingTooltip = true;
    $alignapoc_dark.distanceToPointer = 30;
    $alignapoc_dark.toolipWidth = 50;
    $alignapoc_dark.tootipHeight = 50;
    $alignapoc_dark.tooltipBg = "#808080";
    $alignapoc_dark.tooltipTextColor = "#000000";

    //4 alignment
    $align4.min = -100;
    $align4.max = 100;
    $align4.value = 0;
    $align4.step = 1;
    $align4.marksEnabled = true;
    $align4.marksCount = 21;
    $align4.movingTooltip = true;
    $align4.distanceToPointer = 30;
    $align4.toolipWidth = 50;
    $align4.tootipHeight = 50;
    $align4.tooltipBg = "#808080";
    $align4.tooltipTextColor = "#000000";

    const $4law = document.getElementById('law_bttn');
    const $4chaos = document.getElementById('chaos_bttn');
    const $4neutral = document.getElementById('4_neutral');
    const $apoclight = document.getElementById('light_bttn');
    const $apocdark = document.getElementById('dark_bttn');
    const $bonds = document.getElementById('bonds_bttn');
    const $msscr = document.getElementById('msscr_bttn');

    $align4.addEventListener('change', (evt) => {
          console.log(evt.detail.value);
          alignment = evt.detail.value;
          if(alignment <= -9){
            $('#bg4').attr("src", "bgs/4/4_chaos.png");
            $align4.tooltipBg = "#0F0F0F"
            $align4.tooltipTextColor="#ffffff"
          } else if(alignment >=-8 && alignment <= 8){
            $('#bg4').attr("src", "bgs/4/4_neutral.png");
            $align4.tooltipBg = "#808080"
            $align4.tooltipTextColor="#000000"
          } else if(alignment >= 9){
            $('#bg4').attr("src", "bgs/4/4_law.png");
            $align4.tooltipBg = "#ffffff"
            $align4.tooltipTextColor="#0F0F0F"
          }
        });

    $alignapoc_light.addEventListener('change', (evt) => {
          console.log(evt.detail.value);
          
        });
    $alignapoc_dark.addEventListener('change', (evt) => {
          console.log(evt.detail.value);
          
        });

    $4law.onclick = function()
    {
        $align4.value = 50;
        console.log('working!!!');
    };

    $4chaos.onclick = function()
    {
        $align4.value = -50;
        console.log('working!!!');
    };

    $4neutral.onclick = function()
    {
        $align4.value = 0;
        console.log('working!!!');
    };

    $apocdark.onclick = function()
    {
        $align4.value = 0;
        console.log('working!!!');
    };


    //scrolling footer

    //======== DATA MANIP =========//

    //validation constants
    //smt4_filesize = 151088;
    //smt4a_filesize = 174116;


//light/dark offsets: 

//light: 0x28416
//dark: 0x28414

    function readSavefile()
    {
        var savefile = document.getElementById("savefile").files[0]
        if (savefile)
        {
            var reader = new FileReader();
            reader.readAsArrayBuffer(savefile);
            reader.onload = function (evt)
            {
                validate();
                read4(evt);
            }
            reader.onerror = function (evt)
            {
                document.getElementById("fileContents").innerHTML = "error reading savefile";
            }
        }
    }

    function exportSavefile()
    {
        var savefile = document.getElementById("savefile").files[0]
        if (savefile)
        {
            var reader = new FileReader();
            reader.readAsArrayBuffer(savefile);
            reader.onload = function (evt)
            {
                var arrayBuffer = evt.target.result;
                var bytes = new Uint16Array(arrayBuffer)
                var newPoints = document.getElementById("points").value
                bytes[0xc2] = newPoints

                var newBytes = new Uint16Array(bytes);
                var blob = new Blob([newBytes]);
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = savefile.name;
                link.click();
            }
            reader.onerror = function (evt)
            {
                document.getElementById("fileContents").innerHTML = "error reading savefile";
            }
        }
    }

    function read4 (e)
    {
        var arrayBuffer = e.target.result;
        var bytes = new Uint16Array(arrayBuffer)
        document.getElementById("points").value = bytes[0xc2];
    }
})
