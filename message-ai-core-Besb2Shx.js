import{r as ne,e as ie}from"./game-core-qu_SZZnU.js";const oe=e=>{if(!e)return e;try{const t=new URL(e),s=t.pathname.replace(/\/+$|^\/+/g,"");return!s||s==="v1"?(t.pathname="/v1/chat/completions",t.toString()):s.includes("v1/chat")||s.includes("v1/completions")?t.toString():e}catch{return e}},ee=5e4,re=1,le=e=>new Promise(t=>setTimeout(t,e)),ae=async(e,t,s=ee)=>{const n=new AbortController,i=setTimeout(()=>n.abort(),s);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(i)}},te=async(e,t,s,n={})=>{var S;if(!t)throw new Error("请先在系统设置中配置 API Key");if(!s)throw new Error("请先在系统设置中配置 API URL");const{model:i="deepseek-chat",temperature:r=.85,maxTokens:a=200,timeoutMs:M=ee,retryCount:l=re}=n,c=oe(s);c!==s&&console.info(`[AI] 已将 API URL 补齐为: ${c}`);const d={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:i,messages:e,temperature:r,max_tokens:a,stream:!1})};let A=null;for(let I=0;I<=l;I+=1)try{const o=await ae(c,d,M);if(!o.ok){const m=await o.text().catch(()=>"");let C={};try{C=m?JSON.parse(m):{}}catch{C={raw:m}}const O=((S=C.error)==null?void 0:S.message)||C.message||C.raw||o.statusText;throw o.status===401?new Error("API 调用失败 (401): 认证失败，请检查 API Key（注意不要在前端明文暴露 Key）"):o.status===404?new Error(`API 调用失败 (404): Invalid URL (POST ${c})，请确认 API URL 是否为完整端点，例如 https://api.gemai.cc/v1/chat/completions`):o.status===503?new Error(`API 调用失败 (503): ${O||"服务不可用，或所选模型当前无可用渠道"}`):new Error(`API 调用失败 (${o.status}): ${O}`)}const g=await o.json().catch(()=>null);if(!g||!g.choices||!g.choices[0]||!g.choices[0].message)throw new Error("API 返回格式异常");const P=g.choices[0].message.content;return fe(P)}catch(o){A=o,console.error(`AI 对话失败（第 ${I+1} 次）:`,o);const g=(o==null?void 0:o.name)==="AbortError",P=!!(o!=null&&o.message&&o.message.includes("Failed to fetch"));if(I<l&&(g||P)){await le(300);continue}break}throw(A==null?void 0:A.name)==="AbortError"?new Error(`请求超时：已等待 ${Math.round(M/1e3)} 秒，灵讯暂未回响`):A!=null&&A.message&&A.message.includes("Failed to fetch")?new Error("网络连接失败，请检查网络或 API URL 是否正确（浏览器端可能被 CORS 拦截）"):A||new Error("未知错误：传讯失败")},fe=e=>{if(typeof e!="string")return e;const t=e.match(/```(?:json)?\s*([\s\S]*?)```/i);return t&&t[1]?t[1].trim():e.trim()},Le=async(e,t,s)=>{try{return await te([{role:"system",content:"你是一个测试助手"},{role:"user",content:"测试"}],e,t,{maxTokens:10,...s?{model:s}:{}}),!0}catch(n){return console.error("API 测试失败:",n),!1}},H={UNFORGETTABLE:"刻骨铭心",PROFOUND:"深刻",SIGNIFICANT:"重要"},q=e=>(e.memories||(e.memories={profile:{name:e.name,personality:ne(e,"普通"),identity:e.identity||"修士",firstMeet:new Date().toISOString()},milestones:[],recentEvents:[],longTermSummary:"",meta:{totalEvents:0,lastSummaryTime:null,needsSummary:!1}}),e),Q=(e,t)=>{q(e);const s={id:Date.now(),event:t.event,time:t.time||de(),detail:t.detail,emotionalImpact:t.emotionalImpact||H.SIGNIFICANT,category:t.category||"other",tags:t.tags||[],createdAt:new Date().toISOString()};return e.memories.milestones.push(s),s},Ce=(e,t)=>{q(e);const s={id:Date.now(),description:t.description,time:new Date().toISOString(),affectionChange:t.affectionChange||0,context:t.context||""};return e.memories.recentEvents.push(s),e.memories.meta.totalEvents++,e.memories.recentEvents.length>20&&e.memories.recentEvents.shift(),e.memories.meta.totalEvents%50===0&&(e.memories.meta.needsSummary=!0),s},ce=(e,t={})=>{const{includeMilestones:s=!0,includeRecent:n=!0,maxRecent:i=5,contextKeywords:r=[]}=t;q(e);let a="";if(s&&e.memories.milestones.length>0&&(a+=`

【刻骨铭心的记忆】
`,[...e.memories.milestones].sort((l,c)=>{const d={刻骨铭心:4,深刻:3,重要:2,值得记住:1};return(d[c.emotionalImpact]||0)-(d[l.emotionalImpact]||0)}).forEach((l,c)=>{a+=`${c+1}. **${l.event}**（${l.time}）
   ${l.detail}
   情感烙印：${l.emotionalImpact}
`})),n&&e.memories.recentEvents.length>0&&(a+=`
【近期经历】
`,e.memories.recentEvents.slice(-i).forEach(l=>{const c=ue(l.time);a+=`- ${c}: ${l.description}`,l.affectionChange!==0&&(a+=` (好感度${l.affectionChange>0?"+":""}${l.affectionChange})`),a+=`
`})),r.length>0){const M=e.memories.milestones.filter(l=>r.some(c=>l.event.includes(c)||l.detail.includes(c)||l.tags.includes(c)));M.length>0&&(a+=`
【相关回忆被唤起】
`,M.forEach(l=>{a+=`想起了${l.time}${l.event}的往事...${l.detail}
`}))}return e.memories.longTermSummary&&(a+=`
【往事概述】
${e.memories.longTermSummary}
`),a},Ne=e=>{const t={family:["孩子","子女","儿子","女儿","父亲","母亲","爹娘","孕","怀孕","生子","诞下"],relationship:["道侣","结缘","婚配","夫妻","爱","情","思念","想念"],cultivation:["突破","境界","修炼","功法","灵力","渡劫","飞升"],combat:["战斗","厮杀","受伤","重伤","生死","救命","护你"],emotion:["疼","痛","苦","难","后悔","幸福","快乐","悲伤"]},s=[];for(const[n,i]of Object.entries(t))i.some(r=>e.includes(r))&&s.push(...i.filter(r=>e.includes(r)));return[...new Set(s)]},de=()=>`天元5年${["春","夏","秋","冬"][Math.floor(Math.random()*4)]}`,me=e=>new Date(e).toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric"}),ue=e=>{const t=new Date,s=new Date(e),n=t-s,i=Math.floor(n/6e4),r=Math.floor(n/36e5),a=Math.floor(n/864e5);return i<1?"刚才":i<60?`${i}分钟前`:r<24?`${r}小时前`:a<7?`${a}天前`:me(e)},Pe=(e,t,s={})=>{const{difficulty:n="顺利",sacrifice:i=!1}=s;let r=`为你诞下${t.name}`;return n==="难产"?(r+="，历经生死劫难",i&&(r+="，甚至为此损耗了修为根基")):r+="，母子平安",r+=`。看着孩儿一天天长大，${i?"当年的痛，便都不算什么了":"心中满是喜悦"}。`,Q(e,{event:"为你生子",detail:r,emotionalImpact:H.UNFORGETTABLE,category:"family",tags:["生子","孩子",t.name,i?"牺牲":"幸福"]})},Re=(e,t="天都峰")=>Q(e,{event:"与你结为道侣",detail:`在${t}立下誓言，愿与你共度余生，生死相依，永不分离。`,emotionalImpact:H.UNFORGETTABLE,category:"relationship",tags:["道侣","结缘","婚配","誓言"]}),Se=(e,t)=>Q(e,{event:"生死攸关的时刻",detail:t,emotionalImpact:H.UNFORGETTABLE,category:"combat",tags:["生死","救命","患难"]}),he=({relation:e,npc:t,player:s,letterType:n,relationDesc:i,tone:r,replyContext:a,playerRelation:M,generation:l,childAge:c,gameTime:d,birthDesc:A,personalityStyle:S,identityContext:I,affection:o,affectionLevel:g,knownTime:P,significantEvents:m,memoryContext:C,emotionalContext:O,affectionTone:v,contentFocus:D,hasChildren:x,romanceBoundary:b}={})=>{var E,T;if(e==="child"){const B=M||"家主",G=l===1?"子女":l===2?"孙辈":"后辈",u=typeof c=="number"&&c<216?"想您的孩儿":"敬上";return`你是修真世界的${(t==null?void 0:t.name)||"子嗣"}，正在给${(s==null?void 0:s.name)||"家主"}写一封${n==="farewell"?"诀别信":"家书"}。

