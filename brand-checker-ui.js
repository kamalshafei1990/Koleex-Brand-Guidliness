/**
 * KOLEEX Brand Checker — UI Component v2.0
 * Futuristic floating button with glow + Enhanced results with infographics
 */
(function() {
  'use strict';

  // ============================================================
  // 1. INJECT CSS
  // ============================================================
  var css = `
    /* Floating Button - Square Futuristic Dark Shadow + Scanner */
    .bc-fab{position:fixed;bottom:28px;right:28px;z-index:9998;display:flex;flex-direction:column;align-items:center;justify-content:center;width:64px;height:64px;padding:0;background:linear-gradient(145deg,#1d1d1f,#000,#0a0a0a);color:#fff;border:1px solid rgba(255,255,255,.1);border-radius:16px;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 6px 28px rgba(0,0,0,.45),0 2px 8px rgba(0,0,0,.3);transition:all .4s cubic-bezier(.4,0,.2,1);overflow:hidden;isolation:isolate}
    .bc-fab::before{content:'';position:absolute;top:-100%;left:0;width:100%;height:60%;background:linear-gradient(180deg,transparent,rgba(255,255,255,.08),rgba(255,255,255,.15),rgba(255,255,255,.08),transparent);z-index:1;animation:bcScanLine 4s ease-in-out infinite;pointer-events:none}
    .bc-fab-glow{position:absolute;inset:-6px;border-radius:20px;z-index:-1;box-shadow:0 0 20px rgba(0,0,0,.2),0 0 40px rgba(0,0,0,.1);animation:bcGlow 3s ease-in-out infinite;pointer-events:none}
    .bc-fab-border{position:absolute;inset:-1px;border-radius:17px;background:linear-gradient(145deg,rgba(255,255,255,.15),transparent,rgba(255,255,255,.05));z-index:-1;animation:bcBorderGlow 4s ease-in-out infinite;pointer-events:none}
    .bc-fab:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 12px 40px rgba(0,0,0,.55),0 4px 12px rgba(0,0,0,.3);border-color:rgba(255,255,255,.2)}
    .bc-fab-dot{width:6px;height:6px;background:#34c759;border-radius:50%;box-shadow:0 0 6px #34c759,0 0 12px rgba(52,199,89,.3);animation:bcPulse 2s ease-in-out infinite;position:absolute;top:10px;right:10px;z-index:3}
    .bc-fab-icon{font-size:1.3rem;position:relative;z-index:2;color:#fff;margin-bottom:3px}
    .bc-fab-label{position:relative;z-index:2;font-size:.48rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.55);line-height:1}
    @keyframes bcScanLine{0%{top:-100%;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:200%;opacity:0}}
    @keyframes bcGlow{0%,100%{box-shadow:0 0 15px rgba(0,0,0,.15),0 0 30px rgba(0,0,0,.08)}50%{box-shadow:0 0 25px rgba(0,0,0,.3),0 0 50px rgba(0,0,0,.15)}}
    @keyframes bcBorderGlow{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes bcPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(1.6)}}
    @media(max-width:768px){.bc-fab{bottom:20px;right:16px;width:52px;height:52px;border-radius:14px;display:flex !important;visibility:visible !important;opacity:1 !important;box-shadow:0 4px 20px rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.25)}.bc-fab-icon{font-size:1.1rem}.bc-fab-label{font-size:.42rem}.bc-fab-dot{top:8px;right:8px;width:5px;height:5px}}

    /* Overlay */
    .bc-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:9999;opacity:0;visibility:hidden;transition:all .4s cubic-bezier(.4,0,.2,1)}
    .bc-overlay.active{opacity:1;visibility:visible}

    /* Panel — creative open transition */
    .bc-panel{position:fixed;top:0;right:0;bottom:0;width:440px;background:#fff;z-index:10000;transform:translateX(100%) scale(.95);transform-origin:bottom right;opacity:0;transition:transform .5s cubic-bezier(.16,1,.3,1),opacity .35s ease;display:flex;flex-direction:column;box-shadow:-8px 0 40px rgba(0,0,0,.1);pointer-events:none}
    .bc-panel.active{transform:translateX(0) scale(1);opacity:1;pointer-events:auto}
    @media(max-width:768px){.bc-panel{width:100%;border-radius:0;transform:translateY(100%) scale(.98);transform-origin:bottom center}.bc-panel.active{transform:translateY(0) scale(1)}}

    /* Panel Header */
    .bc-header{padding:20px 24px;border-bottom:1px solid #e8e8ed;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
    .bc-header-left{display:flex;align-items:center;gap:12px}
    .bc-header-icon{width:40px;height:40px;background:#000;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.95rem}
    .bc-header-text h3{font-size:1rem;font-weight:700;color:#000;margin:0;letter-spacing:-.01em}
    .bc-header-text p{font-size:.7rem;color:#86868b;margin:2px 0 0;font-weight:400}
    .bc-close{width:32px;height:32px;border-radius:16px;border:none;background:#f5f5f7;color:#86868b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;transition:all .3s ease}
    .bc-close:hover{background:#e8e8ed;color:#000}

    /* Panel Body */
    .bc-body{flex:1;overflow-y:auto;padding:24px}
    .bc-body::-webkit-scrollbar{width:4px}
    .bc-body::-webkit-scrollbar-thumb{background:#d2d2d7;border-radius:2px}

    /* Upload Zone */
    .bc-upload{border:2px dashed #d2d2d7;border-radius:16px;padding:40px 24px;text-align:center;cursor:pointer;transition:all .3s ease;position:relative}
    .bc-upload:hover{border-color:#86868b;background:#fafafa}
    .bc-upload.dragover{border-color:#000;background:#f5f5f7}
    .bc-upload.has-file{border-style:solid;border-color:#e8e8ed;padding:16px;cursor:default}
    .bc-upload-icon{font-size:2rem;color:#d2d2d7;margin-bottom:12px}
    .bc-upload-text{font-size:.85rem;color:#86868b;font-weight:500}
    .bc-upload-hint{font-size:.7rem;color:#afafaf;margin-top:6px}
    .bc-upload input[type=file]{display:none}
    .bc-preview{display:flex;align-items:center;gap:14px}
    .bc-preview-img{width:80px;height:80px;border-radius:10px;object-fit:cover;border:1px solid #e8e8ed}
    .bc-preview-info{flex:1;text-align:left}
    .bc-preview-name{font-size:.8rem;font-weight:600;color:#000;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px}
    .bc-preview-size{font-size:.7rem;color:#86868b}
    .bc-preview-remove{width:28px;height:28px;border-radius:14px;border:none;background:#f5f5f7;color:#86868b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.7rem;transition:all .3s ease;flex-shrink:0}
    .bc-preview-remove:hover{background:#ff3b30;color:#fff}

    /* Design Type Selector */
    .bc-section{margin-top:24px}
    .bc-section-title{font-size:.75rem;font-weight:600;color:#86868b;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px}
    .bc-types{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
    .bc-type{padding:10px 12px;border:1px solid #e8e8ed;border-radius:10px;background:#fff;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .3s ease;font-family:'Inter',sans-serif}
    .bc-type:hover{border-color:#86868b;background:#fafafa}
    .bc-type.selected{border-color:#000;background:#000;color:#fff}
    .bc-type i{font-size:.75rem;width:20px;text-align:center}
    .bc-type span{font-size:.72rem;font-weight:500}

    /* Analyze Button */
    .bc-analyze{width:100%;height:48px;border:none;border-radius:12px;background:#000;color:#fff;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;cursor:pointer;margin-top:24px;transition:all .3s ease;display:flex;align-items:center;justify-content:center;gap:8px}
    .bc-analyze:hover:not(:disabled){background:#1d1d1f;transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.2)}
    .bc-analyze:disabled{background:#d2d2d7;color:#86868b;cursor:not-allowed;transform:none;box-shadow:none}
    .bc-analyze i{font-size:.8rem}

    /* Progress */
    .bc-progress{margin-top:24px;display:none}
    .bc-progress.active{display:block}
    .bc-stage{display:flex;align-items:center;gap:12px;padding:10px 0;opacity:.3;transition:all .4s ease}
    .bc-stage.active{opacity:1}
    .bc-stage.done{opacity:.6}
    .bc-stage-icon{width:32px;height:32px;border-radius:8px;background:#f5f5f7;display:flex;align-items:center;justify-content:center;font-size:.7rem;color:#86868b;transition:all .3s ease;flex-shrink:0}
    .bc-stage.active .bc-stage-icon{background:#000;color:#fff}
    .bc-stage.done .bc-stage-icon{background:#34c759;color:#fff}
    .bc-stage-text{font-size:.8rem;font-weight:500;color:#000}
    .bc-stage-bar{height:2px;background:#e8e8ed;border-radius:1px;margin:0 0 0 44px;overflow:hidden}
    .bc-stage-bar-fill{height:100%;width:0;background:#000;transition:width .3s ease}

    /* Results */
    .bc-results{margin-top:0;display:none}
    .bc-results.active{display:block}

    /* Score Card */
    .bc-score-card{background:#fafafa;border-radius:16px;padding:24px;text-align:center;margin-bottom:20px}
    .bc-score-ring{width:120px;height:120px;margin:0 auto 16px;position:relative}
    .bc-score-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
    .bc-score-ring circle{fill:none;stroke-width:6;stroke-linecap:round}
    .bc-score-ring .bc-ring-bg{stroke:#e8e8ed}
    .bc-score-ring .bc-ring-fill{stroke:#34c759;transition:stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)}
    .bc-score-value{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:1.8rem;font-weight:800;color:#000;letter-spacing:-.03em}
    .bc-score-value span{font-size:.9rem;font-weight:500;color:#86868b}
    .bc-status-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:20px;font-size:.75rem;font-weight:600;margin-bottom:8px}
    .bc-summary{font-size:.82rem;color:#6e6e73;line-height:1.5}

    /* Severity Row */
    .bc-severity-row{display:flex;gap:16px;justify-content:center;margin:12px 0 0;padding:12px 0;border-top:1px solid #e8e8ed}
    .bc-sev-item{display:flex;align-items:center;gap:6px;font-size:.72rem;font-weight:500;color:#6e6e73}
    .bc-sev-dot{width:8px;height:8px;border-radius:4px}
    .bc-sev-dot.high{background:#ff3b30}
    .bc-sev-dot.med{background:#ff9500}
    .bc-sev-dot.low{background:#86868b}

    /* Category Breakdown */
    .bc-breakdown{background:#fafafa;border-radius:14px;padding:20px;margin-bottom:20px}
    .bc-breakdown-title{font-size:.75rem;font-weight:600;color:#86868b;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px}
    .bc-bar-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
    .bc-bar-label{font-size:.68rem;font-weight:600;color:#000;width:100px;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0}
    .bc-bar-track{flex:1;height:6px;background:#e8e8ed;border-radius:3px;overflow:hidden}
    .bc-bar-fill{height:100%;border-radius:3px;transition:width 1s cubic-bezier(.4,0,.2,1)}
    .bc-bar-pct{font-size:.68rem;font-weight:600;color:#86868b;width:36px}

    /* Issue Groups */
    .bc-issue-group{margin-bottom:16px}
    .bc-issue-group-header{font-size:.78rem;font-weight:700;color:#000;display:flex;align-items:center;gap:8px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #f0f0f0}
    .bc-issue-group-header i{font-size:.7rem;color:#86868b}

    /* Issues */
    .bc-issues-title{font-size:.75rem;font-weight:600;color:#86868b;text-transform:uppercase;letter-spacing:.08em;margin:20px 0 12px;display:flex;align-items:center;gap:6px}
    .bc-issues-title i{font-size:.65rem}
    .bc-issue{padding:14px 16px;border:1px solid #e8e8ed;border-radius:12px;margin-bottom:8px;transition:all .3s ease}
    .bc-issue:hover{border-color:#d2d2d7;background:#fafafa}
    .bc-issue-header{display:flex;align-items:flex-start;gap:10px}
    .bc-issue-dot{width:8px;height:8px;border-radius:4px;margin-top:5px;flex-shrink:0}
    .bc-issue-dot.sev-3{background:#ff3b30}
    .bc-issue-dot.sev-2{background:#ff9500}
    .bc-issue-dot.sev-1{background:#86868b}
    .bc-issue-title{font-size:.8rem;font-weight:600;color:#000}
    .bc-issue-desc{font-size:.72rem;color:#86868b;margin:4px 0 0 18px;line-height:1.45}
    .bc-issue-fix{font-size:.72rem;color:#6e6e73;margin:8px 0 0 18px;padding:8px 12px;background:#f5f5f7;border-radius:8px;line-height:1.45}
    .bc-issue-fix i{color:#34c759;margin-right:4px}

    /* Related Sections */
    .bc-related{margin-top:20px}
    .bc-related-title{font-size:.75rem;font-weight:600;color:#86868b;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}
    .bc-related-list{display:flex;flex-wrap:wrap;gap:6px}
    .bc-related-link{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid #e8e8ed;border-radius:8px;font-size:.7rem;font-weight:500;color:#000;text-decoration:none;transition:all .3s ease}
    .bc-related-link:hover{border-color:#000;background:#000;color:#fff}
    .bc-related-link i{font-size:.6rem;color:#86868b}
    .bc-related-link:hover i{color:#fff}

    /* Reset Button */
    .bc-reset{width:100%;height:40px;border:1px solid #e8e8ed;border-radius:10px;background:#fff;color:#6e6e73;font-family:'Inter',sans-serif;font-size:.78rem;font-weight:500;cursor:pointer;margin-top:16px;transition:all .3s ease;display:flex;align-items:center;justify-content:center;gap:6px}
    .bc-reset:hover{border-color:#86868b;color:#000}
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ============================================================
  // 2. INJECT HTML
  // ============================================================

  // Floating button
  var fab = document.createElement('button');
  fab.className = 'bc-fab';
  fab.setAttribute('aria-label', 'Brand Checker');
  fab.setAttribute('title', 'Check your design against KOLEEX brand rules');
  fab.innerHTML = '<span class="bc-fab-glow"></span><span class="bc-fab-border"></span><span class="bc-fab-dot"></span><span class="bc-fab-icon"><i class="fa-solid fa-shield-halved"></i></span><span class="bc-fab-label">Checker</span>';
  document.body.appendChild(fab);

  // Overlay
  var overlay = document.createElement('div');
  overlay.className = 'bc-overlay';
  document.body.appendChild(overlay);

  // Panel
  var panel = document.createElement('div');
  panel.className = 'bc-panel';
  panel.innerHTML = [
    '<div class="bc-header">',
    '  <div class="bc-header-left">',
    '    <div class="bc-header-icon"><i class="fa-solid fa-shield-halved"></i></div>',
    '    <div class="bc-header-text"><h3>Koleex Brand Checker</h3><p>Design compliance review</p></div>',
    '  </div>',
    '  <button class="bc-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>',
    '</div>',
    '<div class="bc-body">',
    '  <div class="bc-upload-section">',
    '    <div class="bc-upload" id="bcDropZone">',
    '      <div class="bc-upload-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>',
    '      <div class="bc-upload-text">Drop your design here or click to upload</div>',
    '      <div class="bc-upload-hint">PNG, JPG, JPEG, WEBP supported</div>',
    '      <input type="file" id="bcFileInput" accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp">',
    '    </div>',
    '  </div>',
    '  <div class="bc-section" id="bcTypeSection">',
    '    <div class="bc-section-title">Design Type</div>',
    '    <div class="bc-types" id="bcTypes"></div>',
    '  </div>',
    '  <button class="bc-analyze" id="bcAnalyze" disabled>',
    '    <i class="fa-solid fa-magnifying-glass-chart"></i> Analyze Design',
    '  </button>',
    '  <div class="bc-progress" id="bcProgress"></div>',
    '  <div class="bc-results" id="bcResults"></div>',
    '</div>'
  ].join('\n');
  document.body.appendChild(panel);

  // Re-translate Brand Checker after rendering
  function retranslateChecker() {
    if (typeof translatePage === 'function' && typeof getCurrentLang === 'function') {
      var lang = getCurrentLang();
      if (lang && lang !== 'en') {
        setTimeout(function() { translatePage(lang); }, 100);
      }
    }
  }
  retranslateChecker();

  // ============================================================
  // 3. BUILD DESIGN TYPE SELECTOR
  // ============================================================
  var typesContainer = document.getElementById('bcTypes');
  var BC = window.BrandChecker;
  if (BC && typesContainer) {
    for (var t = 0; t < BC.DESIGN_TYPES.length; t++) {
      var dt = BC.DESIGN_TYPES[t];
      var btn = document.createElement('button');
      btn.className = 'bc-type';
      btn.setAttribute('data-type', dt.id);
      btn.innerHTML = '<i class="fa-solid ' + dt.icon + '"></i><span>' + dt.name + '</span>';
      typesContainer.appendChild(btn);
    }
  }

  // Build progress stages
  var progressContainer = document.getElementById('bcProgress');
  if (BC && progressContainer) {
    for (var s = 0; s < BC.ANALYSIS_STAGES.length; s++) {
      var stage = BC.ANALYSIS_STAGES[s];
      var stageEl = document.createElement('div');
      stageEl.className = 'bc-stage';
      stageEl.setAttribute('data-stage', stage.id);
      stageEl.innerHTML = '<div class="bc-stage-icon"><i class="fa-solid ' + stage.icon + '"></i></div><div class="bc-stage-text">' + stage.label + '</div>';
      progressContainer.appendChild(stageEl);
    }
  }

  // ============================================================
  // 4. STATE
  // ============================================================
  var state = {
    isOpen: false,
    file: null,
    imageData: null,
    designType: null,
    isAnalyzing: false,
    result: null
  };

  // ============================================================
  // 5. EVENT HANDLERS
  // ============================================================

  // Open/Close
  fab.addEventListener('click', function() { openPanel(); });
  overlay.addEventListener('click', function() { closePanel(); });
  panel.querySelector('.bc-close').addEventListener('click', function() { closePanel(); });

  function openPanel() {
    state.isOpen = true;
    panel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    state.isOpen = false;
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && state.isOpen) closePanel();
  });

  // Upload
  var dropZone = document.getElementById('bcDropZone');
  var fileInput = document.getElementById('bcFileInput');

  dropZone.addEventListener('click', function(e) {
    if (!state.file) fileInput.click();
  });

  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', function() {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });

  fileInput.addEventListener('change', function() {
    if (fileInput.files.length) handleFile(fileInput.files[0]);
  });

  function handleFile(file) {
    if (!file || !file.type.match(/^image\/(png|jpe?g|webp)$/)) return;
    state.file = file;
    var reader = new FileReader();
    reader.onload = function(e) {
      state.imageData = e.target.result;
      showPreview();
      updateAnalyzeButton();
    };
    reader.readAsDataURL(file);
  }

  function showPreview() {
    var sizeKB = Math.round(state.file.size / 1024);
    var sizeStr = sizeKB > 1024 ? (sizeKB / 1024).toFixed(1) + ' MB' : sizeKB + ' KB';
    dropZone.classList.add('has-file');
    dropZone.innerHTML = '<div class="bc-preview"><img class="bc-preview-img" src="' + state.imageData + '" alt="Preview"><div class="bc-preview-info"><div class="bc-preview-name">' + state.file.name + '</div><div class="bc-preview-size">' + sizeStr + '</div></div><button class="bc-preview-remove" aria-label="Remove"><i class="fa-solid fa-xmark"></i></button></div>';
    dropZone.querySelector('.bc-preview-remove').addEventListener('click', function(e) {
      e.stopPropagation();
      removeFile();
    });
  }

  function removeFile() {
    state.file = null;
    state.imageData = null;
    fileInput.value = '';
    dropZone.classList.remove('has-file');
    dropZone.innerHTML = '<div class="bc-upload-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div><div class="bc-upload-text">Drop your design here or click to upload</div><div class="bc-upload-hint">PNG, JPG, JPEG, WEBP supported</div><input type="file" id="bcFileInput" accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp">';
    // Re-bind file input
    var newInput = document.getElementById('bcFileInput');
    newInput.addEventListener('change', function() { if (newInput.files.length) handleFile(newInput.files[0]); });
    updateAnalyzeButton();
    // Hide results
    document.getElementById('bcResults').classList.remove('active');
    document.getElementById('bcResults').innerHTML = '';
    document.getElementById('bcProgress').classList.remove('active');
  }

  // Design type selection
  typesContainer.addEventListener('click', function(e) {
    var btn = e.target.closest('.bc-type');
    if (!btn) return;
    // Deselect all
    var all = typesContainer.querySelectorAll('.bc-type');
    for (var i = 0; i < all.length; i++) all[i].classList.remove('selected');
    btn.classList.add('selected');
    state.designType = btn.getAttribute('data-type');
    updateAnalyzeButton();
  });

  function updateAnalyzeButton() {
    var btn = document.getElementById('bcAnalyze');
    btn.disabled = !(state.file && state.designType);
  }

  // Analyze
  document.getElementById('bcAnalyze').addEventListener('click', function() {
    if (state.isAnalyzing || !state.file || !state.designType) return;
    runAnalysis();
  });

  function runAnalysis() {
    state.isAnalyzing = true;
    var analyzeBtn = document.getElementById('bcAnalyze');
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';

    var progress = document.getElementById('bcProgress');
    progress.classList.add('active');
    document.getElementById('bcResults').classList.remove('active');
    document.getElementById('bcResults').innerHTML = '';

    var stages = progress.querySelectorAll('.bc-stage');
    var stageMap = {};
    for (var s = 0; s < stages.length; s++) {
      var sid = stages[s].getAttribute('data-stage');
      stageMap[sid] = stages[s];
      stages[s].classList.remove('active', 'done');
    }

    // Mark first stage active
    if (stages[0]) stages[0].classList.add('active');

    // Real analysis with stage callbacks
    BC.analyze(state.imageData, state.designType, function(stageId, pct) {
      // Update progress UI based on real analysis stages
      for (var k in stageMap) {
        if (k === stageId) {
          stageMap[k].classList.remove('done');
          stageMap[k].classList.add('active');
          // Show OCR percentage
          if (stageId === 'ocr' && pct !== undefined) {
            var txt = stageMap[k].querySelector('.bc-stage-text');
            if (txt) txt.textContent = 'Running text detection (OCR) — ' + pct + '%';
          }
        } else {
          // Check if this stage came before current
          var foundCurrent = false;
          for (var j = 0; j < BC.ANALYSIS_STAGES.length; j++) {
            if (BC.ANALYSIS_STAGES[j].id === stageId) { foundCurrent = true; break; }
            if (BC.ANALYSIS_STAGES[j].id === k) { stageMap[k].classList.remove('active'); stageMap[k].classList.add('done'); }
          }
        }
      }
    }).then(function(result) {
      // Mark all stages done
      for (var d = 0; d < stages.length; d++) { stages[d].classList.remove('active'); stages[d].classList.add('done'); }
      state.result = result;
      state.isAnalyzing = false;
      analyzeBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-chart"></i> Analyze Design';
      analyzeBtn.disabled = false;
      setTimeout(function() {
        progress.classList.remove('active');
        showResults(result);
      }, 400);
    }).catch(function(err) {
      console.error('[BrandChecker UI] Analysis error:', err);
      state.isAnalyzing = false;
      analyzeBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-chart"></i> Analyze Design';
      analyzeBtn.disabled = false;
      progress.classList.remove('active');
    });
  }

  // ============================================================
  // 6. CATEGORY HELPERS
  // ============================================================
  var categoryIconMap = {
    logo: 'fa-vector-square',
    color: 'fa-droplet',
    typography: 'fa-font',
    layout: 'fa-border-all',
    background: 'fa-swatchbook',
    photo: 'fa-camera',
    graphics: 'fa-shapes',
    brand: 'fa-fingerprint'
  };

  var categoryLabelMap = {
    logo: 'Logo',
    color: 'Color',
    typography: 'Typography',
    layout: 'Layout',
    background: 'Background',
    photo: 'Photography',
    graphics: 'Graphics',
    brand: 'Brand Style'
  };

  // Penalty per issue for each category
  var categoryPenaltyMap = {
    logo: 15,
    color: 20,
    typography: 20,
    layout: 15,
    background: 25,
    brand: 20
  };

  // The six categories always shown in the breakdown
  var breakdownCategories = ['logo', 'color', 'typography', 'layout', 'background', 'brand'];

  function classifyIssue(issue) {
    var title = (issue.title || '').toLowerCase();
    var desc = (issue.description || '').toLowerCase();
    var combined = title + ' ' + desc;
    if (combined.indexOf('logo') !== -1) return 'logo';
    if (combined.indexOf('color') !== -1 || combined.indexOf('palette') !== -1 || combined.indexOf('colour') !== -1) return 'color';
    if (combined.indexOf('typo') !== -1 || combined.indexOf('font') !== -1 || combined.indexOf('text') !== -1 || combined.indexOf('heading') !== -1) return 'typography';
    if (combined.indexOf('layout') !== -1 || combined.indexOf('spacing') !== -1 || combined.indexOf('margin') !== -1 || combined.indexOf('grid') !== -1 || combined.indexOf('alignment') !== -1) return 'layout';
    if (combined.indexOf('background') !== -1 || combined.indexOf('bg ') !== -1) return 'background';
    if (combined.indexOf('photo') !== -1 || combined.indexOf('image') !== -1) return 'photo';
    if (combined.indexOf('graphic') !== -1 || combined.indexOf('icon') !== -1 || combined.indexOf('illustration') !== -1) return 'graphics';
    // Default to brand
    return 'brand';
  }

  function getBarColor(pct) {
    if (pct > 80) return '#34c759';
    if (pct >= 50) return '#ff9500';
    return '#ff3b30';
  }

  // ============================================================
  // 7. SHOW RESULTS
  // ============================================================
  function showResults(result) {
    var container = document.getElementById('bcResults');

    // Handle Invalid Input state
    if (result.isInvalid) {
      var invHtml = '';
      // Show uploaded image
      if (state.imageData) {
        invHtml += '<div style="margin-bottom:20px;border-radius:14px;overflow:hidden;border:1px solid #e8e8ed;position:relative">';
        invHtml += '<img src="' + state.imageData + '" style="width:100%;height:auto;display:block;filter:grayscale(.5)" alt="Uploaded image">';
        invHtml += '<div style="position:absolute;bottom:0;left:0;right:0;padding:10px 14px;background:linear-gradient(transparent,rgba(0,0,0,.7));display:flex;align-items:center;justify-content:space-between">';
        invHtml += '<span style="font-size:.7rem;font-weight:600;color:#fff">' + (state.file ? state.file.name : 'image') + '</span>';
        invHtml += '<span style="font-size:.65rem;color:rgba(255,255,255,.7)">' + (state.file ? (state.file.size > 1048576 ? (state.file.size/1048576).toFixed(1)+' MB' : Math.round(state.file.size/1024)+' KB') : '') + '</span>';
        invHtml += '</div></div>';
      }
      invHtml += '<div class="bc-score-card" style="background:#f5f5f7">';
      invHtml += '<div style="width:80px;height:80px;border-radius:50%;background:#e8e8ed;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2rem;color:#86868b"><i class="fa-solid fa-ban"></i></div>';
      invHtml += '<div class="bc-status-badge" style="background:rgba(134,134,139,.12);color:#86868b"><i class="fa-solid fa-ban"></i> Invalid Input</div>';
      invHtml += '<div class="bc-summary" style="margin-top:8px">' + result.summary + '</div>';
      invHtml += '</div>';
      // Reasons
      invHtml += '<div class="bc-issues-title"><i class="fa-solid fa-circle-info"></i> Why This Image Was Rejected</div>';
      if (result.validityReasons) {
        for (var vr = 0; vr < result.validityReasons.length; vr++) {
          invHtml += '<div style="padding:12px 14px;background:#fafafa;border:1px solid #e8e8ed;border-radius:10px;margin-bottom:8px;font-size:.76rem;color:#6e6e73;display:flex;align-items:flex-start;gap:8px"><i class="fa-solid fa-xmark" style="color:#ff3b30;margin-top:2px;flex-shrink:0"></i>' + result.validityReasons[vr] + '</div>';
        }
      }
      invHtml += '<div style="padding:16px;background:#000;border-radius:12px;margin-top:16px;color:#fff;font-size:.78rem;line-height:1.55"><i class="fa-solid fa-lightbulb" style="color:#ff9500;margin-right:6px"></i><strong>What to upload:</strong> A structured design asset such as a poster, packaging layout, website screenshot, UI screen, social media graphic, or presentation slide that follows KOLEEX brand guidelines.</div>';
      invHtml += '<button class="bc-reset" id="bcReset"><i class="fa-solid fa-arrow-rotate-left"></i> Try Another Image</button>';
      container.innerHTML = invHtml;
      container.classList.add('active');
      var uploadSec = panel.querySelector('.bc-upload-section');
      var typeSec = document.getElementById('bcTypeSection');
      var analyzeBtn = document.getElementById('bcAnalyze');
      if (uploadSec) uploadSec.style.display = 'none';
      if (typeSec) typeSec.style.display = 'none';
      if (analyzeBtn) analyzeBtn.style.display = 'none';
      retranslateChecker();
      setTimeout(function() { panel.querySelector('.bc-body').scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
      document.getElementById('bcReset').addEventListener('click', function() {
        var us = panel.querySelector('.bc-upload-section'); var ts = document.getElementById('bcTypeSection'); var ab = document.getElementById('bcAnalyze');
        if (us) us.style.display = ''; if (ts) ts.style.display = ''; if (ab) ab.style.display = '';
        container.classList.remove('active'); container.innerHTML = '';
        document.getElementById('bcProgress').classList.remove('active');
        removeFile();
        var at = typesContainer.querySelectorAll('.bc-type');
        for (var t = 0; t < at.length; t++) at[t].classList.remove('selected');
        state.designType = null; updateAnalyzeButton();
        panel.querySelector('.bc-body').scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    var circumference = 2 * Math.PI * 52;
    var offset = circumference - (result.score / 100) * circumference;
    var BC = window.BrandChecker;
    var html = '';

    // VISUAL REVIEW SYSTEM — Full image + overlay annotations
    if (state.imageData) {
      html += '<div class="bc-visual-review" style="margin-bottom:20px">';
      // View mode tabs
      html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">';
      html += '<div style="font-size:.78rem;font-weight:700;color:#000;display:flex;align-items:center;gap:6px"><i class="fa-solid fa-eye" style="color:#86868b"></i>Visual Review</div>';
      html += '<div style="display:flex;gap:4px;background:#f5f5f7;border-radius:8px;padding:3px" id="bcViewTabs">';
      html += '<button class="bc-vtab active" data-view="original" style="padding:5px 12px;border:none;border-radius:6px;font-size:.65rem;font-weight:600;cursor:pointer;background:#fff;color:#000;box-shadow:0 1px 3px rgba(0,0,0,.1);font-family:Inter,sans-serif;transition:all .2s">Original</button>';
      html += '<button class="bc-vtab" data-view="overlay" style="padding:5px 12px;border:none;border-radius:6px;font-size:.65rem;font-weight:600;cursor:pointer;background:transparent;color:#86868b;font-family:Inter,sans-serif;transition:all .2s">Overlay</button>';
      html += '</div></div>';
      // Image viewer container
      html += '<div id="bcImageViewer" style="position:relative;border-radius:12px;overflow:hidden;border:1px solid #e8e8ed;background:#f5f5f7">';
      html += '<img id="bcViewerImg" src="' + state.imageData + '" style="width:100%;height:auto;display:block" alt="Uploaded design">';
      // SVG overlay layer (hidden by default)
      html += '<svg id="bcOverlaySvg" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .3s ease" preserveAspectRatio="none"></svg>';
      // File info bar
      html += '<div style="position:absolute;bottom:0;left:0;right:0;padding:8px 12px;background:linear-gradient(transparent,rgba(0,0,0,.6));display:flex;align-items:center;justify-content:space-between">';
      html += '<span style="font-size:.65rem;font-weight:600;color:#fff">' + (state.file ? state.file.name : 'design.png') + '</span>';
      html += '<span style="font-size:.6rem;color:rgba(255,255,255,.6)">' + (state.file ? (state.file.size > 1048576 ? (state.file.size/1048576).toFixed(1)+' MB' : Math.round(state.file.size/1024)+' KB') : '') + '</span>';
      html += '</div></div>';
      // Layer toggles (only in overlay mode)
      html += '<div id="bcLayerToggles" style="display:none;margin-top:8px;display:flex;flex-wrap:wrap;gap:4px">';
      html += '<button class="bc-ltog active" data-layer="text" style="padding:4px 10px;border:1px solid #e8e8ed;border-radius:6px;font-size:.6rem;font-weight:500;cursor:pointer;background:#fff;color:#000;font-family:Inter,sans-serif;transition:all .2s"><i class="fa-solid fa-font" style="margin-right:3px;color:#3b82f6"></i>Text</button>';
      html += '<button class="bc-ltog active" data-layer="brand" style="padding:4px 10px;border:1px solid #e8e8ed;border-radius:6px;font-size:.6rem;font-weight:500;cursor:pointer;background:#fff;color:#000;font-family:Inter,sans-serif;transition:all .2s"><i class="fa-solid fa-certificate" style="margin-right:3px;color:#34c759"></i>Brand</button>';
      html += '<button class="bc-ltog active" data-layer="margins" style="padding:4px 10px;border:1px solid #e8e8ed;border-radius:6px;font-size:.6rem;font-weight:500;cursor:pointer;background:#fff;color:#000;font-family:Inter,sans-serif;transition:all .2s"><i class="fa-solid fa-border-all" style="margin-right:3px;color:#ff9500"></i>Margins</button>';
      html += '<button class="bc-ltog active" data-layer="density" style="padding:4px 10px;border:1px solid #e8e8ed;border-radius:6px;font-size:.6rem;font-weight:500;cursor:pointer;background:#fff;color:#000;font-family:Inter,sans-serif;transition:all .2s"><i class="fa-solid fa-grip" style="margin-right:3px;color:#ff3b30"></i>Density</button>';
      html += '</div>';
      // Legend
      html += '<div id="bcLegend" style="display:none;margin-top:8px;padding:10px 12px;background:#fafafa;border-radius:8px;display:flex;flex-wrap:wrap;gap:10px">';
      html += '<span style="font-size:.6rem;color:#6e6e73;display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border:1.5px solid #3b82f6;border-radius:2px;display:inline-block"></span>Text region</span>';
      html += '<span style="font-size:.6rem;color:#6e6e73;display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:rgba(52,199,89,.3);border:1.5px solid #34c759;border-radius:2px;display:inline-block"></span>KOLEEX brand</span>';
      html += '<span style="font-size:.6rem;color:#6e6e73;display:flex;align-items:center;gap:4px"><span style="width:10px;height:3px;border-top:1.5px dashed #ff9500;display:inline-block"></span>Margin guide</span>';
      html += '<span style="font-size:.6rem;color:#6e6e73;display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:rgba(255,59,48,.15);border-radius:2px;display:inline-block"></span>Dense zone</span>';
      html += '</div>';
      html += '</div>';
      // Quick action button below image
      html += '<div style="margin-top:10px">';
      html += '<button class="bc-reset-img" style="width:100%;padding:10px 16px;background:#f5f5f7;border:1px solid #e8e8ed;border-radius:10px;font-size:.72rem;font-weight:600;color:#6e6e73;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;font-family:Inter,sans-serif;transition:all .3s ease" onmouseover="this.style.borderColor=\'#86868b\';this.style.color=\'#000\'" onmouseout="this.style.borderColor=\'#e8e8ed\';this.style.color=\'#6e6e73\'"><i class="fa-solid fa-arrow-rotate-left"></i> Analyze Another</button>';
      html += '</div>';
    }

    // SECTION A — Overall Result
    html += '<div class="bc-score-card">';
    html += '<div class="bc-score-ring" style="width:130px;height:130px"><svg viewBox="0 0 120 120"><circle class="bc-ring-bg" cx="60" cy="60" r="52"/><circle class="bc-ring-fill" cx="60" cy="60" r="52" style="stroke:'+result.status.color+';stroke-dasharray:'+circumference+';stroke-dashoffset:'+circumference+'" data-target="'+offset+'"/></svg><div class="bc-score-value"><span class="bc-score-num">0</span><span>/100</span></div></div>';
    html += '<div class="bc-status-badge" style="background:'+result.status.color+'15;color:'+result.status.color+'"><i class="fa-solid '+result.status.icon+'"></i> '+result.status.label+'</div>';
    html += '<div class="bc-summary">'+result.summary+'</div>';
    if (result.ruleNote) {
      html += '<div style="display:flex;align-items:center;gap:6px;justify-content:center;margin:8px 0;padding:6px 14px;background:#f5f5f7;border-radius:20px;font-size:.65rem;font-weight:600;color:#6e6e73;width:fit-content;margin-left:auto;margin-right:auto"><i class="fa-solid fa-sliders" style="font-size:.55rem"></i> '+result.ruleNote+'</div>';
    }
    if (result.ruleWeights) {
      html += '<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:6px 0">';
      var wNames={brandIdentity:'Brand',layoutComposition:'Layout',typography:'Type',colorSystem:'Color'};
      for(var wk in result.ruleWeights){
        html += '<span style="font-size:.58rem;padding:3px 8px;border-radius:10px;background:#e8e8ed;color:#6e6e73;font-weight:600">'+wNames[wk]+' '+Math.round(result.ruleWeights[wk]*100)+'%</span>';
      }
      html += '</div>';
    }
    html += '<div class="bc-severity-row">';
    html += '<div class="bc-sev-item"><div class="bc-sev-dot high"></div><span>'+((result.issues||[]).filter(function(i){return i.severity==="high"}).length)+' High</span></div>';
    html += '<div class="bc-sev-item"><div class="bc-sev-dot med"></div><span>'+((result.issues||[]).filter(function(i){return i.severity==="medium"}).length)+' Medium</span></div>';
    html += '<div class="bc-sev-item"><div class="bc-sev-dot low"></div><span>'+((result.issues||[]).filter(function(i){return i.severity==="low"}).length)+' Low</span></div>';
    html += '</div>';
    html += '<div style="display:flex;gap:12px;justify-content:center;margin-top:10px;font-size:.68rem;color:#86868b">';
    html += '<span><i class="fa-solid fa-clock" style="margin-right:4px"></i>'+new Date().toLocaleDateString()+'</span>';
    html += '<span><i class="fa-solid fa-file" style="margin-right:4px"></i>'+(state.file?state.file.name:'design.png')+'</span>';
    html += '</div>';
    // Brand Evidence Status — multi-signal display
    var be = result.brandEvidence || {level:'notDetected',label:'Not Detected',color:'#FF3B30',bg:'#fff0f0',icon:'fa-xmark',score:0,signals:[]};
    var beDescs = {
      strong: 'Strong KOLEEX brand presence confirmed. Multiple brand signals detected including text, palette alignment, and visual language.',
      detected: 'KOLEEX brand identity detected. The design contains identifiable brand markers.',
      weak: 'Weak brand evidence. Some brand-aligned signals found, but explicit KOLEEX identification is limited. Final score is capped at Needs Revision.',
      notDetected: 'No KOLEEX brand evidence detected. The design cannot be classified as KOLEEX-compliant without explicit brand identification such as the KOLEEX logo, brand name, or approved visual markers.'
    };
    html += '<div style="margin-top:12px;padding:14px 16px;background:'+be.bg+';border:1px solid '+be.color+'25;border-radius:12px;font-size:.75rem;line-height:1.5">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">';
    html += '<div style="width:36px;height:36px;background:'+be.color+';border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid '+be.icon+'" style="color:#fff;font-size:.85rem"></i></div>';
    html += '<div><div style="font-weight:700;color:#000;font-size:.82rem">Brand Evidence: '+be.label+'</div>';
    html += '<div style="font-size:.68rem;color:#6e6e73">Score: '+be.score+' / 7</div></div></div>';
    html += '<div style="font-size:.72rem;color:#424245;margin-bottom:8px">'+beDescs[be.level]+'</div>';
    // Show signals
    if (be.signals && be.signals.length > 0) {
      html += '<div style="display:flex;flex-wrap:wrap;gap:4px">';
      for (var si = 0; si < be.signals.length; si++) {
        html += '<span style="font-size:.62rem;padding:3px 8px;border-radius:6px;background:'+be.color+'12;color:'+be.color+';font-weight:600;border:1px solid '+be.color+'20">'+be.signals[si]+'</span>';
      }
      html += '</div>';
    }
    html += '</div>';

    // SECTION B — Score Breakdown
    // REAL DETECTION DATA SECTION
    if(result.detection||result.detection||result.detection){
      html+='<div style="background:#fafafa;border-radius:14px;padding:18px;margin-bottom:20px">';
      html+='<div style="font-size:.75rem;font-weight:700;color:#000;margin-bottom:14px;display:flex;align-items:center;gap:6px"><i class="fa-solid fa-microscope" style="color:#86868b"></i>Real Detection Results</div>';
      // OCR
      if(result.detection){
        html+='<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #e8e8ed;font-size:.72rem">';
        html+='<span style="font-weight:600;color:#000;width:110px">OCR Text:</span>';
        html+='<span style="color:'+(result.detection.koleexFound?'#34c759':'#ff3b30')+';font-weight:600">'+(result.detection.koleexFound?'✓ "KOLEEX" found':'✗ "KOLEEX" not found')+'</span></div>';
        if(result.detection.sloganFound){html+='<div style="padding:4px 0 4px 118px;font-size:.68rem;color:#34c759">✓ Slogan "Shaping the Future" detected</div>';}
        if(result.detection.text&&result.detection.text.length>0){html+='<div style="padding:6px 0;border-bottom:1px solid #e8e8ed;font-size:.68rem;color:#86868b"><span style="font-weight:600;color:#6e6e73">Detected text:</span> "'+result.detection.text.substring(0,120).replace(/\n/g,' ').replace(/</g,'&lt;')+(result.detection.text.length>120?'...':'')+'"</div>';}
      }
      // Colors
      if(result.detection){
        html+='<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #e8e8ed;font-size:.72rem">';
        html+='<span style="font-weight:600;color:#000;width:110px">Palette Match:</span>';
        html+='<span style="font-weight:600;color:'+(result.detection.paletteMatch>50?'#34c759':'#ff9500')+'">'+result.detection.paletteMatch+'%</span>';
        html+='<span style="color:#86868b;margin-left:8px">'+(result.detection.monochrome?'Monochrome ✓':'Colorful: '+result.detection.colorfulness+'%')+'</span></div>';
        // Color swatches
        if(result.detection.dominantColors&&result.detection.dominantColors.length>0){
          html+='<div style="display:flex;gap:4px;padding:8px 0;border-bottom:1px solid #e8e8ed;align-items:center"><span style="font-size:.68rem;font-weight:600;color:#6e6e73;width:110px;flex-shrink:0">Top Colors:</span><div style="display:flex;gap:3px;flex-wrap:wrap">';
          for(var dc=0;dc<Math.min(6,result.detection.dominantColors.length);dc++){
            var clr=result.detection.dominantColors[dc];
            html+='<div style="width:24px;height:24px;border-radius:6px;background:'+clr.hex+';border:1px solid rgba(0,0,0,.1)" title="'+clr.hex+' ('+clr.percentage+'%)"></div>';
          }
          html+='</div></div>';
        }
      }
      // Layout
      if(result.detection){
        html+='<div style="display:flex;align-items:center;gap:8px;padding:8px 0;font-size:.72rem">';
        html+='<span style="font-weight:600;color:#000;width:110px">Layout:</span>';
        html+='<span style="color:#6e6e73">Density: '+result.detection.density+'%</span>';
        html+='<span style="color:#6e6e73;margin-left:8px">Margins: '+result.detection.marginScore+'%</span>';
        html+='<span style="color:'+(result.detection.crowded?'#ff3b30':'#34c759')+';margin-left:8px;font-weight:600">'+(result.detection.crowded?'Crowded':'Clean')+'</span>';
        html+='</div>';
      }
      html+='</div>';
    }

    html += '<div class="bc-breakdown"><div class="bc-breakdown-title"><i class="fa-solid fa-chart-simple" style="margin-right:6px"></i>Category Scores</div>';
    for (var c = 0; c < result.categoryMeta.length; c++) {
      var catId = result.categoryMeta[c].id;
      var catData = result.categories[catId];
      if (!catData) continue;
      var pct = catData.score;
      var cs = BC.getCatLabel(catData.score);
      html += '<div class="bc-bar-row"><span class="bc-bar-label">'+result.categoryMeta[c].name+'</span>';
      html += '<div class="bc-bar-track"><div class="bc-bar-fill" data-width="'+pct+'%" style="width:0%;background:'+cs.color+'"></div></div>';
      html += '<span class="bc-bar-pct" style="color:'+cs.color+'">'+pct+'%</span></div>';
    }
    html += '</div>';

    // SECTION C — Detailed Analysis per category
    html += '<div class="bc-issues-title"><i class="fa-solid fa-clipboard-list"></i> Detailed Analysis</div>';
    for (var c2 = 0; c2 < result.categoryMeta.length; c2++) {
      var cId = result.categoryMeta[c2].id;
      var cData = result.categories[cId];
      if (!cData) continue;
      var cPct = cData.score;
      var cSt = BC.getCatLabel(cData.score);
      var hasIssues = cData.issues && cData.issues.length > 0;

      html += '<div class="bc-cat-card" style="border:1px solid #e8e8ed;border-radius:14px;padding:18px;margin-bottom:12px;transition:all .3s ease">';
      // Category header
      html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:'+(hasIssues?'14px':'0')+'">';
      html += '<div style="display:flex;align-items:center;gap:10px"><div style="width:34px;height:34px;border-radius:8px;background:#f5f5f7;display:flex;align-items:center;justify-content:center;font-size:.8rem;color:#6e6e73"><i class="fa-solid '+result.categoryMeta[c2].icon+'"></i></div>';
      html += '<div><div style="font-size:.82rem;font-weight:700;color:#000">'+result.categoryMeta[c2].name+'</div>';
      html += '<div style="font-size:.65rem;color:'+cSt.color+';font-weight:600">'+cSt.label+' — '+cPct+'%</div></div></div>';
      // Mini progress
      html += '<div style="width:50px;height:50px;position:relative"><svg viewBox="0 0 50 50" style="transform:rotate(-90deg)"><circle cx="25" cy="25" r="20" fill="none" stroke="#e8e8ed" stroke-width="4"/><circle cx="25" cy="25" r="20" fill="none" stroke="'+cSt.color+'" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+2*Math.PI*20+'" stroke-dashoffset="'+(2*Math.PI*20-(cPct/100)*2*Math.PI*20)+'" style="transition:stroke-dashoffset 1.2s ease"/></svg><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;color:#000">'+cData.score+'</div></div>';
      html += '</div>';

      // Issues for this category
      if (hasIssues) {
        for (var j = 0; j < cData.issues.length; j++) {
          var iss = cData.issues[j];
          var sug = cData.suggestions[j] || '';
          html += '<div style="padding:10px 12px;background:#fafafa;border-radius:10px;margin-bottom:8px">';
          html += '<div style="display:flex;align-items:flex-start;gap:8px"><i class="fa-solid fa-triangle-exclamation" style="color:#ff9500;font-size:.6rem;margin-top:4px;flex-shrink:0"></i>';
          html += '<div><div style="font-size:.76rem;font-weight:600;color:#000">'+iss.t+'</div>';
          html += '<div style="font-size:.7rem;color:#6e6e73;line-height:1.5;margin-top:3px">'+iss.d+'</div>';
          if (sug) html += '<div style="font-size:.7rem;color:#1d1d1f;line-height:1.5;margin-top:8px;padding:8px 10px;background:#fff;border:1px solid #e8e8ed;border-radius:8px"><i class="fa-solid fa-lightbulb" style="color:#34c759;margin-right:5px"></i>'+sug+'</div>';
          html += '</div></div></div>';
        }

        // Related guidelines for this category
        if (cData.refs && cData.refs.length > 0) {
          html += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:8px">';
          for (var r = 0; r < cData.refs.length; r++) {
            html += '<a href="'+cData.refs[r].href+'" class="bc-related-link" style="font-size:.65rem;padding:4px 10px"><i class="fa-solid '+cData.refs[r].icon+'"></i> '+cData.refs[r].num+' '+cData.refs[r].name+'</a>';
          }
          html += '</div>';
        }
      }
      html += '</div>';
    }

    // Extra type-specific refs
    if (result.extraRefs && result.extraRefs.length > 0) {
      html += '<div class="bc-related" style="margin-top:16px"><div class="bc-related-title">Design-Type Specific Guidelines</div><div class="bc-related-list">';
      for (var e = 0; e < result.extraRefs.length; e++) {
        html += '<a href="'+result.extraRefs[e].href+'" class="bc-related-link"><i class="fa-solid '+result.extraRefs[e].icon+'"></i> '+result.extraRefs[e].num+' '+result.extraRefs[e].name+'</a>';
      }
      html += '</div></div>';
    }

    // SECTION F — Suggested Actions
    if (result.actions) {
      html += '<div class="bc-issues-title" style="margin-top:24px"><i class="fa-solid fa-list-check"></i> Suggested Actions</div>';
      if (result.actions.fixNow && result.actions.fixNow.length > 0) {
        html += '<div style="margin-bottom:14px"><div style="font-size:.72rem;font-weight:700;color:#ff3b30;margin-bottom:8px;display:flex;align-items:center;gap:6px"><i class="fa-solid fa-circle-exclamation"></i> Fix Now</div>';
        for (var fn = 0; fn < result.actions.fixNow.length; fn++) {
          html += '<div style="padding:8px 12px;background:#fff0f0;border-radius:8px;margin-bottom:4px;font-size:.72rem;color:#1d1d1f;display:flex;align-items:flex-start;gap:8px"><span style="color:#ff3b30;font-weight:700;flex-shrink:0">'+(fn+1)+'.</span> '+result.actions.fixNow[fn]+'</div>';
        }
        html += '</div>';
      }
      if (result.actions.improveNext && result.actions.improveNext.length > 0) {
        html += '<div style="margin-bottom:14px"><div style="font-size:.72rem;font-weight:700;color:#ff9500;margin-bottom:8px;display:flex;align-items:center;gap:6px"><i class="fa-solid fa-arrow-up-right-dots"></i> Improve Next</div>';
        for (var im = 0; im < result.actions.improveNext.length; im++) {
          html += '<div style="padding:8px 12px;background:#fff8f0;border-radius:8px;margin-bottom:4px;font-size:.72rem;color:#1d1d1f;display:flex;align-items:flex-start;gap:8px"><span style="color:#ff9500;font-weight:700;flex-shrink:0">'+(im+1)+'.</span> '+result.actions.improveNext[im]+'</div>';
        }
        html += '</div>';
      }
      if (result.actions.optional && result.actions.optional.length > 0) {
        html += '<div style="margin-bottom:14px"><div style="font-size:.72rem;font-weight:700;color:#86868b;margin-bottom:8px;display:flex;align-items:center;gap:6px"><i class="fa-solid fa-wand-magic-sparkles"></i> Optional Refinement</div>';
        for (var op = 0; op < result.actions.optional.length; op++) {
          html += '<div style="padding:8px 12px;background:#f5f5f7;border-radius:8px;margin-bottom:4px;font-size:.72rem;color:#1d1d1f;display:flex;align-items:flex-start;gap:8px"><span style="color:#86868b;font-weight:700;flex-shrink:0">'+(op+1)+'.</span> '+result.actions.optional[op]+'</div>';
        }
        html += '</div>';
      }
    }

    // Export + Reset buttons
    html += '<div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">';
    html += '<button id="bcExportPDF" style="flex:1;min-width:180px;padding:14px 20px;background:#000;color:#fff;border:none;border-radius:12px;font-size:.8rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .3s ease;letter-spacing:.02em" onmouseover="this.style.background=\'#1d1d1f\'" onmouseout="this.style.background=\'#000\'"><i class="fa-solid fa-file-pdf"></i> Export Brand Report (PDF)</button>';
    html += '<button class="bc-reset" id="bcReset" style="flex:1;min-width:180px"><i class="fa-solid fa-arrow-rotate-left"></i> Analyze Another Design</button>';
    html += '</div>';

    container.innerHTML = html;
    container.classList.add('active');

    // Re-translate dynamic content
    retranslateChecker();

    // Hide input sections, show only results
    var uploadSec = panel.querySelector('.bc-upload-section');
    var typeSec = document.getElementById('bcTypeSection');
    var analyzeBtn = document.getElementById('bcAnalyze');
    if (uploadSec) uploadSec.style.display = 'none';
    if (typeSec) typeSec.style.display = 'none';
    if (analyzeBtn) analyzeBtn.style.display = 'none';

    // Scroll to top of results
    setTimeout(function() { panel.querySelector('.bc-body').scrollTo({ top: 0, behavior: 'smooth' }); }, 100);

    // Animations
    setTimeout(function() {
      var ring = container.querySelector('.bc-ring-fill');
      if (ring) ring.style.strokeDashoffset = ring.getAttribute('data-target');
    }, 100);
    var scoreEl = container.querySelector('.bc-score-num');
    if (scoreEl) {
      var target = result.score, cur = 0;
      var iv = setInterval(function() { cur += Math.ceil(target/40); if (cur >= target) { cur = target; clearInterval(iv); } scoreEl.textContent = cur; }, 30);
    }
    setTimeout(function() {
      var bars = container.querySelectorAll('.bc-bar-fill');
      for (var b = 0; b < bars.length; b++) bars[b].style.width = bars[b].getAttribute('data-width');
    }, 300);

    // ============================================================
    // VISUAL OVERLAY SYSTEM — Build SVG annotations from real data
    // ============================================================
    (function buildOverlay(){
      var svgEl = document.getElementById('bcOverlaySvg');
      var imgEl = document.getElementById('bcViewerImg');
      var viewTabs = document.getElementById('bcViewTabs');
      var layerToggles = document.getElementById('bcLayerToggles');
      var legend = document.getElementById('bcLegend');
      if (!svgEl || !imgEl) return;

      // Wait for image to load to get dimensions
      function initOverlay() {
        var iw = imgEl.naturalWidth || 800, ih = imgEl.naturalHeight || 600;
        svgEl.setAttribute('viewBox', '0 0 ' + iw + ' ' + ih);

        var layers = { text: '', brand: '', margins: '', density: '' };

        // A. Text Regions from OCR
        if (result.detection && result.detection.text) {
          // Get word bounding boxes from the raw OCR data stored during analysis
          // We use the preprocessed image dimensions for mapping
          var pw = result.imageAnalysis ? result.imageAnalysis.width || iw : iw;
          var ph = result.imageAnalysis ? result.imageAnalysis.height || ih : ih;
          var sx = iw / pw, sy = ih / ph;

          // If we have detailed word positions from Tesseract
          if (window._lastOCRWords && window._lastOCRWords.length > 0) {
            for (var wi = 0; wi < window._lastOCRWords.length; wi++) {
              var word = window._lastOCRWords[wi];
              if (!word.bbox) continue;
              var bx = word.bbox.x0 * sx, by = word.bbox.y0 * sy;
              var bw = (word.bbox.x1 - word.bbox.x0) * sx, bh = (word.bbox.y1 - word.bbox.y0) * sy;
              var isKoleex = word.text && word.text.toLowerCase().indexOf('koleex') >= 0;
              if (isKoleex) {
                layers.brand += '<rect x="'+bx+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="3" fill="rgba(52,199,89,.15)" stroke="#34c759" stroke-width="2" class="ol-brand"/>';
                layers.brand += '<text x="'+(bx+2)+'" y="'+(by-4)+'" fill="#34c759" font-size="'+(Math.max(10,bh*0.3))+'" font-weight="700" font-family="Inter,sans-serif" class="ol-brand">KOLEEX</text>';
              } else {
                layers.text += '<rect x="'+bx+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="2" fill="none" stroke="rgba(59,130,246,.4)" stroke-width="1" class="ol-text"/>';
              }
            }
          }
          // If no word positions but OCR found KOLEEX, show a general indicator
          if (result.detection.koleexFound && layers.brand === '') {
            layers.brand += '<rect x="'+(iw*0.1)+'" y="'+(ih*0.05)+'" width="'+(iw*0.3)+'" height="'+(ih*0.08)+'" rx="4" fill="rgba(52,199,89,.1)" stroke="#34c759" stroke-width="2" stroke-dasharray="6,3" class="ol-brand"/>';
            layers.brand += '<text x="'+(iw*0.12)+'" y="'+(ih*0.04)+'" fill="#34c759" font-size="12" font-weight="700" font-family="Inter,sans-serif" class="ol-brand">KOLEEX text detected (approx.)</text>';
          }
        }

        // C. Margin / Safe Area Guides (5% from each edge)
        var mx = iw * 0.05, my = ih * 0.05;
        layers.margins += '<rect x="'+mx+'" y="'+my+'" width="'+(iw-mx*2)+'" height="'+(ih-my*2)+'" rx="0" fill="none" stroke="rgba(255,149,0,.35)" stroke-width="1.5" stroke-dasharray="8,4" class="ol-margins"/>';
        layers.margins += '<text x="'+(mx+4)+'" y="'+(my-4)+'" fill="rgba(255,149,0,.6)" font-size="10" font-family="Inter,sans-serif" class="ol-margins">Safe area</text>';
        // Corner markers
        var cm = 15;
        layers.margins += '<line x1="0" y1="'+my+'" x2="'+cm+'" y2="'+my+'" stroke="rgba(255,149,0,.5)" stroke-width="1" class="ol-margins"/>';
        layers.margins += '<line x1="'+mx+'" y1="0" x2="'+mx+'" y2="'+cm+'" stroke="rgba(255,149,0,.5)" stroke-width="1" class="ol-margins"/>';
        layers.margins += '<line x1="'+(iw-cm)+'" y1="'+my+'" x2="'+iw+'" y2="'+my+'" stroke="rgba(255,149,0,.5)" stroke-width="1" class="ol-margins"/>';
        layers.margins += '<line x1="'+(iw-mx)+'" y1="0" x2="'+(iw-mx)+'" y2="'+cm+'" stroke="rgba(255,149,0,.5)" stroke-width="1" class="ol-margins"/>';

        // D. Density zones — highlight crowded areas
        if (result.detection && result.detection.crowded) {
          // Show subtle overlay on dense regions (center area if crowded)
          layers.density += '<rect x="'+(iw*0.1)+'" y="'+(ih*0.15)+'" width="'+(iw*0.8)+'" height="'+(ih*0.7)+'" rx="4" fill="rgba(255,59,48,.06)" stroke="rgba(255,59,48,.2)" stroke-width="1" stroke-dasharray="4,4" class="ol-density"/>';
          layers.density += '<text x="'+(iw*0.12)+'" y="'+(ih*0.88)+'" fill="rgba(255,59,48,.5)" font-size="10" font-family="Inter,sans-serif" class="ol-density">High density zone</text>';
        }

        // Build full SVG content
        svgEl.innerHTML = '<g class="ol-layer ol-text-layer">' + layers.text + '</g>' +
          '<g class="ol-layer ol-brand-layer">' + layers.brand + '</g>' +
          '<g class="ol-layer ol-margins-layer">' + layers.margins + '</g>' +
          '<g class="ol-layer ol-density-layer">' + layers.density + '</g>';
      }

      if (imgEl.complete) initOverlay();
      else imgEl.onload = initOverlay;

      // View mode toggle
      if (viewTabs) {
        viewTabs.addEventListener('click', function(e) {
          var btn = e.target.closest('.bc-vtab');
          if (!btn) return;
          var view = btn.getAttribute('data-view');
          var allBtns = viewTabs.querySelectorAll('.bc-vtab');
          for (var i = 0; i < allBtns.length; i++) {
            allBtns[i].style.background = 'transparent';
            allBtns[i].style.color = '#86868b';
            allBtns[i].style.boxShadow = 'none';
            allBtns[i].classList.remove('active');
          }
          btn.style.background = '#fff';
          btn.style.color = '#000';
          btn.style.boxShadow = '0 1px 3px rgba(0,0,0,.1)';
          btn.classList.add('active');

          if (view === 'overlay') {
            svgEl.style.opacity = '1';
            if (layerToggles) layerToggles.style.display = 'flex';
            if (legend) legend.style.display = 'flex';
          } else {
            svgEl.style.opacity = '0';
            if (layerToggles) layerToggles.style.display = 'none';
            if (legend) legend.style.display = 'none';
          }
        });
      }

      // Layer toggles
      if (layerToggles) {
        layerToggles.style.display = 'none'; // Hidden initially (original view)
        if (legend) legend.style.display = 'none';
        layerToggles.addEventListener('click', function(e) {
          var btn = e.target.closest('.bc-ltog');
          if (!btn) return;
          btn.classList.toggle('active');
          var layer = btn.getAttribute('data-layer');
          var layerEl = svgEl.querySelector('.ol-' + layer + '-layer');
          if (layerEl) {
            layerEl.style.display = btn.classList.contains('active') ? '' : 'none';
          }
          btn.style.background = btn.classList.contains('active') ? '#fff' : '#e8e8ed';
          btn.style.color = btn.classList.contains('active') ? '#000' : '#afafaf';
        });
      }
    })();

    document.getElementById('bcReset').addEventListener('click', function() {
      // Restore input sections
      var uploadSec = panel.querySelector('.bc-upload-section');
      var typeSec = document.getElementById('bcTypeSection');
      var analyzeBtn = document.getElementById('bcAnalyze');
      if (uploadSec) uploadSec.style.display = '';
      if (typeSec) typeSec.style.display = '';
      if (analyzeBtn) analyzeBtn.style.display = '';
      // Hide results
      container.classList.remove('active');
      container.innerHTML = '';
      document.getElementById('bcProgress').classList.remove('active');
      // Reset file and type
      removeFile();
      var allTypes = typesContainer.querySelectorAll('.bc-type');
      for (var t = 0; t < allTypes.length; t++) allTypes[t].classList.remove('selected');
      state.designType = null;
      updateAnalyzeButton();
      // Scroll back to top
      panel.querySelector('.bc-body').scrollTo({ top: 0, behavior: 'smooth' });
    });

    panel.querySelector('.bc-body').scrollTo({ top: 0, behavior: 'smooth' });

    // PDF Export listener
    document.getElementById('bcExportPDF').addEventListener('click', function() {
      generateBrandReport(result, state.imageData);
    });

    // Quick buttons below image
    var resetImgBtn = container.querySelector('.bc-reset-img');
    if (resetImgBtn) {
      resetImgBtn.addEventListener('click', function() {
        document.getElementById('bcReset').click();
      });
    }
  }

  // ============================================================
  // PDF REPORT GENERATOR
  // ============================================================
  function generateBrandReport(result, imageData) {
    if (typeof html2pdf === 'undefined') { alert('PDF library not loaded.'); return; }

    var btn = document.getElementById('bcExportPDF');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';
    btn.style.opacity = '0.6';
    btn.style.pointerEvents = 'none';

    var ts = new Date();
    var reportId = 'KR-' + ts.getFullYear() + '-' + String(ts.getMonth()+1).padStart(2,'0') + String(ts.getDate()).padStart(2,'0') + '-' + String(ts.getHours()).padStart(2,'0') + String(ts.getMinutes()).padStart(2,'0') + String(ts.getSeconds()).padStart(2,'0');
    var dateStr = ts.toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'}) + ' ' + ts.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    var dtName = '';
    for (var i = 0; i < BC.DESIGN_TYPES.length; i++) { if (BC.DESIGN_TYPES[i].id === result.designType) dtName = BC.DESIGN_TYPES[i].name; }

    var logoSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 719.83 107.57" style="height:36px;width:auto;display:block"><path fill="#000" d="M116.59,96.3v11.05h-10.6L14.66,62.47v44.88H0V1.58h14.66v43.53L105.99,1.58h10.6v11.05L28.42,53.9l88.18,42.4Z"/><path fill="#000" d="M242.65,71.04c0,20.07-14.21,36.54-34.28,36.54h-50.74c-20.52,0-35.18-16.01-35.18-36.54v-35.18C122.45,15.11,136.88.45,157.63.45h49.84c20.52,0,35.18,14.88,35.18,35.41v35.18ZM227.77,38.11c0-12.4-8.34-23.23-20.3-23.23h-49.84c-11.95,0-20.3,10.83-20.3,23.23v31.8c0,11.95,8.34,23,20.3,23h49.84c11.95,0,20.3-11.05,20.3-23v-31.8Z"/><path fill="#000" d="M363.07,107.57h-68.56c-20.52,0-35.18-16.01-35.18-36.54l.23-71.04h14.66v69.91c0,11.95,8.34,23,20.3,23h68.56v14.66h-.01Z"/><path fill="#000" d="M473.8,107.57h-68.56c-20.52,0-35.18-16.01-35.18-36.54v-34.51c0-20.52,14.66-34.96,35.18-34.96h68.56v14.88h-68.56c-11.73,0-20.3,9.7-20.3,21.2v10.6l88.18.23v14.66l-88.18-.23v6.99c0,11.95,8.57,23,20.3,23h68.56v14.68Z"/><path fill="#000" d="M585.42,107.57h-68.56c-20.52,0-35.18-16.01-35.18-36.54v-34.51c0-20.52,14.66-34.96,35.18-34.96h68.56v14.88h-68.56c-11.73,0-20.3,9.7-20.3,21.2v10.6l88.18.23v14.66l-88.18-.23v6.99c0,11.95,8.57,23,20.3,23h68.56v14.68Z"/><path fill="#000" d="M719.83,96.3v11.05h-10.6l-48.04-42.62-48.04,42.62h-10.37v-11.05l46.91-41.72-46.91-41.95V1.58h10.37l48.04,42.62L709.23,1.58h10.6v11.05l-47.13,41.95,47.13,41.72ZM661.19,71.04l40.59,36.31h-81.19l40.59-36.31h0Z"/></svg>';

    // Build category rows
    var catRows = '';
    var catNames = {brandIdentity:'Brand Identity',layoutComposition:'Layout & Composition',typography:'Typography',colorSystem:'Color System'};
    for (var ck in catNames) {
      var cd = result.categories[ck];
      if (!cd) continue;
      var cl = BC.getCatLabel(cd.score);
      catRows += '<tr><td style="padding:10px 14px;font-weight:600;font-size:11px;border-bottom:1px solid #e8e8ed">' + catNames[ck] + '</td>';
      catRows += '<td style="padding:10px 14px;text-align:center;border-bottom:1px solid #e8e8ed"><span style="display:inline-block;padding:3px 12px;border-radius:6px;font-size:10px;font-weight:700;color:#fff;background:' + cl.color + '">' + cd.score + '</span></td>';
      catRows += '<td style="padding:10px 14px;font-size:10px;color:' + cl.color + ';font-weight:600;border-bottom:1px solid #e8e8ed">' + cl.label + '</td></tr>';
    }

    // Build issues
    var issueHTML = '';
    var sevLabels = {high:{name:'High Priority',color:'#FF3B30',bg:'#fff0f0'},medium:{name:'Medium Priority',color:'#FF9500',bg:'#fff8f0'},low:{name:'Low Priority',color:'#86868B',bg:'#f5f5f7'}};
    ['high','medium','low'].forEach(function(sev) {
      var items = (result.issues || []).filter(function(x) { return x.severity === sev; });
      if (items.length === 0) return;
      var sv = sevLabels[sev];
      issueHTML += '<div style="margin-bottom:14px"><div style="font-size:10px;font-weight:700;color:' + sv.color + ';margin-bottom:8px;padding:4px 10px;background:' + sv.bg + ';border-radius:4px;display:inline-block">' + sv.name + ' (' + items.length + ')</div>';
      items.forEach(function(it) {
        issueHTML += '<div style="padding:6px 0;border-bottom:1px solid #f0f0f0;font-size:10px"><strong>' + it.title + '</strong>';
        if (it.description) issueHTML += '<br><span style="color:#6e6e73">' + it.description + '</span>';
        issueHTML += '</div>';
      });
      issueHTML += '</div>';
    });

    // Build suggestions
    var sugHTML = '';
    if (result.actions) {
      var acts = [
        {items:result.actions.fixNow,label:'Fix Now',color:'#FF3B30'},
        {items:result.actions.improveNext,label:'Improve Next',color:'#FF9500'},
        {items:result.actions.optional,label:'Optional',color:'#86868B'}
      ];
      acts.forEach(function(a) {
        if (!a.items || a.items.length === 0) return;
        sugHTML += '<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:700;color:' + a.color + ';margin-bottom:4px">' + a.label + '</div>';
        a.items.forEach(function(s, idx) {
          sugHTML += '<div style="font-size:10px;padding:4px 0;color:#1d1d1f">' + (idx+1) + '. ' + s + '</div>';
        });
        sugHTML += '</div>';
      });
    }

    // Build detection details
    var det = result.detection || {};
    var detHTML = '<table style="width:100%;border-collapse:collapse;font-size:10px">';
    detHTML += '<tr><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;font-weight:600;width:50%">KOLEEX Text Detected</td><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;color:' + (det.koleexFound ? '#34C759' : '#FF3B30') + ';font-weight:600">' + (det.koleexFound ? '✓ Yes' : '✗ No') + '</td></tr>';
    var pdfBe = result.brandEvidence || {label:'Not Detected',color:'#FF3B30',score:0};
    detHTML += '<tr><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;font-weight:600">Brand Evidence</td><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;color:' + pdfBe.color + ';font-weight:600">' + pdfBe.label + ' (' + pdfBe.score + '/7)</td></tr>';
    detHTML += '<tr><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;font-weight:600">Palette Match</td><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed">' + (det.paletteMatch || 0) + '%</td></tr>';
    detHTML += '<tr><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;font-weight:600">Monochrome</td><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed">' + (det.monochrome ? 'Yes' : 'No') + '</td></tr>';
    detHTML += '<tr><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;font-weight:600">Contrast</td><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed">' + (det.contrastScore || 0) + '/100 (' + (det.isHighContrast ? 'Good' : 'Weak') + ')</td></tr>';
    detHTML += '<tr><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;font-weight:600">Layout Density</td><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed">' + (det.crowded ? 'Crowded' : 'Clean') + '</td></tr>';
    detHTML += '<tr><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed;font-weight:600">Margin Safety</td><td style="padding:6px 10px;border-bottom:1px solid #e8e8ed">' + (det.marginScore || 0) + '%</td></tr>';
    detHTML += '<tr><td style="padding:6px 10px;font-weight:600">Spacing Score</td><td style="padding:6px 10px">' + (det.spacingScore || 0) + '/100</td></tr>';
    detHTML += '</table>';

    // Color swatches
    var swatches = '';
    if (det.dominantColors && det.dominantColors.length > 0) {
      swatches = '<div style="margin-top:8px;overflow:hidden">';
      det.dominantColors.slice(0, 6).forEach(function(c) {
        swatches += '<div style="float:left;text-align:center;margin-right:8px;margin-bottom:4px"><div style="width:32px;height:32px;border-radius:4px;background:' + c.hex + ';border:1px solid #e8e8ed"></div><div style="font-size:7px;color:#86868b;margin-top:2px">' + c.hex + '</div></div>';
      });
      swatches += '<div style="clear:both"></div></div>';
    }

    // Related guidelines
    var refsHTML = '';
    var allRefs = {};
    for (var rc in result.categories) {
      var cr = result.categories[rc];
      if (cr.refs) cr.refs.forEach(function(r) { allRefs[r.num] = r; });
    }
    if (result.extraRefs) result.extraRefs.forEach(function(r) { allRefs[r.num] = r; });
    var refList = Object.values(allRefs);
    if (refList.length > 0) {
      refsHTML = '<div style="overflow:hidden">';
      refList.forEach(function(r) {
        refsHTML += '<span style="float:left;padding:4px 10px;background:#f5f5f7;border:1px solid #e8e8ed;border-radius:4px;font-size:9px;font-weight:600;color:#1d1d1f;margin:0 6px 6px 0">Section ' + r.num + ' — ' + r.name + '</span>';
      });
      refsHTML += '<div style="clear:both"></div></div>';
    }

    // Build full report HTML
    var reportHTML = '';
    reportHTML += '<div id="bcPdfReport" style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#1d1d1f;background:#fff;width:794px;padding:0;margin:0;box-sizing:border-box">';

    // PAGE 1 — Header + Score + Preview
    reportHTML += '<div style="padding:30px 40px 20px">';
    // Header — use table layout instead of flex (html2canvas compatible)
    reportHTML += '<table style="width:100%;border-collapse:collapse;border-bottom:2px solid #000;margin-bottom:24px"><tr>';
    reportHTML += '<td style="padding:0 0 16px 0;vertical-align:middle;width:50%">' + logoSVG + '</td>';
    reportHTML += '<td style="padding:0 0 16px 0;vertical-align:middle;text-align:right;font-size:9px;color:#86868b;line-height:1.7"><span style="font-weight:700;color:#000;font-size:11px">Brand Compliance Report</span><br>Report ID: ' + reportId + '<br>' + dateStr + '<br>Design Type: ' + dtName + '</td>';
    reportHTML += '</tr></table>';

    // Overall Score — use simple block layout
    reportHTML += '<div style="text-align:center;padding:28px 20px;margin-bottom:20px;background:#f5f5f7;border:1px solid #e8e8ed;border-radius:8px">';
    reportHTML += '<div style="font-size:56px;font-weight:900;color:' + result.status.color + ';letter-spacing:-3px;line-height:1">' + result.score + '</div>';
    reportHTML += '<div style="font-size:11px;color:#86868b;margin-top:2px">/ 100</div>';
    reportHTML += '<div style="margin-top:12px"><span style="padding:6px 20px;border-radius:4px;font-size:12px;font-weight:700;color:#fff;background:' + result.status.color + '">' + result.status.label + '</span></div>';
    reportHTML += '<div style="font-size:11px;color:#6e6e73;margin-top:14px;max-width:450px;margin-left:auto;margin-right:auto;line-height:1.6">' + result.summary + '</div>';
    if (result.ruleNote) reportHTML += '<div style="font-size:9px;color:#afafaf;margin-top:8px">' + result.ruleNote + '</div>';
    reportHTML += '</div>';

    // Design Preview
    if (imageData) {
      reportHTML += '<div style="text-align:center;margin-bottom:20px">';
      reportHTML += '<div style="font-size:9px;font-weight:600;color:#86868b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Submitted Design</div>';
      reportHTML += '<img src="' + imageData + '" style="max-width:100%;max-height:250px;border-radius:8px;border:1px solid #e8e8ed;object-fit:contain" />';
      reportHTML += '</div>';
    }

    // Score Breakdown
    reportHTML += '<div style="margin-bottom:20px">';
    reportHTML += '<div style="font-size:12px;font-weight:700;color:#000;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #e8e8ed">Score Breakdown</div>';
    reportHTML += '<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px 14px;font-size:10px;color:#86868b;border-bottom:2px solid #e8e8ed">Category</th><th style="text-align:center;padding:8px 14px;font-size:10px;color:#86868b;border-bottom:2px solid #e8e8ed">Score</th><th style="text-align:left;padding:8px 14px;font-size:10px;color:#86868b;border-bottom:2px solid #e8e8ed">Status</th></tr></thead><tbody>' + catRows + '</tbody></table>';
    reportHTML += '</div>';

    reportHTML += '</div>'; // end page 1 padding

    // PAGE 2 — Detection + Issues + Suggestions
    reportHTML += '<div style="padding:20px 40px;page-break-before:always">';

    // Detection Details
    reportHTML += '<div style="margin-bottom:20px">';
    reportHTML += '<div style="font-size:12px;font-weight:700;color:#000;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #e8e8ed">Brand Detection Details</div>';
    reportHTML += detHTML;
    if (swatches) {
      reportHTML += '<div style="margin-top:10px"><div style="font-size:10px;font-weight:600;color:#6e6e73;margin-bottom:4px">Dominant Colors Detected</div>' + swatches + '</div>';
    }
    reportHTML += '</div>';

    // Issues
    if (issueHTML) {
      reportHTML += '<div style="margin-bottom:20px">';
      reportHTML += '<div style="font-size:12px;font-weight:700;color:#000;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #e8e8ed">Issues Found</div>';
      reportHTML += issueHTML;
      reportHTML += '</div>';
    }

    // Suggestions
    if (sugHTML) {
      reportHTML += '<div style="margin-bottom:20px">';
      reportHTML += '<div style="font-size:12px;font-weight:700;color:#000;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #e8e8ed">Recommended Actions</div>';
      reportHTML += sugHTML;
      reportHTML += '</div>';
    }

    // Related Guidelines
    if (refsHTML) {
      reportHTML += '<div style="margin-bottom:20px">';
      reportHTML += '<div style="font-size:12px;font-weight:700;color:#000;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #e8e8ed">Related Guideline Sections</div>';
      reportHTML += refsHTML;
      reportHTML += '</div>';
    }

    // Footer — use table layout
    reportHTML += '<table style="width:100%;border-collapse:collapse;margin-top:30px;border-top:2px solid #000"><tr>';
    reportHTML += '<td style="padding:14px 0 0;font-size:8px;color:#86868b;line-height:1.7;vertical-align:top"><strong style="color:#000">KOLEEX International Group</strong><br>Brand Guidelines System<br>Generated by KOLEEX Brand Checker v' + BC.version + '</td>';
    reportHTML += '<td style="padding:14px 0 0;font-size:8px;color:#86868b;text-align:right;line-height:1.7;vertical-align:top">' + reportId + '<br>' + dateStr + '<br>&copy; ' + ts.getFullYear() + ' KOLEEX</td>';
    reportHTML += '</tr></table>';

    reportHTML += '</div>'; // end page 2 padding
    reportHTML += '</div>'; // end report

    // Create render element — position far left offscreen but FULLY VISIBLE (not hidden)
    var wrapper = document.createElement('div');
    wrapper.id = 'bcPdfWrapper';
    wrapper.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;height:auto;overflow:visible;pointer-events:none;background:#fff;z-index:99999;';
    wrapper.innerHTML = reportHTML;
    document.body.appendChild(wrapper);

    var reportEl = wrapper.querySelector('#bcPdfReport');
    if (!reportEl) { console.error('[BrandChecker] Report element not found!'); document.body.removeChild(wrapper); return; }

    // Force layout calculation
    void reportEl.offsetHeight;

    // Debug: verify content exists
    console.log('[BrandChecker PDF] Report element found, dimensions:', reportEl.offsetWidth, 'x', reportEl.offsetHeight);
    console.log('[BrandChecker PDF] Content length:', reportEl.innerHTML.length, 'chars');
    console.log('[BrandChecker PDF] Score:', result.score, 'Status:', result.status.label);
    console.log('[BrandChecker PDF] Children:', reportEl.children.length);

    var fileName = 'KOLEEX_Brand_Report_' + ts.getFullYear() + String(ts.getMonth()+1).padStart(2,'0') + String(ts.getDate()).padStart(2,'0') + '_' + reportId.replace(/[^A-Za-z0-9]/g,'') + '.pdf';

    // Wait for images to load before generating PDF
    var images = reportEl.querySelectorAll('img');
    var imagePromises = [];
    for (var im = 0; im < images.length; im++) {
      (function(img) {
        if (img.complete && img.naturalWidth > 0) return;
        imagePromises.push(new Promise(function(resolve) {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 5000); // timeout after 5s
        }));
      })(images[im]);
    }

    Promise.all(imagePromises).then(function() {
      // Force reflow one more time
      void reportEl.offsetHeight;
      console.log('[BrandChecker PDF] Images loaded, starting capture. Dimensions:', reportEl.offsetWidth, 'x', reportEl.offsetHeight);

      // Move into viewport briefly for html2canvas to capture
      wrapper.style.left = '0px';
      wrapper.style.top = '0px';
      wrapper.style.zIndex = '99999';

      // Small delay to ensure rendering
      return new Promise(function(r) { setTimeout(r, 500); });
    }).then(function() {
      return html2pdf().set({
        margin: [8, 8, 8, 8],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: true,
          width: 794,
          height: reportEl.offsetHeight,
          windowWidth: 794,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          onclone: function(clonedDoc) {
            var clonedEl = clonedDoc.getElementById('bcPdfReport');
            if (clonedEl) {
              clonedEl.style.width = '794px';
              clonedEl.style.position = 'relative';
              clonedEl.style.left = '0';
              clonedEl.style.top = '0';
              clonedEl.style.opacity = '1';
              clonedEl.style.display = 'block';
              clonedEl.style.visibility = 'visible';
              console.log('[BrandChecker PDF] Clone dimensions:', clonedEl.offsetWidth, clonedEl.offsetHeight);
            }
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['tr'] }
      }).from(reportEl).save();
    }).then(function() {
      console.log('[BrandChecker PDF] Export successful');
      document.body.removeChild(wrapper);
      btn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Export Brand Report (PDF)';
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    }).catch(function(err) {
      console.error('[BrandChecker PDF] Export error:', err);
      if (wrapper.parentNode) document.body.removeChild(wrapper);
      btn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Export Brand Report (PDF)';
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      alert('PDF export failed: ' + (err.message || err));
    });
  }

})();
