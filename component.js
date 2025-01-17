let segments,spintitle,wheelfontsize,fontcolorchangeindex;

let colorset = [
  ['#F3D5C0','#D4B499','#889EAF','#506D84'],
  ["#FF885B", "#FFE5CF", "#557C56", "#33372C"],
  ["#343131", "#A04747", "#D8A25E", "#EEDF7A"],
  ["#1B4242", "#76ABAE", "#31363F", "#222831"],
  ["#181C14", "#3C3D37", "#697565", "#ECDFCC"],
  ["#FF8A8A", "#F4DEB3", "#F0EAAC", "#CCE0AC"],
  ["#D1E9F6", "#F6EACB", "#F1D3CE", "#EECAD5"],
  ["#03AED2", "#68D2E8", "#FDDE55", "#FEEFAD"],
  ["#E5D9F2", "#F5EFFF", "#CDC1FF", "#A594F9"],
  ["#B3C8CF","#BED7DC","#F1EEDC","#E5DDC5"] 
];
let imglist=["https://yourspinner.com/wp-content/uploads/2024/10/spin-button.webp",
  "https://yourspinner.com/wp-content/uploads/2024/10/point1.webp",
  "https://yourspinner.com/wp-content/uploads/2024/10/point2.webp",
  "https://yourspinner.com/wp-content/uploads/2024/10/finger-pointing-to-up-1.webp",
  "https://yourspinner.com/wp-content/uploads/2024/10/arrow-up-1.webp",
  "https://yourspinner.com/wp-content/uploads/2024/10/arrow-up-2.webp"]
let cliksoundlist=[
  {id:"c1",src:"https://sounds.pond5.com/click-2-06-sound-effect-047970256_nw_prev.m4a"},
  {id:"c2",src:"https://yourspinner.com/wp-content/uploads/2024/10/select-sound-121244.mp3"},
  {id:"c3",src:"https://yourspinner.com/wp-content/uploads/2024/10/old-radio-button-click-97549.mp3"}
];
let spinsoundlist=[
  {id:"s1",src:"https://yourspinner.com/wp-content/uploads/2024/09/spin-sound.mp3"},
  {id:"s2",src:"https://yourspinner.com/wp-content/uploads/2024/10/small-film-projector-26188.mp3"},
  {id:"s3",src:"https://yourspinner.com/wp-content/uploads/2024/10/spin-sound-bike-2.mp3"}
];
let donesoundlist=[
  {id:"d1",src:"https://sounds.pond5.com/big-winning-jackpot-casino-game-sound-effect-151058646_nw_prev.m4a"},
  {id:"d2",src:"https://yourspinner.com/wp-content/uploads/2024/10/firework-whistle-190306.mp3"},
  {id:"d3",src:"https://yourspinner.com/wp-content/uploads/2024/10/tada-fanfare-a-6313.mp3"}
];
let fontSizeMap = [10, 12, 15, 20, 30];

let newtitle="";//编辑的title
let cradindex=0;//色卡index
let resultindex=0;//结果index
let duration="5s";//动画时长
let imgindex=0;//按钮index
let clicksoundindex="c1";
let spinsoundindex="s1";
let donesoundindex="d1";
let currentAngle = 0;


const fireworksCanvas = document.getElementById("fireworksCanvas");
const fireworksCtx = fireworksCanvas.getContext("2d");
let fireworkAnimation; 
let particles = [];
let sortOrder = '';
const clickSound = document.getElementById("click-sound");
const spinSound = document.getElementById("spin-sound");
const successSound = document.getElementById("success-sound");

var items;

window.onload = ()=>{
  initpageinfo();
  refreshwheel();
  setTitle();
}

function init(){
  genseg();
  items = document.querySelectorAll('.prize');
  setItemStyle();
  setSpinimg(imgindex);
}

