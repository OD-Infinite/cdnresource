let segments,spintitle,wheelfontsize,fontcolorchangeindex,colorset;fontcolorchangeindex=4;colorset=[['#F3D5C0','#D4B499','#889EAF','#506D84'],["#FF885B","#FFE5CF","#557C56","#33372C"],["#343131","#A04747","#D8A25E","#EEDF7A"],["#1B4242","#76ABAE","#31363F","#222831"],["#181C14","#3C3D37","#697565","#ECDFCC"],["#FF8A8A","#F4DEB3","#F0EAAC","#CCE0AC"],["#D1E9F6","#F6EACB","#F1D3CE","#EECAD5"],["#03AED2","#68D2E8","#FDDE55","#FEEFAD"],["#E5D9F2","#F5EFFF","#CDC1FF","#A594F9"],["#B3C8CF","#BED7DC","#F1EEDC","#E5DDC5"]];let imglist=["https://yourspinner.com/wp-content/uploads/2024/10/spin-button.webp","https://yourspinner.com/wp-content/uploads/2024/10/point1.webp","https://yourspinner.com/wp-content/uploads/2024/10/point2.webp","https://yourspinner.com/wp-content/uploads/2024/10/finger-pointing-to-up-1.webp","https://yourspinner.com/wp-content/uploads/2024/10/arrow-up-1.webp","https://yourspinner.com/wp-content/uploads/2024/10/arrow-up-2.webp"];let cliksoundlist=[{id:"c1",src:"https://sounds.pond5.com/click-2-06-sound-effect-047970256_nw_prev.m4a"},{id:"c2",src:"https://yourspinner.com/wp-content/uploads/2024/10/select-sound-121244.mp3"},{id:"c3",src:"https://yourspinner.com/wp-content/uploads/2024/10/old-radio-button-click-97549.mp3"}];let spinsoundlist=[{id:"s1",src:"https://yourspinner.com/wp-content/uploads/2024/09/spin-sound.mp3"},{id:"s2",src:"https://yourspinner.com/wp-content/uploads/2024/10/small-film-projector-26188.mp3"},{id:"s3",src:"https://yourspinner.com/wp-content/uploads/2024/10/spin-sound-bike-2.mp3"}];let donesoundlist=[{id:"d1",src:"https://sounds.pond5.com/big-winning-jackpot-casino-game-sound-effect-151058646_nw_prev.m4a"},{id:"d2",src:"https://yourspinner.com/wp-content/uploads/2024/10/firework-whistle-190306.mp3"},{id:"d3",src:"https://yourspinner.com/wp-content/uploads/2024/10/tada-fanfare-a-6313.mp3"}];let fontSizeMap=[10,12,15,20,30];let newtitle="";let cradindex=0;let resultindex=0;let duration="5s";let imgindex=0;let clicksoundindex="c1";let spinsoundindex="s1";let donesoundindex="d1";let currentAngle=0;let fireworksCanvas=document.getElementById("fireworksCanvas");let fireworksCtx=fireworksCanvas.getContext("2d");let fireworkAnimation;let particles=[];let sortOrder='';let clickSound=document.getElementById("click-sound");let spinSound=document.getElementById("spin-sound");let successSound=document.getElementById("success-sound");let items;window.onload=()=>{loadCookie();initpageinfo();refreshwheel();setTitle()};document.addEventListener('DOMContentLoaded',function(){function preventSwipe(e){if(Math.abs(e.touches[0].clientX-e.changedTouches[0].clientX)>Math.abs(e.touches[0].clientY-e.changedTouches[0].clientY)){e.preventDefault()}}});function refreshwheel(){let entrycount=document.getElementById('entry-count');let nlines=getlist();segments.length=0;entrycount.innerText=nlines.length;for(let i=0;i<nlines.length;i++){segments.push(nlines[i])};init()};function init(){initsound();setSpinimg(imgindex);genseg();items=document.querySelectorAll('.prize');setItemStyle(items)};function setTitle(){let title=document.querySelector(".spintitle");title.value=spintitle;let edit=document.getElementById("edittitle");let save=document.getElementById('savetitle');let cancel=document.getElementById('cancleedit');let maxLength=30;title.addEventListener('input',function(event){let currentLength=title.value.length;if(currentLength>maxLength){title.value=title.value.slice(0,maxLength);currentLength=maxLength}});edit.addEventListener('click',function(){title.readOnly=!title.readOnly;save.classList.remove("hide");save.classList.add("show");cancel.classList.remove("hide");cancel.classList.add("show");title.classList.add('editable');this.classList.add("hide")});save.addEventListener('click',function(){title.readOnly=!title.readOnly;title.classList.remove('editable');newtitle=title.value;this.classList.remove("show");this.classList.add("hide");cancel.classList.remove("show");cancel.classList.add("hide");edit.classList.remove("hide");edit.classList.add("show")});cancel.addEventListener('click',function(){title.readOnly=!title.readOnly;if(newtitle.length==0){title.value=spintitle}if(newtitle.length>0){title.value=newtitle}title.classList.remove('editable');this.classList.remove("show");this.classList.add("hide");save.classList.remove("show");save.classList.add("hide");edit.classList.remove("hide");edit.classList.add("show")})};
function getPath(height, width,length){
    let jiaodu = 360 / length / 2;
    let duan = (width/2) - Math.tan(jiaodu/180*Math.PI)*height;
    let path = `M ${duan} 0 L ${width-duan} 0 L ${width/2} ${height}`;
    return path;}
  function setItemStyle(items){
    let path = getPath(200,400,items.length);
    let jiaodu = 360/items.length;
    let jiao = 0;
    for (let item of items) {
      item.style.transform = 'rotate('+jiao+'deg)';
      item.style.webkitClipPath = "path('"+path+"')";
      jiao += jiaodu;}};