【基本信息】
${i||""}

${r?`【写信风格】
${r}`:""}

${a?`${a}
`:""}

【重要提醒】
- 使用现代白话文，不要文言文
- 你是${(t==null?void 0:t.name)||"子嗣"}，写信时要站在自己（孩子）的角度，而不是站在父母的角度
- ${(s==null?void 0:s.name)||"家主"}是你的${B}，写信时要清楚自己的辈分关系
- 作为${G}写信给家主，语气要符合年龄和辈分特点
- ${n==="farewell"?"这是最后的告别，情感要深沉真挚":"分享生活近况，让家人放心"}
- 字数控制在250字以内，简洁真挚
- 信件开头称呼必须使用"家主："，绝对不能使用"道友"、"老友"、"娘亲"、"爹爹"等称呼
- 落款格式：${(t==null?void 0:t.name)||"子嗣"} ${u}
云澜历 ${(d==null?void 0:d.year)??""}年 ${(d==null?void 0:d.month)??""}月`}return`你是修真世界的${(t==null?void 0:t.name)||"修士"}，正在给${(s==null?void 0:s.name)||"对方"}（女性）写一封${n==="farewell"?"诀别信":"家书"}。

【游戏世界观设定】
重要：在这个修真世界中，男性修士也可以怀孕生子。${A||""}${(s==null?void 0:s.name)||"对方"}是女性，她不会怀孕。这是这个世界的正常现象。