function setTitle(){
  let title=document.querySelector(".spintitle");
  title.value=spintitle;
  let edit=document.getElementById("edittitle");
  let save = document.getElementById('savetitle');
  let cancel = document.getElementById('cancleedit');
  let maxLength=30;
  title.addEventListener('input', function(event) {
    let currentLength = title.value.length;
    if (currentLength > maxLength) {
      title.value = title.value.slice(0, maxLength);
      currentLength = maxLength;
    }
  });
  edit.addEventListener('click', function() {
    title.readOnly = !title.readOnly;
    save.classList.remove("hide");
    save.classList.add("show");
    cancel.classList.remove("hide");
    cancel.classList.add("show");
    title.classList.add('editable');
    this.classList.add("hide");
  });
  save.addEventListener('click', function() {
    title.readOnly = !title.readOnly;
    title.classList.remove('editable');
    newtitle=title.value;
    this.classList.remove("show");
    this.classList.add("hide");
    cancel.classList.remove("show");
    cancel.classList.add("hide");
    edit.classList.remove("hide");
    edit.classList.add("show");
  });
  cancel.addEventListener('click', function() {
    title.readOnly = !title.readOnly;
    if(newtitle.length==0){
      title.value=spintitle;
    }
    if(newtitle.length>0){
      title.value=newtitle;
    }
    title.classList.remove('editable');
    this.classList.remove("show");
    this.classList.add("hide");
    save.classList.remove("show");
    save.classList.add("hide");
    edit.classList.remove("hide");
    edit.classList.add("show");
  });
}
/**
 * @description: 根据已知条件计算出clip-path的切割路径
 * @param {*} height 矩形的高
 * @param {*} width 矩形的宽
 * @return {*}
 */
function getPath(height, width){
  // 得出每个奖项的角度,然后除以2得出夹角度数
  let jiaodu = 360 / items.length / 2;
  // 得出短直角边的长度
  let duan = (width/2) - Math.tan(jiaodu/180*Math.PI)*height;
  // 拼接路径信息
  let path = `M ${duan} 0 L ${width-duan} 0 L ${width/2} ${height}`;
  return path;
}

function getRotate(){
  // 获取奖项列表
  // 得出每个奖项的旋转角度
  return jiaodu = 360 / items.length;
}

function setItemStyle(){
  // 获取奖项列表
  let path = getPath(200,400);
  let jiaodu = getRotate();
  let jiao = 0;
  for (const item of items) {
    item.style.transform = 'rotate('+jiao+'deg)';
    item.style.clipPath = "path('"+path+"')";
    jiao += jiaodu;
  }
}