let textarea=document.getElementById('input-items');if(!textarea){console.error('Missing required elements in the DOM.')}textarea.addEventListener('input',function(){refreshwheel()});textarea.addEventListener('keydown',function(event){if(event.key==='Backspace'){let selectionStart=textarea.selectionStart;let selectionEnd=textarea.selectionEnd;if(selectionStart===0&&selectionEnd===text.length){event.preventDefault();Clear()}}});function raffle(){clickSound.play();let index=Math.floor(Math.random()*items.length);let circle=8;let rotate=360-360/items.length*index;let finalRotate=rotate+circle*360;let wheel=document.querySelector('.wheel');let preani=document.getElementById('preani');stopAndRemoveAnimation(preani,'presetAnime');wheel.style.setProperty('--final-rotate',finalRotate+'deg');resetAndPlayAnimation(wheel,'myraffle');wheel.onanimationstart=function(){spinSound.play()};wheel.onanimationend=function(){spinSound.pause();spinSound.currentTime=0;let dialog=document.getElementById('myDialog');let p=document.getElementById('dialogtext');p.textContent=items[index].innerText;resultindex=index;dialog.showModal();startFireworks();successSound.play()}};function genseg(){let outputDiv=document.getElementById('wheel');while(outputDiv.firstChild){outputDiv.removeChild(outputDiv.firstChild)}if(cradindex<=fontcolorchangeindex){document.documentElement.style.setProperty('--base-font-color',"#FFFFFF")}else{document.documentElement.style.setProperty('--base-font-color',"#000000")}for(let i=0;i<segments.length;i++){let newP=document.createElement('div');document.documentElement.style.setProperty('--wheel-font-size',wheelfontsize+"px");newP.className='prize';newP.textContent=segments[i];newP.style.setProperty('background-color',gencolor(i));newP.classList.add('wheelfont');outputDiv.append(newP)}};function getlist(){let textarea=document.getElementById('input-items');if(textarea.value===""){textarea.value=segments.join('\n')};let lines=textarea.value.split('\n');let nlines=lines.filter(item=>{return item.trim()!=null&&item.trim()!==""&&item.trim()!==false});return nlines}function Shuffle(){let textarea=document.getElementById('input-items');let nlines=getlist();let currentIndex=nlines.length;let temporaryValue,randomIndex;while(currentIndex!==0){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=nlines[currentIndex];nlines[currentIndex]=nlines[randomIndex];nlines[randomIndex]=temporaryValue}let str="";for(let i=0;i<nlines.length;i++){str=str+nlines[i]+'\n'}textarea.value=str;refreshwheel()};function gencolor(colorindex){return colorset[cradindex][colorindex%colorset[cradindex].length]};function closeDialog(){document.getElementById('myDialog').close();let wheel=document.querySelector('.wheel');let preani=document.getElementById('preani');stopAndRemoveAnimation(wheel,'myraffle');resetAndPlayAnimation(preani,'presetAnime')};function spinagain(){stopAndRemoveAnimation(wheel,'myraffle');document.getElementById('myDialog').close();raffle()}function startFireworks(){fireworksCanvas.width=window.innerWidth;fireworksCanvas.height=window.innerHeight;function createParticle(x,y,color){return{x,y,radius:Math.random()*6+3,color,speedX:(Math.random()-0.5)*15,speedY:(Math.random()-0.5)*15,gravity:0.1,alpha:1,life:100,}}function updateFireworks(){fireworksCtx.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);particles.forEach((p,index)=>{p.x+=p.speedX;p.y+=p.speedY;p.speedY+=p.gravity;p.alpha-=0.01;p.radius-=0.02;p.life-=1;if(p.life<=0||p.radius<=0||p.alpha<=0){particles.splice(index,1)}fireworksCtx.beginPath();fireworksCtx.arc(p.x,p.y,p.radius,0,Math.PI*2);fireworksCtx.fillStyle=`rgba(${p.color},${p.alpha})`;fireworksCtx.fill()});if(particles.length>0){fireworkAnimation=requestAnimationFrame(updateFireworks)}}function burstFireworks(){let colors=["229,62,49","248,191,26"," 88,213,81","244,116,36","188,79,240"];for(let i=0;i<200;i++){let x=Math.random()*fireworksCanvas.width;let y=Math.random()*fireworksCanvas.height;let color=colors[Math.floor(Math.random()*colors.length)];particles.push(createParticle(x,y,color))}updateFireworks()}burstFireworks()}function stopFireworks(){cancelAnimationFrame(fireworkAnimation);fireworksCtx.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);particles=[]}function Clear(){let textarea=document.getElementById('input-items');textarea.value="";segments.length=0;refreshwheel()}function Sort(){let textarea=document.getElementById('input-items');let lines=getlist();if(sortOrder==='asc'){lines.sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));sortOrder='desc'}else{lines.sort((a,b)=>b.toLowerCase().localeCompare(a.toLowerCase()));sortOrder='asc'}textarea.value=lines.join('\n');refreshwheel()}let hide=document.getElementById('Hide');let div=document.getElementById('spincont');let inp=document.getElementById('inputs-section');let inmini=document.getElementById('inputs-mini');let mianc=document.getElementById('main-content');let main=document.querySelector('.main');let title=document.querySelector('.titlegroup');let spinpar=document.querySelector('.spinpar');hide.addEventListener('change',function(){refreshinput(this.checked)});function refreshinput(ischeck){if(ischeck){inp.style.setProperty('display','none');div.style.transform='scale(1.4)';mianc.classList.add('centered');inmini.style.setProperty('display','');main.style.setProperty('height','85vh');title.style.setProperty('display','none');spinpar.style.setProperty('margin-top','170px')}else{inp.style.setProperty('display','');div.style.transform='scale(1.0)';inmini.style.setProperty('display','none');mianc.classList.remove('centered');main.style.setProperty('height','74vh');title.style.setProperty('display','');spinpar.style.setProperty('margin-top','0')}}function showinputlist(){let hide=document.getElementById('Hide');hide.checked=false;refreshinput(false)}function resetAndPlayAnimation(element,animename){element.style.animation='none';setTimeout(()=>{element.style.animation='';element.classList.add(animename)},0)}function stopAndRemoveAnimation(element,animename){element.style.animation='none';element.classList.remove(animename)}function Setting(){let dialog=document.getElementById('settingDialog');dialog.showModal();let theme=document.querySelector('.theme');if(theme.childElementCount==0){gencolorcard()}}function closeSettingDialog(){document.getElementById('settingDialog').close()}function selectContent(event){let groups=['A','B','C','D','E','F'];let btn=event.target;let contentColumn=document.getElementById('content-column');let selectColumn=document.getElementById('select-column');let selectgroup=selectColumn.children;for(let i=0;i<selectgroup.length;i++){selectgroup[i].classList.remove('buttonselected')};groups.forEach(g=>{let contentGroup=contentColumn.querySelector(`.content-group.${g}`);if(contentGroup!=null){contentGroup.classList.add('active');if(btn.id===g){btn.classList.add('buttonselected');if(g==='A'){let theme=document.querySelector('.theme');if(theme.childElementCount==0){gencolorcard()}}if(g==='B'){initslider()}if(g==='C'){let img=document.querySelector('.imgpanel');if(img.childElementCount==0){genImgcard()}}if(g==='D'){let click=document.getElementById('clickcoundgroup');if(click.childElementCount==0){gensound(cliksoundlist,'clickcoundgroup')}let spin=document.getElementById('spincoundgroup');if(spin.childElementCount==0){gensound(spinsoundlist,'spincoundgroup')}let done=document.getElementById('donecoundgroup');if(done.childElementCount==0){gensound(donesoundlist,'donecoundgroup')}}}else{contentGroup.classList.remove('active')}}})}function gencolorcard(){let container=document.querySelector('.theme');colorset.forEach((colorSet,index)=>{let colorCard=document.createElement('div');colorCard.className='color-card';colorCard.id=index;if(index==cradindex){colorCard.classList.add('selected')}colorCard.addEventListener('click',()=>{document.querySelectorAll('.color-card').forEach(card=>card.classList.remove('selected'));colorCard.classList.add('selected')});for(let i=0;i<colorSet.length;i++){let colorSwatch=document.createElement('div');colorSwatch.className='color-swatch';colorSwatch.style.backgroundColor=colorSet[i];if(i==0){colorSwatch.style.borderTopLeftRadius="8px";colorSwatch.style.borderBottomLeftRadius="8px"}else if(i==colorSet.length-1){colorSwatch.style.borderTopRightRadius="8px";colorSwatch.style.borderBottomRightRadius="8px"}colorCard.appendChild(colorSwatch)}container.appendChild(colorCard)})}function save(){let colordiv=document.querySelector('.theme');let colorselected=colordiv.querySelectorAll('.selected');if(colorselected.length>0){cradindex=colorselected[0].id}let durationSlider=document.getElementById('durationSlider');duration=""+durationSlider.value+"s";document.documentElement.style.setProperty('--animation-duration',duration);let imgdiv=document.querySelector('.imgpanel');let imgselected=imgdiv.querySelectorAll('.selected');if(imgselected.length>0){imgindex=imgselected[0].id}let clickGroup=document.getElementById('clickcoundgroup');let clickselected=clickGroup.querySelectorAll('.selected');if(clickselected.length>0){clicksoundindex=clickselected[0].querySelectorAll('audio')[0].id}let spinGroup=document.getElementById('spincoundgroup');let spinselected=spinGroup.querySelectorAll('.selected');if(spinselected.length>0){spinsoundindex=spinselected[0].querySelectorAll('audio')[0].id}let doneGroup=document.getElementById('donecoundgroup');let doneselected=doneGroup.querySelectorAll('.selected');if(doneselected.length>0){donesoundindex=doneselected[0].querySelectorAll('audio')[0].id}let textSlider=document.getElementById('textSlider');wheelfontsize=fontSizeMap[textSlider.value-1];setCookie();shutallaudio('clickcoundgroup');shutallaudio('spincoundgroup');shutallaudio('donecoundgroup');refreshwheel();closeSettingDialog()}function shutallaudio(group){let augroup=document.getElementById(group);let audiv=augroup.querySelectorAll('div');if(audiv.length>0){audiv.forEach(div=>{let audios=div.querySelectorAll('audio');let btns=div.querySelectorAll('div');for(i=0;i<audios.length;i++){audios[i].pause();audios[i].currentTime=0;btns[i].innerHTML=null;btns[i].innerHTML='<ion-icon name="play" size="large"></ion-icon>'}})}}function initslider(){let textSlider=document.getElementById('textSlider');let durationSlider=document.getElementById('durationSlider');let durationLabel=document.getElementById('durationLebel');let labels=document.querySelectorAll('.label');let preview=document.getElementById('text-preview');duration=duration.slice(0,-1);durationSlider.value=duration;durationLabel.textContent=duration;let fonsizeindex=fontSizeMap.indexOf(wheelfontsize)+1;if(fonsizeindex>=1){textSlider.value=fonsizeindex}durationSlider.addEventListener('input',function(){durationLabel.textContent=durationSlider.value});textSlider.addEventListener('input',function(){let fontSize=fontSizeMap[textSlider.value-1];preview.style.fontSize=`${fontSize}px`;labels.forEach(label=>label.classList.remove('buttonselected'));labels[textSlider.value-1].classList.add('buttonselected')})}function remove(){let lines=getlist();if(resultindex>=0&&resultindex<lines.length){lines.splice(resultindex,1)};let textarea=document.getElementById('input-items');textarea.value=lines.join('\n');shutallaudio('clickcoundgroup');shutallaudio('spincoundgroup');shutallaudio('donecoundgroup');refreshwheel();closeDialog()}function setSpinimg(index){let img=document.getElementById('spinimg');img.setAttribute('src',imglist[index])}function genImgcard(){let container=document.querySelector('.imgpanel');imglist.forEach((img,index)=>{let imgcard=document.createElement('div');let imgtag=document.createElement('img');imgcard.className='img-card';imgcard.id=index;if(index==imgindex){imgcard.classList.add('selected')}imgtag.setAttribute('src',img);imgtag.classList.add('imgcon');imgcard.append(imgtag);imgcard.addEventListener('click',()=>{document.querySelectorAll('.img-card').forEach(card=>card.classList.remove('selected'));imgcard.classList.add('selected')});container.appendChild(imgcard)})}function reset(){cradindex=0;duration="5s";imgindex=0;wheelfontsize=30;clicksoundindex="c1";spinsoundindex="s1";donesoundindex="d1";refreshwheel();closeSettingDialog()}function initsound(){let click=document.getElementById('click-sound');let spin=document.getElementById('spin-sound');let done=document.getElementById('success-sound');click.setAttribute('src',getsoundsrc(cliksoundlist,clicksoundindex));spin.setAttribute('src',getsoundsrc(spinsoundlist,spinsoundindex));done.setAttribute('src',getsoundsrc(donesoundlist,donesoundindex))}function getsoundsrc(list,sid){let soundsrc="";list.forEach(({id,src})=>{if(sid===id){soundsrc=src}else{}});return soundsrc}function gensound(sounds,group){let container=document.getElementById(group);sounds.forEach(({id,src})=>{let audioDiv=document.createElement('div');let audioBtn=document.createElement('div');let audioElement=document.createElement('audio');audioElement.src=src;audioElement.id=id;if(group==="clickcoundgroup"){if(id===clicksoundindex){audioDiv.classList.add('selected')}}else if(group==="spincoundgroup"){if(id===spinsoundindex){audioDiv.classList.add('selected')}}else if(group==="donecoundgroup"){if(id===donesoundindex){audioDiv.classList.add('selected')}}audioElement.preload=true;audioBtn.innerText='paly';audioBtn.classList.add('soundplaybtn');audioBtn.innerHTML='<ion-icon name="play" size="large"></ion-icon>';audioDiv.classList.add('soundDiv');audioBtn.addEventListener('click',()=>{if(audioElement.paused){audioElement.play();audioBtn.innerHTML=null;audioBtn.innerHTML='<ion-icon name="pause" size="large"></ion-icon>'}else{audioElement.pause();audioBtn.innerHTML=null;audioBtn.innerHTML='<ion-icon name="play" size="large"></ion-icon>'}container.querySelectorAll('div').forEach(card=>card.classList.remove('selected'));audioDiv.classList.add('selected')});audioElement.addEventListener('ended',()=>{audioBtn.innerHTML=null;audioBtn.innerHTML='<ion-icon name="play" size="large"></ion-icon>'});audioDiv.appendChild(audioElement);audioDiv.appendChild(audioBtn);container.appendChild(audioDiv)})}function setCookie(){let data={"cradindex":cradindex,"duration":duration,"imgindex":imgindex,"clicksoundindex":clicksoundindex,"spinsoundindex":spinsoundindex,"donesoundindex":donesoundindex};document.cookie=`multiKeyValue=${encodeURIComponent(JSON.stringify(data))};path=/`}function loadCookie(){let cookieValue=document.cookie.replace(/(?:(?:^|.*;\s*)multiKeyValue\s*=\s*([^;]*).*$)|^.*$/,"$1");if(cookieValue){try{let data=JSON.parse(decodeURIComponent(cookieValue));console.log(data);cradindex=data.cradindex;duration=data.duration;document.documentElement.style.setProperty('--animation-duration',duration);imgindex=data.imgindex;clicksoundindex=data.clicksoundindex;spinsoundindex=data.spinsoundindex;donesoundindex=data.donesoundindex}catch(e){console.log("can`t read Cookie!")}}else{console.log("Empty Cookie!!")}};
function initpageinfo(){let title=document.querySelector('title');if(title.innerText==="100+ DTI Themes | Random Style"+" - YourSpinner"){segments=["Hollywood Glamour","Vintage 1920s","Disco Fever (1970s)","Roaring Twenties","Grease (1950s)","Masquerade Ball","Gatsby Glam","Cowboy/Cowgirl","Prom Night","Tropical Luau","All White Party","Black & Gold","Rainbow Brights","Monochrome Madness","Pastel Party","Neon Nights","Red Carpet Ready","Earth Tones","Metallic Shine","Blue and Silver Soiree","Superhero Showdown","Favorite Movie Characters","Cartoon/Anime Characters","Musical Icons","Rock 'n' Roll Legends","Harry Potter Universe","Game of Thrones","Disney Princesses","Star Wars Saga","Video Game Heroes","Winter Wonderland","Spring Fling","Summer Beach Bash","Fall Harvest Festival","Halloween Haunt","Christmas Cheer","New Year’s Eve Sparkle","Thanksgiving Feast","Valentine's Day Romance","Easter Celebration","Fairytale/Fantasy","Pirates and Mermaids","Futuristic/Space Age","Ancient Civilizations","Mythical Creatures","Under the Sea","Circus Extravaganza","Gothic/Victorian","Steampunk Adventure","Medieval Knights and Ladies","Tacky Tourist","Ugly Sweater Contest","Pajama Party","Animal Kingdom","Fashion Disaster","Karaoke Night","Silly Hat Party","Food-Themed Costumes","Mismatch Madness","SpongeBob SquarePants","Graduation Celebration","Wedding Reception","Baby Shower","Bridal Shower","Retirement Party","Anniversary Celebration","Corporate Gala","Charity Fundraiser","Sports Team Spirit","Family Reunion","International Cultures","Carnival/Festival","Hawaiian Luau","Celtic Celebration","Chinese New Year","Around the World","Cultural Heritage Night","Fiesta Night","Italian Night","African Safari","Board Games Night","Murder Mystery Night","Casino Night","Escape Room Adventure","Scavenger Hunt","Trivia Night","Book Club Gathering","Photography Shoot","Sports Day","Outdoor Picnic","Sustainable Fashion","Yoga Retreat","Farmers' Market","Health and Wellness","Nature Lovers' Gathering","Recycled Materials","Garden Party","Plant Parents","Vegan/Vegetarian Celebration","Mindfulness and Meditation"];spintitle="DTI Themes";wheelfontsize=5;}else if(title.innerText==="DTI Theme Wheel | 200 Creative Ideas in 2025 | Random Picker"+" - YourSpinner"){segments=["Casual","Formal","Glam","Cute","Retro","Vintage","Fantasy","Seasonal","Beach","Futuristic","Sports","Streetwear","Business","Goth","Fairytale","Chic","Bohemian","Elegant","Punk","Rustic","Urban","Professional","Edgy","Artistic","Sophisticated","Nautical","Animal Print","Metallic","Grunge","Floral","Color Block","Rocker","Preppy","Whimsical","Minimalist","Bright and Bold","Neutral Tones","Earthy","80s Inspired","90s Nostalgia","Artsy","Sporty Chic","Loungewear","Travel","Everyday","Celebrity Style","Country","Rave","Superhero","Gothic Lolita","Kawaii","South Asian","Middle Eastern","Afrocentric","Street Style","Schoolgirl","Cozy","Rugged","Quirky","Techwear","Maternity","Fairycore","Cottagecore","Retro Futurism","Victorian","Japanese Street Fashion","Sci-Fi","Steampunk","Industrial","Luxe","Dark Academia","Light Academia","Coastal","Southwestern","Tropical","Gothic Romance","Regency","Edwardian","Art Deco","Disco","Biker","Rockabilly","Vintage Americana","Slouchy","Heritage","Bright Pastels","Monochrome","Colorful Patterns","Bold Prints","Layered","Athleisure","Cargo","Edgy Elegance","All White","All Black","Prehistoric","Olympian","Masquerade","Carnival","Homecoming","Glitzy","Dapper","Crafty","Techno","Swimwear","Apocalyptic","Retro Sport","Vintage Glam","Nature-Inspired","Cosmic","Ethereal","Shabby Chic","Flamboyant","Aristocratic","Fashionista","Wild West","Underwater","Soft Girl","Punk Rock","Edgy Street","Urban Jungle","Safari","Surfer","Prom","Baroque","Rococo","Renaissance","Fairy Tale Princess","Battle Armor","Nature Fairy","Celestial","Cyberpunk","Neon","Colorful Boho","Formal Gothic","Retro Chic","Glam Rock","Sophisticated Casual","Athletic","Evening Wear","Corporate","Indie","Spooky","Retro Glam","School Spirit","Musician","Collector","Majestic","Mythical","Dreamy","Gentleman’s Club","Folk","Artisan","Vlogger","Y2K","Pop Art","Supernatural","Survival","Classic","Historical","Mid-Century Modern","Magical Girl","Victorian Gothic","Chinese Traditional","Japanese Kimono","Hawaiian","Zen","Punk Princess","Treasure Hunter","Knight","Samurai","Viking","Pharaoh","Urban Explorer","Experimental","Tech Innovator","Corporate Casual","Minimal Chic","Neutral Vibes","Cozy Knitwear","Alternative","Craft Fair","Rock Festival","Zen Garden","Heroic","Nature Lover","Elegant Evening","Retro Elegance","Gothic Punk","Urban Nomad","Classic Americana","Witchy","Vintage Classic","Abstract","Artistic Expression","Graffiti","Social Media Influencer","Sports Fan","Artistic Boho","Future Vintage"];spintitle="DTI Theme Wheel";wheelfontsize=5;}else if(title.innerText==="Hair Color Wheel Spinner: Your Guide to Vibrant Choices"+" - YourSpinner"){segments=["Black","Dark Brown","Medium Brown","Light Brown","Blonde","Red","Auburn","Chestnut","Golden Blonde","Honey Brown","Platinum Blonde","Copper","Burgundy","Strawberry Blonde","Ash Blonde","Silver","Charcoal","Teal","Lavender","Rose Gold"];spintitle="Hair Color Wheel Spinner";wheelfontsize=20;}else if(title.innerText==="Yes No Maybe Wheel: Top Random Picker"+" - YourSpinner"){segments=["Yes","No","Maybe","Yes","No","Maybe","Yes","No","Maybe","Yes","No","Maybe"];spintitle="Yes No Maybe Wheel";wheelfontsize=30;}else if(title.innerText==="Football Team Wheel | Spice Up Game Day with 29 Teams"+" - YourSpinner"){segments=["Atlanta United FC","Austin FC","Charlotte FC","Chicago Fire","Colorado Rapids","Columbus Crew","DC United","FC Cincinnati","FC Dallas","Houston Dynamo","Inter Miami CF","LA Galaxy","Los Angeles FC (LAFC)","Minnesota United FC","Nashville SC","New England Revolution","New York City FC","New York Red Bulls","Orlando City SC","Philadelphia Union","Portland Timbers","Real Salt Lake","San Jose Earthquakes","Seattle Sounders FC","Sporting Kansas City","St. Louis City SC","Toronto FC","Vancouver Whitecaps FC"];spintitle="Football Team Wheel";wheelfontsize=13;}else if(title.innerText==="Random Number Wheel 1-10 | Spin to Win"+" - YourSpinner"){segments=["1","2","3","4","5","6","7","8","9","10"];spintitle="Random Number Wheel 1-10";wheelfontsize=50;}else if(title.innerText==="Pick a Number Between 1 And 3 | How to Randomly Choose 1 2 3"+" - YourSpinner"){segments=["1","2","3"];spintitle="Pick a Number Between 1 And 3";wheelfontsize=50;}else if(title.innerText==="Random Number Wheel 1 50 | Best Generator for You"+" - YourSpinner"){segments=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"];spintitle="Random Number Wheel 1 50";wheelfontsize=20;}else if(title.innerText==="Pick a Number 1 or 2 | Fun and Fast Choices with Spinner Wheel"+" - YourSpinner"){segments=["1","2"];spintitle="Pick a Number 1 or 2";wheelfontsize=50;}else if(title.innerText==="Random Number Wheel | Spin Your Generator from 1 to 100"+" - YourSpinner"){segments=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100"];spintitle="Random Number Wheel";wheelfontsize=10;}else if(title.innerText==="Random Letter Generator from Aa to Zz"+" - YourSpinner"){segments=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];spintitle="Random Letter Generator";wheelfontsize=15;}else if(title.innerText==="NFL Team Wheel Spinner | Random Team Picker for Fans | Full List"+" - YourSpinner"){segments=["Arizona Cardinals","Atlanta Falcons","Baltimore Ravens","Buffalo Bills","Carolina Panthers","Chicago Bears","Cincinnati Bengals","Cleveland Browns","Dallas Cowboys","Denver Broncos","Detroit Lions","Green Bay Packers","Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Kansas City Chiefs","Las Vegas Raiders","Los Angeles Chargers","Los Angeles Rams","Miami Dolphins","Minnesota Vikings","New England Patriots","New Orleans Saints","New York Giants","New York Jets","Philadelphia Eagles","Pittsburgh Steelers","San Francisco 49ers","Seattle Seahawks","Tampa Bay Buccaneers","Tennessee Titans","Washington Commanders"];spintitle="NFL Team Wheel Spinner";wheelfontsize=12;}else if(title.innerText==="NFL Spinner Wheel | Randomly Choose Players"+" - YourSpinner"){segments=["Patrick Mahomes","Tyreek Hill","Justin Jefferson","Micah Parsons","Joe Burrow","Travis Kelce","CeeDee Lamb","A.J. Brown","Maxx Crosby","George Kittle","Sauce Gardner","Ja'Marr Chase","Jalen Ramsey","Lane Johnson","Nick Bosa","Quinnen Williams","Kyle Hamilton","Tua Tagovailoa","Christian McCaffrey","Deebo Samuel"];spintitle="NFL Spinner Wheel";wheelfontsize=15;}else if(title.innerText==="Random Country Wheel | Choose with Flag Spinner in 2025"+" - YourSpinner"){segments=["Algeria 🇩🇿","Angola 🇦🇴","Benin 🇧🇯","Botswana 🇧🇼","Burkina Faso 🇧🇫","Burundi 🇧🇮","Cabo Verde 🇨🇻","Cameroon 🇨🇲","Central African Republic 🇨🇫","Chad 🇹🇩","Comoros 🇰🇲","Democratic Republic of the Congo 🇨🇩","Republic of the Congo 🇨🇬","Djibouti 🇩🇯","Egypt 🇪🇬","Equatorial Guinea 🇬🇶","Eritrea 🇪🇷","Eswatini 🇸🇿","Ethiopia 🇪🇹","Gabon 🇬🇦","Gambia 🇬🇲","Ghana 🇬🇭","Guinea 🇬🇳","Guinea-Bissau 🇬🇼","Ivory Coast 🇨🇮","Kenya 🇰🇪","Lesotho 🇱🇸","Liberia 🇱🇷","Libya 🇱🇾","Madagascar 🇲🇬","Malawi 🇲🇼","Mali 🇲🇱","Mauritania 🇲🇷","Mauritius 🇲🇺","Morocco 🇲🇦","Mozambique 🇲🇿","Namibia 🇳🇦","Niger 🇳🇪","Nigeria 🇳🇬","Rwanda 🇷🇼","Sao Tome and Principe 🇸🇹","Senegal 🇸🇳","Seychelles 🇸🇨","Sierra Leone 🇸🇱","Somalia 🇸🇴","South Africa 🇿🇦","South Sudan 🇸🇸","Sudan 🇸🇩","Tanzania 🇹🇿","Togo 🇹🇬","Tunisia 🇹🇳","Uganda 🇺🇬","Zambia 🇿🇲","Zimbabwe 🇿🇼","Western Sahara 🇪🇭","Mayotte 🇾🇹","Réunion 🇷🇪","Saint Helena 🇸🇭","Ceuta 🇪🇸","Melilla 🇪🇸","Afghanistan 🇦🇫","Armenia 🇦🇲","Azerbaijan 🇦🇿","Bahrain 🇧🇭","Bangladesh 🇧🇩","Bhutan 🇧🇹","Brunei 🇧🇳","Cambodia 🇰🇭","China 🇨🇳","Cyprus 🇨🇾","East Timor 🇹🇱","Georgia 🇬🇪","India 🇮🇳","Indonesia 🇮🇩","Iran 🇮🇷","Iraq 🇮🇶","Israel 🇮🇱","Japan 🇯🇵","Jordan 🇯🇴","Kazakhstan 🇰🇿","Kuwait 🇰🇼","Kyrgyzstan 🇰🇬","Laos 🇱🇦","Lebanon 🇱🇧","Malaysia 🇲🇾","Maldives 🇲🇻","Mongolia 🇲🇳","Myanmar 🇲🇲","Nepal 🇳🇵","North Korea 🇰🇵","Oman 🇴🇲","Pakistan 🇵🇰","Palestine 🇵🇸","Philippines 🇵🇭","Qatar 🇶🇦","Saudi Arabia 🇸🇦","Singapore 🇸🇬","South Korea 🇰🇷","Sri Lanka 🇱🇰","Syria 🇸🇾","Taiwan 🇹🇼","Tajikistan 🇹🇯","Thailand 🇹🇭","Turkey 🇹🇷","Turkmenistan 🇹🇲","United Arab Emirates 🇦🇪","Uzbekistan 🇺🇿","Vietnam 🇻🇳","Yemen 🇾🇪","Hong Kong 🇭🇰","Macau 🇲🇴","Albania 🇦🇱","Andorra 🇦🇩","Austria 🇦🇹","Belarus 🇧🇾","Belgium 🇧🇪","Bosnia and Herzegovina 🇧🇦","Bulgaria 🇧🇬","Croatia 🇭🇷","Cyprus 🇨🇾","Czech Republic 🇨🇿","Denmark 🇩🇰","Estonia 🇪🇪","Finland 🇫🇮","France 🇫🇷","Germany 🇩🇪","Greece 🇬🇷","Hungary 🇭🇺","Iceland 🇮🇸","Ireland 🇮🇪","Italy 🇮🇹","Kosovo 🇽🇰","Latvia 🇱🇻","Liechtenstein 🇱🇮","Lithuania 🇱🇹","Luxembourg 🇱🇺","Malta 🇲🇹","Moldova 🇲🇩","Monaco 🇲🇨","Montenegro 🇲🇪","Netherlands 🇳🇱","North Macedonia 🇲🇰","Norway 🇳🇴","Poland 🇵🇱","Portugal 🇵🇹","Romania 🇷🇴","Russia 🇷🇺","San Marino 🇸🇲","Serbia 🇷🇸","Slovakia 🇸🇰","Slovenia 🇸🇮","Spain 🇪🇸","Sweden 🇸🇪","Switzerland 🇨🇭","Ukraine 🇺🇦","United Kingdom 🇬🇧","Vatican City 🇻🇦","Faroe Islands 🇫🇴","Gibraltar 🇬🇮","Guernsey 🇬🇬","Isle of Man 🇮🇲","Jersey 🇯🇪","Svalbard 🇳🇴","Antigua and Barbuda 🇦🇬","Bahamas 🇧🇸","Barbados 🇧🇧","Belize 🇧🇿","Canada 🇨🇦","Costa Rica 🇨🇷","Cuba 🇨🇺","Dominica 🇩🇲","Dominican Republic 🇩🇴","El Salvador 🇸🇻","Grenada 🇬🇩","Guatemala 🇬🇹","Haiti 🇭🇹","Honduras 🇭🇳","Jamaica 🇯🇲","Mexico 🇲🇽","Nicaragua 🇳🇮","Panama 🇵🇦","Saint Kitts and Nevis 🇰🇳","Saint Lucia 🇱🇨","Saint Vincent and the Grenadines 🇻🇨","Trinidad and Tobago 🇹🇹","United States 🇺🇸","Bermuda 🇧🇲","Greenland 🇬🇱","Saint Pierre and Miquelon 🇵🇲","Aruba 🇦🇼","Curaçao 🇨🇼","Sint Maarten 🇸🇽","Guadeloupe 🇬🇵","Martinique 🇲🇶","Puerto Rico 🇵🇷","U.S. Virgin Islands 🇻🇮","British Virgin Islands 🇻🇬","Anguilla 🇦🇮","Cayman Islands 🇰🇾","Montserrat 🇲🇸","Turks and Caicos Islands 🇹🇨","Bonaire 🇧🇶","Saint Barthélemy 🇧🇱","Saint Martin 🇲🇫","Argentina 🇦🇷","Bolivia 🇧🇴","Brazil 🇧🇷","Chile 🇨🇱","Colombia 🇨🇴","Ecuador 🇪🇨","Guyana 🇬🇾","Paraguay 🇵🇾","Peru 🇵🇪","Suriname 🇸🇷","Uruguay 🇺🇾","Venezuela 🇻🇪","Falkland Islands 🇫🇰","French Guiana 🇬🇫","Australia 🇦🇺","Fiji 🇫🇯","Kiribati 🇰🇮","Marshall Islands 🇲🇭","Micronesia 🇫🇲","Nauru 🇳🇷","New Zealand 🇳🇿","Palau 🇵🇼","Papua New Guinea 🇵🇬","Samoa 🇼🇸","Solomon Islands 🇸🇧","Tonga 🇹🇴","Tuvalu 🇹🇻","Vanuatu 🇻🇺","New Caledonia 🇳🇨","French Polynesia 🇵🇫","Guam 🇬🇺","Northern Mariana Islands 🇲🇵","American Samoa 🇦🇸","Cook Islands 🇨🇰","Niue 🇳🇺","Tokelau 🇹🇰","Wallis and Futuna 🇼🇫","Pitcairn Islands 🇵🇳","Norfolk Island 🇳🇫"];spintitle="Random Country Wheel";wheelfontsize=10;}else if(title.innerText==="Zodiac Sign Wheel"+" - YourSpinner"){segments=["Aries♈","Taurus♉","Gemini♊","Cancer♋","Leo♌","Virgo♍","Libra♎","Scorpio♏","Sagittarius♐","Capricorn♑","Aquarius♒","Pisces♓"];spintitle="Zodiac Sign Wheel";wheelfontsize=20;}else if(title.innerText==="Astrology Wheel | Randomly Generate Your Luckiest Signs in 2025"+" - YourSpinner"){segments=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];spintitle="Astrology Wheel";wheelfontsize=20;}else if(title.innerText==="NBA Team Wheel: Your Ultimate Random Wheel Spinner in 2025"+" - YourSpinner"){segments=["Boston Celtics","Brooklyn Nets","New York Knicks","Philadelphia 76ers","Toronto Raptors","Chicago Bulls","Cleveland Cavaliers","Detroit Pistons","Indiana Pacers","Milwaukee Bucks","Atlanta Hawks","Charlotte Hornets","Miami Heat","Orlando Magic","Washington Wizards","Denver Nuggets","Minnesota Timberwolves","Oklahoma City Thunder","Portland Trail Blazers","Utah Jazz","Golden State Warriors","LA Clippers","Los Angeles Lakers","Phoenix Suns","Sacramento Kings","Dallas Mavericks","Houston Rockets","Memphis Grizzlies","New Orleans Pelicans","San Antonio Spurs"];spintitle="NBA Team Wheel";wheelfontsize=15;}else if(title.innerText==="Unleash the Fun with the Pokémon Spinner Wheel | 50 Pokémon List"+" - YourSpinner"){segments=["Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian"];spintitle="Pokémon Spinner Wheel";wheelfontsize=10;}else if(title.innerText==="Random Name Picker | Wheel of Names | Ads Free"+" - YourSpinner"){segments=["Liam","Noah","Oliver","James","Olivia","Emma","Amelia","Sophia"];spintitle="Random Name Picker";wheelfontsize=30;}else if(title.innerText==="Yes or No Wheel: Spin for Random Decisions in 2025"+" - YourSpinner"){segments=["YES✅","NO❌","YES✅","NO❌","YES✅","NO❌","YES✅","NO❌","YES✅","NO❌"];spintitle="Yes or No Wheel";wheelfontsize=25;}else if(title.innerText==="Wheel of Dinner | Randomly Decide 10 Best Foods"+" - YourSpinner"){segments=["Pasta","Chicken","Tacos","Pizza","Stir-Fry","Soup","Burgers","Salad","Casseroles","Fish"];spintitle="Wheel of Dinner";wheelfontsize=20;}else if(title.innerText==="Wheel of Lunch: 100 Foods - Randomly Decide What to Eat"+" - YourSpinner"){segments=["BBQ Chicken Sandwich","Grilled Cheese","Cheeseburger","Fish and Chips","Fried Chicken","Chicken Tenders","Hot Dog","Pulled Pork Sandwich","Pizza Slice","Curry","Turkey Club Sandwich","Ham & Cheese Sandwich","BLT Sandwich","Chicken Caesar Wrap","Turkey & Avocado Wrap","Philly Cheesesteak","Egg Salad Sandwich","Roast Beef Sandwich","Pulled Pork Wrap","Grilled Chicken Sandwich","Caesar Salad","Greek Salad","Garden Salad","Cobb Salad","Chicken Salad","Tuna Salad","Spinach Salad","Caprese Salad","Quinoa Salad","Avocado Salad","Rice Bowl","Quinoa Bowl","Poke Bowl","Buddha Bowl","Grilled Chicken Grain Bowl","Taco Bowl","Teriyaki Chicken Bowl","Sushi Bowl","Steak Burrito Bowl","Mediterranean Grain Bowl","Sushi Rolls","Teriyaki Chicken","Ramen","Pho","Pad Thai","Spring Rolls","General Tso's Chicken","Beef Stir-Fry","Dim Sum","Lo Mein","Burrito","Tacos","Quesadilla","Nachos","Taco Salad","Enchiladas","Chimichanga","Chicken Fajitas","Guacamole & Chips","Tamales","Spaghetti and Meatballs","Pasta Alfredo","Lasagna","Pizza","Calzone","Meatball Sub","Fettuccine Carbonara","Chicken Parmesan","Minestrone Soup","Risotto","Shrimp Tacos","Grilled Salmon","Fish & Chips","Crab Cakes","Shrimp Po'Boy","Seafood Chowder","Grilled Fish Sandwich","Seared Tuna Salad","Clam Chowder","Lobster Roll","Mac & Cheese","Chili","Sloppy Joes","BBQ Ribs","Chicken Pot Pie","Meatloaf","Beef Stew","Fried Chicken and Waffles","Pulled Pork BBQ","Cornbread with Honey Butter","Avocado Toast","Hummus & Veggie Plate","Grilled Chicken Salad","Vegan Wrap","Tofu Stir-Fry","Lentil Soup","Veggie Burger","Zoodle Bowl","Mixed Fruit Salad","Smoothie Bowl"];spintitle="Wheel of Lunch";wheelfontsize=10;}else if(title.innerText==="🅰 🅱 🅲 🅳 Alphabet Spinner | Fun & Easy ABC Spin Wheel for Teachers"+" - YourSpinner"){segments=["Aa","Bb","Cc","Dd","Ee","Ff","Gg","Hh","Ii","Jj","Kk","Ll","Mm","Nn","Oo","Pp","Qq","Rr","Ss","Tt","Uu","Vv","Ww","Xx","Yy","Zz"];spintitle="Alphabet Spinner";wheelfontsize=20;}else if(title.innerText==="🅰️🅱️🅾️🅱️🅰️ LETTER WHEEL | A-Z Alphabet for Teaching in 2025"+" - YourSpinner"){segments=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];spintitle="Letter Wheel";wheelfontsize=30;}else if(title.innerText==="[OFFICIAL] YourSpinner | Spin the Online Wheel for Random Picks"+" - YourSpinner"){segments=["Yes","No","Yes","No","Yes","No","Yes","No"];spintitle="Spinner Wheel";wheelfontsize=30;}else{segments=["Yes","No","Yes","No","Yes","No","Yes","No"];spintitle="Spinner Wheel";wheelfontsize=30;}};