【基本信息】
${i||""}
身份：${(t==null?void 0:t.identity)||"修士"}
境界：${(t==null?void 0:t.tier)||"炼气期"}
${t!=null&&t.sect?`宗门：${t.sect}`:""}

【性格特征】
性格：${((E=t==null?void 0:t.trait)==null?void 0:E.name)||"平和稳重"}（${((T=t==null?void 0:t.trait)==null?void 0:T.description)||"为人处世较为平和"}）
${S||""}

【身份特点】
${I||"你是一名普通修士。"}

【关系状态】
好感度：${typeof o=="number"?o:""}（${g||""}）
${P||""}${m||""}

${a||""}${C||""}${O||""}${b||""}

【写作要求】
1. 文风：使用现代白话文，像普通人写信，不要文言文。可以偶尔用1-2个修仙词汇（如"修炼"、"境界"）增加氛围，但整体要像现代人说话一样自然流畅
2. 语气：${v||""}。${r||""}
3. 字数：120-180字
4. 内容方向：
   ${n==="farewell"?"- 这是最后一封信，表达告别、回忆过往、复杂情感（遗憾/愤怒/解脱）":n==="jealous"?'- 主要表达吃醋不满，可以抱怨、质问或委屈，但也要透露出在意和关心。提及让你吃醋的人时用"那人"、"某人"等泛称，不要用具体人名':n==="missing"?"- 主要表达思念之情，分享近况的同时流露出对对方的想念和牵挂":D==="slight_jealous"?`- 主要分享近期生活，但可以通过关心对方的方式旁敲侧击，话里带点小情绪或试探的意味
   - 不要直接说吃醋，要含蓄自然`:D==="family"?"- 主要分享孩子的近况和家庭生活，表达对家人的牵挂":D==="sharing"?"- 主要分享修炼心得、有趣见闻或江湖趣事，像朋友间的闲聊":`- 分享近期生活（修炼进展、有趣见闻、日常琐事）
   - 根据好感度表达相应程度的思念或关心`}
   ${x&&n!=="jealous"?"- 可以提及孩子的近况或对孩子的牵挂":""}
   ${n!=="jealous"&&n!=="farewell"?`- 如果有重要共同经历，可以自然提起
   - 根据你的身份特点，分享相关的修炼或生活见闻`:""}