// 抽奖动画
function raffle(){  

  clickSound.play();
  // 设置中奖奖项下标,从0开始
  let index = Math.floor(Math.random() * items.length);
  // 至少旋转8圈
  let circle = 8;
  // 计算出转盘旋转多少度
  let rotate = 360 - 360 / items.length * index;
  // 得出一共多少度
  let finalRotate = rotate + circle * 360;
  // 设置目标角度
  let wheel = document.querySelector('.wheel');
  let preani= document.getElementById('preani');
  //wheel.classList.remove('presetAnime');
  stopAndRemoveAnimation(preani,'presetAnime');
  wheel.style.setProperty('--final-rotate',finalRotate + 'deg');
  // 设置动画类
  resetAndPlayAnimation(wheel,'myraffle');
  //动画开始后
  wheel.onanimationstart  = function(){ 
    spinSound.play();  
  }
  wheel.animationiteration  = function(){ 
    //spinSound.pause();  
  }
  // 动画结束后
  wheel.onanimationend  = function(){
    spinSound.pause(); 
    spinSound.currentTime = 0;
    var dialog = document.getElementById('myDialog');
    var p =document.getElementById('dialogtext');
    p.textContent=items[index].innerText;
    resultindex=index;
    dialog.showModal();
    startFireworks();
    successSound.play();
  }
}
//根据数组内容生成扇区
function genseg(){
  var outputDiv = document.getElementById('wheel');
  while (outputDiv.firstChild) {
    outputDiv.removeChild(outputDiv.firstChild);
  }
  if(cradindex<=fontcolorchangeindex){
    document.documentElement.style.setProperty('--base-font-color', "#FFFFFF");
  }else{
    document.documentElement.style.setProperty('--base-font-color', "#000000");
  }
  for(let i=0;i<segments.length;i++){
    var newP = document.createElement('div');
    document.documentElement.style.setProperty('--wheel-font-size', wheelfontsize+"px");
    newP.className = 'prize';
    newP.textContent=segments[i];
    newP.style.setProperty('background-color',gencolor(i));
    newP.classList.add('wheelfont');
    outputDiv.append(newP);
  }
}
//获取文本框返回数组
function getlist(){
  var textarea = document.getElementById('input-items');
  if (textarea.value==="") {
    textarea.value=segments.join('\n');
  };
  let lines = textarea.value.split('\n');
  let nlines= lines.filter(item => {
    return item.trim() != null && item.trim() !== "" && item.trim() !== false;
    });
  return nlines;
}
//根据textarea当前内容刷新wheel
function refreshwheel(){
  loadData();
  initslider();
  var outputDiv = document.getElementById('wheel');
  var entrycount=document.getElementById('entry-count');
  let nlines= getlist();
  segments.length=0;
  entrycount.innerText=nlines.length;
  for(let i=0;i<nlines.length;i++){
    segments.push(nlines[i]);
  }
  initsound();
  init();
}
//改变textarea内容生产div
document.addEventListener('DOMContentLoaded', function() {
  var textarea = document.getElementById('input-items');
  var outputDiv = document.getElementById('wheel');
  var currentP = null;
  if (!textarea || !outputDiv) {
      console.error('Missing required elements in the DOM.');
      return;
  }
  // 监听textarea的input事件
  textarea.addEventListener('input', function() {
      refreshwheel();
  });
  textarea.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;
        // 检查是否全选
        if (selectionStart === 0 && selectionEnd === text.length) {
            event.preventDefault(); // 阻止默认行为
            Clear();
        }
    }
});

  function preventSwipe(e) {
    // 阻止水平滑动手势
    if (Math.abs(e.touches[0].clientX - e.changedTouches[0].clientX) > Math.abs(e.touches[0].clientY - e.changedTouches[0].clientY)) {
        e.preventDefault();
    }
  }

});

function Shuffle(){
   var textarea = document.getElementById('input-items');
   let nlines= getlist();
  let currentIndex = nlines.length;
  let temporaryValue, randomIndex;
  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = nlines[currentIndex];
      nlines[currentIndex] = nlines[randomIndex];
      nlines[randomIndex] = temporaryValue;
  }
  var str="";
  for(let i=0;i<nlines.length;i++){
    str=str+nlines[i]+'\n';
  }
  textarea.value = str;
  refreshwheel();
};

function gencolor(colorindex){
 return colorset[cradindex][colorindex % colorset[cradindex].length];
};

function closeDialog() {
  document.getElementById('myDialog').close();
  //复原动画样式
  let wheel = document.querySelector('.wheel');
  let preani= document.getElementById('preani');
  stopAndRemoveAnimation(wheel,'myraffle');
  resetAndPlayAnimation(preani,'presetAnime');
  //wheel.classList.add('presetAnime');
};


function spinagain(){
  //wheel.classList.remove('myraffle');
  stopAndRemoveAnimation(wheel,'myraffle')
  document.getElementById('myDialog').close();
  raffle();
}

