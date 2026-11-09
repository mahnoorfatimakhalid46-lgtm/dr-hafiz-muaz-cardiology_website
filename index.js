const navLinks=document.getElementById('links');
document.getElementById('ham').onclick=()=>navLinks.classList.toggle('open');

const obs=new IntersectionObserver((es)=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
    }
  })
}, {threshold:0.15});

document.querySelectorAll('[data-reveal]').forEach(el=>obs.observe(el));

document.getElementById('topBtn').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

document.getElementById('form').addEventListener('submit',e=>{
 e.preventDefault();
 const b=e.target.querySelector('button'); 
 b.innerText='Booking...';
 setTimeout(()=>{
  b.innerText='Booked! Opening WhatsApp';
  const msg=`Salam Dr. Hafiz Muhammad Muaz, Appointment request: ${e.target[0].value}, ${e.target[1].value}, Concern: ${e.target[2].value}`;
  window.open('https://wa.me/923336369752?text='+encodeURIComponent(msg),'_blank');
  b.innerText='Confirm Now'; 
  e.target.reset();
 },1000);
});

const chat=document.getElementById('chat');
document.getElementById('botBtn').onclick=()=>chat.classList.toggle('open');
document.getElementById('chClose').onclick=()=>chat.classList.remove('open');

const body=document.getElementById('chBody'), inp=document.getElementById('chInput');

function add(t,w){
  const d=document.createElement('div');
  d.className='m '+w;
  d.innerText=t;
  body.appendChild(d);
  body.scrollTop=body.scrollHeight;
}

function reply(q){
 q=q.toLowerCase();
 if(q.includes('appointment')||q.includes('book')) return 'To book: Fill the form or WhatsApp 0333-6369752. We confirm in 10 mins. Clinic: Bahawalpur MRI Center, Opp BVH.';
 if(q.includes('chest')||q.includes('pain')||q.includes('emergency')) return 'EMERGENCY? Call 0333-6369752 or 062-2881859 NOW. Keep sitting, take aspirin if not allergic, reach BVH Emergency.';
 if(q.includes('timing')||q.includes('time')) return 'Clinic Timings: Mon-Sat 7PM-9PM, Emergency 24/7 at BVH.';
 if(q.includes('fee')) return 'Consultation Fee: Rs.1500, Echo/Angio charges separate. Confirm on WhatsApp.';
 if(q.includes('location')||q.includes('address')||q.includes('where')) return 'Address: Bahawalpur MRI Center, Near Chughtai Lab, Opposite BVH, Bahawalpur. WhatsApp for live location pin.';
 if(q.includes('sugar')||q.includes('bp')||q.includes('diabetes')||q.includes('hypertension')) return 'Yes, Dr. Muaz specializes in BP & Sugar (Diabetes) management along with cardiac care.';
 if(q.includes('hello')||q.includes('salam')||q.includes('hi')) return 'Walaikum Salam! I am Dr. Muaz AI. How can I help with your heart today?';
 return 'I help with appointment, chest pain, timing, location, BP/Sugar, fee. Type your query.';
}

function send(){
 const v=inp.value.trim(); 
 if(!v) return; 
 add(v,'user'); 
 inp.value='';
 setTimeout(()=>add(reply(v),'bot'),500);
}

document.getElementById('chSend').onclick=send;
inp.addEventListener('keypress',e=>{if(e.key==='Enter')send()});

window.addEventListener('scroll',()=>{
  const el=document.querySelector('.scroll-down');
  if(el) el.style.opacity=window.scrollY>100?'0':'1';
});