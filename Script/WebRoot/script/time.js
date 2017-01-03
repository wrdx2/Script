function startTime()
{
var today=new Date();
var h=today.getHours();
var m=today.getMinutes();
var s=today.getSeconds();
var time=document.getElementById('txt');
// add a zero in front of numbers<10
m=checkTime(m);
s=checkTime(s);
time.innerHTML=h+":"+m+":"+s;
time.style.width='200px';
time.style.height='100px';
time.style.background = 'green';
t=setTimeout('startTime()',500);
}

function checkTime(i)
{
if (i<10) 
  {i="0" + i;}
  return i;
}