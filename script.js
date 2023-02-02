inpFile  = document.querySelector('.inp-file')
chooseImage  = document.querySelector('.choose-image')
previewImage  = document.querySelector('.preview-image img')
container  = document.querySelector('.container')
filterName  = document.querySelector('.slider p.name')
inpRange  = document.querySelector('input[type="range"]')
filterValue = document.querySelector('.slider p.value')
selectedFilter = document.querySelector('.filter .active')
rotateButtons = document.querySelectorAll('.rotate button')
resetImage = document.querySelector('.reset-image')
saveImage = document.querySelector('.save-image')




let brightness = 100
let contrast = 100
let blurs = 0
let grayscale = 0
let saturate = 100
let opacity = 100
let rotate = 0; 
let vertical = 1
let horizontal = 1



 
saveImage.addEventListener('click',function(){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%) opacity(${opacity}%) blur(${blurs}px)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(vertical, horizontal);
    ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();

})




resetImage.addEventListener('click',function(){
    console.log(resetImage)
     brightness = 100,
 contrast = 100,
 blurs = 0,
 grayscale = 0,
 saturate = 100,
 opacity = 100,
 rotate = 0 
 vertical = 1,
 horizontal = 1
 filterOptions[0].click()
 inpRange.value = brightness
 filterValue.innerText = brightness + "%"
applyFilteronImg()

})



rotateButtons.forEach(function(option){
    option.addEventListener('click',function(){
        if(option.id=='left'){ 
            rotate -= 90
        }
       else if(option.id=='right'){ 
            rotate += 90
        }
        else if(option.id=='vertical'){ 
            vertical = vertical == 1 ? -1 : 1
        }
        else if(option.id=='horizontal'){ 
            horizontal = horizontal == 1 ? -1 : 1
        }
        applyFilteronImg()
    })
 
   
})



function applyFilteronImg(){
   
  
    previewImage.style.transform = `rotate(${rotate}deg) scale(${vertical},${horizontal})`
    previewImage.style.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%) opacity(${opacity}%) blur(${blurs}px)`;   
    
}




filterOptions  = document.querySelectorAll('.filter button')

filterOptions.forEach(function(option){
    option.addEventListener('click',function(){
        document.querySelector('.filter .active').classList.remove('active')
        option.classList.add('active')
        filterName.innerText = option.innerText
        inpRange.max = 200;
        if(option.id === 'Brightness'){
             inpRange.value  = brightness
             filterValue.innerText = brightness + "%"
        }
            else if(option.id === 'contrast'){
                    inpRange.value  = contrast
                    filterValue.innerText = contrast + "%"
            }
                else if(option.id === 'blurs'){
                    inpRange.max = 10;
                    inpRange.value  = blurs
                    filterValue.innerText = blurs  
            }
            else if(option.id === 'grayscale'){
                inpRange.max = 100;
                inpRange.value  = grayscale
                filterValue.innerText = grayscale + "%"
            }
            else if(option.id === 'saturate'){
                inpRange.value  = saturate
                filterValue.innerText = saturate + "%"
            }
            else if(option.id === 'opacity'){
                inpRange.max = 100;
                inpRange.value  = opacity
                filterValue.innerText = opacity + "%"
            }
    })

})
 
function loadImg(){
        file = inpFile.files[0]
        if(file){
            previewImage.src =   URL.createObjectURL(file)
        }
        container.classList.remove('disable') 
}



inpFile.addEventListener('change',loadImg) 

chooseImage.addEventListener('click',function(){ 
    inpFile.click()
})


inpRange.addEventListener('change',function(){ 
    filterValue.innerText = inpRange.value + "%"
    selectedFilter = document.querySelector('.filter .active')
    if(selectedFilter.id == 'brightness'){
        brightness = inpRange.value 
       
    }
    else if(selectedFilter.id == 'contrast'){
        contrast = inpRange.value 
    }
    else  if(selectedFilter.id == 'blurs'){
        blurs = inpRange.value 
    }
    else if(selectedFilter.id == 'grayscale'){
        grayscale = inpRange.value   
    }
    else if(selectedFilter.id == 'saturate'){
        saturate = inpRange.value  
    }
    else if(selectedFilter.id == 'opacity'){
        opacity = (inpRange.value)
    }

    console.log(selectedFilter.id)
    applyFilteronImg
})


