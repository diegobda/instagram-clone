//variaveis
let btn_prev = document.querySelector('.prev');
let btn_next = document.querySelector('.next');
let carrosel_container = document.querySelector('.carrosel-container');
let slider = document.querySelector('.carrosel-slider');
let index = 0

//troque o src para a imagem que queira adicionar no carrosel
let suasImagens = [
  {
    index:0,                  src:'https://static.wixstatic.com/media/09a3d5_55fd1b81f9094845ae7e43ec23c869b6~mv2_d_3072_2048_s_2.jpg'
  },
  {
    index:1,                  src:'https://images.adsttc.com/media/images/5bf2/16a3/08a5/e515/4e00/018b/newsletter/feature_image.jpg?1542592134'
  },
  
  {
    index:2,                  
    src:'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  },
  {
    index:3,                  src:'https://cdnpt01.viewbug.com/media/mediafiles/2016/03/25/64932333_medium.jpg'
  },
  {
    index:4,                  src:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Igua%C3%A7u_falls1_11-11-13.JPG/512px-Igua%C3%A7u_falls1_11-11-13.JPG'
  },
  {
    index:5,                  src:'https://wallpaperaccess.com/full/216113.jpg'
  },
  {
    index:6,                  src:'https://wallpaperaccess.com/full/216118.jpg'
  }
  
]

//-------------------------------------------------------


function eventLoaders(){
  //adicionado os eventlisteners aos botoes e chama as funcioes
  // de ir para proxima imagem e a animação dos botoes quando clicado
  btn_next.addEventListener('click', function(){
  goNext()
  clickAnimation(btn_next)
})
btn_prev.addEventListener('click', function(){
  goBack()
   clickAnimation(btn_prev)
})
}

eventLoaders()


function insertImages(){
  suasImagens.forEach(function(img){
    let html = `<img class="img-item img-item${img.index}" src="${img.src}"/>`
    slider.insertAdjacentHTML('beforeend',html)
  })
}
insertImages()

function goNext(){ 
  let imgArr = document.querySelectorAll('.img-item')
  //vai pra proxima imagem de acordo com o index
  index++ 
  if(index <= imgArr.length -1){
    //passa o index para a função que pega o tamanho da imagem e seta
    // quantos px o slider deve fazer o translateX
     getWidth(index)
     }else{
       // se o index passado for maior que o da ultima imagem ele seta como 0
       // fazendo assim o width ser o da primeira imagem
       index = 0
       getWidth(0)
     }
}

function goBack(){
  let imgArr = document.querySelectorAll('.img-item')
  index--
  if(index <= imgArr.length -1){
    if(index < 0){
      index = imgArr.length -1
    getWidth(index)
    }
    getWidth(index)
     }

}

function clickAnimation(btnClicked){
  //adiciona a classe para fazer a animação no botão correto
    if(btnClicked.classList.contains('next')){
         btnClicked.classList.toggle('effect_next')
       }else{ 
           btnClicked.classList.toggle('effect_prev')
       }  
}

function getWidth(param){
  // pega o index passado e seta para pegar a imagem correta
   let image_index = document.querySelector('.img-item'+param)
   //pega a imagem do index passado e verifica o width dela guardando
   //na variavel tamanho_img
   let tamanho_img = window.getComputedStyle(image_index, null).getPropertyValue("width")
   // converte o tamanho para numero tirando o px
  let tamanho_number = parseInt(tamanho_img.replace('px',''))
  // multiplica o tamanho pelo index assim se o tamanho for 400 e for a 
  //segunda imagem, vai multiplicar 400 por 2
  let result = tamanho_number*param
  // o resultado da multiplicacao é quando o carrosel deve se mover
  slider.style.transform = `translateX(-${result}px)`
  paintCircle(index)
   
}

function createCircles(){
  // faz um forEach em todos os elementos do array das imagens e insere
  // os circulos dentro do container de acordo com os index das imagens
  let imgArr = document.querySelectorAll('.img-item')
let circle_container =  document.querySelector('.circle-container')
imgArr.forEach(function(item, index){
  console.log(item)
 item.className.split(" ")[1]
 let html =`<div class="circle-item circle_${item.className.split(" ")[1]}"></div>`
 circle_container.insertAdjacentHTML('beforeend',html)
})
  
  //seta um evento de click para cada circulo
  document.querySelectorAll('.circle-item').forEach(function(circleBall,index){   
     circleBall.addEventListener('click',function(){
       clickCircle(index)
     })
  })
  //como o carrosel vai sempre carregar na primeira imagem, eu chamo
  //a funcção que pinta as bolinhas, e passo o index da primeira imagem
    paintCircle(0)
}

createCircles()

function clickCircle(param){ 
  // pega o index do circle quando é clicado é seta como o index global
  // chamando a função onde será setado o width onde o carrosel deve parar
  let newIndex = param
  index = newIndex
  getWidth(param)
  paintCircle(param)
}

function paintCircle(param){
  //limpa todos os circulos quando é clicado
    document.querySelectorAll('.circle-item').forEach(function(circle){
    circle.style.background = "transparent"
  })
  //seta penas o do index
  document.querySelector('.circle_img-item'+param).style.background = 'lightgray'  
  
}
 