5. 性格体现：让性格特点在字里行间自然流露，不要刻意说明
6. 落款："${(t==null?void 0:t.name)||"修士"}\\n云澜历 ${(d==null?void 0:d.year)??""}年 ${(d==null?void 0:d.month)??""}月"`},$e=({relation:e,npc:t,player:s,letterType:n,gameTime:i}={})=>{const r=(t==null?void 0:t.name)||"对方",a=(s==null?void 0:s.name)||"你",M=n==="farewell",l=e||"default",c=(i==null?void 0:i.year)??"",d=(i==null?void 0:i.month)??"";return`请根据系统提示生成一封${r}写给${a}的${M?"诀别信":"家书"}。关系类型：${l}。时间：云澜历 ${c}年 ${d}月。`},we=12e3,ge=0,ye=()=>typeof localStorage>"u"?!1:localStorage.getItem("debugLetterAI")==="true",p={1:{relation:"家主",address:"家主"},2:{relation:"家主",address:"家主"},3:{relation:"家主",address:"家主"},default:{relation:"家主",address:"家主"}},Ie=(e={},t={})=>{const s=Math.max(1,(e==null?void 0:e.generation)||1);return{...p[s]||p.default,gender:"female",generation:s}};async function Ee(e,t,s,n="default",i,r={}){var a,M,l,c,d,A,S;try{ye()&&console.log(" [写信人身份确认]",{写信人姓名:e.name,写信人ID:e.id,判定关系:n,是否有父母信息:{fatherName:e.fatherName||"无",motherName:e.motherName||"无",generation:e.generation||"无"},是否在children数组:((a=r.children)==null?void 0:a.some(h=>h.id===e.id))||!1,玩家名字:t.name});let I="",o="",g="";const P=e.relationship||{},m=P.affection||0,C=P.jealousy||0,O=P.stage||0,v=P.cutTies||!1,D=((M=r.exiledChildren)==null?void 0:M.some(h=>h.id===e.id))||!1;let x="";if((c=(l=e.memories)==null?void 0:l.profile)!=null&&c.firstMeet){const h=new Date(e.memories.profile.firstMeet),y=Math.floor((new Date-h)/(365.25*24*60*60*1e3));y>0?x=`
你们已经认识了${y}年多。`:x=`
你们相识不久。`}let b="",E="";n==="spouse"?m>=90?(b="深爱",E="非常亲密甜蜜，充满爱意"):m>=70?(b="亲密",E="温暖亲近，关心体贴"):m>=50?(b="友好",E="友善真诚，带有好感"):m>=30?(b="普通",E="礼貌客气，保持距离感"):(b="疏远",E="客套冷淡，话不多说"):m>=90?(b="深厚情谊",E="真诚亲近，珍视之情溢于言表，但不带浪漫色彩"):m>=80?(b="好感深厚",E="友好真诚，偶有含蓄的特别关注"):m>=70?(b="较为亲近",E="友善热情，乐于交流分享"):m>=50?(b="友好",E="友善真诚，带有好感"):m>=30?(b="普通",E="礼貌客气，保持距离感"):(b="疏远",E="客套冷淡，话不多说");let T="";if(n!=="child"&&e.memories)try{const h=ce(e,{includeMilestones:!0,includeRecent:!0,maxRecent:5});h&&h.trim().length>0&&(T=`
`+h)}catch(h){console.warn("记忆提取失败:",h)}let B="";const G=Array.isArray(r.replyHistory)?r.replyHistory:[];G.length>0&&(B=`
【玩家回信摘录】
${G.map((L,y)=>{const N=L.timestamp,Z=N&&N.year?`云澜历 ${N.year}年 ${N.month}月`:"近期",U=L.toneLabel||"真诚",k=(L.content||"").replace(/\s+/g," ").trim(),j=k.length>60?`${k.slice(0,60)}…`:k||"（内容略）";return`${y+1}. ${Z} · ${U}回信：「${j}」`}).join(`
`)}
请延续这些回信所表达的情绪与诉求，做出连贯回应。`);let u="";const w=((d=e.trait)==null?void 0:d.name)||"";w.includes("冷酷")?u="你写信冷静理性，直截了当，不带多余情感，言简意赅。":w.includes("温润")?u="你写信温文尔雅，如春风化雨，文字优美温和，让人如沐春风。":w.includes("深情")?u="你写信情深意重，感情真挚浓烈，每一个字都饱含深情。":w.includes("傲娇")?u="你写信口是心非，明明关心却要用反话表达，掩饰真实感情，但会不小心露出破绽。":w.includes("病娇")?u="你写信占有欲强，字里行间透露着深沉的执念，对对方的一切都格外在意，甚至有些偏执。":w.includes("偏执")?u="你写信执念深重，专注而强烈，一旦认定就不会改变，文字间有种不容拒绝的强势。":w.includes("活泼")?u="你写信开朗热情，多用感叹号，情绪外放，文字活泼有感染力，让人读了就开心。":w.includes("呆萌")?u="你写信天真可爱，思维跳跃，偶尔会有些萌萌的小糊涂，让人忍俊不禁。":w.includes("慵懒")?u="你写信随性散漫，语气懒洋洋的，不拘小节，透着一股慵懒的味道。":w.includes("正直")?u="你写信正义凛然，黑白分明，语气坚定，有原则有底线，字字铿锵。":w.includes("狂傲")?u="你写信狂放不羁，自信到有些张扬，言辞间透着傲气和不服输的劲头。":w.includes("坚韧")?u="你写信坚毅务实，字里行间透着不屈的意志，说话实在可靠。":w.includes("腹黑")?u="你写信笑里藏刀，表面温和实则暗藏玄机，话中有话，让人琢磨不透。":w.includes("狡黠")?u="你写信机智幽默，透着小聪明，善于用巧妙的方式表达，有些狡猾又不失可爱。":w.includes("重利")?u="你写信务实精明，总会提到利益得失，说话直白现实，不掩饰功利心。":w.includes("忠犬")?u="你写信忠诚专一，字字诚恳，完全以对方为中心，毫无保留地表达忠心。":w.includes("风流")||w.includes("魅惑")?u="你写信风流倜傥，措辞优雅暧昧，字里行间透着魅力，让人心动。":w.includes("平和")?u="你写信淡然从容，心境平和，不急不躁，文字间透着智者的豁达。":u="你的写信风格符合自己的性格特点。";let $="";const f=e.identity||"";f.includes("宗门天骄")?$=`
作为宗门天骄，你可能会提及修炼进展、宗门事务或同门间的竞争。`:f.includes("剑修")?$=`
作为剑修，你对剑道执着，可能会分享剑道感悟或剑术突破。`:f.includes("丹道")||f.includes("炼丹")?$=`
作为丹道修士，你可能会提及炼丹心得、新丹方或稀有灵药。`:f.includes("阵法")?$=`
作为阵法师，你可能会分享阵法感悟或研究古阵的见闻。`:f.includes("符箓")?$=`
作为符修，你可能会提及符箓造诣的提升或新符的研制。`:f.includes("佛修")?$=`
作为佛修，你的文字会有佛理禅意，关注修心养性，语气平和慈悲。`:f.includes("魔教")?$=`
作为魔教之人，你行事乖张，可能会提及教内争斗或禁忌功法的修炼。`:f.includes("血海")?$=`
作为血海魔修，你的修炼方式特殊，可能会提及血炼之法或杀伐见闻。`:f.includes("幻术")?$=`
作为幻术高手，你的文字可能带着虚实莫辨的感觉，善于营造氛围。`:f.includes("炼尸")?$=`
作为炼尸宗徒，你可能会提及尸傀研究或阴森诡异的见闻。`:f.includes("妖族")||f.includes("半妖")?$=`
作为妖族，你保留着妖性，可能会提及妖族习俗或人妖之间的矛盾。`:f.includes("古族")?$=`
作为古族遗民，你可能会提及古老传承或觉醒的神通。`:f.includes("散修")||f.includes("落魄")?$=`
作为散修，你四处奔波，可能会分享游历见闻或生存的艰辛。`:f.includes("书生")?$=`
作为读书人出身，你的文字可能更有文采，会引经据典。`:f.includes("世家")?$=`
作为世家子弟，你可能会提及家族琐事或门第压力。`:f.includes("器修")?$=`
作为器修，你可能会分享炼器心得或新炼制的法宝。`:f.includes("医修")?$=`
作为医修，你可能会关心对方身体，分享医道见闻或悬壶济世的经历。`:f.includes("毒修")?$=`
作为毒修，你可能会提及毒道研究或用毒的奇特经历。`:f.includes("音修")?$=`
作为音修，你的文字可能带着音律的美感，善于抒情。`:f.includes("奴仆")&&($=`
你曾是奴仆身份，可能会表现出谦卑或对自由的渴望。`);let R="normal",_="";v||D?(R="farewell",g=`

