import{e as $}from"./game-core-DaySFOzi.js";import"./entity-id-shared-CLUN6Tak.js";const m=(e={})=>{var o,t,n;return(o=e==null?void 0:e.spouse)!=null&&o.name?e.spouse.name:(n=(t=e==null?void 0:e.childFamilyMeta)==null?void 0:t.partnerRef)!=null&&n.name?e.childFamilyMeta.partnerRef.name:""},y=(e={})=>!!m(e),l={child:(e,o,t)=>{const n=e.age||0,s=Math.floor(n*12),a=e.sect&&e.sect.name,r=y(e),i=e.gender==="男"?e.motherName?"娘亲":"父亲":e.fatherName?"父亲":"娘亲";let f="";return s<216?f="孩儿不孝，未能长大成人、终老膝前。您的教诲、您的关爱，孩儿都记在心里。若有来世，我还要做您的孩子...对不起，让您白发人送黑发人了...":r?f=`孩儿大限将至，未能在您膝前尽孝，是此生最大的遗憾。${m(e)||"道侣"}我已托付给兄弟姐妹照看，您不必担心。养育之恩，今生无以为报，只能来世再续父子/母女缘分...`:a?f=`孩儿在${e.sect.name}修行遭遇不测，自知时日无多。没能让您享清福，没能光耀门楣，是孩儿最大的遗憾。您教我的做人道理，我一直铭记于心。保重身体，来世再见...`:f="孩儿修行失败，时日无多。养育之恩未能报答，心中满是愧疚。您保重身体，若有来世，定当好好孝顺您...",`${i}：

${f}

${e.name} 绝笔
云澜历 ${t.year}年 ${t.month}月`},spouse:(e,o,t)=>{var i,f;const n=((i=e.trait)==null?void 0:i.name)||"",s=((f=e.relationship)==null?void 0:f.affection)||80,a=e.gender==="male"?"娘子":"夫君";let r="";return s>=90?n.includes("深情")||n.includes("忠犬")?r="这一生能与你相守，是我最大的幸福。只恨不能陪你到最后...记得照顾好自己，也要照顾好我们的孩子。若有来世，我定会第一个找到你，再续前缘。我爱你，永远...":n.includes("病娇")||n.includes("偏执")?r="就算是死，我也要记住你的样子...你是我的，永远都是。下辈子，我还要找到你，绝不放手。等我...一定要等我...":n.includes("温润")?r="对不起，不能陪你到白头了...这些年，谢谢你的包容和爱。我们的孩子就拜托你了，要好好照顾自己。我会在另一个世界守望着你...别太想我，要开心地活下去。":r="道侣之缘，止于今日。这一生有你相伴，我已无憾。你要好好活着，看遍这世间风景。孩子们拜托了...来世再见。":s>=60?r="没想到会是这样的结局...我们之间的缘分，就到这里了。你保重，照顾好自己和孩子。":r="大限将至。你我夫妻一场，此生至此。珍重。",`${a}：

${r}

${e.name} 遗言
云澜历 ${t.year}年 ${t.month}月`},friend:(e,o,t)=>{var r,i;const n=((r=e.trait)==null?void 0:r.name)||"",s=((i=e.relationship)==null?void 0:i.affection)||60;let a="";return s>=70?n.includes("豪爽")||n.includes("狂傲")?a="哈哈，没想到我会先走一步！老友，这辈子能认识你，值了！以后喝酒没人陪了，你可别太寂寞。替我好好活着，看看这修真界的尽头！下辈子再把酒言欢！":n.includes("正直")||n.includes("坚韧")?a="道友，我先走一步了。这一生能与你并肩作战，是我的荣幸。修行路凶险，你要多加小心，不要重蹈我的覆辙。保重！":a="能结识你这样的道友，此生无憾。我先走了，你要保重，替我看看这世界的精彩。他日黄泉路上，你我再叙！":s>=40?a="道友，缘分至此。修行路上多保重，告辞了。":a="修行失败，时日无多。告辞。",`${o.name}道友：

${a}

${e.name} 绝笔
云澜历 ${t.year}年 ${t.month}月`},default:(e,o,t)=>{var a;const n=e.affection||((a=e.relationship)==null?void 0:a.affection)||50;let s="";return n>=60?s="此生能相识，已是缘分。只恨不能继续陪你走下去了。你要保重，好好活着。":s="缘分至此，告辞。珍重。",`${o.name}：

${s}

${e.name} 遗言
云澜历 ${t.year}年 ${t.month}月`}};function g(e,o,t,n="default"){const s=$(o);return n==="friend"&&(e.fatherName||e.motherName||e.generation||e.parent||e.parentId||s.some(i=>i.id===e.id))&&(n="child"),(l[n]||l.default)(e,o,t)}export{g as generateObituaryContent};
