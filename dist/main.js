const m=()=>new Date().toLocaleTimeString("ru-RU"),n=t=>{console.log(m(),t)},w=t=>{console.error(m(),t.message)},v=async t=>new Promise(s=>setTimeout(()=>s(),t));async function g(t,s,o=1e3,T=10){const f=document;for(let u=0;u<T;u++){const c=f.querySelector(t);if(c!=null)return c;await v(o)}throw new Error(`Cannot find ${t}`)}const a=document.querySelector("title");let e=null,i=null;const O=t=>{if(!a)throw new Error("pageTitleElement is null");e!=null&&(e.disconnect(),e=null,n("Old titleObserver killed")),e=new MutationObserver(()=>{i&&clearTimeout(i),i=setTimeout(()=>{t()},1e4)}),e.observe(a,{childList:!0}),n("Started titleObserver")};let d,r;const y=1e3*60,E=y*15,b=async()=>{await h(),l()},h=async()=>{d=await g("div.chat-input__buttons-container"),n("buttons panel initialized")},p=()=>[...d.querySelectorAll("button")].find(o=>o.ariaLabel&&o.ariaLabel.toLocaleLowerCase()=="claim bonus"),l=()=>{r&&clearTimeout(r);const t=p();t?(t.click(),r=setTimeout(l,E),n("button used")):(r=setTimeout(l,y),n("button missing"))};setTimeout(async()=>{try{await b()}catch(t){w(t)}O(b)});