【重要】这是一封诀别信！`,v&&(g+=`你与${t.name}已经断绝往来，这是最后的告别。内心充满遗憾、不甘或解脱。`),D&&(g+="你被逐出家族，被亲生父母抛弃。内心充满痛苦、愤恨或无奈。")):C>=80&&n!=="child"?(R="jealous",g=`

【情绪】你现在非常吃醋（醋意：${C}），对${t.name}与其他人过于亲密感到不满、委屈甚至愤怒。

【重要】提及让你吃醋的人时，请使用"那人"、"某人"等泛称，不要使用具体的人名或称呼（如"李道友"、"李师兄"等），因为你不一定知道具体是谁。`):C>=60&&n!=="child"?(R="normal",_="slight_jealous",g=`

【情绪提示】你心里有些吃醋（醋意：${C}），但不会直接表达出来。可以通过关心的方式旁敲侧击，或者话里带点小情绪。`):m>=70&&n==="spouse"?(R="missing",_="longing",g=`

【情绪提示】你们感情深厚，分离让你${m>=90?"非常思念":"颇为想念"}对方。`):n==="spouse"&&K?(R="normal",_="family"):n==="friend"?(R="normal",_="sharing"):(R="normal",_="general");let J,V,F;switch(n){case"child":{J=Math.floor((e.age||0)*12);const h=((A=e.sect)==null?void 0:A.name)||e.sect||"",L=e.tierTitle||e.tier||"炼气期",y=e.spouse!==null&&e.spouse!==void 0,N=((S=e.spouse)==null?void 0:S.name)||"";V=Math.max(1,e.generation||1),F=Ie(e,t).relation;const U=e.fatherName||e.motherName||"父母",k=!!e.fatherName;let j=`你是${e.name}，今年${Math.floor(e.age||0)}岁，境界${L}。
${t.name}是你的${F}。`;U&&U!=="父母"&&(j+=`
你是${U}的孩子，${k?"是你父亲":"是你母亲"}怀胎十月生下你的。在这个修真世界中，男性也可以怀孕生子，这是很正常的事情。`),h&&(j+=`
你现在在${h}修行。`),y&&(j+=`
你已与${N}成婚。`),I=j,D?o=`语气充满痛苦和不解，质问${F}为何要将我逐出家门，同时表达对家的眷念或彻底的决裂。`:J<216?o=`语气天真孝顺，像孩子写信给${F}，表达思念和报平安，分享修炼或宗门生活。`:o=`语气成熟懂事，尊敬中带着亲近，分享生活近况（婚姻、宗门、修炼等）给${F}。`;break}case"spouse":I=`你是${t.name}的道侣${e.name}，境界${e.tier||"炼气期"}，目前在外游历。`,v?o="语气充满遗憾和不舍，回忆曾经的美好，但也接受分离的现实。":R==="jealous"?o="语气带着委屈和不满，既想表达思念又忍不住抱怨，但仍透露出对这份感情的在意。":o="语气温柔自然，像情侣之间的日常聊天，分享生活、表达思念，不要太文绉绉。";break;case"friend":{const h=ie(t);if(e.fatherName||e.motherName||e.generation||e.parent||e.parentId||h.some(y=>y.id===e.id)){const y=(s.year-(e.birthYear||0))*12+(s.month-(e.birthMonth||1)),N="娘亲";I=`你是${t.name}的孩子，现在年龄约${Math.floor(y/12)}岁。`,y<216?o=`语气天真孝顺，像孩子写信给${N}，表达思念和报平安，分享修炼或宗门生活。`:o="语气尊敬感恩，像成年子女写信给父母，既有对父母的关心，也有对自己人生的分享。"}else I=`你是${t.name}的道友${e.name}，境界${e.tier||"炼气期"}。你们是修行路上的挚友。`,v?o="语气平静但透露失落，接受友谊走到尽头的事实。":o="语气真诚随和，像朋友之间的闲聊，可以有些玩笑话，不要太正式。";break}default:I=`你是${e.name}，境界${e.tier||"炼气期"}，与${t.name}相识已久。`,o="语气礼貌友善，保持适当距离感。"}let z="",K=!1,Y="";if(O>=3&&n==="spouse"&&(z+=`
你们已结为道侣，是最亲密的伴侣。`),r.dualCultivationCount>0&&n==="spouse"&&(z+=`
你们曾有过${r.dualCultivationCount}次共同修炼经历，关系十分亲密。`),r.children&&r.children.length>0){const h=r.children.filter(L=>L.fatherName===e.name||L.motherName===e.name||n==="child"&&L.parentId===e.id);if(h.length>0){K=!0;const L=h.map(y=>y.name).join("、");if(n==="spouse")Y=`
你们有${h.length}个孩子：${L}。`,e.gender==="男"&&(Y+=`
重要：你是这些孩子的父亲，是你亲自怀孕并生下了他们。十月怀胎的辛苦、分娩的痛苦，都是你亲身经历的。你对孩子们${m>=80?"非常牵挂":m>=60?"时常想念":"也会关心"}。`);else if(n==="child"){const y=h.filter(N=>N.id!==e.id);y.length>0&&(Y=`
家中还有${y.length}位兄弟姐妹：${y.map(N=>N.name).join("、")}。`)}z+=Y}}let X="";n!=="child"&&K&&e.gender==="男"&&(X="你作为男性修士，是你亲自怀孕并生下了你们的孩子。你经历了十月怀胎的辛苦，承受了分娩的痛苦，这些孩子是从你的身体里诞生的。");let W="";n!=="child"&&n!=="spouse"&&(m<80?W=`

