let after= ''
let page=1;
let next = document.querySelector('.btn-next');
let nextPage=''

const overlay=document.querySelector('.overlay')
const overalyImg=overlay.querySelector('img')
const parentDiv=document.getElementById('memes')
const memeBtn = document.querySelector('.memes-button');

const sub = ["woosh","arabfunny","memes","dank","dankinindia","IndianDankMemes","okbhaibudbak","dankruto","indianpeoplefacebook","memes","indianpeoplelinkedin","dankrishu"
,"dankmemes","2Asia4u","SaimanSays","cringe","funny","HistoryMemes",
"ShitPostCrusaders","starterpacks","wholesomememes"];

const waifus =["Waifu","RealGirls","waifusgonewild"];


const loadmemes= async function(url) {
    const data = await fetch(url)
    const body = await data.json()

    after = body.data.after;

    let markup = body.data.children
    .filter(meme=>meme.data.post_hint==='image')
    .map(meme=>{
        return `
        <div class="meme-section">
            <a class="links" href="${`https://www.reddit.com${meme.data.permalink}`}">${meme.data.title.slice(0, 50).toUpperCase()}</a>
            <img src="${meme.data.url_overridden_by_dest}" class="normal_img crossorigin">
        </div>
        `
    }).join('')

    parentDiv.innerHTML=markup
    document.body.appendChild(parentDiv);
}


const displayMemes = async function(){

    
    parentDiv.innerHTML=''
    
    next.style.display='initial'
    let subr = sub[Math.floor(Math.random()*sub.length)]
    nextPage=subr
    
    let url=`https://www.reddit.com/r/${subr}.json?after=`
    
    await loadmemes(url);
    
}

next.addEventListener('click', async function(){
    page++;
    let url = `https://www.reddit.com/r/${nextPage}.json?after=${after}`

    parentDiv.innerHTML=''

    next.style.display='initial'
    
    await loadmemes(url);
    
})

displayMemes()


memeBtn.addEventListener('click',displayMemes)


document.body.addEventListener('click',function(e){
    if(e.target.classList.contains('links')){
        e.preventDefault()
        window.open(e.target.href,'_blank')
    }
})


parentDiv.addEventListener('click',function(e){
    const img = e.target.closest('.normal_img')
    if(!img) return
    overlay.classList.toggle('hidden')
    overalyImg.src=img.src

})

overlay.addEventListener('click',function(){
    this.classList.toggle('hidden')
})