function startFireworks() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
  function createParticle(x, y, color) {
    return {
      x,
      y,
      radius: Math.random() * 6 + 3,
      color,
      speedX: (Math.random() - 0.5) * 15,
      speedY: (Math.random() - 0.5) * 15,
      gravity: 0.1,
      alpha: 1,
      life: 100,
    };
  }

  function updateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    particles.forEach((p, index) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity;
      p.alpha -= 0.01;
      p.radius -= 0.02;
      p.life -= 1;

      if (p.life <= 0 || p.radius <= 0 || p.alpha <= 0) {
        particles.splice(index, 1);
      }

      fireworksCtx.beginPath();
      fireworksCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      fireworksCtx.fillStyle = `rgba(${p.color},${p.alpha})`;
      fireworksCtx.fill();
    });

    if (particles.length > 0) {
      fireworkAnimation = requestAnimationFrame(updateFireworks);
    }
  }

  function burstFireworks() {
    const colors = [
      "255, 0, 0", // Red
      "0, 255, 0", // Green
      "0, 0, 255", // Blue
      "255, 255, 0", // Yellow
      "255, 0, 255", // Magenta
    ];
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * fireworksCanvas.width;
      const y = Math.random() * fireworksCanvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(createParticle(x, y, color));
    }
    updateFireworks();
  }
  burstFireworks();
}

// Function to stop the fireworks
function stopFireworks() {
  cancelAnimationFrame(fireworkAnimation);
  fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  particles = [];
}

function Clear(){
  var textarea = document.getElementById('input-items');
  textarea.value="";
  segments.length=0;
  refreshwheel();
}

function Sort(){
  var textarea = document.getElementById('input-items');
  let lines = getlist();
        if (sortOrder === 'asc') {
          lines.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
            sortOrder = 'desc'; 
        } else {
          lines.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
          sortOrder = 'asc';  
        }
  textarea.value = lines.join('\n');
  refreshwheel();
}

//根据checkbox显示输入框
var hide= document.getElementById('Hide');
var div = document.getElementById('spincont');
var inp = document.getElementById('inputs-section');
var inmini= document.getElementById('inputs-mini');
var mianc= document.getElementById('main-content');
var main=document.querySelector('.main');
var title=document.querySelector('.titlegroup');
var spinpar=document.querySelector('.spinpar');
hide.addEventListener('change', function(){
  refreshinput(this.checked);
});
function refreshinput(ischeck){
  if (ischeck) {
    inp.style.setProperty('display','none');
    div.style.transform = 'scale(1.4)';
    mianc.classList.add('centered');
    inmini.style.setProperty('display','');
    main.style.setProperty('height','85vh');
    title.style.setProperty('display','none');
    spinpar.style.setProperty('margin-top','170px');
  } else {
    inp.style.setProperty('display','');
    div.style.transform = 'scale(1.0)';
    inmini.style.setProperty('display','none');
    mianc.classList.remove('centered');
    main.style.setProperty('height','74vh');
    title.style.setProperty('display','');
    spinpar.style.setProperty('margin-top','0');
  }
}

function showinputlist(){
  var hide= document.getElementById('Hide');
  hide.checked=false;
  refreshinput(false);
}

function resetAndPlayAnimation(element,animename) {
  element.style.animation = 'none'; // 清除当前动画
  setTimeout(() => {
    element.style.animation = ''; // 重新应用动画
    element.classList.add(animename); // 添加动画类
  }, 0);
}

function stopAndRemoveAnimation(element,animename) {
  element.style.animation = 'none'; // 清除当前动画
  element.classList.remove(animename); // 移除动画类
}

function Setting(){
  var dialog = document.getElementById('settingDialog');
    dialog.showModal();
    let theme = document.querySelector('.theme');
    if(theme.childElementCount==0){
       gencolorcard();
    }
}

function closeSettingDialog(){
  document.getElementById('settingDialog').close();
}