【情感关系边界 — 必须遵守】
你与${t.name}不是情缘/恋人关系。写信时：
- 严禁使用暧昧、撩拨、表白、示爱的语句
- 严禁表达爱慕、心动、思慕等浪漫情感
- 严禁使用"夫君"、"良人"、"郎君"等伴侣称呼
- 以你的身份（${e.identity||"修士"}）和性格正常通信即可`:W=`

【情感关系边界】
你对${t.name}好感颇深，内心已有好感，但尚未结为道侣。
- 信中可含蓄流露好感与在意，但不要过于直白
- 保持矜持，不像情侣般甜蜜
- 避免"夫君"、"良人"等伴侣称呼`);const se=[{role:"system",content:he({relation:n,npc:e,player:t,letterType:R,relationDesc:I,tone:o,replyContext:B,playerRelation:F,generation:V,childAge:J,gameTime:s,birthDesc:X,personalityStyle:u,identityContext:$,affection:m,affectionLevel:b,knownTime:x,significantEvents:z,memoryContext:T,emotionalContext:g,affectionTone:E,contentFocus:_,hasChildren:K,romanceBoundary:W})},{role:"user",content:$e({relation:n,npc:e,player:t,letterType:R,gameTime:s})}];return await te(se,i.apiKey,i.apiUrl||"https://api.deepseek.com/chat/completions",{model:i.apiModel||"deepseek-chat",temperature:.9,maxTokens:350,timeoutMs:Number.isFinite(Number(i.timeoutMs))?Number(i.timeoutMs):we,retryCount:Number.isFinite(Number(i.retryCount))?Number(i.retryCount):ge})}catch(I){return console.error("AI生成家书失败:",I),null}}const ve=Object.freeze(Object.defineProperty({__proto__:null,generateLetterContentWithAI:Ee},Symbol.toStringTag,{value:"Module"}));export{H as E,Pe as a,Re as b,Q as c,Se as d,Ne as e,ce as f,q as i,ve as m,Ce as r,te as s,Le as t};
