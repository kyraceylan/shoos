/* ═══════════════════════════════════════════════════════════
   LESSON 3 — Adding Verification to the AI Generation Flow
   GOAL: Wire up the hCaptcha modal and pass token to /generate.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const generateBtn   = document.getElementById('generateBtn');
  const formError     = document.getElementById('formError');
  const emptyState    = document.getElementById('emptyState');
  const loadingState  = document.getElementById('loadingState');
  const loaderText    = document.getElementById('loaderText');
  const result        = document.getElementById('result');
  const captchaModal  = document.getElementById('captchaModal');
  const captchaCancel = document.getElementById('captchaCancel');

  let captchaWidgetId = null;

  // Chip selection (from Lesson 1)
  document.querySelectorAll('.chip-group').forEach(group => {
    const hiddenInput = document.getElementById(group.dataset.field);
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (hiddenInput) hiddenInput.value = chip.dataset.value;
      });
    });
  });

  // Color sync (from Lesson 1)
  function syncColor(pid, tid) {
    const p = document.getElementById(pid), t = document.getElementById(tid);
    if (!p || !t) return;
    p.addEventListener('input', () => t.value = p.value);
    t.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(t.value)) p.value = t.value; });
  }
  syncColor('primary_color', 'primary_color_text');
  syncColor('accent_color',  'accent_color_text');

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // collectPrefs and renderConcept (from Lesson 2)
  function collectPrefs() {
    return {
      style:         document.getElementById('style').value,
      material:      document.getElementById('material').value,
      occasion:      document.getElementById('occasion').value,
      primary_color: document.getElementById('primary_color').value,
      accent_color:  document.getElementById('accent_color').value,
      inspiration:   document.getElementById('inspiration').value.trim(),
    };
  }

  function renderConcept(c) {
    document.getElementById('resultName').textContent     = c.name || '';
    document.getElementById('resultTagline').textContent  = c.tagline || '';
    document.getElementById('resultDesc').textContent     = c.description || '';
    document.getElementById('resultPrice').textContent    = c.retail_price || '';
    document.getElementById('resultAudience').textContent = c.target_audience || '';
    document.getElementById('resultTags').textContent     = (c.style_tags || []).join(' · ');
    document.getElementById('materialsList').innerHTML    = (c.materials || []).map(m => `<li>${esc(m)}</li>`).join('');
    document.getElementById('featuresList').innerHTML     = (c.features  || []).map(f => `<li>${esc(f)}</li>`).join('');
    document.getElementById('soleText').textContent       = c.sole_type || '—';
  }


  // TODO 1: Write window.hcaptchaReady()
  // Called when hCaptcha script loads. Use hcaptcha.render() with:
  // sitekey: window.HCAPTCHA_SITE_KEY, theme: 'dark', size: 'compact'
  // callback: hide modal, call runGeneration(token)
  // expired-callback: hide modal, re-enable button


  // TODO 2: Wire Generate button to show captcha modal
  // On click: clear errors, reset captcha, show modal
  // If hcaptcha not loaded: show error message


  // TODO 3: Wire Cancel button to hide modal and reset captcha


  // TODO 4: Write async runGeneration(token)
  // Disable button, show loadingState
  // POST to /generate with { ...collectPrefs(), 'h-captcha-response': token }
  // On success: renderConcept, show result
  // On error: show formError
  // Finally: re-enable button, reset captcha

})();