function selectContent(event) {
  const groups = ['A', 'B', 'C','D','E','F'];
  const btn=event.target;
  const contentColumn = document.getElementById('content-column');
  const selectColumn = document.getElementById('select-column');
  const selectgroup=selectColumn.children;
   for(var i=0;i<selectgroup.length;i++){
     selectgroup[i].classList.remove('buttonselected');
   }
  // event.target.classList.add('buttonselected');
  groups.forEach(g => {
    const contentGroup = contentColumn.querySelector(`.content-group.${g}`);
    if(contentGroup!=null){
      contentGroup.classList.add('active'); 
      if ( btn.id === g) {
        btn.classList.add('buttonselected');
        if(g==='A'){
          let theme = document.querySelector('.theme');
          if(theme.childElementCount==0){
            gencolorcard();
          }
        }
        if(g==='C'){
          let img = document.querySelector('.imgpanel');
          if(img.childElementCount==0){
            genImgcard();
          }
        }
        if(g==='D'){
          let click = document.getElementById('clickcoundgroup');
          if(click.childElementCount==0){
            gensound(cliksoundlist,'clickcoundgroup');
          }
          let spin = document.getElementById('spincoundgroup');
          if(spin.childElementCount==0){
            gensound(spinsoundlist,'spincoundgroup');
          }
          let done = document.getElementById('donecoundgroup');
          if(done.childElementCount==0){
            gensound(donesoundlist,'donecoundgroup');
          }
        }
      } else {
        contentGroup.classList.remove('active');
      }
    }
  });

  //contentColumn.classList.add('active'); // 显示右侧列
}

function gencolorcard(){
const container = document.querySelector('.theme');
// 动态生成色卡
colorset.forEach((colorSet, index) => {
  const colorCard = document.createElement('div');
  colorCard.className = 'color-card';
  colorCard.id=index;
  if(index==cradindex){
    colorCard.classList.add('selected');
  }
  colorCard.addEventListener('click', () => {
    // 移除所有色卡的 selected 类
    document.querySelectorAll('.color-card').forEach(card => card.classList.remove('selected'));
    // 添加 selected 类
    colorCard.classList.add('selected');
  });

  for(let i=0;i<colorSet.length;i++){
    const colorSwatch = document.createElement('div');
    colorSwatch.className = 'color-swatch';
    colorSwatch.style.backgroundColor = colorSet[i];
    if(i==0){
      colorSwatch.style.borderTopLeftRadius="8px";
      colorSwatch.style.borderBottomLeftRadius="8px";
    }else if(i==colorSet.length-1){
      colorSwatch.style.borderTopRightRadius="8px";
      colorSwatch.style.borderBottomRightRadius="8px";
    }
    colorCard.appendChild(colorSwatch);
  }
  container.appendChild(colorCard);
});
}

function save(){
  //色卡
  var colordiv=document.querySelector('.theme');
  var colorselected = colordiv.querySelectorAll('.selected');
  if(colorselected.length>0){
    cradindex=colorselected[0].id;
  }
  //动画时长
  const durationSlider = document.getElementById('durationSlider');
  duration=""+durationSlider.value+"s";
  document.documentElement.style.setProperty('--animation-duration', duration);
  //spin图片
  var imgdiv=document.querySelector('.imgpanel');
  var imgselected = imgdiv.querySelectorAll('.selected');
  if(imgselected.length>0){
    imgindex=imgselected[0].id;
  }
  var clickGroup=document.getElementById('clickcoundgroup');
  var clickselected = clickGroup.querySelectorAll('.selected');
  if(clickselected.length>0){
    clicksoundindex=clickselected[0].querySelectorAll('audio')[0].id;
  }
  var spinGroup=document.getElementById('spincoundgroup');
  var spinselected = spinGroup.querySelectorAll('.selected');
  if(spinselected.length>0){
    spinsoundindex=spinselected[0].querySelectorAll('audio')[0].id;
  }
  var doneGroup=document.getElementById('donecoundgroup');
  var doneselected = doneGroup.querySelectorAll('.selected');
  if(doneselected.length>0){
    donesoundindex=doneselected[0].querySelectorAll('audio')[0].id;
  }
  //wheelfontsize
  let textSlider = document.getElementById('textSlider');
  wheelfontsize=fontSizeMap[textSlider.value - 1];
  // var nitems = document.querySelectorAll('.prize');
  // nitems.forEach(element => {element.classList.remove('wheelfont');
  //   element.classList.add('wheelfont');
  // });
  setCookie();
  shutallaudio('clickcoundgroup');
  shutallaudio('spincoundgroup');
  shutallaudio('donecoundgroup');
  refreshwheel();
  closeSettingDialog();
}
function shutallaudio(group){
  var augroup=document.getElementById(group);
  var audiv = augroup.querySelectorAll('div');
  if(audiv.length>0){
    audiv.forEach(div => {
      var audios=div.querySelectorAll('audio');
      var btns=div.querySelectorAll('div');
      for(i=0;i<audios.length;i++){
        audios[i].pause();
        audios[i].currentTime = 0;
        btns[i].innerHTML=null;
        btns[i].innerHTML='<ion-icon name="play" size="large"></ion-icon>';
      }
    });
  }
}


