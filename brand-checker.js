/**
 * KOLEEX Brand Checker — Category-Specific Rules Engine v6.0
 * 4 Categories × 10 Design Types = Type-Aware Audit
 * Real OCR + Color Extraction + Contrast + Layout Analysis
 */
(function(){
'use strict';

var DT=[
{id:'social-media',name:'Social Media Post',icon:'fa-share-nodes'},
{id:'poster',name:'Poster',icon:'fa-image'},
{id:'packaging',name:'Packaging',icon:'fa-box-open'},
{id:'website',name:'Website Section',icon:'fa-globe'},
{id:'ui-screen',name:'UI Screen',icon:'fa-mobile-screen-button'},
{id:'exhibition',name:'Exhibition Panel',icon:'fa-store'},
{id:'document',name:'Document',icon:'fa-file-lines'},
{id:'label',name:'Label',icon:'fa-tag'},
{id:'presentation',name:'Presentation Slide',icon:'fa-display'},
{id:'general',name:'General Design',icon:'fa-shapes'}
];

var CATS=[
{id:'brandIdentity',name:'Brand Identity',icon:'fa-certificate'},
{id:'layoutComposition',name:'Layout & Composition',icon:'fa-border-all'},
{id:'typography',name:'Typography',icon:'fa-font'},
{id:'colorSystem',name:'Color System',icon:'fa-droplet'}
];

// ============================================================
// DESIGN TYPE RULES CONFIG (data-driven)
// ============================================================
var RULES={
'social-media':{
  weights:{brandIdentity:.30,layoutComposition:.30,typography:.25,colorSystem:.15},
  logoRequired:false,brandTextRequired:true,
  spacingSensitivity:'medium',hierarchySensitivity:'high',clutterTolerance:'low',
  maxTextBlocks:6,contrastSensitivity:'high',
  note:'Evaluated using Social Media Post rules.',
  hardWarnings:['Too many text blocks for social format','Low contrast reduces mobile readability','No clear focal message','No KOLEEX identity detected'],
  issueTemplates:{crowded:'Layout appears too dense for social media viewing. Social posts need strong visual clarity at small sizes.',hierarchy:'Social media posts require an immediately clear visual hierarchy — one dominant message that captures attention.',text:'Too much text detected for social media format. Keep messages short and impactful.',brand:'KOLEEX brand identity should be present through brand name, logo, or recognizable visual language.'},
  suggTemplates:{crowded:'Simplify composition. Social media content is viewed quickly — reduce elements to essential message only.',hierarchy:'Make one element clearly dominant. Use large bold text for the primary message.',text:'Reduce text to a single strong headline with optional short subtitle.',brand:'Add KOLEEX logo or brand name. Even subtle brand presence matters on social media.'}
},
'poster':{
  weights:{brandIdentity:.35,layoutComposition:.30,typography:.20,colorSystem:.15},
  logoRequired:true,brandTextRequired:true,
  spacingSensitivity:'high',hierarchySensitivity:'high',clutterTolerance:'low',
  maxTextBlocks:5,contrastSensitivity:'high',
  note:'Evaluated using Poster design rules.',
  hardWarnings:['No KOLEEX brand evidence','Poster composition too crowded','Weak visual hierarchy','No clear focal point'],
  issueTemplates:{crowded:'Poster layout is too dense. Posters need strong focal impact with generous whitespace.',hierarchy:'No clear headline or focal message detected. Posters require one dominant visual element.',brand:'KOLEEX brand identity is essential on posters. Logo and brand name should be clearly visible.',contrast:'Poster contrast is insufficient. Large-format prints need strong light-dark separation.'},
  suggTemplates:{crowded:'Remove secondary elements. Focus on one strong title, one image, and the logo.',hierarchy:'Increase headline size significantly. Create clear reading path: title → image → logo.',brand:'Place official KOLEEX logo in approved position (top left, bottom center, or bottom left).',contrast:'Use black background with white text or white background with black text for maximum impact.'}
},
'packaging':{
  weights:{brandIdentity:.40,layoutComposition:.25,typography:.20,colorSystem:.15},
  logoRequired:true,brandTextRequired:true,
  spacingSensitivity:'medium',hierarchySensitivity:'medium',clutterTolerance:'medium',
  maxTextBlocks:10,contrastSensitivity:'high',
  note:'Evaluated using Packaging design rules.',
  hardWarnings:['No KOLEEX identity on packaging','Missing product identification','Cluttered packaging layout','Too many colors for industrial packaging'],
  issueTemplates:{crowded:'Packaging layout contains too many competing elements. Industrial packaging should be structured and scannable.',hierarchy:'Product identification area is weak. Product name and model should be immediately readable.',brand:'Packaging must carry explicit KOLEEX brand ownership. Logo and brand name are mandatory.',color:'Color palette exceeds industrial packaging standards. KOLEEX packaging uses controlled minimal colors.'},
  suggTemplates:{crowded:'Organize content into clear zones: brand zone, product info zone, technical zone, barcode zone.',hierarchy:'Make product name the largest text element after the logo. Use bold weight for product identification.',brand:'Place KOLEEX logo prominently on the front panel. Add product name in KOLEEX naming format.',color:'Reduce to black, white, and 1-2 neutral tones. Remove decorative colors.'}
},
'website':{
  weights:{brandIdentity:.25,layoutComposition:.35,typography:.25,colorSystem:.15},
  logoRequired:false,brandTextRequired:false,
  spacingSensitivity:'high',hierarchySensitivity:'high',clutterTolerance:'low',
  maxTextBlocks:15,contrastSensitivity:'high',
  note:'Evaluated using Website Section rules.',
  hardWarnings:['Poor digital hierarchy','Spacing too weak for web','Low contrast','Excessive visual clutter'],
  issueTemplates:{crowded:'Web section is too dense. Website layouts need generous spacing between content blocks.',hierarchy:'Digital hierarchy is unclear. Web sections need clear heading → subheading → body progression.',spacing:'Spacing between web elements is insufficient. Modern web design requires generous whitespace.',contrast:'Text-background contrast is weak for screen reading. Digital content requires strong readability.'},
  suggTemplates:{crowded:'Increase section padding and element margins. Use the brand spacing scale (24-80px between sections).',hierarchy:'Use larger bold headings with clearly smaller body text. Create visual breathing room.',spacing:'Apply consistent vertical rhythm with large gaps between content blocks.',contrast:'Ensure minimum 4.5:1 contrast ratio for body text and 3:1 for large headings.'}
},
'ui-screen':{
  weights:{brandIdentity:.20,layoutComposition:.40,typography:.25,colorSystem:.15},
  logoRequired:false,brandTextRequired:false,
  spacingSensitivity:'very-high',hierarchySensitivity:'high',clutterTolerance:'very-low',
  maxTextBlocks:20,contrastSensitivity:'high',
  note:'Evaluated using UI Screen rules.',
  hardWarnings:['High UI density','Poor component spacing','Weak alignment','Low readability'],
  issueTemplates:{crowded:'Interface density is too high. KOLEEX UI must prioritize clarity and breathing room between components.',spacing:'Component spacing is insufficient. Clean enterprise UI requires consistent, generous gaps.',alignment:'Element alignment appears inconsistent. Every UI element must snap to the layout grid.',contrast:'UI readability is compromised. Interface text and controls need strong contrast.'},
  suggTemplates:{crowded:'Reduce the number of visible elements. Use progressive disclosure to manage complexity.',spacing:'Apply consistent 8px/16px/24px spacing between UI components.',alignment:'Align all elements to a strict column grid. Use consistent margins and padding.',contrast:'Use dark text on light backgrounds for content areas. Reserve accent colors for interactive elements only.'}
},
'exhibition':{
  weights:{brandIdentity:.35,layoutComposition:.30,typography:.20,colorSystem:.15},
  logoRequired:true,brandTextRequired:true,
  spacingSensitivity:'high',hierarchySensitivity:'very-high',clutterTolerance:'very-low',
  maxTextBlocks:4,contrastSensitivity:'very-high',
  note:'Evaluated using Exhibition Panel rules.',
  hardWarnings:['Text too small for exhibition viewing','Panel too crowded','Low contrast at distance','No KOLEEX identity'],
  issueTemplates:{crowded:'Exhibition panel is too dense. Content must be readable from 2-3 meters distance.',hierarchy:'No strong focal message detected. Exhibition panels need one dominant headline visible from afar.',text:'Too much text for exhibition format. Panels should communicate with large typography and minimal detail.',brand:'KOLEEX branding must be prominent on exhibition materials. Large logo and brand name expected.'},
  suggTemplates:{crowded:'Remove all secondary information. Keep only: headline, one key visual, and logo.',hierarchy:'Make the headline at least 3x larger than any other text. One message per panel.',text:'Reduce to maximum 3-4 text blocks. Use large font sizes readable from distance.',brand:'Display KOLEEX logo at large scale. Use backlit or high-contrast logo placement.'}
},
'document':{
  weights:{brandIdentity:.30,layoutComposition:.30,typography:.25,colorSystem:.15},
  logoRequired:true,brandTextRequired:true,
  spacingSensitivity:'medium',hierarchySensitivity:'medium',clutterTolerance:'medium',
  maxTextBlocks:25,contrastSensitivity:'medium',
  note:'Evaluated using Document design rules.',
  hardWarnings:['Poor readability','Weak document structure','No KOLEEX identity','Margins too tight'],
  issueTemplates:{margins:'Document margins appear narrow. Professional documents need generous page margins.',hierarchy:'Document heading hierarchy is unclear. Use distinct sizes for title, section headings, and body text.',brand:'KOLEEX identity should appear on documents — typically logo in header or footer area.',readability:'Text readability could be improved. Documents need clean typography with proper line spacing.'},
  suggTemplates:{margins:'Increase page margins to at least 20-25mm on all sides.',hierarchy:'Apply clear document hierarchy: document title → section headings → subheadings → body text.',brand:'Add KOLEEX logo to document header or first page. Include company name in footer.',readability:'Use regular weight for body text, consistent line-height (1.5-1.6), and adequate paragraph spacing.'}
},
'label':{
  weights:{brandIdentity:.40,layoutComposition:.20,typography:.25,colorSystem:.15},
  logoRequired:true,brandTextRequired:true,
  spacingSensitivity:'medium',hierarchySensitivity:'medium',clutterTolerance:'medium',
  maxTextBlocks:8,contrastSensitivity:'very-high',
  note:'Evaluated using Label design rules.',
  hardWarnings:['No KOLEEX identity','Unreadable small text','Weak contrast','Cluttered label layout'],
  issueTemplates:{brand:'Labels must carry explicit KOLEEX identification. Logo and product info are mandatory.',readability:'Label text readability is critical. Small-format labels need maximum contrast and clear typography.',crowded:'Label layout is too dense. Even compact labels need organized information zones.',contrast:'Label contrast is insufficient. High contrast is essential for small-format readability.'},
  suggTemplates:{brand:'Place KOLEEX logo and product name as the primary label elements.',readability:'Use bold weight for product name, regular for technical details. Maximize font size within constraints.',crowded:'Organize into zones: brand identity, product info, technical data, barcode/QR.',contrast:'Use black text on white label or white text on black label. Avoid gray-on-gray.'}
},
'presentation':{
  weights:{brandIdentity:.25,layoutComposition:.30,typography:.30,colorSystem:.15},
  logoRequired:false,brandTextRequired:true,
  spacingSensitivity:'high',hierarchySensitivity:'very-high',clutterTolerance:'low',
  maxTextBlocks:6,contrastSensitivity:'high',
  note:'Evaluated using Presentation Slide rules.',
  hardWarnings:['Too much text on slide','Weak title hierarchy','Crowded slide','Low contrast'],
  issueTemplates:{text:'Too much text on slide. Presentation slides should communicate with headlines, not paragraphs.',hierarchy:'Slide title hierarchy is weak. Each slide needs one clear dominant title.',crowded:'Slide composition is too dense. Keep slides clean with one key message each.',brand:'KOLEEX brand context should be present — through logo, brand name, or consistent design language.'},
  suggTemplates:{text:'Reduce to one headline and 3-5 bullet points maximum per slide.',hierarchy:'Make the slide title significantly larger than supporting content.',crowded:'Remove any element that does not directly support the slide\'s single message.',brand:'Add KOLEEX logo in corner. Use brand typography and color palette consistently.'}
},
'general':{
  weights:{brandIdentity:.35,layoutComposition:.30,typography:.20,colorSystem:.15},
  logoRequired:true,brandTextRequired:true,
  spacingSensitivity:'medium',hierarchySensitivity:'medium',clutterTolerance:'medium',
  maxTextBlocks:12,contrastSensitivity:'medium',
  note:'Evaluated using General Design rules.',
  hardWarnings:['No KOLEEX identity','Layout too crowded','Weak visual hierarchy','Color palette mismatch'],
  issueTemplates:{crowded:'Design layout is too dense. KOLEEX designs require clean structured compositions.',hierarchy:'Visual hierarchy is unclear. Every design needs a clear reading path.',brand:'KOLEEX brand identity must be present. Logo or brand name is expected.',color:'Color palette does not align with KOLEEX standards.'},
  suggTemplates:{crowded:'Increase whitespace. Remove unnecessary decorative elements.',hierarchy:'Create clear size/weight differences between heading levels.',brand:'Add official KOLEEX logo and ensure brand name is visible.',color:'Align palette with official KOLEEX colors: black, white, and neutral grays.'}
}
};

var ST=[
{min:90,label:'Acceptable',color:'#34C759',icon:'fa-circle-check',bg:'#f0faf3'},
{min:75,label:'Acceptable with Minor Issues',color:'#59A832',icon:'fa-check',bg:'#f4faf0'},
{min:60,label:'Needs Revision',color:'#FF9500',icon:'fa-pen-to-square',bg:'#fff8f0'},
{min:40,label:'Needs Major Revision',color:'#FF6B00',icon:'fa-triangle-exclamation',bg:'#fff5ee'},
{min:0,label:'Not Acceptable',color:'#FF3B30',icon:'fa-circle-xmark',bg:'#fff0f0'}
];
var INV={label:'Invalid Input',color:'#86868B',icon:'fa-ban',bg:'#f5f5f7'};
function getSt(s){for(var i=0;i<ST.length;i++)if(s>=ST[i].min)return ST[i];return ST[4];}
function getCL(s){if(s>=85)return{label:'Good',color:'#34C759'};if(s>=65)return{label:'Needs Improvement',color:'#FF9500'};if(s>=40)return{label:'Needs Revision',color:'#FF6B00'};return{label:'Critical',color:'#FF3B30'};}

var REFS={
brandIdentity:[{href:'10-logo-system.html',num:'10',name:'Logo System'},{href:'11-logo-usage.html',num:'11',name:'Logo Usage Rules'},{href:'12-logo-donts.html',num:'12',name:"Logo Do & Don't"},{href:'09-brand-slogan.html',num:'09',name:'Brand Slogan'}],
layoutComposition:[{href:'15-layout-grid.html',num:'15',name:'Layout & Grid'},{href:'16-graphic-elements.html',num:'16',name:'Graphic Elements'},{href:'17-background-style.html',num:'17',name:'Background Style'}],
typography:[{href:'14-typography-system.html',num:'14',name:'Typography System'}],
colorSystem:[{href:'13-color-system.html',num:'13',name:'Color System'},{href:'17-background-style.html',num:'17',name:'Background Style'}]
};
var TREFS={'social-media':[{href:'23-social-media.html',num:'23',name:'Social Media'}],'poster':[{href:'24-print-marketing.html',num:'24',name:'Print & Marketing'}],'packaging':[{href:'25-packaging-labels.html',num:'25',name:'Packaging & Labels'}],'website':[{href:'22-website-guidelines.html',num:'22',name:'Website Guidelines'}],'ui-screen':[{href:'19-ui-components.html',num:'20',name:'UI/UX Design'}],'exhibition':[{href:'26-exhibition-environmental.html',num:'26',name:'Exhibition Design'}],'document':[{href:'20-stationery-corporate.html',num:'21',name:'Stationery'}],'presentation':[{href:'20-stationery-corporate.html',num:'21',name:'Stationery'}]};

var STAGES=[
{id:'upload',label:'Upload verified',icon:'fa-cloud-arrow-up',duration:400},
{id:'preprocess',label:'Preprocessing image',icon:'fa-crop-simple',duration:500},
{id:'ocr',label:'Running text detection (OCR)',icon:'fa-font',duration:0},
{id:'colors',label:'Extracting color palette',icon:'fa-droplet',duration:400},
{id:'layout',label:'Analyzing layout structure',icon:'fa-border-all',duration:400},
{id:'brand',label:'Applying '+' rules',icon:'fa-shield-halved',duration:400},
{id:'report',label:'Building audit report',icon:'fa-chart-simple',duration:300}
];

var BK=['koleex','koleex international','koleex international group','shaping the future','shaping future','nexo','koleex hub','koleex cloud','koleex switch','koleex care','koleex flow','koleex core','koleex systems','koleex control'];
var BC={black:{r:0,g:0,b:0},white:{r:255,g:255,b:255},darkGray:{r:30,g:30,b:32},medGray:{r:134,g:134,b:139},lightGray:{r:210,g:210,b:215},vLightGray:{r:245,g:245,b:247}};

// ============================================================
// PREPROCESSING
// ============================================================
function prep(src){return new Promise(function(ok){var img=new Image();img.onload=function(){var mW=800,mH=800,w=img.width,h=img.height;if(w>mW||h>mH){var r=Math.min(mW/w,mH/h);w=Math.round(w*r);h=Math.round(h*r);}var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);ok({canvas:c,ctx:c.getContext('2d'),w:w,h:h,origW:img.width,origH:img.height,url:c.toDataURL('image/png')});};img.onerror=function(){ok(null);};img.src=src;});}

// ============================================================
// OCR
// ============================================================
function ocr(pre,cb){return new Promise(function(ok){if(!pre||typeof Tesseract==='undefined'){ok({text:'',words:[],lines:[],koleex:false,slogan:false,product:false,conf:0});return;}Tesseract.recognize(pre.url,'eng',{logger:function(m){if(m.status==='recognizing text'&&cb)cb(Math.round(m.progress*100));}}).then(function(r){var t=r.data.text||'',lo=t.toLowerCase().replace(/[^a-z0-9\s]/g,'');var kx=lo.indexOf('koleex')>=0,sl=lo.indexOf('shaping the future')>=0||lo.indexOf('shaping future')>=0;var pr=false;for(var i=0;i<BK.length;i++)if(lo.indexOf(BK[i])>=0){pr=true;break;}ok({text:t,words:r.data.words||[],lines:t.split('\n').filter(function(l){return l.trim().length>0;}),koleex:kx,slogan:sl,product:pr,conf:r.data.confidence||0});}).catch(function(){ok({text:'',words:[],lines:[],koleex:false,slogan:false,product:false,conf:0});});});}

// ============================================================
// COLOR EXTRACTION
// ============================================================
function colors(pre){if(!pre)return{colors:[],mono:true,bw:true,colorful:false,match:0,count:0,cf:0,dR:0,bR:0};var d=pre.ctx.getImageData(0,0,pre.w,pre.h).data,n=0,bk={},bp=0,dp=0,cp=0;for(var i=0;i<d.length;i+=32){var r=d[i],g=d[i+1],b=d[i+2],l=.299*r+.587*g+.114*b;if(l>200)bp++;if(l<55)dp++;if(Math.max(r,g,b)-Math.min(r,g,b)>40)cp++;var k=Math.round(r/16)*16+','+Math.round(g/16)*16+','+Math.round(b/16)*16;if(!bk[k])bk[k]={r:Math.round(r/16)*16,g:Math.round(g/16)*16,b:Math.round(b/16)*16,c:0};bk[k].c++;n++;}var top=Object.values(bk).sort(function(a,b){return b.c-a.c;}).slice(0,8).map(function(c){return{r:c.r,g:c.g,b:c.b,hex:'#'+((1<<24)+(c.r<<16)+(c.g<<8)+c.b).toString(16).slice(1),pct:Math.round(c.c/n*100)};});var mt=0;for(var j=0;j<top.length;j++){for(var bk2 in BC){var bc=BC[bk2];if(Math.sqrt(Math.pow(top[j].r-bc.r,2)+Math.pow(top[j].g-bc.g,2)+Math.pow(top[j].b-bc.b,2))<40)mt+=top[j].pct;}}var cf=cp/n;return{colors:top,mono:cf<.12,bw:(dp+bp)/n>.45,colorful:cf>.35,match:Math.min(100,mt),count:Object.keys(bk).length,cf:cf,dR:dp/n,bR:bp/n};}

// ============================================================
// CONTRAST
// ============================================================
function contrast(pre){if(!pre)return{score:50,high:false,w:[]};var d=pre.ctx.getImageData(0,0,pre.w,pre.h).data,hi=0,n=0;for(var y=0;y<pre.h;y+=4)for(var x=0;x<pre.w-1;x+=4){var i1=(y*pre.w+x)*4,i2=(y*pre.w+x+1)*4;if(Math.abs((.299*d[i1]+.587*d[i1+1]+.114*d[i1+2])-(.299*d[i2]+.587*d[i2+1]+.114*d[i2+2]))>80)hi++;n++;}var r=hi/n,bp=0,dp=0;for(var i=0;i<d.length;i+=16){var l=.299*d[i]+.587*d[i+1]+.114*d[i+2];if(l>200)bp++;if(l<55)dp++;}var sm=d.length/16,both=bp/sm>.1&&dp/sm>.1,w=[];if(!both)w.push('Design lacks strong light-dark contrast zones.');return{score:Math.min(100,Math.max(0,Math.round(r*500+(both?30:0)))),high:r>.05&&both,ratio:r,w:w};}

// ============================================================
// LAYOUT
// ============================================================
function layout(pre){if(!pre)return{density:.5,edge:.1,spacing:50,crowded:false,margin:50,mf:.5};var d=pre.ctx.getImageData(0,0,pre.w,pre.h).data,eg=0,n=0;for(var y=1;y<pre.h-1;y+=3)for(var x=1;x<pre.w-1;x+=3){var i=(y*pre.w+x)*4,i2=((y+1)*pre.w+x)*4;if(Math.abs(d[i]-d[i2])+Math.abs(d[i+1]-d[i2+1])+Math.abs(d[i+2]-d[i2+2])>60)eg++;n++;}var ed=eg/n,mp=Math.round(pre.w*.05),ec=0,et=0;for(var ey=0;ey<pre.h;ey+=4){for(var ex=0;ex<mp;ex+=2){var ei=(ey*pre.w+ex)*4,el=.299*d[ei]+.587*d[ei+1]+.114*d[ei+2];et++;if(el<200&&el>55)ec++;}for(var ex2=pre.w-mp;ex2<pre.w;ex2+=2){var ei2=(ey*pre.w+ex2)*4,el2=.299*d[ei2]+.587*d[ei2+1]+.114*d[ei2+2];et++;if(el2<200&&el2>55)ec++;}}var mf=1-ec/et;return{density:ed,edge:ed,spacing:Math.min(100,Math.max(0,Math.round((1-ed)*60+mf*40))),crowded:ed>.15,margin:Math.round(mf*100),mf:mf};}

// ============================================================
// VALIDITY
// ============================================================
function validity(col,lay,ocrR){var s=0,r=[];if(col.count<25)s+=20;else if(col.count<40)s+=10;else r.push('Very high color complexity.');if(col.mono||col.bw)s+=20;else if(col.cf<.3)s+=10;else r.push('High color variation.');if(lay.edge>.03&&lay.edge<.25)s+=15;else if(lay.edge<.03){s+=2;r.push('Very low detail.');}if(ocrR.text.length>5)s+=20;else s+=5;if(lay.mf>.5)s+=15;else s+=5;return{valid:s>=40,score:s,reasons:r};}

// ============================================================
// CATEGORY A: BRAND IDENTITY (type-aware)
// ============================================================
function evalBrand(ocrR,col,rule){
var s=0,iss=[],sug=[],fin=[];
if(ocrR.koleex){s+=40;fin.push('KOLEEX text detected via OCR.');}
else if(rule.brandTextRequired){iss.push({sev:'high',t:'No KOLEEX brand name detected',d:rule.issueTemplates.brand||'OCR did not find "KOLEEX" text.'});sug.push(rule.suggTemplates.brand||'Add KOLEEX logo or brand name.');}
else{s+=10;fin.push('Brand text not required for this design type, but recommended.');}
if(ocrR.slogan){s+=10;fin.push('Slogan "Shaping the Future" detected.');}
else if(ocrR.koleex){iss.push({sev:'low',t:'Brand slogan not detected',d:'Official slogan recommended for corporate materials.'});sug.push('Consider adding "KOLEEX — Shaping the Future".');}
if(ocrR.product){s+=10;fin.push('Known product naming detected.');}
if(col.match>60){s+=25;fin.push('Color palette matches KOLEEX brand ('+col.match+'%).');}
else if(col.match>30){s+=15;iss.push({sev:'medium',t:'Partial palette alignment ('+col.match+'%)',d:'Brand standard requires above 60% match.'});sug.push('Shift non-brand colors toward official KOLEEX values.');}
else{s+=5;iss.push({sev:'high',t:'Color palette does not represent KOLEEX ('+col.match+'%)',d:rule.issueTemplates.color||'Colors outside approved palette.'});sug.push(rule.suggTemplates.color||'Use official KOLEEX palette.');}
if(col.mono){s+=15;fin.push('Monochrome palette aligns with KOLEEX identity.');}
else if(col.bw){s+=10;}
if(!ocrR.koleex&&!ocrR.product&&rule.brandTextRequired)s=Math.min(s,35);
if(!ocrR.koleex&&!ocrR.product&&!rule.brandTextRequired)s=Math.min(s,65);
return{score:Math.min(100,Math.max(0,s)),issues:iss,suggestions:sug,findings:fin,refs:REFS.brandIdentity,evidenceDetected:ocrR.koleex||ocrR.product};
}

// ============================================================
// CATEGORY B: LAYOUT & COMPOSITION (type-aware)
// ============================================================
function evalLayout(lay,con,rule){
var s=0,iss=[],sug=[],fin=[];
var sensMult=rule.spacingSensitivity==='very-high'?1.3:(rule.spacingSensitivity==='high'?1.15:1);
var sThresh=rule.spacingSensitivity==='very-high'?75:(rule.spacingSensitivity==='high'?65:55);
if(lay.spacing>=sThresh){s+=35;fin.push('Layout spacing meets '+rule.note.split(' ')[3]+' standards.');}
else if(lay.spacing>=sThresh-15){s+=22;iss.push({sev:'medium',t:'Spacing needs improvement',d:rule.issueTemplates.spacing||rule.issueTemplates.crowded||'Spacing below threshold.'});sug.push(rule.suggTemplates.spacing||rule.suggTemplates.crowded||'Increase spacing.');}
else{s+=8;iss.push({sev:'high',t:'Layout density too high',d:rule.issueTemplates.crowded||'Composition too dense.'});sug.push(rule.suggTemplates.crowded||'Simplify and add whitespace.');}
var mThresh=rule.spacingSensitivity==='very-high'?65:50;
if(lay.margin>=mThresh){s+=30;fin.push('Margin safety is adequate.');}
else if(lay.margin>=mThresh-15){s+=18;iss.push({sev:'medium',t:'Margins appear limited ('+lay.margin+'%)',d:rule.issueTemplates.margins||'Content near edges.'});sug.push(rule.suggTemplates.margins||'Increase outer margins.');}
else{s+=6;iss.push({sev:'high',t:'Insufficient margins ('+lay.margin+'%)',d:'Content too close to edges.'});sug.push('Add generous margins on all sides.');}
if(!lay.crowded){s+=15;fin.push('Composition density acceptable.');}
else{iss.push({sev:'medium',t:'Visual crowding detected',d:rule.issueTemplates.crowded||'High element density.'});sug.push(rule.suggTemplates.crowded||'Simplify composition.');}
if(con.high){s+=20;fin.push('Strong contrast separation.');}
else{s+=8;iss.push({sev:'low',t:'Contrast between zones could improve',d:''});sug.push('Strengthen light-dark separation.');}
return{score:Math.min(100,Math.max(0,s)),issues:iss,suggestions:sug,findings:fin,refs:REFS.layoutComposition};
}

// ============================================================
// CATEGORY C: TYPOGRAPHY (type-aware)
// ============================================================
function evalTypo(ocrR,lay,con,rule){
var s=0,iss=[],sug=[],fin=[];
var lines=ocrR.lines.length;
if(ocrR.text.length>20){s+=18;fin.push(lines+' text lines detected.');}else s+=8;
if(lines>rule.maxTextBlocks){iss.push({sev:'medium',t:'Too much text for '+rule.note.split(' using ')[1],d:rule.issueTemplates.text||'Exceeds recommended text density.'});sug.push(rule.suggTemplates.text||'Reduce text blocks.');s-=8;}
if(ocrR.words&&ocrR.words.length>3){var sz=ocrR.words.map(function(w){return w.bbox?(w.bbox.y1-w.bbox.y0):0;}).filter(function(v){return v>0;});if(sz.length>3){var mx=Math.max.apply(null,sz),mn=Math.min.apply(null,sz);if(mx/mn>2.5){s+=30;fin.push('Strong typography hierarchy detected.');}else if(mx/mn>1.5){s+=20;iss.push({sev:'low',t:'Typography hierarchy could be stronger',d:rule.issueTemplates.hierarchy||'Moderate size variation.'});sug.push(rule.suggTemplates.hierarchy||'Increase size differences.');}else{s+=10;iss.push({sev:'medium',t:'Weak typography hierarchy',d:rule.issueTemplates.hierarchy||'Limited size variation.'});sug.push(rule.suggTemplates.hierarchy||'Create clear size progression.');}}}else s+=15;
if(con.score>60){s+=25;fin.push('Text readability contrast adequate.');}
else if(con.score>35){s+=15;iss.push({sev:'medium',t:'Text readability could improve',d:rule.issueTemplates.contrast||rule.issueTemplates.readability||'Contrast: '+con.score+'/100.'});sug.push(rule.suggTemplates.contrast||'Increase text-background contrast.');}
else{s+=5;iss.push({sev:'high',t:'Text contrast below standard',d:'Contrast: '+con.score+'/100. Readability significantly affected.'});sug.push('Use black on white or white on black for maximum readability.');}
if(!lay.crowded){s+=17;}else{s+=6;iss.push({sev:'medium',t:'Text spacing appears tight',d:''});sug.push('Increase line-height and paragraph spacing.');}
return{score:Math.min(100,Math.max(0,s)),issues:iss,suggestions:sug,findings:fin,refs:REFS.typography};
}

// ============================================================
// CATEGORY D: COLOR SYSTEM (type-aware)
// ============================================================
function evalColor(col,con,rule){
var s=0,iss=[],sug=[],fin=[];
if(col.match>60){s+=35;fin.push('Palette matches KOLEEX brand ('+col.match+'%).');}
else if(col.match>30){s+=20;iss.push({sev:'medium',t:'Partial palette match ('+col.match+'%)',d:rule.issueTemplates.color||'Below 60% threshold.'});sug.push(rule.suggTemplates.color||'Replace non-brand colors.');}
else{s+=5;iss.push({sev:'high',t:'Palette outside KOLEEX standards ('+col.match+'%)',d:rule.issueTemplates.color||'Colors outside approved palette.'});sug.push(rule.suggTemplates.color||'Redesign using official palette.');}
if(col.mono){s+=25;fin.push('Monochrome design.');}
else if(col.bw){s+=18;}
else if(!col.colorful){s+=12;}
else{iss.push({sev:'high',t:'Design too colorful ('+Math.round(col.cf*100)+'%)',d:'KOLEEX requires minimal palette.'});sug.push('Reduce to black, white, and 1-2 gray tones.');}
if(col.count<20){s+=20;fin.push('Restrained palette ('+col.count+' tones).');}
else if(col.count<35){s+=12;}
else{iss.push({sev:'medium',t:'High color variety ('+col.count+' tones)',d:''});sug.push('Simplify palette significantly.');}
if(con.high){s+=20;fin.push('Strong overall contrast.');}
else if(con.score>40){s+=12;iss.push({sev:'low',t:'Contrast could be stronger',d:''});sug.push('Increase contrast between elements.');}
else{s+=4;iss.push({sev:'medium',t:'Weak contrast ('+con.score+'/100)',d:''});sug.push('Use stronger black-white contrast.');}
return{score:Math.min(100,Math.max(0,s)),issues:iss,suggestions:sug,findings:fin,refs:REFS.colorSystem};
}

// ============================================================
// FINAL CALCULATION
// ============================================================
// BRAND EVIDENCE SCORE (multi-signal)
// ============================================================
function calcBrandEvidence(ocrR,col){
var score=0,signals=[];
// +3 logo detected (via OCR finding KOLEEX = proxy for logo)
// We treat OCR KOLEEX as strongest signal since we don't have pixel logo matching
if(ocrR.koleex){score+=3;signals.push('KOLEEX text detected via OCR (+3)');}
// +2 if product naming found (separate from KOLEEX text)
if(ocrR.product&&!ocrR.koleex){score+=2;signals.push('Known product naming detected (+2)');}
else if(ocrR.product&&ocrR.koleex){score+=1;signals.push('Product naming confirmed (+1)');}
// +1 slogan
if(ocrR.slogan){score+=1;signals.push('Approved slogan detected (+1)');}
// +1 palette match > 85%
if(col.match>85){score+=1;signals.push('Strong palette match: '+col.match+'% (+1)');}
// +1 monochrome
if(col.mono){score+=1;signals.push('Monochrome layout aligned with brand (+1)');}
var level='notDetected',label='Not Detected',color='#FF3B30',bg='#fff0f0',icon='fa-xmark';
if(score>=3){level='strong';label='Strong';color='#34C759';bg='#f0faf3';icon='fa-shield-halved';}
else if(score===2){level='detected';label='Detected';color='#59A832';bg='#f4faf0';icon='fa-certificate';}
else if(score===1){level='weak';label='Weak';color='#FF9500';bg='#fff8f0';icon='fa-triangle-exclamation';}
return{score:score,level:level,label:label,color:color,bg:bg,icon:icon,signals:signals,detected:score>=2};
}

function calcFinal(cats,rule,be){
var s=0;
for(var i=0;i<CATS.length;i++){var cid=CATS[i].id;s+=cats[cid].score*rule.weights[cid];}
s=Math.round(s);
// Hard gates based on Brand Evidence level
if(be.level==='notDetected'&&rule.brandTextRequired)s=Math.min(s,39);
if(be.level==='notDetected'&&!rule.brandTextRequired)s=Math.min(s,59);
if(be.level==='weak')s=Math.min(s,74);
// 'detected' and 'strong' allow normal scoring
return Math.max(0,Math.min(100,s));
}

function buildIssues(cats){var all=[];for(var c in cats){var cat=cats[c];for(var i=0;i<cat.issues.length;i++)all.push({category:c,severity:cat.issues[i].sev,title:cat.issues[i].t,description:cat.issues[i].d});}var o={high:0,medium:1,low:2};all.sort(function(a,b){return(o[a.severity]||2)-(o[b.severity]||2);});return all;}
function buildActions(cats){var f=[],m=[],l=[];for(var c in cats){var cat=cats[c];for(var i=0;i<cat.issues.length;i++){var sv=cat.issues[i].sev,su=cat.suggestions[i]||'';if(!su)continue;if(sv==='high')f.push(su);else if(sv==='medium')m.push(su);else l.push(su);}}return{fixNow:f,improveNext:m,optional:l};}

// ============================================================
// MAIN ANALYZE
// ============================================================
function analyze(imageData,designType,onStage){
var cb=onStage||function(){};
var rule=RULES[designType]||RULES.general;
return prep(imageData).then(function(pre){
if(!pre)return{isInvalid:true,status:INV,summary:'Image could not be processed.',categories:{},categoryMeta:CATS};
cb('preprocess');
return ocr(pre,function(p){cb('ocr',p);}).then(function(ocrR){
cb('colors');var col=colors(pre);
var con=contrast(pre);
cb('layout');var lay=layout(pre);
cb('brand');
var val=validity(col,lay,ocrR);
if(!val.valid)return{isInvalid:true,status:INV,summary:'This image does not appear to be a valid design asset.',validityReasons:val.reasons,categories:{},categoryMeta:CATS,timestamp:new Date().toISOString()};
var cats={};
cats.brandIdentity=evalBrand(ocrR,col,rule);
cats.layoutComposition=evalLayout(lay,con,rule);
cats.typography=evalTypo(ocrR,lay,con,rule);
cats.colorSystem=evalColor(col,con,rule);
var be=calcBrandEvidence(ocrR,col);
var fs=calcFinal(cats,rule,be);
var st=getSt(fs);
var issues=buildIssues(cats);var actions=buildActions(cats);
var sum='';
if(fs>=90)sum='This design demonstrates strong alignment with KOLEEX brand guidelines when evaluated as a '+DT.find(function(d){return d.id===designType;}).name+'.';
else if(fs>=75)sum='This design is largely compliant. Several areas identified for refinement under '+rule.note;
else if(fs>=60)sum='This design needs revisions in multiple areas. '+rule.note;
else if(fs>=40)sum='Major revisions required. '+rule.note;
else if(!ev)sum='Explicit KOLEEX brand identity was not detected. A design cannot be accepted as KOLEEX-compliant without clear brand evidence. '+rule.note;
else sum='This design does not meet KOLEEX standards. '+rule.note;
cb('report');
return{isInvalid:false,score:fs,status:st,summary:sum,designType:designType,
ruleNote:rule.note,ruleWeights:rule.weights,
categories:cats,categoryMeta:CATS,issues:issues,actions:actions,
extraRefs:TREFS[designType]||[],timestamp:new Date().toISOString(),
brandEvidence:be,
detection:{text:ocrR.text.substring(0,500),koleexFound:ocrR.koleex,sloganFound:ocrR.slogan,productFound:ocrR.product,ocrConfidence:ocrR.conf,lineCount:ocrR.lines.length,dominantColors:col.colors,paletteMatch:col.match,monochrome:col.mono,colorfulness:Math.round(col.cf*100),contrastScore:con.score,isHighContrast:con.high,layoutDensity:Math.round(lay.edge*100),spacingScore:lay.spacing,marginScore:lay.margin,crowded:lay.crowded,brandEvidence:be.detected},
overlayData:{textRegions:ocrR.words||[],imageWidth:pre.w,imageHeight:pre.h,origWidth:pre.origW,origHeight:pre.origH,marginGuide:Math.round(pre.w*.05),crowded:lay.crowded,koleexFound:ocrR.koleex}};
});
});
}

window.BrandChecker={DESIGN_TYPES:DT,CATEGORIES:CATS,STATUS_THRESHOLDS:ST,INVALID:INV,ANALYSIS_STAGES:STAGES,REFS:REFS,RULES:RULES,analyze:analyze,getStatus:getSt,getCatLabel:getCL,version:'6.1.0'};
})();