function initslider(){
  const textSlider = document.getElementById('textSlider');
  const durationSlider = document.getElementById('durationSlider');
  //const textLabel = document.getElementById('textLabel');
  const durationLabel = document.getElementById('durationLebel');
  const labels = document.querySelectorAll('.label');
  const preview=document.getElementById('text-preview');
  duration=duration.slice(0, -1);
  durationSlider.value=duration;
  durationLabel.textContent=duration;
  let fonsizeindex=fontSizeMap.indexOf(wheelfontsize)+1;
  if(fonsizeindex>=1){textSlider.value=fonsizeindex;}
  durationSlider.addEventListener('input', function(){
    durationLabel.textContent = durationSlider.value;
  });
  textSlider.addEventListener('input', function(){
    const fontSize = fontSizeMap[textSlider.value - 1];
    preview.style.fontSize = `${fontSize}px`;
    // 清除所有标签的激活状态
    labels.forEach(label => label.classList.remove('buttonselected'));
    // 根据当前滑块值激活对应的标签
    labels[textSlider.value - 1].classList.add('buttonselected');
    //console.log(fontSizeMap[textSlider.value - 1]);
  });
}



function remove(){
  let lines=getlist();
  if (resultindex >= 0 && resultindex < lines.length) {
    lines.splice(resultindex, 1);
  }
  var textarea = document.getElementById('input-items');
  textarea.value=lines.join('\n');
  shutallaudio('clickcoundgroup');
  shutallaudio('spincoundgroup');
  shutallaudio('donecoundgroup');
  refreshwheel();
  closeDialog();
}
function setSpinimg(index){
  var img = document.getElementById('spinimg');
  img.setAttribute('src',imglist[index]);
}

function genImgcard(){
  const container = document.querySelector('.imgpanel');
  // 动态生成色卡
  imglist.forEach((img, index) => {
    const imgcard = document.createElement('div');
    let imgtag = document.createElement('img');
    imgcard.className = 'img-card';
    imgcard.id=index;
    if(index==imgindex){
      imgcard.classList.add('selected');
    }
    imgtag.setAttribute('src',img);
    imgtag.classList.add('imgcon');
    imgcard.append(imgtag);
    imgcard.addEventListener('click', () => {
      // 移除所有色卡的 selected 类
      document.querySelectorAll('.img-card').forEach(card => card.classList.remove('selected'));
      // 添加 selected 类
      imgcard.classList.add('selected');
    });
    
    container.appendChild(imgcard);
  });
  }

  function reset(){
    cradindex=0;
    duration="5s";
    imgindex=0;
    wheelfontsize=30;
    clicksoundindex="c1";
    spinsoundindex="s1";
    donesoundindex="d1";
    refreshwheel();
    closeSettingDialog();
  }
//初始化音频
  function initsound(){
    let click=document.getElementById('click-sound');
    let spin=document.getElementById('spin-sound');
    let done=document.getElementById('success-sound');
    click.setAttribute('src',getsoundsrc(cliksoundlist,clicksoundindex));
    spin.setAttribute('src',getsoundsrc(spinsoundlist,spinsoundindex));
    done.setAttribute('src',getsoundsrc(donesoundlist,donesoundindex));
  }
  //根据音频id获取音频src
  function getsoundsrc(list,sid){
    let soundsrc="";
    list.forEach(({ id, src })=>{
      if(sid===id){
        soundsrc= src;
      }else{}
    });
    return soundsrc;
  }
//生成音卡
  function gensound(sounds,group){
    const container = document.getElementById(group);
    sounds.forEach(({ id, src }) => {
      const audioDiv = document.createElement('div');
      const audioBtn = document.createElement('div');
      const audioElement = document.createElement('audio');
      audioElement.src = src;
      audioElement.id=id;
      if(group==="clickcoundgroup"){
        if(id===clicksoundindex){
          audioDiv.classList.add('selected');
        }
      }else if(group==="spincoundgroup"){
        if(id===spinsoundindex){
          audioDiv.classList.add('selected');
        }
      }else if(group==="donecoundgroup"){
        if(id===donesoundindex){
          audioDiv.classList.add('selected');
        }
      }
      audioElement.preload=true;
      //audioElement.classList.add('soundplay');
      audioBtn.innerText = 'paly';
      audioBtn.classList.add('soundplaybtn');
      audioBtn.innerHTML='<ion-icon name="play" size="large"></ion-icon>';
      audioDiv.classList.add('soundDiv');
      audioBtn.addEventListener('click', () => {
        //const audio = document.getElementById(id);
         if (audioElement.paused) {
          audioElement.play();
           //audioBtn.innerText = 'pause';
           audioBtn.innerHTML=null;
           audioBtn.innerHTML='<ion-icon name="pause" size="large"></ion-icon>';
         } else {
          audioElement.pause();
          audioBtn.innerHTML=null;
          audioBtn.innerHTML='<ion-icon name="play" size="large"></ion-icon>';
         }
        // 移除所有音卡的 selected 类
        container.querySelectorAll('div').forEach(card => card.classList.remove('selected'));
        // 添加 selected 类
        audioDiv.classList.add('selected');
      });
      audioElement.addEventListener('ended', () => {
        audioBtn.innerHTML=null;
        audioBtn.innerHTML='<ion-icon name="play" size="large"></ion-icon>';
      });
      audioDiv.appendChild(audioElement);
      audioDiv.appendChild(audioBtn);
      container.appendChild(audioDiv);
    });
  }



function setCookie() {
  const data = {
    "cradindex": cradindex,
    "duration": duration,
    "imgindex": imgindex,
    "clicksoundindex":clicksoundindex,
    "spinsoundindex":spinsoundindex,
    "donesoundindex":donesoundindex
  };
  document.cookie = `multiKeyValue=${encodeURIComponent(JSON.stringify(data))}; path=/`;
}

// 从Cookie读取数据
function loadData() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)multiKeyValue\s*=\s*([^;]*).*$)|^.*$/, "$1");
  if (cookieValue) {
      try {
          const data = JSON.parse(decodeURIComponent(cookieValue));
          console.log(data);
          cradindex=data.cradindex;
          duration=data.duration;
          document.documentElement.style.setProperty('--animation-duration', duration);
          imgindex=data.imgindex;
          clicksoundindex=data.clicksoundindex;
          spinsoundindex=data.spinsoundindex;
          donesoundindex=data.donesoundindex; 
      } catch (e) {
          console.log("can`t read Cookie!");
      }
  } else {
    console.log("Empty Cookie!!");
  }
}
function encryptData(text) {
  let secretKey="spinnerwheel";
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encodeURIComponent(encrypted);
}

function shareresult(){
  //closeDialog();
  let p=document.getElementById('dialogtext');
  const encryptedData = encryptData(p.innerText);
  let p2=document.querySelector('title');
  const encryptedData2=encryptData(p2.innerText);
  //let p3="https://yourspinner.com/";
  //const encryptedData3=encryptData(p3);
  // 构建新的URL https://yourspinner.com/tools/share-my-pick/
  const newUrl = `https://yourspinner.com/tools/share-my-pick?encryptedData=${encryptedData}&encryptedData2=${encryptedData2}`;
  
  // 跳转到新的URL
  window.location.href = newUrl;
}