// ডিফল্ট মাস্টার রেট ডেটাবেজ
let masterRates = {
    stk_bashundhara: 14, stk_ogi: 16, stk_turkey: 17, stk_toptech: 20, stk_indonesia: 25,
    stk_lam_gloss: 0.0044, stk_lam_matt: 0.0055,
    card_art300: 12, card_art350: 15, card_swedish300: 18,
    news_gray: 850, news_white: 1000, news_2030: 600,
    off23_65: 2550, off23_70: 2700, off23_80: 3100, off23_100: 3900, off23_120: 4600,
    off20_65: 1850, off20_70: 2000, off20_80: 2250, off20_100: 2850,
    art23_80: 2800, art23_100: 3400, art23_120: 4100, art23_150: 5100,
    art20_80: 2100, art20_100: 2600, art20_120: 3100, art20_150: 3800,
    auto_bash: 2500, auto_china: 3200,
    pl_mini: 70, pl_hasi: 130, pl_gto: 130, pl_sdemi: 180, pl_demi: 220, pl_odemi: 270, pl_ddemi: 380,
    pr_1c_mini: 100, pr_1c_hasi: 200, pr_1c_gto: 250, pr_1c_sdemi: 280, pr_1c_demi: 300, pr_1c_odemi: 350, pr_1c_ddemi: 700,
    pr_2c_hasi: 400, pr_2c_gto: 500, pr_2c_sdemi: 560, pr_2c_demi: 600, pr_2c_odemi: 700, pr_2c_ddemi: 1400,
    pr_3c_hasi: 600, pr_3c_gto: 750, pr_3c_sdemi: 840, pr_3c_demi: 900, pr_3c_odemi: 1050, pr_3c_ddemi: 2100,
    pr_4c_hasi: 800, pr_4c_gto: 1000, pr_4c_sdemi: 1120, pr_4c_demi: 1200, pr_4c_odemi: 1400, pr_4c_ddemi: 2800,
    bind_memo_5x75: 10, bind_memo_575x9: 12, bind_memo_6x115: 15, bind_memo_75x10: 18, bind_memo_9x115: 20, bind_memo_45x575: 8, bind_memo_375x5: 7,
    bind_pin_575x9: 7, bind_pin_5x75: 6, bind_pin_6x115: 9, bind_pin_75x10: 10, bind_pin_9x115: 12, bind_pin_45x575: 5, bind_pin_375x5: 4.5,
    bind_glue_575x9: 5, bind_glue_5x75: 4.5, bind_glue_6x115: 7, bind_glue_75x10: 8, bind_glue_9x115: 9, bind_glue_45x575: 3.5, bind_glue_375x5: 3,
    bind_auto_575x9: 15, bind_auto_6x115: 18, bind_auto_75x10: 21, bind_auto_9x115: 24
};

function loadMasterRates() {
    const saved = localStorage.getItem('press_master_rates_v9') || localStorage.getItem('press_master_rates_v8');
    if (saved) {
        masterRates = Object.assign(masterRates, JSON.parse(saved));
        if (!masterRates.pl_hasi) {
            masterRates.pl_hasi = masterRates.pl_gto || 130;
        }
    }
    for (let key in masterRates) {
        const el = document.getElementById('cfg_' + key);
        if (el) el.value = masterRates[key];
    }
}

function saveMasterRates() {
    for (let key in masterRates) {
        const el = document.getElementById('cfg_' + key);
        if (el) masterRates[key] = parseFloat(el.value) || 0;
    }
    localStorage.setItem('press_master_rates_v9', JSON.stringify(masterRates));
    alert('✅ সকল রেট সফলভাবে সেভ করা হয়েছে এবং সকল মডিউলে কার্যকর হয়েছে!');
    updatePaper1Options();
    updateNewsprintDropdown();
    renderColorPrintDropdowns();
    updatePlateDetails();
    checkMachineCapacityWarning();
    applyPresetSize();
    updateAutoCarbonBindingAndRates();
    initAllCostingModules();
}

const DEFAULT_MASTER_RATES = {
    stk_bashundhara: 14, stk_ogi: 16, stk_turkey: 17, stk_toptech: 20, stk_indonesia: 25,
    stk_lam_gloss: 0.0044, stk_lam_matt: 0.0055,
    card_art300: 12, card_art350: 15, card_swedish300: 18,
    news_gray: 850, news_white: 1000, news_2030: 600,
    off23_65: 2550, off23_70: 2700, off23_80: 3100, off23_100: 3900, off23_120: 4600,
    off20_65: 1850, off20_70: 2000, off20_80: 2250, off20_100: 2850,
    art23_80: 2800, art23_100: 3400, art23_120: 4100, art23_150: 5100,
    art20_80: 2100, art20_100: 2600, art20_120: 3100, art20_150: 3800,
    auto_bash: 2500, auto_china: 3200,
    pl_mini: 70, pl_hasi: 130, pl_gto: 130, pl_sdemi: 180, pl_demi: 220, pl_odemi: 270, pl_ddemi: 380,
    pr_1c_mini: 100, pr_1c_hasi: 200, pr_1c_gto: 250, pr_1c_sdemi: 280, pr_1c_demi: 300, pr_1c_odemi: 350, pr_1c_ddemi: 450,
    pr_2c_hasi: 400, pr_2c_gto: 500, pr_2c_sdemi: 550, pr_2c_demi: 600, pr_2c_odemi: 700, pr_2c_ddemi: 900,
    pr_3c_hasi: 600, pr_3c_gto: 750, pr_3c_sdemi: 820, pr_3c_demi: 900, pr_3c_odemi: 1050, pr_3c_ddemi: 1350,
    pr_4c_hasi: 800, pr_4c_gto: 1000, pr_4c_sdemi: 1100, pr_4c_demi: 1200, pr_4c_odemi: 1400, pr_4c_ddemi: 1800,
    bind_memo_5x75: 10, bind_memo_575x9: 12, bind_memo_6x115: 15, bind_memo_75x10: 18, bind_memo_9x115: 20, bind_memo_45x575: 8, bind_memo_375x5: 7,
    bind_pin_575x9: 7, bind_pin_5x75: 6, bind_pin_6x115: 9, bind_pin_75x10: 10, bind_pin_9x115: 12, bind_pin_45x575: 5, bind_pin_375x5: 4.5,
    bind_glue_575x9: 5, bind_glue_5x75: 4.5, bind_glue_6x115: 7, bind_glue_75x10: 8, bind_glue_9x115: 9, bind_glue_45x575: 3.5, bind_glue_375x5: 3,
    bind_auto_575x9: 15, bind_auto_6x115: 18, bind_auto_75x10: 21, bind_auto_9x115: 24
};

function toggleSettings() {
    const p = document.getElementById('settingsPanel');
    const btn = document.getElementById('masterSettingsToggleBtn');
    if (p) {
        const isHidden = (p.style.display === 'none' || p.style.display === '');
        p.style.display = isHidden ? 'block' : 'none';
        if (btn) {
            if (isHidden) {
                btn.innerHTML = `<span>✖️ প্যানেল বন্ধ করুন</span> <span style="font-size:11px;">▴</span>`;
                btn.classList.add('active');
            } else {
                btn.innerHTML = `<span>⚙️ প্যানেল খুলুন / এডিট করুন</span> <span style="font-size:11px;">▾</span>`;
                btn.classList.remove('active');
            }
        }
    }
}

function resetDefaultMasterRates() {
    if (!confirm('আপনি কি সত্যিই সকল পণ্যের রেট ফ্যাক্টরি ডিফল্ট মানে রিসেট করতে চান?')) return;
    masterRates = Object.assign({}, DEFAULT_MASTER_RATES);
    for (let key in masterRates) {
        const el = document.getElementById('cfg_' + key);
        if (el) el.value = masterRates[key];
    }
    localStorage.removeItem('press_master_rates_v8');
    localStorage.removeItem('press_master_rates_v7');
    alert('🔄 সফলভাবে সকল রেট ডিফল্ট মূল্যে রিসেট করা হয়েছে!');
    updatePaper1Options();
    updateNewsprintDropdown();
    renderColorPrintDropdowns();
    updatePlateDetails();
    checkMachineCapacityWarning();
    initAllCostingModules();
}

function toggleVcSettings() {
    const p = document.getElementById('vcSettingsPanel');
    if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

function toggleStkSettings() {
    const p = document.getElementById('stkSettingsPanel');
    if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

function updateNewsprintDropdown() {
    const cat = document.getElementById('paperCategory1')?.value || 'offset_2336';
    const is2030 = (cat === 'offset_2030' || cat === 'art_2030');
    const newsType = document.getElementById('paperCategory2Type');
    if (newsType) {
        if (newsType.tagName === 'INPUT') {
            newsType.value = is2030 ? "নিউজপ্রিন্ট কাগজ (20 × 30\")" : "নিউজপ্রিন্ট কাগজ (23 × 36\")";
        } else {
            newsType.innerHTML = is2030 
                ? `<option value="newsprint_2030" selected>নিউজপ্রিন্ট কাগজ (20 × 30")</option>` 
                : `<option value="newsprint_2336" selected>নিউজপ্রিন্ট কাগজ (23 × 36")</option>`;
            newsType.value = is2030 ? "newsprint_2030" : "newsprint_2336";
        }
    }
    const type = is2030 ? "newsprint_2030" : "newsprint_2336";
    const select = document.getElementById('paperCategory2');
    if (!select) return;
    select.innerHTML = "";

    if (type === "newsprint_2336") {
        select.innerHTML = `
            <option value="${masterRates.news_gray / 500}" selected>ধূসর নিউজপ্রিন্ট (৳${masterRates.news_gray}/রিম - ৳${(masterRates.news_gray/500).toFixed(2)}/পাতা)</option>
            <option value="${masterRates.news_white / 500}">সাদা নিউজপ্রিন্ট (৳${masterRates.news_white}/রিম - ৳${(masterRates.news_white/500).toFixed(2)}/পাতা)</option>
        `;
    } else if (type === "newsprint_2030") {
        select.innerHTML = `
            <option value="${masterRates.news_2030 / 500}" selected>নিউজপ্রিন্ট (৳${masterRates.news_2030}/রিম - ৳${(masterRates.news_2030/500).toFixed(2)}/পাতা)</option>
        `;
    }
    updatePaper2CostInput();
}

function updatePaper2CostInput() {
    const el = document.getElementById('paperPricePerSheet2');
    const val = parseFloat(document.getElementById('paperCategory2')?.value) || 0;
    if (el) el.value = val.toFixed(2);
}

function toggleCostingMode() {
    const mode = document.getElementById('costingMode').value;
    const dualBox = document.getElementById('dualPaperContainer');
    const pagesGroup = document.getElementById('pagesPerBookGroup');
    const totalBooksGroup = document.getElementById('totalBooksGroup');
    const bindingRateGroup = document.getElementById('bindingRateGroup');
    const singleBindGroup = document.getElementById('memoSingleBindingTypeGroup');
    const bindRow = document.getElementById('memoBindingRow');
    const pagesVal = document.getElementById('pagesPerBook') ? document.getElementById('pagesPerBook').value : '100_dup';
    const mainType = document.getElementById('paperMainType')?.value || 'offset';

    if (mode === 'single_paper') {
        if (dualBox) dualBox.style.display = 'none';
        if (pagesGroup) pagesGroup.style.display = 'none';
        if (totalBooksGroup) totalBooksGroup.style.display = 'none';
        if (bindingRateGroup) bindingRateGroup.style.display = 'none';
        if (singleBindGroup) singleBindGroup.style.display = 'none';
    } else {
        if (dualBox) dualBox.style.display = (mainType === 'art' || pagesVal === '100_nodup') ? 'none' : 'block';
        if (pagesGroup) pagesGroup.style.display = 'flex';
        if (totalBooksGroup) totalBooksGroup.style.display = 'flex';
        if (bindingRateGroup) bindingRateGroup.style.display = 'flex';
        if (pagesVal === '100_nodup') {
            if (singleBindGroup) singleBindGroup.style.display = 'flex';
            if (bindRow) {
                bindRow.classList.remove('grid-2');
                bindRow.classList.add('grid-3');
            }
        } else {
            if (singleBindGroup) singleBindGroup.style.display = 'none';
            if (bindRow) {
                bindRow.classList.remove('grid-3');
                bindRow.classList.add('grid-2');
            }
        }
    }
    updateBookCountOptions();
    updateMemoBindingRate();
    updateMemoPresetSizeOptions();
}

function updateMemoBindingRate() {
    const preset = document.getElementById('memoPresetSize')?.value || 'custom';
    const pagesVal = document.getElementById('pagesPerBook')?.value || '100_dup';
    const isSingle = (pagesVal === '100_nodup');
    const singleType = document.getElementById('memoSingleBindingType')?.value || 'pin_perf';
    const bindInput = document.getElementById('bindingPerBookRate');
    if (!bindInput) return;

    let rate = 12;

    if (isSingle) {
        if (singleType === 'glue_noperf') {
            // ১০০ পাতা একক মেমো - আঠা বাঁধাই (পারফোরেশন ছাড়া)
            if (preset === '5.75x9') rate = masterRates.bind_glue_575x9 || 5;
            else if (preset === '5x7.5') rate = masterRates.bind_glue_5x75 || 4.5;
            else if (preset === '4.5x5.75') rate = masterRates.bind_glue_45x575 || 3.5;
            else if (preset === '3.75x5') rate = masterRates.bind_glue_375x5 || 3;
            else if (preset === '6x11.5') rate = masterRates.bind_glue_6x115 || 7;
            else if (preset === '7.5x10') rate = masterRates.bind_glue_75x10 || 8;
            else if (preset === '9x11.5') rate = masterRates.bind_glue_9x115 || 9;
            else rate = masterRates.bind_glue_575x9 || 5;
        } else {
            // ১০০ পাতা একক মেমো - পিন বাঁধাই (পারফোরেশন সহ)
            if (preset === '5.75x9') rate = masterRates.bind_pin_575x9 || 7;
            else if (preset === '5x7.5') rate = masterRates.bind_pin_5x75 || 6;
            else if (preset === '4.5x5.75') rate = masterRates.bind_pin_45x575 || 5;
            else if (preset === '3.75x5') rate = masterRates.bind_pin_375x5 || 4.5;
            else if (preset === '6x11.5') rate = masterRates.bind_pin_6x115 || 9;
            else if (preset === '7.5x10') rate = masterRates.bind_pin_75x10 || 10;
            else if (preset === '9x11.5') rate = masterRates.bind_pin_9x115 || 12;
            else rate = masterRates.bind_pin_575x9 || 7;
        }
    } else {
        // ডুপ্লিকেট ক্যাশ মেমো (২০০ পাতা)
        if (preset === '4.5x5.75') rate = masterRates.bind_memo_45x575 || 8;
        else if (preset === '5.75x9') rate = masterRates.bind_memo_575x9 || 12;
        else if (preset === '6x11.5') rate = masterRates.bind_memo_6x115 || 15;
        else if (preset === '9x11.5') rate = masterRates.bind_memo_9x115 || 20;
        else if (preset === '3.75x5') rate = masterRates.bind_memo_375x5 || 7;
        else if (preset === '5x7.5') rate = masterRates.bind_memo_5x75 || 10;
        else if (preset === '7.5x10') rate = masterRates.bind_memo_75x10 || 18;
        else rate = masterRates.bind_memo_575x9 || 12;
    }

    bindInput.value = rate;
}

function handlePagesPerBookChange() {
    const val = document.getElementById('pagesPerBook').value;
    const dualBox = document.getElementById('dualPaperContainer');
    const mode = document.getElementById('costingMode').value;
    const mainType = document.getElementById('paperMainType')?.value || 'offset';
    const singleBindGroup = document.getElementById('memoSingleBindingTypeGroup');
    const bindRow = document.getElementById('memoBindingRow');

    if (mode === 'memo_dual') {
        if (mainType === 'art' || val === '100_nodup') {
            if (dualBox) dualBox.style.display = 'none';
        } else {
            if (dualBox) dualBox.style.display = 'block';
        }
    }

    if (val === '100_nodup') {
        if (singleBindGroup) singleBindGroup.style.display = 'flex';
        if (bindRow) {
            bindRow.classList.remove('grid-2');
            bindRow.classList.add('grid-3');
        }
    } else {
        if (singleBindGroup) singleBindGroup.style.display = 'none';
        if (bindRow) {
            bindRow.classList.remove('grid-3');
            bindRow.classList.add('grid-2');
        }
    }

    updateBookCountOptions();
    updateMemoBindingRate();
    updateMemoPresetSizeOptions();
}

function getMachinePrintRatesForSync(machineId) {
    let normId = machineId;
    if (normId === 'dc_crown') normId = 'over_demi';

    let name = 'ডিমাই';
    let r1 = masterRates.pr_1c_demi || 300;
    let r2 = masterRates.pr_2c_demi || 600;
    let r3 = masterRates.pr_3c_demi || 900;
    let r4 = masterRates.pr_4c_demi || 1200;

    if (normId === 'mini_half') {
        name = 'মিনি';
        r1 = masterRates.pr_1c_mini || 100;
        r2 = 0;
        r3 = 0;
        r4 = 0;
    } else if (normId === 'hasi') {
        name = 'হাসি';
        r1 = masterRates.pr_1c_hasi || 200;
        r2 = masterRates.pr_2c_hasi || 400;
        r3 = masterRates.pr_3c_hasi || 600;
        r4 = masterRates.pr_4c_hasi || 800;
    } else if (normId === 'gto') {
        name = 'GTO';
        r1 = masterRates.pr_1c_gto || 250;
        r2 = masterRates.pr_2c_gto || 500;
        r3 = masterRates.pr_3c_gto || 750;
        r4 = masterRates.pr_4c_gto || 1000;
    } else if (normId === 'short_demi') {
        name = 'শর্ট ডিমাই';
        r1 = masterRates.pr_1c_sdemi || 280;
        r2 = masterRates.pr_2c_sdemi || 560;
        r3 = masterRates.pr_3c_sdemi || 840;
        r4 = masterRates.pr_4c_sdemi || 1120;
    } else if (normId === 'demi') {
        name = 'ডিমাই';
        r1 = masterRates.pr_1c_demi || 300;
        r2 = masterRates.pr_2c_demi || 600;
        r3 = masterRates.pr_3c_demi || 900;
        r4 = masterRates.pr_4c_demi || 1200;
    } else if (normId === 'over_demi') {
        name = 'ওভার ডিমাই';
        r1 = masterRates.pr_1c_odemi || 350;
        r2 = masterRates.pr_2c_odemi || 700;
        r3 = masterRates.pr_3c_odemi || 1050;
        r4 = masterRates.pr_4c_odemi || 1400;
    } else if (normId === 'double_demi') {
        name = 'ডাবল ডিমাই';
        r1 = masterRates.pr_1c_ddemi || 700;
        r2 = masterRates.pr_2c_ddemi || 1400;
        r3 = masterRates.pr_3c_ddemi || 2100;
        r4 = masterRates.pr_4c_ddemi || 2800;
    }

    return { normId, name, r1, r2, r3, r4 };
}

function renderColorPrintDropdowns() {
    const currentPlate = document.getElementById('plateType')?.value || 'demi';
    syncAllColorPrintDropdowns(currentPlate);
    updatePrintFromPreset();
}

function syncAllColorPrintDropdowns(machineId) {
    const { normId, name, r1, r2, r3, r4 } = getMachinePrintRatesForSync(machineId);

    const d1 = document.getElementById('printRate1Color');
    const d2 = document.getElementById('printRate2Color');
    const d3 = document.getElementById('printRate3Color');
    const d4 = document.getElementById('printRate4Color');

    const g2 = document.getElementById('preset2ColorGroup') || (d2 ? d2.closest('.form-group') : null);
    const g3 = document.getElementById('preset3ColorGroup') || (d3 ? d3.closest('.form-group') : null);
    const g4 = document.getElementById('preset4ColorGroup') || (d4 ? d4.closest('.form-group') : null);

    const setDisplay = (el, text) => {
        if (!el) return;
        if (el.tagName === 'INPUT') {
            el.value = text;
        } else {
            el.textContent = text;
        }
    };

    setDisplay(d1, `${name} ছাপা - ৳${r1}`);

    if (normId === 'mini_half') {
        if (g2) g2.style.display = 'none';
        if (g3) g3.style.display = 'none';
        if (g4) g4.style.display = 'none';
    } else {
        setDisplay(d2, `${name} ছাপা - ৳${r2}`);
        setDisplay(d3, `${name} ছাপা - ৳${r3}`);
        setDisplay(d4, `${name} ছাপা - ৳${r4}`);
        if (g2) g2.style.display = '';
        if (g3) g3.style.display = '';
        if (g4) g4.style.display = '';
    }
    highlightActiveColorRateBox();
}

function highlightActiveColorRateBox() {
    const selectedColor = parseInt(document.getElementById('colorCount')?.value) || 1;
    [1, 2, 3, 4].forEach(c => {
        const el = document.getElementById(`printRate${c}Color`);
        if (el) {
            if (c === selectedColor) {
                el.style.backgroundColor = '#eff6ff';
                el.style.borderColor = '#3b82f6';
                el.style.color = '#1d4ed8';
                el.style.borderWidth = '1.5px';
            } else {
                el.style.backgroundColor = '#f8fafc';
                el.style.borderColor = '#cbd5e1';
                el.style.color = '#334155';
                el.style.borderWidth = '1px';
            }
        }
    });
}

function onColorPrintPresetClick(colorNum) {
    if (!colorNum) return;
    const colorElem = document.getElementById('colorCount');
    if (colorElem) {
        colorElem.value = colorNum;
    }
    updatePlateDetails();
    checkMachineCapacityWarningFor('memo');
    if (typeof calculateCosting === 'function') calculateCosting();
}

function onColorPrintPresetChange(colorNum, elem) {
    onColorPrintPresetClick(colorNum);
}

function selectPrintPreset(elem) {
    if (!elem || !elem.value) return;
    onColorPrintPresetChange(null, elem);
}

function updatePrintFromPreset() {
    const plateElem = document.getElementById('plateType');
    if (!plateElem) return;

    const type = plateElem.value;
    syncAllColorPrintDropdowns(type);
    checkMachineCapacityWarningFor('memo');
}

function getPaperDatabase() {
    return {
        offset_2336: {
            size: [23, 36],
            items: [
                { gsm: "65 GSM", ream: masterRates.off23_65, sheet: masterRates.off23_65 / 500, type: "ream" },
                { gsm: "70 GSM", ream: masterRates.off23_70, sheet: masterRates.off23_70 / 500, type: "ream" },
                { gsm: "80 GSM", ream: masterRates.off23_80, sheet: masterRates.off23_80 / 500, type: "ream" },
                { gsm: "100 GSM", ream: masterRates.off23_100, sheet: masterRates.off23_100 / 500, type: "ream" },
                { gsm: "120 GSM", ream: masterRates.off23_120, sheet: masterRates.off23_120 / 500, type: "ream" }
            ]
        },
        offset_2030: {
            size: [20, 30],
            items: [
                { gsm: "65 GSM", ream: masterRates.off20_65, sheet: masterRates.off20_65 / 500, type: "ream" },
                { gsm: "70 GSM", ream: masterRates.off20_70, sheet: masterRates.off20_70 / 500, type: "ream" },
                { gsm: "80 GSM", ream: masterRates.off20_80, sheet: masterRates.off20_80 / 500, type: "ream" },
                { gsm: "100 GSM", ream: masterRates.off20_100, sheet: masterRates.off20_100 / 500, type: "ream" }
            ]
        },
        art_2336: {
            size: [23, 36],
            items: [
                { gsm: "80 GSM", ream: masterRates.art23_80, sheet: masterRates.art23_80 / 500, type: "ream" },
                { gsm: "100 GSM", ream: masterRates.art23_100, sheet: masterRates.art23_100 / 500, type: "ream" },
                { gsm: "120 GSM", ream: masterRates.art23_120, sheet: masterRates.art23_120 / 500, type: "ream" },
                { gsm: "150 GSM", ream: masterRates.art23_150, sheet: masterRates.art23_150 / 500, type: "ream" },
                { gsm: "170 GSM", ream: (masterRates.art23_150 ? Math.round(masterRates.art23_150 * 1.15) : 5800), sheet: (masterRates.art23_150 ? (masterRates.art23_150 * 1.15) / 500 : 11.60), type: "ream" }
            ]
        },
        art_2030: {
            size: [20, 30],
            items: [
                { gsm: "80 GSM", ream: masterRates.art20_80, sheet: masterRates.art20_80 / 500, type: "ream" },
                { gsm: "100 GSM", ream: masterRates.art20_100, sheet: masterRates.art20_100 / 500, type: "ream" },
                { gsm: "120 GSM", ream: masterRates.art20_120, sheet: masterRates.art20_120 / 500, type: "ream" },
                { gsm: "150 GSM", ream: masterRates.art20_150, sheet: masterRates.art20_150 / 500, type: "ream" }
            ]
        },
        card_art_2228: {
            size: [22, 28],
            items: [
                { gsm: "250 GSM আর্ট কার্ড", ream: 5000, sheet: masterRates.card_art300 ? (masterRates.card_art300 * 0.82) : 10.00, type: "sheet" },
                { gsm: "300 GSM আর্ট কার্ড", ream: 6000, sheet: masterRates.card_art300 || 12.00, type: "sheet" },
                { gsm: "350 GSM আর্ট কার্ড", ream: 7500, sheet: masterRates.card_art350 || 15.00, type: "sheet" },
                { gsm: "300 GSM সুইডিশ বোর্ড", ream: 9000, sheet: masterRates.card_swedish300 || 18.00, type: "sheet" }
            ]
        },
        autocarbon: {
            size: [23, 36],
            items: [
                { gsm: "বসুন্ধরা অটোকার্বন", ream: masterRates.auto_bash, sheet: masterRates.auto_bash / 500, type: "ream" },
                { gsm: "চায়না অটোকার্বন", ream: masterRates.auto_china, sheet: masterRates.auto_china / 500, type: "ream" }
            ]
        }
    };
}

function updateMemoPresetSizeOptions(keepSelected = true) {
    const select = document.getElementById('memoPresetSize');
    if (!select) return;

    const prevVal = select.value;
    const pagesVal = document.getElementById('pagesPerBook')?.value || '100_dup';
    const isSingle = (pagesVal === '100_nodup');
    const singleType = document.getElementById('memoSingleBindingType')?.value || 'pin_perf';

    let r_575x9 = masterRates.bind_memo_575x9 || 12;
    let r_6x115 = masterRates.bind_memo_6x115 || 15;
    let r_9x115 = masterRates.bind_memo_9x115 || 20;
    let r_5x75 = masterRates.bind_memo_5x75 || 10;
    let r_75x10 = masterRates.bind_memo_75x10 || 18;

    if (isSingle) {
        if (singleType === 'glue_noperf') {
            r_575x9 = masterRates.bind_glue_575x9 || 5;
            r_6x115 = masterRates.bind_glue_6x115 || 7;
            r_9x115 = masterRates.bind_glue_9x115 || 9;
            r_5x75 = masterRates.bind_glue_5x75 || 4.5;
            r_75x10 = masterRates.bind_glue_75x10 || 8;
        } else {
            r_575x9 = masterRates.bind_pin_575x9 || 7;
            r_6x115 = masterRates.bind_pin_6x115 || 9;
            r_9x115 = masterRates.bind_pin_9x115 || 12;
            r_5x75 = masterRates.bind_pin_5x75 || 6;
            r_75x10 = masterRates.bind_pin_75x10 || 10;
        }
    }

    select.innerHTML = `
        <option value="4.5x5.75">4.5 × 5.75 ইঞ্চি (1/16 ডিমাই - ছোট রসিদ বই)</option>
        <option value="5.75x9">5.75 × 9 ইঞ্চি (1/8 ডিমাই - মেমো রেট ৳${r_575x9}/বই)</option>
        <option value="6x11.5">6 × 11.5 ইঞ্চি (1/4 ডিমাই স্লিম - মেমো রেট ৳${r_6x115}/বই)</option>
        <option value="9x11.5">9 × 11.5 ইঞ্চি (1/4 ডিমাই - মেমো রেট ৳${r_9x115}/বই)</option>
        <option value="3.75x5">3.75 × 5 ইঞ্চি (1/16 ক্রাউন - ছোট রসিদ / স্লিপ)</option>
        <option value="5x7.5">5 × 7.5 ইঞ্চি (1/8 ক্রাউন - মেমো রেট ৳${r_5x75}/বই)</option>
        <option value="7.5x10">7.5 × 10 ইঞ্চি (1/4 ক্রাউন - মেমো রেট ৳${r_75x10}/বই)</option>
        <option value="custom">কাস্টম সাইজ লিখুন...</option>
    `;

    if (keepSelected && prevVal) {
        select.value = prevVal;
    }
}

function onPaperMainTypeChange() {
    const mainType = document.getElementById('paperMainType')?.value || 'offset';
    const hiddenCat = document.getElementById('paperCategory1');
    const currentCat = hiddenCat ? hiddenCat.value : 'offset_2336';
    const is2030 = (currentCat === 'offset_2030' || currentCat === 'art_2030');
    const dualBox = document.getElementById('dualPaperContainer');
    const mode = document.getElementById('costingMode')?.value || 'memo_dual';
    const pagesVal = document.getElementById('pagesPerBook')?.value || '100_dup';

    if (mainType === 'art') {
        if (hiddenCat) hiddenCat.value = is2030 ? 'art_2030' : 'art_2336';
        if (dualBox) dualBox.style.display = 'none';
    } else {
        if (hiddenCat) hiddenCat.value = is2030 ? 'offset_2030' : 'offset_2336';
        if (mode === 'memo_dual' && pagesVal !== '100_nodup') {
            if (dualBox) dualBox.style.display = 'block';
        } else {
            if (dualBox) dualBox.style.display = 'none';
        }
    }
    updatePaper1Options(true);
    if (typeof calculateFullCost === 'function') calculateFullCost();
}

function onPaperCategoryChange() {
    updatePaper1Options(true);
    if (typeof calculateFullCost === 'function') calculateFullCost();
}

function updatePaper1Options(skipPresetSync = false) {
    const catEl = document.getElementById('paperCategory1');
    const cat = catEl ? catEl.value : 'offset_2336';
    const isArt = cat.startsWith('art_');
    const is2030 = (cat === 'offset_2030' || cat === 'art_2030');

    // UI ডিসপ্লে ও লেবেল সিঙ্ক রাখা
    const mainTypeEl = document.getElementById('paperMainType');
    const p1Label = document.getElementById('paperCategory1Label');
    const p1Display = document.getElementById('paperCategory1Display');
    const dualBox = document.getElementById('dualPaperContainer');
    const mode = document.getElementById('costingMode')?.value || 'memo_dual';
    const pagesVal = document.getElementById('pagesPerBook')?.value || '100_dup';

    if (mainTypeEl) mainTypeEl.value = isArt ? 'art' : 'offset';
    if (p1Label) p1Label.textContent = isArt ? 'আর্ট পেপার সাইজ' : 'অফসেট পেপার সাইজ';
    if (p1Display) p1Display.value = is2030 ? '20 × 30" (ক্রাউন সাইজ)' : '23 × 36" (ডিমাই সাইজ)';

    if (isArt) {
        if (dualBox) dualBox.style.display = 'none';
    } else {
        if (mode === 'memo_dual' && pagesVal !== '100_nodup') {
            if (dualBox) dualBox.style.display = 'block';
        } else {
            if (dualBox) dualBox.style.display = 'none';
        }
    }

    const select = document.getElementById('paperGsmRate1');
    const db = getPaperDatabase()[cat];
    if (select) {
        select.innerHTML = "";
        if (db) {
            db.items.forEach(item => {
                const opt = document.createElement('option');
                opt.value = item.sheet;
                if (item.type === "sheet") {
                    opt.textContent = `${item.gsm} (৳${item.sheet.toFixed(2)}/পাতা)`;
                } else {
                    opt.textContent = `${item.gsm} (৳${item.ream}/রিম - ৳${item.sheet.toFixed(2)}/পাতা)`;
                }
                select.appendChild(opt);
            });
        }
    }

    // পেপার 1 অনুযায়ী পেপার 2 (নিউজপ্রিন্ট) এর সাইজ সিঙ্ক করা
    const newsType = document.getElementById('paperCategory2Type');
    if (newsType) {
        newsType.value = is2030 ? 'newsprint_2030' : 'newsprint_2336';
        updateNewsprintDropdown();
    }

    if (!skipPresetSync) {
        updateMemoPresetSizeOptions(true);
    }
    updatePaper1CostInput();
}

function isDimClose(dim, target, tol = 0.25) {
    return Math.abs(dim - target) <= tol;
}

function isMatchCut(l, w, targetL, targetW, tol = 0.25) {
    return (isDimClose(l, targetL, tol) && isDimClose(w, targetW, tol)) ||
           (isDimClose(l, targetW, tol) && isDimClose(w, targetL, tol));
}

function detectMotherPaperCut(l, w) {
    if (!l || !w || l <= 0 || w <= 0) return null;

    // 1. Direct standard Demy (23x36) cuts
    if (
        isMatchCut(l, w, 4.5, 5.75) ||
        isMatchCut(l, w, 5.75, 9) ||
        isMatchCut(l, w, 6, 11.5) ||
        isMatchCut(l, w, 9, 11.5) ||
        isMatchCut(l, w, 11.5, 18) ||
        isMatchCut(l, w, 2.875, 4.5) ||
        isMatchCut(l, w, 5.75, 6) ||
        isMatchCut(l, w, 3.83, 4.5) ||
        isMatchCut(l, w, 7.6, 11.5) ||
        isMatchCut(l, w, 8.27, 11.69) ||
        isMatchCut(l, w, 5.83, 8.27)
    ) {
        return '2336';
    }

    // 2. Direct standard Crown (20x30) cuts
    if (
        isMatchCut(l, w, 3.75, 5) ||
        isMatchCut(l, w, 5, 7.5) ||
        isMatchCut(l, w, 7.5, 10) ||
        isMatchCut(l, w, 10, 15) ||
        isMatchCut(l, w, 2.5, 3.75) ||
        isMatchCut(l, w, 5, 5) ||
        isMatchCut(l, w, 6.66, 10) ||
        isMatchCut(l, w, 3.33, 3.75)
    ) {
        return '2030';
    }

    // 3. Mathematical clean division / standard factor check
    const checkFit = (fullL, fullW) => {
        const out1L = Math.floor(fullL / l);
        const out1W = Math.floor(fullW / w);
        const total1 = out1L * out1W;
        const dimWaste1L = out1L > 0 ? (fullL - out1L * l) / fullL : 1;
        const dimWaste1W = out1W > 0 ? (fullW - out1W * w) / fullW : 1;
        const waste1 = total1 > 0 ? 1 - ((total1 * l * w) / (fullL * fullW)) : 1;

        const out2L = Math.floor(fullL / w);
        const out2W = Math.floor(fullW / l);
        const total2 = out2L * out2W;
        const dimWaste2L = out2L > 0 ? (fullL - out2L * w) / fullL : 1;
        const dimWaste2W = out2W > 0 ? (fullW - out2W * l) / fullW : 1;
        const waste2 = total2 > 0 ? 1 - ((total2 * l * w) / (fullL * fullW)) : 1;

        const bestWaste = Math.min(waste1, waste2);
        const isClean1 = (total1 > 0 && dimWaste1L <= 0.08 && dimWaste1W <= 0.08);
        const isClean2 = (total2 > 0 && dimWaste2L <= 0.08 && dimWaste2W <= 0.08);

        return { isClean: (isClean1 || isClean2), waste: bestWaste };
    };

    const fit2336 = checkFit(23, 36);
    const fit2030 = checkFit(20, 30);

    if (fit2336.isClean && !fit2030.isClean) return '2336';
    if (fit2030.isClean && !fit2336.isClean) return '2030';
    if (fit2336.isClean && fit2030.isClean) {
        return fit2336.waste <= fit2030.waste ? '2336' : '2030';
    }

    if (fit2336.waste <= 0.08 && fit2336.waste < fit2030.waste - 0.05) return '2336';
    if (fit2030.waste <= 0.08 && fit2030.waste < fit2336.waste - 0.05) return '2030';

    return null; // Not matching any standard cut
}

function setMotherPaperDisplayMode(matchedPaper) {
    const p1Display = document.getElementById('paperCategory1Display');
    const p1Select = document.getElementById('paperCategory1Select');
    const p1Warn = document.getElementById('paperCategory1Warning');
    const p1Label = document.getElementById('paperCategory1Label');
    const mainTypeEl = document.getElementById('paperMainType');
    const isArt = (mainTypeEl && mainTypeEl.value === 'art');
    const p1CatEl = document.getElementById('paperCategory1');

    if (p1Label) p1Label.textContent = isArt ? 'আর্ট পেপার সাইজ' : 'অফসেট পেপার সাইজ';

    if (matchedPaper === '2336') {
        if (p1Display) {
            p1Display.style.display = 'block';
            p1Display.value = '23 × 36" (ডিমাই সাইজ)';
        }
        if (p1Select) p1Select.style.display = 'none';
        if (p1Warn) p1Warn.style.display = 'none';
        if (p1CatEl) p1CatEl.value = isArt ? 'art_2336' : 'offset_2336';
        updatePaper1Options(true);
    } else if (matchedPaper === '2030') {
        if (p1Display) {
            p1Display.style.display = 'block';
            p1Display.value = '20 × 30" (ক্রাউন সাইজ)';
        }
        if (p1Select) p1Select.style.display = 'none';
        if (p1Warn) p1Warn.style.display = 'none';
        if (p1CatEl) p1CatEl.value = isArt ? 'art_2030' : 'offset_2030';
        updatePaper1Options(true);
    } else {
        // No match ("মাদার পেপার সাইজ মিলছে না")
        if (p1Display) p1Display.style.display = 'none';
        if (p1Select) {
            p1Select.style.display = 'block';
            if (p1Select.value !== '2336' && p1Select.value !== '2030') {
                p1Select.value = 'none';
            }
        }
        if (p1Warn) {
            p1Warn.style.display = 'block';
            p1Warn.style.color = '#dc2626';
            p1Warn.textContent = '⚠️ মাদার পেপার সাইজ মিলছে না।';
        }
        if (p1Select && (p1Select.value === '2336' || p1Select.value === '2030')) {
            onCustomPaperCategorySelected();
        } else {
            if (p1CatEl) p1CatEl.value = isArt ? 'art_2336' : 'offset_2336';
            updatePaper1Options(true);
        }
    }
}

function onCustomPaperCategorySelected() {
    const p1Select = document.getElementById('paperCategory1Select');
    if (!p1Select) return;
    const val = p1Select.value;
    const mainTypeEl = document.getElementById('paperMainType');
    const isArt = (mainTypeEl && mainTypeEl.value === 'art');
    const p1CatEl = document.getElementById('paperCategory1');
    const p1Warn = document.getElementById('paperCategory1Warning');

    if (val === '2336') {
        if (p1CatEl) p1CatEl.value = isArt ? 'art_2336' : 'offset_2336';
        if (p1Warn) {
            p1Warn.style.display = 'block';
            p1Warn.style.color = '#059669';
            p1Warn.textContent = '✅ 23 × 36" (ডিমাই) সাইজ নির্বাচিত। নিচের ড্রপডাউন থেকে কাগজের GSM নির্বাচন করুন।';
        }
    } else if (val === '2030') {
        if (p1CatEl) p1CatEl.value = isArt ? 'art_2030' : 'offset_2030';
        if (p1Warn) {
            p1Warn.style.display = 'block';
            p1Warn.style.color = '#059669';
            p1Warn.textContent = '✅ 20 × 30" (ক্রাউন) সাইজ নির্বাচিত। নিচের ড্রপডাউন থেকে কাগজের GSM নির্বাচন করুন।';
        }
    } else {
        if (p1Warn) {
            p1Warn.style.display = 'block';
            p1Warn.style.color = '#dc2626';
            p1Warn.textContent = '⚠️ মাদার পেপার সাইজ মিলছে না।';
        }
    }
    updatePaper1Options(true);
    if (typeof calculateFullCost === 'function') calculateFullCost();
}

function updatePaper1CostInput() {}

function applyPresetSize() {
    const preset = document.getElementById('memoPresetSize')?.value;
    if (!preset) return;

    if (preset === '4.5x5.75') {
        document.getElementById('cutLength').value = 4.5;
        document.getElementById('cutWidth').value = 5.75;
        setMotherPaperDisplayMode('2336');
    } else if (preset === '5.75x9') {
        document.getElementById('cutLength').value = 5.75;
        document.getElementById('cutWidth').value = 9;
        setMotherPaperDisplayMode('2336');
    } else if (preset === '6x11.5') {
        document.getElementById('cutLength').value = 6;
        document.getElementById('cutWidth').value = 11.5;
        setMotherPaperDisplayMode('2336');
    } else if (preset === '9x11.5') {
        document.getElementById('cutLength').value = 9;
        document.getElementById('cutWidth').value = 11.5;
        setMotherPaperDisplayMode('2336');
    } else if (preset === '3.75x5') {
        document.getElementById('cutLength').value = 3.75;
        document.getElementById('cutWidth').value = 5;
        setMotherPaperDisplayMode('2030');
    } else if (preset === '5x7.5') {
        document.getElementById('cutLength').value = 5;
        document.getElementById('cutWidth').value = 7.5;
        setMotherPaperDisplayMode('2030');
    } else if (preset === '7.5x10') {
        document.getElementById('cutLength').value = 7.5;
        document.getElementById('cutWidth').value = 10;
        setMotherPaperDisplayMode('2030');
    } else if (preset === 'custom') {
        autoSelectPresetSize();
    }
    updateMemoBindingRate();
    autoDetectOptimalMachine('memo');
    checkMachineCapacityWarning();
}

function autoSelectPresetSize() {
    const l = parseFloat(document.getElementById('cutLength')?.value) || 0;
    const w = parseFloat(document.getElementById('cutWidth')?.value) || 0;
    const select = document.getElementById('memoPresetSize');
    if (!select) return;

    if ((Math.abs(l - 4.5) < 0.2 && Math.abs(w - 5.75) < 0.2) || (Math.abs(l - 5.75) < 0.2 && Math.abs(w - 4.5) < 0.2)) {
        select.value = '4.5x5.75';
        setMotherPaperDisplayMode('2336');
    } else if (((Math.abs(l - 5.75) < 0.2 || Math.abs(l - 5.7) < 0.2) && Math.abs(w - 9) < 0.2) || ((Math.abs(w - 5.75) < 0.2 || Math.abs(w - 5.7) < 0.2) && Math.abs(l - 9) < 0.2)) {
        select.value = '5.75x9';
        setMotherPaperDisplayMode('2336');
    } else if ((Math.abs(l - 6) < 0.2 && Math.abs(w - 11.5) < 0.2) || (Math.abs(l - 11.5) < 0.2 && Math.abs(w - 6) < 0.2)) {
        select.value = '6x11.5';
        setMotherPaperDisplayMode('2336');
    } else if ((Math.abs(l - 9) < 0.2 && Math.abs(w - 11.5) < 0.2) || (Math.abs(l - 11.5) < 0.2 && Math.abs(w - 9) < 0.2)) {
        select.value = '9x11.5';
        setMotherPaperDisplayMode('2336');
    } else if ((Math.abs(l - 3.75) < 0.2 && Math.abs(w - 5) < 0.2) || (Math.abs(l - 5) < 0.2 && Math.abs(w - 3.75) < 0.2)) {
        select.value = '3.75x5';
        setMotherPaperDisplayMode('2030');
    } else if ((Math.abs(l - 5) < 0.2 && Math.abs(w - 7.5) < 0.2) || (Math.abs(l - 7.5) < 0.2 && Math.abs(w - 5) < 0.2)) {
        select.value = '5x7.5';
        setMotherPaperDisplayMode('2030');
    } else if ((Math.abs(l - 7.5) < 0.2 && Math.abs(w - 10) < 0.2) || (Math.abs(l - 10) < 0.2 && Math.abs(w - 7.5) < 0.2)) {
        select.value = '7.5x10';
        setMotherPaperDisplayMode('2030');
    } else {
        select.value = 'custom';
        const detected = detectMotherPaperCut(l, w);
        setMotherPaperDisplayMode(detected);
    }
    autoDetectOptimalMachine('memo');
    checkMachineCapacityWarning();
}

function updateBookCountOptions() {
    const totalQty = parseFloat(document.getElementById('totalQty').value) || 0;
    const pagesVal = document.getElementById('pagesPerBook') ? document.getElementById('pagesPerBook').value : '100_dup';
    const pagesPerBook = 100;
    const mode = document.getElementById('costingMode').value;

    if (mode === 'memo_dual') {
        const totalBooks = Math.ceil(totalQty / pagesPerBook);
        document.getElementById('totalBooksCount').value = totalBooks;
    } else {
        document.getElementById('totalBooksCount').value = 0;
    }
    autoDetectOptimalMachine('memo');
}

function updatePlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('memo');
    }
    const type = document.getElementById('plateType') ? document.getElementById('plateType').value : 'demi';
    const colors = parseInt(document.getElementById('colorCount')?.value) || 1;
    const singlePlateRate = getPlateRateForMachine(type);

    if (document.getElementById('plateCostInput')) {
        document.getElementById('plateCostInput').value = singlePlateRate * colors;
    }
    syncAllColorPrintDropdowns(type);
    checkMachineCapacityWarningFor('memo');
}

function checkMachineCapacityWarning() {
    checkMachineCapacityWarningFor('memo');
}

function calculateCosting() {
    const mode = document.getElementById('costingMode').value;
    const totalQty = parseFloat(document.getElementById('totalQty').value) || 0;

    const cutL = parseFloat(document.getElementById('cutLength').value) || 0;
    const cutW = parseFloat(document.getElementById('cutWidth').value) || 0;

    const pType = document.getElementById('plateType').value;
    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[4];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('resultBox');
    const errBox = document.getElementById('memo_resultError');
    const contentBox = document.getElementById('memo_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে মেমো প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার মেমোর সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('memo', '${minComp.id}'); calculateCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    const p1Select = document.getElementById('paperCategory1Select');
    if (p1Select && p1Select.style.display !== 'none' && p1Select.value === 'none') {
        const warnBox = document.getElementById('paperCategory1Warning');
        if (warnBox) {
            warnBox.style.display = 'block';
            warnBox.style.color = '#dc2626';
            warnBox.textContent = '⚠️ মাদার পেপার সাইজ মিলছে না। অনুগ্রহ করে ড্রপডাউন থেকে 23/36 বা 20/30 সাইজ নির্বাচন করুন।';
        }
        document.getElementById('paperCategory1DisplayGroup')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const p1Cat = document.getElementById('paperCategory1').value;
    const p1Db = getPaperDatabase()[p1Cat];
    const fullL = p1Db.size[0];
    const fullW = p1Db.size[1];

    // এক শিটে কত আপ বের হবে
    const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
    const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
    const bestOut = Math.max(out1, out2) || 1;

    const sheet1Rate = parseFloat(document.getElementById('paperGsmRate1')?.value) || 0;
    const sheet2Rate = parseFloat(document.getElementById('paperCategory2')?.value) || parseFloat(document.getElementById('paperPricePerSheet2')?.value) || 0;

    const isDuplicate = document.getElementById('pagesPerBook') ? (document.getElementById('pagesPerBook').value !== '100_nodup') : true;
    const isArtPaper = p1Cat.startsWith('art_');
    const hasDualPaper = (mode === 'memo_dual' && isDuplicate && !isArtPaper);

    let totalSheets1 = Math.ceil(totalQty / bestOut);
    let totalSheets2 = hasDualPaper ? Math.ceil(totalQty / bestOut) : 0;

    const paperCost1 = totalSheets1 * sheet1Rate;
    const paperCost2 = hasDualPaper ? (totalSheets2 * sheet2Rate) : 0;

    const plateCost = parseFloat(document.getElementById('plateCostInput').value) || 0;
    const printCost = parseFloat(document.getElementById('printBaseCharge').value) || 0;

    const totalBooks = parseFloat(document.getElementById('totalBooksCount').value) || 0;
    const bindingRate = parseFloat(document.getElementById('bindingPerBookRate').value) || 0;
    const bindingCost = mode === 'memo_dual' ? (totalBooks * bindingRate) : 0;

    const grandTotal = paperCost1 + paperCost2 + plateCost + printCost + bindingCost;

    // UI আপডেট
    document.getElementById('resOutPerSheet').textContent = `${bestOut} পিস`;
    
    if (p1Cat === "sticker_2030") {
        document.getElementById('resTotalSheets1').textContent = `${totalSheets1} শিট`;
    } else {
        document.getElementById('resTotalSheets1').textContent = `${totalSheets1} শিট (${(totalSheets1/500).toFixed(2)} রিম)`;
    }
    
    if (mode === 'memo_dual') {
        if (hasDualPaper) {
            document.getElementById('resDualPaperRow').style.display = 'flex';
            document.getElementById('resTotalSheets2').textContent = `${totalSheets2} শিট (${(totalSheets2/500).toFixed(2)} রিম)`;
            document.getElementById('resPaperCost2Row').style.display = 'flex';
            document.getElementById('resPaperCost2').textContent = `৳ ${paperCost2.toFixed(2)}`;
        } else {
            document.getElementById('resDualPaperRow').style.display = 'none';
            document.getElementById('resPaperCost2Row').style.display = 'none';
        }
        document.getElementById('resBindingRow').style.display = 'flex';
        document.getElementById('resBookCountText').textContent = totalBooks;
        document.getElementById('resRatePerBookText').textContent = bindingRate;
        document.getElementById('resBindingCost').textContent = `৳ ${bindingCost.toFixed(2)}`;
    } else {
        document.getElementById('resDualPaperRow').style.display = 'none';
        document.getElementById('resPaperCost2Row').style.display = 'none';
        document.getElementById('resBindingRow').style.display = 'none';
    }

    document.getElementById('resPaperCost1').textContent = `৳ ${paperCost1.toFixed(2)}`;
    document.getElementById('resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('memo', { itemLabel: 'পিস মেমো' });

    document.getElementById('resultBox').style.display = 'block';
}

window.onload = function() {
    loadMasterRates();
    updatePaper1Options();
    updateNewsprintDropdown();
    renderColorPrintDropdowns();
    updatePlateDetails();
    toggleCostingMode();
    updateBookCountOptions();
    
    // নতুন মডিউলসমূহ ইনিশিয়ালাইজেশন
    initAllCostingModules();
    handleCostingModeRouting();
};

// ==========================================
// কস্টিং মোড সিলেকশন রাউটিং (প্রতিটি মডিউল সম্পূর্ণ আলাদা ও স্বাধীন)
// ==========================================
function handleCostingModeRouting() {
    const modeEl = document.getElementById('costingMode');
    if (!modeEl) return;
    const mode = modeEl.value;

    const cashMemoSection = document.getElementById('cashMemoCostingSection');
    const autoCarbonSection = document.getElementById('autoCarbonCostingSection');
    const singlePaperSection = document.getElementById('singlePaperCostingSection');
    const posterSection = document.getElementById('posterCostingSection');
    const stickerSection = document.getElementById('stickerCostingSection');
    const visitingCardSection = document.getElementById('visitingCardCostingSection');
    const calendarSection = document.getElementById('calendarCostingSection');
    const padSlipSection = document.getElementById('padSlipCostingSection');
    const otherPrintingSection = document.getElementById('otherPrintingCostingSection');

    // সকল মডিউল প্রাথমিকভাবে লুকানো
    if (cashMemoSection) cashMemoSection.style.display = 'none';
    if (autoCarbonSection) autoCarbonSection.style.display = 'none';
    if (singlePaperSection) singlePaperSection.style.display = 'none';
    if (posterSection) posterSection.style.display = 'none';
    if (stickerSection) stickerSection.style.display = 'none';
    if (visitingCardSection) visitingCardSection.style.display = 'none';
    if (calendarSection) calendarSection.style.display = 'none';
    if (padSlipSection) padSlipSection.style.display = 'none';
    if (otherPrintingSection) otherPrintingSection.style.display = 'none';

    // শুধুমাত্র নির্বাচিত মডিউল দৃশ্যমান করা
    if (mode === 'memo_dual' && cashMemoSection) {
        cashMemoSection.style.display = 'block';
    } else if (mode === 'autocarbon_memo' && autoCarbonSection) {
        autoCarbonSection.style.display = 'block';
    } else if (mode === 'single_paper' && singlePaperSection) {
        singlePaperSection.style.display = 'block';
    } else if (mode === 'poster_handbill' && posterSection) {
        posterSection.style.display = 'block';
    } else if (mode === 'sticker_printing' && stickerSection) {
        stickerSection.style.display = 'block';
    } else if (mode === 'visiting_card' && visitingCardSection) {
        visitingCardSection.style.display = 'block';
    } else if (mode === 'calendar_printing' && calendarSection) {
        calendarSection.style.display = 'block';
    } else if (mode === 'pad_slip' && padSlipSection) {
        padSlipSection.style.display = 'block';
    } else if (mode === 'other_printing' && otherPrintingSection) {
        otherPrintingSection.style.display = 'block';
    }
}

window.addEventListener('DOMContentLoaded', handleCostingModeRouting);

function initAllCostingModules() {
    updateSinglePaperOptions();
    updatePosterPaperOptions();
    updateStickerPaperRate();
    updateVisitingCardBoardRate();
    updateCalendarPaperOptions();
    updatePadSlipPaperOptions();
    updateAutoCarbonPaperOptions();

    // সকল মডিউলের জন্য মেশিন ক্যাপাসিটি ও রেট ইনিশিয়ালাইজ করা
    const allModules = ['memo', 'auto', 'sp', 'pos', 'stk', 'vc', 'cal', 'pad', 'oth'];
    allModules.forEach(prefix => {
        checkMachineCapacityWarningFor(prefix);
    });
}

// ==========================================
// সার্বজনীন প্রিন্টিং মেশিন ও ক্যাপাসিটি ইঞ্জিন
// (সরাসরি মেশিনের পেপার প্রিন্ট সাইজ ধরে রিয়েল-ওয়ার্ল্ড ক্যালকুলেশন)
// ==========================================
const ALL_PRINT_MACHINES = [
    { id: 'mini_half', name: 'মিনি হাফ (10×16") [প্রিন্ট: 9×14"]', shortName: 'মিনি হাফ', plateL: 10, plateW: 16, maxL: 9, maxW: 14, printL: 9, printW: 14, plateKey: 'pl_mini', printSuffix: 'mini' },
    { id: 'hasi', name: 'হাসি (16×20") [প্রিন্ট: 11.5×18"]', shortName: 'হাসি', plateL: 16, plateW: 20, maxL: 11.5, maxW: 18, printL: 11.5, printW: 18, plateKey: 'pl_hasi', printSuffix: 'hasi' },
    { id: 'gto', name: 'GTO-জিটিও (15.75×21") [প্রিন্ট: 13.5×20"]', shortName: 'GTO', plateL: 15.75, plateW: 21, maxL: 13.5, maxW: 20, printL: 13.5, printW: 20, plateKey: 'pl_gto', printSuffix: 'gto' },
    { id: 'short_demi', name: 'শর্ট ডিমাই (20×22") [প্রিন্ট: 15×20"]', shortName: 'শর্ট ডিমাই', plateL: 20, plateW: 22, maxL: 15, maxW: 20, printL: 15, printW: 20, plateKey: 'pl_sdemi', printSuffix: 'sdemi' },
    { id: 'demi', name: 'ডিমাই (21×25") [প্রিন্ট: 18×23"]', shortName: 'ডিমাই', plateL: 21, plateW: 25, maxL: 18, maxW: 23, printL: 18, printW: 23, plateKey: 'pl_demi', printSuffix: 'demi' },
    { id: 'over_demi', name: 'ওভার ডিমাই (24×29") [প্রিন্ট: 20×28"]', shortName: 'ওভার ডিমাই', plateL: 24, plateW: 29, maxL: 20, maxW: 28, printL: 20, printW: 28, plateKey: 'pl_odemi', printSuffix: 'odemi' },
    { id: 'dc_crown', name: 'D.C ডাবল ক্রাউন (22×31") [প্রিন্ট: 20×30"]', shortName: 'ডাবল ক্রাউন', plateL: 22, plateW: 31, maxL: 20, maxW: 30, printL: 20, printW: 30, plateKey: 'pl_odemi', printSuffix: 'odemi' },
    { id: 'double_demi', name: 'ডাবল ডিমাই (29×36") [প্রিন্ট: 23×36"]', shortName: 'ডাবল ডিমাই', plateL: 29, plateW: 36, maxL: 23, maxW: 36, printL: 23, printW: 36, plateKey: 'pl_ddemi', printSuffix: 'ddemi' }
];

function getMachineUpsForSize(machine, cutL, cutW) {
    if (!machine || !cutL || !cutW || cutL <= 0 || cutW <= 0) return 0;

    const l = Math.min(cutL, cutW);
    const w = Math.max(cutL, cutW);
    
    // বিশেষ প্রেস স্ট্যান্ডার্ড রুলস (Special Real-World Printing Rules)
    // 6 × 11.5 বা 6 × 11 ইঞ্চি (1/6 ডিমাই / লম্বা মেমো)
    if (l >= 5.7 && l <= 6.2 && w >= 11 && w <= 12) {
        if (machine.id === 'mini_half') return 1;
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 3; // 3 সেটআপ (3 আপে 3,000 মেমো)
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 6; // 6 সেটআপ
        if (machine.id === 'double_demi') return 12;
    }
    
    // 5.75 × 9 বা 5.5 × 8.5 ইঞ্চি (1/8 ডিমাই / স্ট্যান্ডার্ড মেমো)
    if (l >= 5.2 && l <= 6.0 && w >= 8.2 && w <= 9.3) {
        if (machine.id === 'mini_half') return 2; // 2 সেটআপ (2 আপে 2,000 মেমো)
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 4; // 4 সেটআপ
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 8; // 8 সেটআপ
        if (machine.id === 'double_demi') return 16;
    }

    // 9 × 11.5 বা 8.5 × 11 ইঞ্চি (1/4 ডিমাই / A4 ক্যাশ মেমো / লিফলেট)
    if (l >= 8.2 && l <= 9.3 && w >= 11 && w <= 12) {
        if (machine.id === 'mini_half') return 1;
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 2;
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 4;
        if (machine.id === 'double_demi') return 8;
    }

    // 11.5 × 18 ইঞ্চি (1/2 ডিমাই)
    if (l >= 11 && l <= 12 && w >= 17 && w <= 18.5) {
        if (machine.id === 'mini_half') return 0;
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 1;
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 2;
        if (machine.id === 'double_demi') return 4;
    }

    // 18 × 23 ইঞ্চি (ডিমাই ফুল সাইজ)
    if (l >= 17 && l <= 18.5 && w >= 22 && w <= 23.5) {
        if (machine.id === 'mini_half' || machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 0;
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 1;
        if (machine.id === 'double_demi') return 2;
    }

    // 3 × 5.75 ইঞ্চি (প্যাড / ছোট স্লিপ - 1/32 ডিমাই)
    if (l >= 2.8 && l <= 3.2 && w >= 5.5 && w <= 6.0) {
        if (machine.id === 'mini_half') return 6; // 9 × 11.5 সাইজে 6 আপ
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 12;
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 24;
        if (machine.id === 'double_demi') return 48;
    }

    // 3 × 11.5 ইঞ্চি (লম্বা স্লিপ / মেমো)
    if (l >= 2.8 && l <= 3.2 && w >= 11 && w <= 12) {
        if (machine.id === 'mini_half') return 2;
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 4;
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 8;
        if (machine.id === 'double_demi') return 16;
    }

    // 4.5 × 5.75 ইঞ্চি (ছোট মেমো / রসিদ বই / প্রেসক্রিপশন - 1/16 ডিমাই: 9 × 11.5 পেপারে 4 আপ)
    if (l >= 4.2 && l <= 4.7 && w >= 5.5 && w <= 6.0) {
        if (machine.id === 'mini_half') return 4; // মিনি মেশিনে 9 × 11.5 পেপারে 4 আপ (1,000 শিট ছাপালে 4,000 মেমো)
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 8; // 11.5 × 18 পেপারে 8 আপ
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 16; // 18 × 23 পেপারে 16 আপ
        if (machine.id === 'double_demi') return 32; // 23 × 36 পেপারে 32 আপ
    }

    // 3.75 × 5 ইঞ্চি (1/16 ক্রাউন - ছোট রসিদ / স্লিপ: 7.5 × 10 পেপারে 4 আপ)
    if (l >= 3.5 && l <= 3.9 && w >= 4.8 && w <= 5.2) {
        if (machine.id === 'mini_half') return 4; // মিনি মেশিনে 7.5 × 10 পেপারে 4 আপ (1,000 শিট ছাপালে 4,000 স্লিপ)
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 8; // 15 × 20 পেপারে 8 আপ
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 16; // 20 × 30 পেপারে 16 আপ
        if (machine.id === 'double_demi') return 32;
    }

    // 5 × 7.5 ইঞ্চি (1/8 ক্রাউন মেমো)
    if (l >= 4.7 && l <= 5.3 && w >= 7.2 && w <= 7.8) {
        if (machine.id === 'mini_half') return 2; // 7.5 × 10 পেপারে 2 আপ
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 4; // 15 × 20 পেপারে 4 আপ
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 8; // 20 × 30 পেপারে 8 আপ
        if (machine.id === 'double_demi') return 16;
    }

    // 7.5 × 10 ইঞ্চি (1/4 ক্রাউন মেমো)
    if (l >= 7.2 && l <= 7.8 && w >= 9.6 && w <= 10.4) {
        if (machine.id === 'mini_half') return 1; // 7.5 × 10 পেপারে 1 আপ
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 2; // 15 × 20 পেপারে 2 আপ
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 4; // 20 × 30 পেপারে 4 আপ
        if (machine.id === 'double_demi') return 8;
    }

    // 4.5 × 11.5 ইঞ্চি (লম্বা প্রেসক্রিপশন / স্লিপ - 1/8 ডিমাই)
    if (l >= 4.2 && l <= 4.7 && w >= 11 && w <= 12) {
        if (machine.id === 'mini_half') return 1;
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 2;
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 4;
        if (machine.id === 'double_demi') return 8;
    }

    // 3.76 × 10 ইঞ্চি / 3.83 × 9 ইঞ্চি (স্লিম মেমো / স্লিপ)
    if ((l >= 3.6 && l <= 4.0) && (w >= 8.8 && w <= 10.3)) {
        if (machine.id === 'mini_half') return 2;
        if (machine.id === 'hasi' || machine.id === 'gto' || machine.id === 'short_demi') return 4;
        if (machine.id === 'demi' || machine.id === 'over_demi' || machine.id === 'dc_crown') return 6;
        if (machine.id === 'double_demi') return 12;
    }

    // জেনেরিক ক্যালকুলেশন: মেশিনের সর্বোচ্চ পেপার প্রিন্ট সাইজ ধরে হিসাব
    const up1 = Math.floor(machine.maxL / cutL) * Math.floor(machine.maxW / cutW);
    const up2 = Math.floor(machine.maxL / cutW) * Math.floor(machine.maxW / cutL);
    return Math.max(up1, up2, 0);
}

const bestRecommendedMachineIds = {
    memo: 'demi',
    auto: 'demi',
    sp: 'demi',
    pos: 'demi',
    stk: 'demi',
    vc: 'gto',
    cal: 'demi',
    pad: 'demi',
    oth: 'demi'
};

function getPlateRateForMachine(machineId) {
    if (machineId === 'mini_half') return masterRates.pl_mini || 70;
    if (machineId === 'hasi') return masterRates.pl_hasi || 130;
    if (machineId === 'gto') return masterRates.pl_gto || 130;
    if (machineId === 'short_demi') return masterRates.pl_sdemi || 180;
    if (machineId === 'demi') return masterRates.pl_demi || 220;
    if (machineId === 'over_demi' || machineId === 'dc_crown') return masterRates.pl_odemi || 270;
    if (machineId === 'double_demi') return masterRates.pl_ddemi || 380;
    return masterRates.pl_demi || 220;
}

function getMachinePrintRates(machineId) {
    let base1kPerColor = 300;
    let incPer1kImpression = 200;

    if (machineId === 'mini_half') {
        base1kPerColor = masterRates.pr_1c_mini || 100;
        incPer1kImpression = masterRates.pr_1c_mini || 100;
    } else if (machineId === 'hasi') {
        base1kPerColor = masterRates.pr_1c_hasi || 200;
        incPer1kImpression = 100; // 1ম 1,000 এর পর প্রতি হাজার 100 টাকা
    } else if (machineId === 'gto') {
        base1kPerColor = masterRates.pr_1c_gto || 250;
        incPer1kImpression = 150;
    } else if (machineId === 'short_demi') {
        base1kPerColor = masterRates.pr_1c_sdemi || 280;
        incPer1kImpression = 180;
    } else if (machineId === 'demi') {
        base1kPerColor = masterRates.pr_1c_demi || 300;
        incPer1kImpression = 200; // 1ম 1,000 এর পর প্রতি হাজার 200 টাকা
    } else if (machineId === 'over_demi' || machineId === 'dc_crown') {
        base1kPerColor = masterRates.pr_1c_odemi || 350;
        incPer1kImpression = 250;
    } else if (machineId === 'double_demi') {
        base1kPerColor = masterRates.pr_1c_ddemi || 700;
        incPer1kImpression = 400; // 1ম 1,000 এর পর প্রতি হাজার 400 টাকা
    }

    return { base1kPerColor, incPer1kImpression };
}

function calculateDynamicPrintCost(machineId, colors, printSheets, multiplier = 1) {
    const safeColors = Math.min(Math.max(1, parseInt(colors) || 1), 4);
    const safeMultiplier = Math.max(1, parseInt(multiplier) || 1);
    const sheets = Math.max(1, parseInt(printSheets) || 1);

    const { base1kPerColor, incPer1kImpression } = getMachinePrintRates(machineId);

    // প্রেসে যেকোনো মেশিনে 1 থেকে 1,500 শিট পর্যন্ত 1ম 1,000 শিটের বেস রেট প্রযোজ্য
    let extraThousands = 0;
    let thousandsOfSheets = 1;

    if (sheets > 1500) {
        extraThousands = Math.ceil((sheets - 1500) / 1000);
        thousandsOfSheets = 1 + extraThousands;
    }

    // 1ম 1,500 শিটের জন্য বেস রেট + অতিরিক্ত প্রতি হাজার শিটের জন্য ইনক্রিমেন্টাল ইমপ্রেশন রেট
    const costPerColor = base1kPerColor + (extraThousands * incPer1kImpression);
    const totalPrintCost = safeColors * costPerColor * safeMultiplier;

    return {
        thousandsOfSheets,
        extraThousands,
        base1kPerColor,
        incPer1kImpression,
        costPerColor,
        totalPrintCost
    };
}

function getPrintBaseRateForMachine(machineId, colors) {
    let suffix = 'demi';
    if (machineId === 'mini_half') suffix = 'mini';
    else if (machineId === 'hasi') suffix = 'hasi';
    else if (machineId === 'gto') suffix = 'gto';
    else if (machineId === 'short_demi') suffix = 'sdemi';
    else if (machineId === 'demi') suffix = 'demi';
    else if (machineId === 'over_demi' || machineId === 'dc_crown') suffix = 'odemi';
    else if (machineId === 'double_demi') suffix = 'ddemi';

    const safeColors = Math.min(Math.max(1, parseInt(colors) || 1), 4);
    const key = `pr_${safeColors}c_${suffix}`;
    return masterRates[key] || (safeColors * (suffix === 'hasi' ? 200 : (suffix === 'ddemi' ? 700 : 300)));
}

// 🎨 মিনি মেশিন সিলেক্ট করলে কালার ড্রপডাউনে শুধু ১-কালার অপশন রাখা, হাসি বা তার উপরে গেলে সকল অপশন দেখানো
function updateColorOptionsForMachine(prefix) {
    let colorSelect = null;
    let machineSelect = null;

    if (prefix === 'memo') {
        colorSelect = document.getElementById('colorCount');
        machineSelect = document.getElementById('plateType');
    } else {
        colorSelect = document.getElementById(`${prefix}_colorCount`);
        machineSelect = document.getElementById(`${prefix}_plateType`);
    }

    if (!colorSelect || !machineSelect) return;

    const machineId = machineSelect.value;
    const currentVal = colorSelect.value || '1';

    if (machineId === 'mini_half') {
        // মিনি মেশিনে শুধুমাত্র ১ কালার থাকবে, অন্য কোনো অপশন থাকবে না
        if (colorSelect.options.length !== 1 || colorSelect.options[0]?.value !== '1') {
            colorSelect.innerHTML = `<option value="1" selected>1 কালার (1 Color)</option>`;
            colorSelect.value = '1';
        }
    } else {
        // হাসি বা তার ওপরের মেশিনে পূর্ণ কালার তালিকা দেখাবে
        if (colorSelect.options.length <= 1) {
            if (prefix === 'cal') {
                colorSelect.innerHTML = `
                    <option value="4">4 কালার (4 Colors / মাল্টিকালার)</option>
                    <option value="2">2 কালার (2 Colors)</option>
                    <option value="1">1 কালার (1 Color)</option>
                `;
            } else if (prefix === 'pos' || prefix === 'stk') {
                colorSelect.innerHTML = `
                    <option value="1">1 কালার (1 Color)</option>
                    <option value="2">2 কালার (2 Colors)</option>
                    <option value="3">3 কালার (3 Colors)</option>
                    <option value="4">4 কালার (4 Colors / মাল্টিকালার)</option>
                `;
            } else {
                colorSelect.innerHTML = `
                    <option value="1">1 কালার (1 Color)</option>
                    <option value="2">2 কালার (2 Colors)</option>
                    <option value="3">3 কালার (3 Colors)</option>
                    <option value="4">4 কালার (4 Colors)</option>
                `;
            }
            if (currentVal && colorSelect.querySelector(`option[value="${currentVal}"]`)) {
                colorSelect.value = currentVal;
            } else {
                colorSelect.value = (prefix === 'cal' || prefix === 'pos' || prefix === 'stk') ? '4' : '1';
            }
        }
    }
}

function getModuleMachineConfig(prefix) {
    updateColorOptionsForMachine(prefix);

    let cutL = 1, cutW = 1, totalQty = 1000, colors = 1, multiplier = 1, machineId = 'demi';
    let pTypeSelect = null, plateCostInput = null, printCostInput = null;
    let warningBox = null, suggestionBox = null, summaryEl = null, tableEl = null, applyBtn = null;
    let resultBox = null, resultError = null, resultContent = null;

    if (prefix === 'memo') {
        cutL = parseFloat(document.getElementById('cutLength')?.value) || 5.75;
        cutW = parseFloat(document.getElementById('cutWidth')?.value) || 9;
        totalQty = parseFloat(document.getElementById('totalQty')?.value) || 1000;
        colors = parseInt(document.getElementById('colorCount')?.value) || 1;
        multiplier = 1;
        pTypeSelect = document.getElementById('plateType');
        plateCostInput = document.getElementById('plateCostInput');
        printCostInput = document.getElementById('printBaseCharge');
        warningBox = document.getElementById('machineWarningBox');
        suggestionBox = document.getElementById('memo_machineSuggestionBox');
        summaryEl = document.getElementById('memo_bestMachineSummary');
        tableEl = document.getElementById('memo_machineCompareTable');
        applyBtn = document.getElementById('memo_btnApplyBestMachine');
        resultBox = document.getElementById('resultBox');
        resultError = document.getElementById('memo_resultError');
        resultContent = document.getElementById('memo_resultContent');
    } else {
        cutL = parseFloat(document.getElementById(`${prefix}_cutLength`)?.value) || 1;
        cutW = parseFloat(document.getElementById(`${prefix}_cutWidth`)?.value) || 1;
        totalQty = parseFloat(document.getElementById(`${prefix}_totalQty`)?.value) || 1000;
        
        if (prefix === 'vc') {
            const side = document.getElementById('vc_printSide')?.value || 'single';
            colors = 4;
            multiplier = side === 'double' ? 2 : 1;
        } else if (prefix === 'cal') {
            colors = parseInt(document.getElementById('cal_colorCount')?.value) || 4;
            multiplier = parseInt(document.getElementById('cal_leavesCount')?.value) || 1;
        } else if (prefix === 'auto') {
            const totalBooks = parseFloat(document.getElementById('auto_totalQty')?.value) || 50;
            const leavesCount = parseInt(document.getElementById('auto_leavesCount')?.value) || 100;
            totalQty = totalBooks * leavesCount;
            colors = parseInt(document.getElementById('auto_colorCount')?.value) || 1;
            multiplier = 1;
        } else if (prefix === 'pad') {
            const totalPads = parseFloat(document.getElementById('pad_totalQty')?.value) || 50;
            const leavesCount = parseInt(document.getElementById('pad_leavesCount')?.value) || 100;
            totalQty = totalPads * leavesCount;
            colors = parseInt(document.getElementById('pad_colorCount')?.value) || 1;
            multiplier = 1;
        } else {
            colors = parseInt(document.getElementById(`${prefix}_colorCount`)?.value) || (prefix === 'pos' || prefix === 'stk' ? 4 : 1);
            multiplier = 1;
        }

        pTypeSelect = document.getElementById(`${prefix}_plateType`);
        plateCostInput = document.getElementById(`${prefix}_plateCost`);
        printCostInput = document.getElementById(`${prefix}_printCost`);
        warningBox = document.getElementById(`${prefix}_machineWarningBox`);
        suggestionBox = document.getElementById(`${prefix}_machineSuggestionBox`);
        summaryEl = document.getElementById(`${prefix}_bestMachineSummary`);
        tableEl = document.getElementById(`${prefix}_machineCompareTable`);
        applyBtn = document.getElementById(`${prefix}_btnApplyBestMachine`);
        resultBox = document.getElementById(`${prefix}_resultBox`);
        resultError = document.getElementById(`${prefix}_resultError`);
        resultContent = document.getElementById(`${prefix}_resultContent`);
    }

    if (pTypeSelect) {
        machineId = pTypeSelect.value;
    }

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === machineId) || ALL_PRINT_MACHINES[4];

    return {
        prefix,
        cutL,
        cutW,
        totalQty,
        colors,
        multiplier,
        machineId,
        currentMachine,
        pTypeSelect,
        plateCostInput,
        printCostInput,
        warningBox,
        suggestionBox,
        summaryEl,
        tableEl,
        applyBtn,
        resultBox,
        resultError,
        resultContent
    };
}

function evaluateMachinesFor(prefix) {
    const config = getModuleMachineConfig(prefix);
    const results = [];

    ALL_PRINT_MACHINES.forEach(m => {
        // একাধিক কালার (২/৩/৪ কালার) কাজের জন্য মিনি মেশিন সম্পূর্ণ নিষিদ্ধ (মিনিতে শুধুমাত্র ১ কালার সম্ভব)
        if (config.colors >= 2 && m.id === 'mini_half') {
            return;
        }

        const ups = getMachineUpsForSize(m, config.cutL, config.cutW);

        if (ups > 0) {
            const printSheets = Math.ceil(config.totalQty / ups);
            const dynamicResult = calculateDynamicPrintCost(m.id, config.colors, printSheets, config.multiplier);
            const plateCost = getPlateRateForMachine(m.id) * config.colors * config.multiplier;
            const printCost = dynamicResult.totalPrintCost;
            const totalCost = plateCost + printCost;

            results.push({
                machine: m,
                ups,
                printSheets,
                totalRuns: dynamicResult.thousandsOfSheets * config.multiplier,
                thousandsOfSheets: dynamicResult.thousandsOfSheets,
                extraThousands: dynamicResult.extraThousands,
                plateCost,
                base1kPerColor: dynamicResult.base1kPerColor,
                incPer1kImpression: dynamicResult.incPer1kImpression,
                costPerColor: dynamicResult.costPerColor,
                printCost,
                totalCost
            });
        }
    });

    results.sort((a, b) => a.totalCost - b.totalCost);
    return results;
}

// 🧠 স্মার্ট অটো মেশিন ডিটেকশন লজিক (বাস্তবসম্মত প্রেস হিসাব ও সাইজ রুলস)
function getOptimalMachineId(prefix) {
    const config = getModuleMachineConfig(prefix);
    const { cutL, cutW, totalQty, colors } = config;
    const l = Math.min(cutL, cutW);
    const w = Math.max(cutL, cutW);

    // একাধিক কালার কাজের জন্য মিনি মেশিন সম্পূর্ণ নিষিদ্ধ (শুধুমাত্র ১-কালার সম্ভব)
    const allowMini = (colors <= 1);

    // 1. 5.75 × 9 ইঞ্চি (1/8 ডিমাই ক্যাশ মেমো)
    if (l >= 5.2 && l <= 6.0 && w >= 8.2 && w <= 9.3) {
        if (allowMini && totalQty <= 3000) return 'mini_half'; // 2 আপে 500-1,500 শিট (100৳ প্রিন্ট + 70৳ প্লেট)
        if (totalQty <= 8000) return 'hasi'; // 4 আপে 1,000-2,000 শিট (11.5×18" সাইজে 4 সেটআপ)
        if (totalQty <= 20000) return 'demi'; // 8 আপে 18×23" সাইজে
        return 'double_demi'; // 16 আপে 23×36" সাইজে
    }

    // 2. 6 × 11.5 ইঞ্চি (1/6 ডিমাই / লম্বা মেমো)
    if (l >= 5.7 && l <= 6.2 && w >= 11 && w <= 12) {
        if (allowMini && totalQty <= 1000) return 'mini_half'; // 1 আপে 1,000 শিট (100৳ প্রিন্ট)
        if (totalQty <= 6000) return 'hasi'; // 2-3 আপে 1,000-2,000 শিট
        if (totalQty <= 16000) return 'demi'; // 6 আপে
        return 'double_demi'; // 12 আপে
    }

    // 3. 9 × 11.5 ইঞ্চি (1/4 ডিমাই / A4 ক্যাশ মেমো / লিফলেট)
    if (l >= 8.2 && l <= 9.3 && w >= 11 && w <= 12) {
        if (allowMini && totalQty <= 1000) return 'mini_half'; // 1 আপে 1,000 শিট
        if (totalQty <= 4000) return 'hasi'; // 2 আপে 1,000-2,000 শিট
        if (totalQty <= 12000) return 'demi'; // 4 আপে
        return 'double_demi'; // 8 আপে
    }

    // 4. 4.5 × 5.75 ইঞ্চি (1/16 ডিমাই ছোট মেমো / রসিদ বই)
    if (l >= 4.2 && l <= 4.7 && w >= 5.5 && w <= 6.0) {
        if (allowMini && totalQty <= 6000) return 'mini_half'; // 4 আপে 1,500 শিট পর্যন্ত
        if (totalQty <= 15000) return 'hasi'; // 8 আপে
        if (totalQty <= 30000) return 'demi';
        return 'double_demi';
    }

    // 5. 5 × 7.5 ইঞ্চি (1/8 ক্রাউন মেমো)
    if (l >= 4.7 && l <= 5.3 && w >= 7.2 && w <= 7.8) {
        if (allowMini && totalQty <= 3000) return 'mini_half'; // 2 আপে 1,500 শিট
        if (totalQty <= 8000) return 'hasi'; // 4 আপে
        return 'demi';
    }

    // 6. 7.5 × 10 ইঞ্চি (২৩×৩৬ পেপারে ৯ টুকরা / ক্রাউন ৪ তা)
    if (l >= 7.2 && l <= 7.8 && w >= 9.6 && w <= 10.4) {
        if (prefix === 'auto') {
            // অটো কার্বন মেমোতে ২০ বই (২০০০ পাতা) মিনি মেশিনে ১-আপে ২০০০ শিট না চালিয়ে হাসি মেশিনে ২-আপে মাত্র ১০০০ শিটে ছাপা সাশ্রয়ী ও দ্রুত
            if (totalQty <= 4000) return 'hasi';
            return 'demi';
        }
        if (allowMini && totalQty <= 1000) return 'mini_half';
        if (totalQty <= 4000) return 'hasi';
        return 'demi';
    }

    // 7. 3 × 5.75 ইঞ্চি (ছোট প্যাড / স্লিপ)
    if (l >= 2.8 && l <= 3.2 && w >= 5.5 && w <= 6.0) {
        if (allowMini && totalQty <= 9000) return 'mini_half';
        if (totalQty <= 20000) return 'hasi';
        return 'demi';
    }

    // 8. 2 × 3.25 / 2 × 3.5 ইঞ্চি (ভিজিটিং কার্ড / Visiting Card)
    if (l >= 1.8 && l <= 2.3 && w >= 3.0 && w <= 3.75) {
        if (!allowMini) {
            // 4-কালার কার্ড
            if (totalQty <= 8000) return 'gto'; // GTO-তে 40 আপ
            if (totalQty <= 20000) return 'demi'; // ডিমাইতে 56 আপ
            return 'double_demi';
        } else {
            if (totalQty <= 3000) return 'mini_half';
            if (totalQty <= 10000) return 'hasi';
            return 'gto';
        }
    }

    // 9. 11.5 × 18 ইঞ্চি (পোস্টার / ক্যালেন্ডার পাতা / হ্যান্ডবিল)
    if (l >= 10.8 && l <= 12.2 && w >= 17.0 && w <= 18.8) {
        if (totalQty <= 2000) return 'hasi'; // 1 আপ (হাসি মেশিনের প্লেট খরচ সাশ্রয়ী)
        if (totalQty <= 8000) return 'demi'; // 2 আপ
        return 'double_demi'; // 4 আপ
    }

    // 10. 18 × 23 ইঞ্চি (বড় পোস্টার / ওয়াল ক্যালেন্ডার / ডাবল ডিমাই 1/2)
    if (l >= 16.8 && l <= 18.8 && w >= 22.0 && w <= 24.0) {
        if (totalQty <= 4000) return 'demi'; // 1 আপ
        return 'double_demi'; // 2 আপ
    }

    // 11. 23 × 36 ইঞ্চি (জ্যাম্বো পোস্টার / ফুল শিট)
    if (l >= 21.5 && w >= 33.0) {
        return 'double_demi';
    }

    // 12. ছোট স্টিকার (2×3", 3×4", 4×4" ইত্যাদি)
    if (l <= 4.2 && w <= 5.2) {
        if (allowMini && totalQty <= 4000) return 'mini_half';
        if (totalQty <= 10000) return 'hasi';
        if (totalQty <= 25000) return 'demi';
        return 'double_demi';
    }

    // জেনেরিক ক্যালকুলেশন: সর্বনিম্ন মোট খরচের মেশিন
    const evaluated = evaluateMachinesFor(prefix);
    if (evaluated.length > 0) {
        return evaluated[0].machine.id;
    }
    return 'demi';
}

let isAutoDetectingMachine = false;

function autoDetectOptimalMachine(prefix, force = false) {
    if (isAutoDetectingMachine) return;
    isAutoDetectingMachine = true;
    try {
        const optMachineId = getOptimalMachineId(prefix);
        if (!optMachineId) return;

        const config = getModuleMachineConfig(prefix);
        if (config.pTypeSelect && (force || config.pTypeSelect.value !== optMachineId)) {
            selectMachineFor(prefix, optMachineId);
        }
    } finally {
        isAutoDetectingMachine = false;
    }
}

// 🎯 বিভিন্ন কোয়ান্টিটির জন্য বাস্তবসম্মত ম্যাথমেটিকাল মেশিন পরিবর্তন ও থ্রেশহোল্ড অ্যানালাইসিস
function getMachineCrossoverAnalysis(prefix) {
    const config = getModuleMachineConfig(prefix);
    const { cutL, cutW, colors, multiplier, totalQty } = config;

    // ভ্যালিড মেশিনগুলো ফিল্টার করা
    const validMachines = ALL_PRINT_MACHINES.filter(m => {
        if (colors >= 4 && m.id === 'mini_half') return false;
        return getMachineUpsForSize(m, cutL, cutW) > 0;
    });

    if (validMachines.length <= 1) return null;

    const costAtQty = (machine, q) => {
        const ups = getMachineUpsForSize(machine, cutL, cutW);
        if (ups <= 0) return Infinity;
        const sheets = Math.ceil(q / ups);
        const dyn = calculateDynamicPrintCost(machine.id, colors, sheets, multiplier);
        const pl = getPlateRateForMachine(machine.id) * colors * multiplier;
        return pl + dyn.totalPrintCost;
    };

    // টেস্ট কোয়ান্টিটি পয়েন্ট
    const testPoints = [
        500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 8000, 10000, 12000, 15000, 20000, 25000, 30000, 40000, 50000
    ];

    const results = testPoints.map(q => {
        let bestM = validMachines[0];
        let minC = Infinity;
        validMachines.forEach(m => {
            const cost = costAtQty(m, q);
            if (cost < minC) {
                minC = cost;
                bestM = m;
            }
        });
        return { q, bestM, cost: minC };
    });

    // রেঞ্জ ক্লাস্টার তৈরি করা
    const tiers = [];
    let cur = null;
    results.forEach(r => {
        if (!cur || cur.machine.id !== r.bestM.id) {
            if (cur) tiers.push(cur);
            cur = {
                machine: r.bestM,
                minQty: r.q,
                maxQty: r.q,
                ups: getMachineUpsForSize(r.bestM, cutL, cutW)
            };
        } else {
            cur.maxQty = r.q;
        }
    });
    if (cur) tiers.push(cur);

    return {
        validMachines,
        tiers,
        currentQty: totalQty
    };
}

function checkMachineCapacityWarningFor(prefix) {
    const config = getModuleMachineConfig(prefix);
    const { cutL, cutW, currentMachine, machineId, colors, multiplier, totalQty, warningBox, plateCostInput, printCostInput } = config;

    // ❌❌❌ একাধিক কালার (২/৩/৪ কালার) কাজের জন্য মিনি মেশিন নির্বাচন করলে সতর্কবার্তা
    if (machineId === 'mini_half' && colors >= 2) {
        if (warningBox) {
            warningBox.innerHTML = `
                <div style="display:flex; align-items:flex-start; gap:12px; padding:14px; background:#fef2f2; border:2px solid #ef4444; border-radius:8px; box-shadow:0 3px 10px rgba(239,68,68,0.18);">
                    <div style="font-size:32px; line-height:1; color:#dc2626;">❌</div>
                    <div style="flex:1;">
                        <div style="font-weight:bold; font-size:15.5px; margin-bottom:5px; color:#991b1b; display:flex; align-items:center; gap:6px;">
                            <span>⛔ সতর্কবার্তা:</span> <span>মিনি মেশিনে ${colors}-কালার ছাপা সম্ভব নয়! (শুধুমাত্র ১-কালার সম্ভব)</span>
                        </div>
                        <div style="font-size:13.5px; line-height:1.65; color:#7f1d1d;">
                            মিনি হাফ (Mini Half) মেশিনে একাধিক কালার প্রিন্ট করা যায় না।<br>
                            ${colors}-কালার প্রিন্ট করার জন্য ন্যূনতম <strong>'হাসি (Hasi - 16×20")'</strong> অথবা <strong>'ডিমাই (Demi)'</strong> মেশিন নির্বাচন করা আবশ্যক।
                        </div>
                        <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
                            <button type="button" onclick="selectMachineFor('${prefix}', 'hasi')" style="background:#dc2626; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 5px rgba(220,38,38,0.3);">
                                👉 এখনই 'হাসি (Hasi)' মেশিনে পরিবর্তন করুন
                            </button>
                            <button type="button" onclick="selectMachineFor('${prefix}', 'demi')" style="background:#1d4ed8; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 5px rgba(29,78,216,0.3);">
                                👉 'ডিমাই (Demi)' মেশিনে পরিবর্তন করুন
                            </button>
                        </div>
                    </div>
                </div>
            `;
            warningBox.style.display = 'block';
        }

        if (plateCostInput) plateCostInput.value = 0;
        if (printCostInput) printCostInput.value = 0;

        renderMachineRecommendationFor(prefix, 0, false);
        return;
    }

    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
        if (colors >= 2 && m.id === 'mini_half') return false;
        return getMachineUpsForSize(m, cutL, cutW) > 0;
    });

    if (currentUps === 0) {
        if (warningBox) {
            let compNames = compatibleMachines.map(m => m.shortName).join(', ');
            let minCompMachine = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

            warningBox.innerHTML = `
                <div style="display:flex; align-items:flex-start; gap:10px; padding:12px; background:#fef2f2; border:1.5px solid #f87171; border-radius:8px;">
                    <span style="font-size:24px; line-height:1;">🚫</span>
                    <div style="flex:1;">
                        <div style="font-weight:bold; font-size:14.5px; margin-bottom:4px; color:#b91c1c;">
                            অনুপযোগী মেশিন সতর্কবার্তা:
                        </div>
                        <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                            এই পেপার সাইজটি (<strong>${cutL}" × ${cutW}"</strong>) নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনে প্রিন্ট করা <strong>সম্ভব নয়</strong>! (মেশিনের মাপের চেয়ে পেপারের সাইজ বড়)।
                        </div>
                        ${minCompMachine ? `
                            <div style="margin-top:6px; font-size:13.5px; color:#991b1b; font-weight:600;">
                                👉 আপনাকে ন্যূনতম <strong>${minCompMachine.name}</strong> অথবা তার উপরের মেশিন (${compNames}) সিলেক্ট করতে হবে।
                            </div>
                            <button type="button" onclick="selectMachineFor('${prefix}', '${minCompMachine.id}')" style="margin-top:8px; background:#dc2626; color:#fff; border:none; padding:6px 14px; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.15);">
                                🔄 ${minCompMachine.shortName} মেশিনে পরিবর্তন করুন
                            </button>
                        ` : `
                            <div style="margin-top:6px; font-size:13px; color:#991b1b;">
                                ⚠️ এই সাইজটি কোনো স্ট্যান্ডার্ড অফসেট মেশিনে ফিট হচ্ছে না। কাজের সাইজ চেক করুন।
                            </div>
                        `}
                    </div>
                </div>
            `;
            warningBox.style.display = 'block';
        }

        const ratePerPlate = getPlateRateForMachine(machineId);
        const totalPlateCost = ratePerPlate * colors * multiplier;
        if (plateCostInput) plateCostInput.value = totalPlateCost;
        if (printCostInput) printCostInput.value = 0;

        renderMachineRecommendationFor(prefix, 0, false);
        return;
    } else {
        if (warningBox) {
            warningBox.style.display = 'none';
        }
    }

    // প্লেট খরচ
    const ratePerPlate = getPlateRateForMachine(machineId);
    const totalPlateCost = ratePerPlate * colors * multiplier;
    if (plateCostInput) plateCostInput.value = totalPlateCost;

    // ডাইনামিক ছাপা খরচ (ইমপ্রেশন ও হাজার শিট অনুযায়ী অটো ক্যালকুলেশন)
    const printSheets = Math.ceil(totalQty / currentUps);
    const dynamicResult = calculateDynamicPrintCost(machineId, colors, printSheets, multiplier);
    const dynamicPrintCost = dynamicResult.totalPrintCost;

    if (printCostInput) printCostInput.value = dynamicPrintCost;

    renderMachineRecommendationFor(prefix, totalPlateCost + dynamicPrintCost, true);

    // যদি ফলাফল বক্স আগে থেকেই ওপেন থাকে, তবে লাইভ রিক্যালকুলেট করো
    if (resultBox && resultBox.style.display === 'block') {
        if (prefix === 'memo' && typeof calculateCosting === 'function') calculateCosting();
        else if (prefix === 'sp' && typeof calculateSinglePaperCosting === 'function') calculateSinglePaperCosting();
        else if (prefix === 'pos' && typeof calculatePosterCosting === 'function') calculatePosterCosting();
        else if (prefix === 'stk' && typeof calculateStickerCosting === 'function') calculateStickerCosting();
        else if (prefix === 'vc' && typeof calculateVisitingCardCosting === 'function') calculateVisitingCardCosting();
        else if (prefix === 'cal' && typeof calculateCalendarCosting === 'function') calculateCalendarCosting();
        else if (prefix === 'pad' && typeof calculatePadSlipCosting === 'function') calculatePadSlipCosting();
        else if (prefix === 'auto' && typeof calculateAutoCarbonCosting === 'function') calculateAutoCarbonCosting();
        else if (prefix === 'oth' && typeof calculateOtherPrintingCosting === 'function') calculateOtherPrintingCosting();
    }
}

// 📌 প্রতিটি মডিউলে বিস্তারিত মেশিন ও সাশ্রয়ী ছাপা নোট রেন্ডার করার ফাংশন
function renderDetailedMachineNote(prefix, options = {}) {
    const config = getModuleMachineConfig(prefix);
    const noteEl = document.getElementById(prefix === 'memo' ? 'resMachineNoteBox' : `${prefix}_resMachineNoteBox`);
    if (!noteEl) return;

    const { cutL, cutW, totalQty, colors, multiplier, currentMachine, machineId } = config;
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);
    if (currentUps <= 0) {
        noteEl.style.display = 'none';
        return;
    }

    const printSheets = Math.ceil(totalQty / currentUps);
    const dynamicResult = calculateDynamicPrintCost(machineId, colors, printSheets, multiplier);
    const thousandsOfSheets = dynamicResult.thousandsOfSheets;
    const printCost = dynamicResult.totalPrintCost;
    const plateCost = getPlateRateForMachine(machineId) * colors * multiplier;
    const totalPlateAndPrint = plateCost + printCost;

    // সেরা মেশিন ও থ্রেশহোল্ড অ্যানালাইসিস
    const evaluated = evaluateMachinesFor(prefix);
    const best = evaluated.length > 0 ? evaluated[0] : null;
    const isBest = best && best.machine.id === currentMachine.id;
    const itemLabel = options.itemLabel || 'পিস';
    const crossover = getMachineCrossoverAnalysis(prefix);

    let adviceHtml = '';
    if (isBest) {
        adviceHtml = `
            <div style="margin-top:8px; padding:8px 12px; background:#dcfce7; border-radius:6px; color:#15803d; font-size:13px; border:1px solid #bbf7d0;">
                🏆 <strong>সাশ্রয়ী নিশ্চিতকরণ:</strong> আপনি বর্তমানে সবচেয়ে সাশ্রয়ী মেশিন (<strong>${currentMachine.name}</strong>) ব্যবহার করছেন। এতে প্রতি 1,000 শিট প্রেসে প্রিন্ট দিলে (${currentUps} × 1,000) = <strong>${(currentUps * 1000).toLocaleString('en-US')} ${itemLabel}</strong> তৈরি হয়।
            </div>
        `;
    } else if (best) {
        const diff = totalPlateAndPrint - best.totalCost;
        adviceHtml = `
            <div style="margin-top:8px; padding:8px 12px; background:#fef3c7; border-radius:6px; color:#92400e; font-size:13px; border:1px solid #fde68a;">
                💡 <strong>খরচ কমানোর বিশেষ টিপস:</strong> কাজটি <strong>${best.machine.name}</strong> মেশিনে <strong>${best.ups} সেটআপে</strong> ছাপালে প্লেট ও ছাপা মিলে মোট খরচ হবে মাত্র <strong>৳${best.totalCost.toFixed(0)}</strong> ${diff > 0 ? `(আপনার সাশ্রয় হবে ৳${diff.toFixed(0)})` : ''}।
                <div style="margin-top:4px;">
                    <a href="javascript:void(0)" onclick="selectMachineFor('${prefix}', '${best.machine.id}');" style="color:#b45309; font-weight:bold; text-decoration:underline;">👉 ${best.machine.shortName} মেশিনে পরিবর্তন করতে এখানে ক্লিক করুন</a>
                </div>
            </div>
        `;
    }

    let thresholdHtml = '';
    if (crossover && crossover.tiers && crossover.tiers.length > 0) {
        const tierRows = crossover.tiers.map((t, idx) => {
            const isCurrentRange = (totalQty >= t.minQty && (idx === crossover.tiers.length - 1 || totalQty <= t.maxQty));
            let rangeLabel = '';
            if (idx === crossover.tiers.length - 1 && crossover.tiers.length > 1) {
                rangeLabel = `<strong>${t.minQty.toLocaleString('en-US')} পিসের বেশি (বড় অর্ডার)</strong>`;
            } else if (t.minQty === t.maxQty) {
                rangeLabel = `<strong>${t.minQty.toLocaleString('en-US')} পিস</strong>`;
            } else {
                rangeLabel = `<strong>${t.minQty.toLocaleString('en-US')} থেকে ${t.maxQty.toLocaleString('en-US')} পিস</strong>`;
            }

            let reason = '';
            if (t.machine.id === 'mini_half') {
                reason = `মিনি মেশিনে ${t.ups} আপে 1,500 শিট পর্যন্ত মাত্র 100৳ ছাপা খরচে প্লেট+ছাপা খরচ সর্বনিম্ন।`;
            } else if (t.machine.id === 'hasi') {
                reason = `হাসিতে ${t.ups} সেটআপে 1,500 শিট পর্যন্ত মাত্র 200৳ বেস রেটে দ্রুত ও সাশ্রয়ী।`;
            } else if (t.machine.id === 'demi') {
                reason = `ডিমাই মেশিনে ${t.ups} আপে শিট সংখ্যা কমিয়ে আনলে প্রতি পিস খরচ কমে যায়।`;
            } else if (t.machine.id === 'double_demi') {
                reason = `ডাবল ডিমাই মেশিনে ${t.ups} আপে বিশাল কোয়ান্টিটিতে সর্বনিম্ন প্রতি পিস খরচ নিশ্চিত হয়।`;
            } else {
                reason = `${t.machine.shortName} মেশিনে ${t.ups} আপে সর্বোচ্চ সাশ্রয়ী।`;
            }

            return `
                <div style="margin-top:5px; padding:6px 10px; border-radius:5px; ${isCurrentRange ? 'background:#e0f2fe; border:1px solid #bae6fd; font-weight:600; color:#0369a1;' : 'background:#f8fafc; color:#334155;'}">
                    • ${rangeLabel}: <strong>${t.machine.name}</strong> (${t.ups} আপ) — ${reason} ${isCurrentRange ? '👈 <span style="color:#0284c7; font-weight:bold;">(আপনার বর্তমান অর্ডার রেঞ্জ)</span>' : ''}
                </div>
            `;
        }).join('');

        thresholdHtml = `
            <div style="margin-top:10px; padding:10px 12px; background:#fff; border-radius:6px; border:1px solid #e2e8f0; font-size:12.5px; color:#334155; line-height:1.6;">
                <div style="font-weight:bold; color:#0f172a; margin-bottom:6px; display:flex; align-items:center; gap:5px;">
                    <span>🎯</span> <span>কোয়ান্টিটি অনুযায়ী সঠিক মেশিন সিলেকশন গাইড (কস্ট অ্যানালাইসিস):</span>
                </div>
                ${tierRows}
            </div>
        `;
    }

    let printBreakdownText = '';
    const totalImpressionsNum = printSheets * colors * multiplier;
    const totalImpressions = totalImpressionsNum.toLocaleString('en-US');

    if (printSheets <= 1500) {
        printBreakdownText = `${printSheets.toLocaleString('en-US')} শিট (1 থেকে 1,500 শিট পর্যন্ত 1,000 শিটের একই বেস রেট, ${colors} কালার) = <strong>৳${printCost.toFixed(2)}</strong>`;
    } else {
        const first1kCost = colors * dynamicResult.base1kPerColor * multiplier;
        const extraRuns = dynamicResult.extraThousands;
        printBreakdownText = `1ম 1,500 শিট পর্যন্ত বেস ৳${first1kCost.toFixed(0)} + অতিরিক্ত ${extraRuns.toLocaleString('en-US')} হাজার শিট (৳${dynamicResult.incPer1kImpression}/হাজার শিট × ${colors} কালার) = <strong>৳${printCost.toFixed(2)}</strong>`;
    }

    const pressRuleNote = `
        <div style="margin-top:8px; padding:7px 10px; background:#eff6ff; border-radius:5px; border:1px solid #bfdbfe; font-size:12.5px; color:#1e40af; line-height:1.5;">
            📜 <strong>প্রেসে ছাপা খরচের সাধারণ নিয়ম:</strong> যেকোনো অফসেট মেশিনে 1 থেকে 1,500 শিট পর্যন্ত অতিরিক্ত চার্জ ছাড়াই 1 হাজার শিটের একই বেস খরচে (যেমন মিনি 100৳, হাসি 200৳, ডিমাই 300৳) ছাপা যায়। 1,500 শিটের বেশি হলে পরবর্তী প্রতি 1,000 শিটে অতিরিক্ত ইনক্রিমেন্টাল ইমপ্রেশন চার্জ হিসাব হয়।
        </div>
    `;

    const designQualityTip = `
        <div style="margin-top:6px; padding:7px 10px; background:#fdf4ff; border-radius:5px; border:1px solid #f0abfc; font-size:12px; color:#86198f; line-height:1.5;">
            🎨 <strong>ডিজাইন ও কোয়ালিটি পরামর্শ:</strong> শুধু লেখা বা সলিড এক কালার ডিজাইনের ক্ষেত্রে যেকোনো মেশিনে যত ইচ্ছা ছাপা যায় (শুধু ইমপ্রেশন হিসাব হবে)। তবে ডিজাইন জটিল, হাফটোন বা মাল্টিকালার ছবিযুক্ত হলে ভালো ফিনিশিং পেতে হাসি বা ডিমাই মেশিনে ছাপানো প্রয়োজন (মিনি মেশিনে জটিল ছাপা মসৃণ হয় না)।
        </div>
    `;

    let specialCutNote = '';
    if (prefix === 'auto' && ((Math.abs(cutL - 7.5) < 0.25 && Math.abs(cutW - 10) < 0.25) || (Math.abs(cutL - 10) < 0.25 && Math.abs(cutW - 7.5) < 0.25))) {
        specialCutNote = `
            <div style="margin-top:8px; padding:8px 12px; background:#f0fdf4; border-radius:6px; border:1px solid #86efac; font-size:12.5px; color:#14532d; line-height:1.6;">
                ✂️ <strong>৭.৫×১০" অটো কার্বন বিশেষ প্রেস হিসাব:</strong><br>
                • ২৩×৩৬" পেপারের ৩৬" এর দিকে ৩টি ১০" এবং ২৩" এর দিকে ৩টি ৭.৫" কেটে মোট <strong>৩×৩=৯ টুকরা (৯ পাতা)</strong> বের করা হয়।<br>
                • <strong>হাসি মেশিনে ২-আপে (১০×১৫" শিটে) মাত্র ১,০০০ শিট</strong> ছাপালে সম্পূর্ণ ২০ বই (২,০০০ পাতা) মেমোর কাজ সহজে ও সর্বনিম্ন খরচে (প্লেট ৳১৩০ + ছাপা ৳২০০ = ৳৩৩০) সম্পন্ন হয়।
            </div>
        `;
    }

    noteEl.innerHTML = `
        <div style="font-weight:bold; font-size:14px; margin-bottom:6px; color:#1e3a8a; display:flex; align-items:center; gap:6px;">
            <span>📌</span> <span>মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট:</span>
        </div>
        <div style="line-height:1.7;">
            • নির্বাচিত মেশিন: <strong>${currentMachine.name}</strong><br>
            • কাজের সাইজ: <strong>${cutL}" × ${cutW}"</strong> | মেশিনে সেটআপ: <strong>${currentUps} আপ (${currentUps} সেটআপ)</strong><br>
            • মোট <strong>${totalQty.toLocaleString('en-US')}</strong> ${itemLabel} কাজের জন্য প্রেসে ছাপা শিট লাগবে: <strong>${printSheets.toLocaleString('en-US')} শিট</strong> (মোট <strong>${totalImpressions} ইমপ্রেশন</strong>)<br>
            • ছাপা খরচ: <strong>${printBreakdownText}</strong> (${colors} কালার ছাপা) | প্লেট খরচ: <strong>৳${plateCost}</strong> (${colors} টি প্লেট)<br>
            ${specialCutNote}
            ${pressRuleNote}
            ${designQualityTip}
            ${adviceHtml}
            ${thresholdHtml}
        </div>
    `;
    noteEl.style.display = 'block';
}

function renderMachineRecommendationFor(prefix, currentTotalCost, isCurrentValid = true) {
    const config = getModuleMachineConfig(prefix);
    const { summaryEl, tableEl, applyBtn, machineId: currentPType } = config;
    if (!summaryEl || !tableEl) return;

    const evaluated = evaluateMachinesFor(prefix);
    if (evaluated.length === 0) {
        summaryEl.innerHTML = `<span style="color:#b91c1c;">⚠️ সাইজটি কোনো স্ট্যান্ডার্ড প্লেট/মেশিন সাইজে ফিট হচ্ছে না। সাইজ চেক করুন।</span>`;
        if (applyBtn) applyBtn.style.display = 'none';
        return;
    }

    const optimalId = getOptimalMachineId(prefix);
    const best = evaluated.find(e => e.machine.id === optimalId) || evaluated[0];
    bestRecommendedMachineIds[prefix] = best.machine.id;

    if (best.machine.id === currentPType && isCurrentValid) {
        summaryEl.innerHTML = `
            <div style="display:flex; align-items:flex-start; gap:8px;">
                <span style="font-size:18px;">🏆</span>
                <div style="flex:1;">
                    <span style="color:#15803d; font-weight:bold; font-size:14px;">চমৎকার সিলেকশন! আপনি বর্তমানে সবচেয়ে সাশ্রয়ী সেটআপেই আছেন:</span><br>
                    <strong>${best.machine.name}</strong> মেশিনে <strong>${best.ups} আপে</strong> মোট ছাপার শিট: <strong>${best.printSheets.toLocaleString('en-US')}</strong> টি।<br>
                    💵 প্লেট ও ছাপা সর্বমোট খরচ মাত্র <strong>৳${best.totalCost.toFixed(0)}</strong> (প্লেট: ৳${best.plateCost} + ছাপা: ৳${best.printCost.toFixed(0)})।
                </div>
            </div>
        `;
        if (applyBtn) applyBtn.style.display = 'none';
    } else {
        const savings = isCurrentValid ? Math.max(0, currentTotalCost - best.totalCost) : 0;
        summaryEl.innerHTML = `
            <div>
                🌟 <strong>সাশ্রয়ী পরামর্শ:</strong> <strong>${best.machine.name}</strong> মেশিনে (<strong>${best.ups} আপে</strong>) কাজটি ছাপালে সবচেয়ে কম খরচে কাজ হবে।<br>
                💵 সাশ্রয়ী প্লেট ও ছাপা মোট খরচ: <strong>৳${best.totalCost.toFixed(0)}</strong> (প্লেট ৳${best.plateCost} + ছাপা ৳${best.printCost.toFixed(0)})<br>
                ${savings > 0 ? `<span style="color:#15803d; font-weight:bold; background:#dcfce7; padding:3px 8px; border-radius:4px; display:inline-block; margin-top:5px; border:1px solid #bbf7d0;">✨ বর্তমান সিলেকশনের তুলনায় সাশ্রয় হবে: ৳${savings.toFixed(0)}</span>` : ''}
            </div>
        `;
        if (applyBtn) {
            applyBtn.style.display = 'inline-block';
            applyBtn.textContent = `👉 সেরা মেশিন: ${best.machine.shortName}-এ সেট করুন`;
        }
    }

    // টেবিল তৈরি
    let tableHtml = `
        <table style="width:100%; border-collapse:collapse; font-size:12.5px; background:#fff; border-radius:6px; overflow:hidden; border:1px solid #cbd5e1; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <thead>
                <tr style="background:#f1f5f9; color:#334155; text-align:left; border-bottom:1px solid #cbd5e1;">
                    <th style="padding:7px 10px;">মেশিন / প্লেট সাইজ</th>
                    <th style="padding:7px 10px; text-align:center;">আপ (Up)</th>
                    <th style="padding:7px 10px; text-align:center;">ছাপার শিট</th>
                    <th style="padding:7px 10px; text-align:right;">প্লেট খরচ</th>
                    <th style="padding:7px 10px; text-align:right;">ছাপা খরচ</th>
                    <th style="padding:7px 10px; text-align:right;">মোট খরচ</th>
                    <th style="padding:7px 10px; text-align:center;">অ্যাকশন</th>
                </tr>
            </thead>
            <tbody>
    `;

    evaluated.forEach((item) => {
        const isBestItem = item.machine.id === best.machine.id;
        const isSelected = item.machine.id === currentPType && isCurrentValid;
        let rowBg = '#fff';
        if (isBestItem) rowBg = '#f0fdf4';
        else if (isSelected) rowBg = '#eff6ff';

        tableHtml += `
            <tr style="background:${rowBg}; border-bottom:1px solid #e2e8f0;">
                <td style="padding:7px 10px; font-weight:${isBestItem || isSelected ? 'bold' : 'normal'}; color:#1e293b;">
                    ${item.machine.name} ${isBestItem ? '<span style="color:#16a34a; font-size:11px; font-weight:bold; background:#dcfce7; padding:1px 5px; border-radius:3px; margin-left:4px;">সেরা</span>' : ''} ${isSelected ? '<span style="color:#2563eb; font-size:11px; font-weight:bold; background:#dbeafe; padding:1px 5px; border-radius:3px; margin-left:4px;">বর্তমান</span>' : ''}
                </td>
                <td style="padding:7px 10px; text-align:center; font-weight:600;">${item.ups} Up</td>
                <td style="padding:7px 10px; text-align:center;">${item.printSheets.toLocaleString('en-US')}</td>
                <td style="padding:7px 10px; text-align:right;">৳${item.plateCost}</td>
                <td style="padding:7px 10px; text-align:right;">৳${item.printCost.toFixed(0)}</td>
                <td style="padding:7px 10px; text-align:right; font-weight:bold; color:${isBestItem ? '#16a34a' : '#0f172a'};">৳${item.totalCost.toFixed(0)}</td>
                <td style="padding:7px 10px; text-align:center;">
                    ${isSelected 
                        ? '<span style="color:#2563eb; font-weight:bold; font-size:11.5px;">সক্রিয়</span>' 
                        : `<button type="button" onclick="selectMachineFor('${prefix}', '${item.machine.id}')" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 8px; border-radius:4px; font-size:11.5px; font-weight:600; cursor:pointer;">সিলেক্ট করুন</button>`}
                </td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table>`;
    tableEl.innerHTML = tableHtml;
}

function applyBestMachineSetupFor(prefix) {
    const bestId = bestRecommendedMachineIds[prefix] || 'demi';
    selectMachineFor(prefix, bestId);
}

function selectMachineFor(prefix, machineId) {
    const pTypeSelect = (prefix === 'memo') ? document.getElementById('plateType') : document.getElementById(`${prefix}_plateType`);
    if (pTypeSelect) {
        pTypeSelect.value = machineId;
        updateColorOptionsForMachine(prefix);
    }
    const config = getModuleMachineConfig(prefix);
    if (config.pTypeSelect) {
        if (prefix === 'memo') {
            syncAllColorPrintDropdowns(machineId);
            const colors = parseInt(document.getElementById('colorCount')?.value) || 1;
            const singlePlateRate = getPlateRateForMachine(machineId);
            if (config.plateCostInput) {
                config.plateCostInput.value = singlePlateRate * colors;
            }
        } else {
            const singlePlateRate = getPlateRateForMachine(machineId);
            if (config.plateCostInput) {
                config.plateCostInput.value = singlePlateRate * config.colors * config.multiplier;
            }
        }
        checkMachineCapacityWarningFor(prefix);
    }
}

function toggleMachineCompareTableFor(prefix) {
    const config = getModuleMachineConfig(prefix);
    if (config.tableEl) {
        config.tableEl.style.display = (config.tableEl.style.display === 'none' || config.tableEl.style.display === '') ? 'block' : 'none';
    }
}

// Module Plate and Machine helpers
function updateSinglePaperPlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('sp');
    }
    checkMachineCapacityWarningFor('sp');
}
function selectSpMachine(id) { selectMachineFor('sp', id); }
function applyBestMachineSetup() { applyBestMachineSetupFor('sp'); }
function toggleMachineCompareTable() { toggleMachineCompareTableFor('sp'); }

function updatePosterPlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('pos');
    }
    checkMachineCapacityWarningFor('pos');
}

function updateStickerPlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('stk');
    }
    checkMachineCapacityWarningFor('stk');
}

function updateVisitingCardPlateAndPrint(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('vc');
    }
    checkMachineCapacityWarningFor('vc');
}

function updateCalendarPlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('cal');
    }
    checkMachineCapacityWarningFor('cal');
}

function updateOtherPrintingPlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('oth');
    }
    checkMachineCapacityWarningFor('oth');
}

// ==========================================
// 2. সিঙ্গেল পেপার ছাপার হিসাব (Single Paper Costing)
// ==========================================
function updateSinglePaperOptions() {
    const cat = document.getElementById('sp_paperCategory').value;
    const select = document.getElementById('sp_paperGsmRate');
    if (!select) return;
    select.innerHTML = "";

    const db = getPaperDatabase();
    if (db[cat] && db[cat].items) {
        db[cat].items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.sheet;
            opt.textContent = `${item.gsm} (৳${item.ream}/রিম - ৳${item.sheet.toFixed(2)}/পাতা)`;
            select.appendChild(opt);
        });
    }
}

function applySinglePaperPresetSize() {
    const preset = document.getElementById('sp_presetSize').value;
    const l = document.getElementById('sp_cutLength');
    const w = document.getElementById('sp_cutWidth');
    if (preset === 'custom') return;
    const parts = preset.split('x');
    if (parts.length === 2) {
        l.value = parts[0];
        w.value = parts[1];
    }
    checkMachineCapacityWarningFor('sp');
}

function autoSelectSinglePaperPresetSize() {
    const l = parseFloat(document.getElementById('sp_cutLength').value) || 0;
    const w = parseFloat(document.getElementById('sp_cutWidth').value) || 0;
    const preset = document.getElementById('sp_presetSize');
    const val = `${l}x${w}`;
    let match = false;
    for (let opt of preset.options) {
        if (opt.value === val) {
            preset.value = val;
            match = true;
            break;
        }
    }
    if (!match) preset.value = 'custom';
    checkMachineCapacityWarningFor('sp');
}

function calculateSinglePaperCosting() {
    const cat = document.getElementById('sp_paperCategory').value;
    const paperPricePerSheet = parseFloat(document.getElementById('sp_paperGsmRate').value) || 0;
    const cutL = parseFloat(document.getElementById('sp_cutLength').value) || 1;
    const cutW = parseFloat(document.getElementById('sp_cutWidth').value) || 1;
    const totalQty = parseInt(document.getElementById('sp_totalQty').value) || 0;
    const pType = document.getElementById('sp_plateType').value;

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[4];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('sp_resultBox');
    const errBox = document.getElementById('sp_resultError');
    const contentBox = document.getElementById('sp_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে কাজ প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার পেপারের সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('sp', '${minComp.id}'); calculateSinglePaperCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    let fullL = 23, fullW = 36;
    if (cat.includes('2030')) { fullL = 20; fullW = 30; }

    const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
    const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
    const outPerSheet = Math.max(out1, out2, 1);

    const totalSheets = Math.ceil(totalQty / outPerSheet);
    const totalReams = (totalSheets / 500).toFixed(2);
    const paperCost = totalSheets * paperPricePerSheet;

    const plateCost = parseFloat(document.getElementById('sp_plateCost').value) || 0;
    const printCost = parseFloat(document.getElementById('sp_printCost').value) || 0;
    const otherCost = parseFloat(document.getElementById('sp_otherCost').value) || 0;

    const grandTotal = paperCost + plateCost + printCost + otherCost;
    const perUnitCost = totalQty > 0 ? (grandTotal / totalQty) : 0;

    document.getElementById('sp_resOutPerSheet').textContent = `${outPerSheet} পিস`;
    document.getElementById('sp_resTotalSheets').textContent = `${totalSheets} শিট (${totalReams} রিম)`;
    document.getElementById('sp_resPaperCost').textContent = `৳ ${paperCost.toFixed(2)}`;
    document.getElementById('sp_resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('sp_resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('sp_resOtherCost').textContent = `৳ ${otherCost.toFixed(2)}`;
    document.getElementById('sp_resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;
    document.getElementById('sp_resPerUnitCost').textContent = `৳ ${perUnitCost.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('sp', { itemLabel: 'পিস পেপার' });

    if (resBox) {
        resBox.style.display = 'block';
    }
}

// ==========================================
// 3. পোস্টার / হ্যান্ডবিল ছাপার হিসাব (Poster Costing)
// ==========================================
function updatePosterPaperOptions() {
    const cat = document.getElementById('pos_paperCategory').value;
    const select = document.getElementById('pos_paperGsmRate');
    if (!select) return;
    select.innerHTML = "";

    const db = getPaperDatabase();
    if (db[cat] && db[cat].items) {
        db[cat].items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.sheet;
            opt.textContent = `${item.gsm} (৳${item.ream}/রিম - ৳${item.sheet.toFixed(2)}/পাতা)`;
            select.appendChild(opt);
        });
    }
}

function applyPosterPresetSize() {
    const preset = document.getElementById('pos_presetSize').value;
    const l = document.getElementById('pos_cutLength');
    const w = document.getElementById('pos_cutWidth');
    if (preset === 'custom') return;
    const parts = preset.split('x');
    if (parts.length === 2) {
        l.value = parts[0];
        w.value = parts[1];
    }
    updatePosterPlateDetails();
    checkMachineCapacityWarningFor('pos');
}

function autoSelectPosterPresetSize() {
    const l = parseFloat(document.getElementById('pos_cutLength').value) || 0;
    const w = parseFloat(document.getElementById('pos_cutWidth').value) || 0;
    const preset = document.getElementById('pos_presetSize');
    const val = `${l}x${w}`;
    let match = false;
    for (let opt of preset.options) {
        if (opt.value === val) {
            preset.value = val;
            match = true;
            break;
        }
    }
    if (!match) preset.value = 'custom';
    updatePosterPlateDetails();
    checkMachineCapacityWarningFor('pos');
}

function updatePosterLaminationCost() {
    const type = document.getElementById('pos_laminationType').value;
    const qty = parseInt(document.getElementById('pos_totalQty').value) || 1000;
    const l = parseFloat(document.getElementById('pos_cutLength').value) || 11.5;
    const w = parseFloat(document.getElementById('pos_cutWidth').value) || 18;
    const lamInput = document.getElementById('pos_laminationCost');

    if (type === 'none') {
        lamInput.value = 0;
    } else {
        const sqInches = l * w * qty;
        const ratePerSqInch = type === 'matt' ? 0.0018 : 0.0015;
        lamInput.value = Math.max(300, Math.round(sqInches * ratePerSqInch));
    }
}

function calculatePosterCosting() {
    const cat = document.getElementById('pos_paperCategory').value;
    const paperPricePerSheet = parseFloat(document.getElementById('pos_paperGsmRate').value) || 0;
    const cutL = parseFloat(document.getElementById('pos_cutLength').value) || 1;
    const cutW = parseFloat(document.getElementById('pos_cutWidth').value) || 1;
    const totalQty = parseInt(document.getElementById('pos_totalQty').value) || 0;
    const pType = document.getElementById('pos_plateType').value;

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[4];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('pos_resultBox');
    const errBox = document.getElementById('pos_resultError');
    const contentBox = document.getElementById('pos_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে পোস্টার প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার পোস্টারের সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('pos', '${minComp.id}'); calculatePosterCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    let fullL = 23, fullW = 36;
    if (cat.includes('2030')) { fullL = 20; fullW = 30; }

    const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
    const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
    const outPerSheet = Math.max(out1, out2, 1);

    const totalSheets = Math.ceil(totalQty / outPerSheet);
    const totalReams = (totalSheets / 500).toFixed(2);
    const paperCost = totalSheets * paperPricePerSheet;

    const plateCost = parseFloat(document.getElementById('pos_plateCost').value) || 0;
    const printCost = parseFloat(document.getElementById('pos_printCost').value) || 0;
    const laminationCost = parseFloat(document.getElementById('pos_laminationCost').value) || 0;
    const otherCost = parseFloat(document.getElementById('pos_otherCost').value) || 0;

    const grandTotal = paperCost + plateCost + printCost + laminationCost + otherCost;
    const perUnitCost = totalQty > 0 ? (grandTotal / totalQty) : 0;

    document.getElementById('pos_resOutPerSheet').textContent = `${outPerSheet} পিস`;
    document.getElementById('pos_resTotalSheets').textContent = `${totalSheets} শিট (${totalReams} রিম)`;
    document.getElementById('pos_resPaperCost').textContent = `৳ ${paperCost.toFixed(2)}`;
    document.getElementById('pos_resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('pos_resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('pos_resLaminationCost').textContent = `৳ ${laminationCost.toFixed(2)}`;
    document.getElementById('pos_resOtherCost').textContent = `৳ ${otherCost.toFixed(2)}`;
    document.getElementById('pos_resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;
    document.getElementById('pos_resPerUnitCost').textContent = `৳ ${perUnitCost.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('pos', { itemLabel: 'পিস পোস্টার' });

    document.getElementById('pos_resultBox').style.display = 'block';
}

// ==========================================
// 4. স্টিকার ছাপার হিসাব (Sticker Costing)
// ==========================================
function updateStickerPaperRate() {
    const brand = document.getElementById('stk_paperBrand').value;
    const rateMap = {
        bashundhara: masterRates.stk_bashundhara || 14,
        ogi: masterRates.stk_ogi || 16,
        turkey: masterRates.stk_turkey || 17,
        toptech: masterRates.stk_toptech || 20,
        indonesia: masterRates.stk_indonesia || 25
    };
    document.getElementById('stk_sheetPrice').value = rateMap[brand] || 16;
}

function applyStickerPresetSize() {
    const preset = document.getElementById('stk_presetSize').value;
    const l = document.getElementById('stk_cutLength');
    const w = document.getElementById('stk_cutWidth');
    if (preset === 'custom') return;
    const parts = preset.split('x');
    if (parts.length === 2) {
        l.value = parts[0];
        w.value = parts[1];
    }
    updateStickerPlateDetails();
    updateStickerLaminationPreset();
    checkMachineCapacityWarningFor('stk');
}

function autoSelectStickerPresetSize() {
    const l = parseFloat(document.getElementById('stk_cutLength').value) || 0;
    const w = parseFloat(document.getElementById('stk_cutWidth').value) || 0;
    const preset = document.getElementById('stk_presetSize');
    const val = `${l}x${w}`;
    let match = false;
    for (let opt of preset.options) {
        if (opt.value === val) {
            preset.value = val;
            match = true;
            break;
        }
    }
    if (!match) preset.value = 'custom';
    updateStickerPlateDetails();
    updateStickerLaminationPreset();
    checkMachineCapacityWarningFor('stk');
}

function updateStickerCuttingPreset() {
    const type = document.getElementById('stk_cuttingType')?.value;
    const qty = parseInt(document.getElementById('stk_totalQty')?.value) || 1000;
    const cutInput = document.getElementById('stk_cuttingCost');
    if (!cutInput) return;

    if (type === 'none') {
        cutInput.value = 0;
    } else if (type === 'straight_cut') {
        cutInput.value = 100;
    } else if (type === 'half_cut') {
        cutInput.value = Math.max(300, Math.round(qty * 0.12));
    } else if (type === 'full_die') {
        cutInput.value = Math.max(600, Math.round(qty * 0.25) + 300);
    }
}

function updateStickerLaminationPreset() {
    const type = document.getElementById('stk_laminationType')?.value;
    const l = parseFloat(document.getElementById('stk_cutLength')?.value) || 0;
    const w = parseFloat(document.getElementById('stk_cutWidth')?.value) || 0;
    const qty = parseInt(document.getElementById('stk_totalQty')?.value) || 0;
    const lamInput = document.getElementById('stk_laminationCost');
    if (!lamInput) return;

    if (!type || type === 'none') {
        lamInput.value = 0;
        return;
    }

    const totalSqInches = l * w * qty;
    let rate = 0;
    if (type === 'gloss') {
        rate = (masterRates && masterRates.stk_lam_gloss !== undefined) ? masterRates.stk_lam_gloss : 0.0044;
    } else if (type === 'matt') {
        rate = (masterRates && masterRates.stk_lam_matt !== undefined) ? masterRates.stk_lam_matt : 0.0055;
    }

    const totalCost = totalSqInches * rate;
    const roundedCost = Math.round(totalCost * 100) / 100;
    lamInput.value = roundedCost;
}

function calculateStickerCosting() {
    const sheetPrice = parseFloat(document.getElementById('stk_sheetPrice').value) || 16;
    const cutL = parseFloat(document.getElementById('stk_cutLength').value) || 1;
    const cutW = parseFloat(document.getElementById('stk_cutWidth').value) || 1;
    const totalQty = parseInt(document.getElementById('stk_totalQty').value) || 0;
    const pType = document.getElementById('stk_plateType').value;

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[4];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('stk_resultBox');
    const errBox = document.getElementById('stk_resultError');
    const contentBox = document.getElementById('stk_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে স্টিকার প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার স্টিকারের সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('stk', '${minComp.id}'); calculateStickerCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    // ফুল স্টিকার শিটের স্ট্যান্ডার্ড সাইজ 20 × 30"
    const fullL = 20, fullW = 30;
    const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
    const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
    const outPerSheet = Math.max(out1, out2, 1);

    const totalSheets = Math.ceil(totalQty / outPerSheet);
    const paperCost = totalSheets * sheetPrice;

    const plateCost = parseFloat(document.getElementById('stk_plateCost').value) || 0;
    const printCost = parseFloat(document.getElementById('stk_printCost').value) || 0;
    const cuttingCost = parseFloat(document.getElementById('stk_cuttingCost').value) || 0;
    const laminationCost = parseFloat(document.getElementById('stk_laminationCost').value) || 0;

    const grandTotal = paperCost + plateCost + printCost + cuttingCost + laminationCost;
    const perUnitCost = totalQty > 0 ? (grandTotal / totalQty) : 0;

    const printSheets = currentUps > 0 ? Math.ceil(totalQty / currentUps) : 0;

    document.getElementById('stk_resOutPerSheet').textContent = `${outPerSheet} পিস (প্রতি ফুল 20×30" শিট)`;
    document.getElementById('stk_resTotalSheets').textContent = `${totalSheets} শিট`;
    
    const machineSetupEl = document.getElementById('stk_resMachineSetup');
    if (machineSetupEl) {
        machineSetupEl.textContent = `${currentMachine.shortName} মেশিনে ${currentUps} আপ [প্রিন্ট সাইজ: ${currentMachine.maxL}"×${currentMachine.maxW}"]`;
    }
    const printSheetsEl = document.getElementById('stk_resPrintSheets');
    if (printSheetsEl) {
        printSheetsEl.textContent = `${printSheets.toLocaleString('en-US')} শিট`;
    }

    document.getElementById('stk_resPaperCost').textContent = `৳ ${paperCost.toFixed(2)}`;
    document.getElementById('stk_resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('stk_resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('stk_resCuttingCost').textContent = `৳ ${cuttingCost.toFixed(2)}`;
    document.getElementById('stk_resLaminationCost').textContent = `৳ ${laminationCost.toFixed(2)}`;
    document.getElementById('stk_resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;
    document.getElementById('stk_resPerUnitCost').textContent = `৳ ${perUnitCost.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('stk', { itemLabel: 'পিস স্টিকার' });

    document.getElementById('stk_resultBox').style.display = 'block';
}

// ==========================================
// 5. ভিজিটিং কার্ড ছাপার হিসাব (Visiting Card Costing)
// ==========================================
function updateVisitingCardBoardRate() {
    const type = document.getElementById('vc_boardType').value;
    const priceMap = {
        art_card_300: masterRates.card_art300 || 12,
        art_card_350: masterRates.card_art350 || 15,
        swedish_300: masterRates.card_swedish300 || 18
    };
    document.getElementById('vc_sheetPrice').value = priceMap[type] || 12;
}

function applyVisitingCardPresetSize() {
    const preset = document.getElementById('vc_presetSize').value;
    const customRow = document.getElementById('vc_customSizeRow');
    if (preset === 'custom') {
        customRow.style.display = 'flex';
    } else {
        customRow.style.display = 'none';
        const parts = preset.split('x');
        if (parts.length === 2) {
            document.getElementById('vc_cutLength').value = parts[0];
            document.getElementById('vc_cutWidth').value = parts[1];
        }
    }
    updateVisitingCardPlateAndPrint();
    checkMachineCapacityWarningFor('vc');
}

function updateVisitingCardLaminationCost() {
    const type = document.getElementById('vc_laminationType')?.value;
    const qty = parseInt(document.getElementById('vc_totalQty')?.value) || 1000;
    const costInput = document.getElementById('vc_laminationAndCutCost');
    if (!costInput) return;
    if (type === 'none') {
        costInput.value = 50; // শুধু কাটিং চার্জ
    } else if (type === 'matt' || type === 'gloss') {
        costInput.value = Math.max(250, Math.round(qty * 0.25));
    } else if (type === 'soft_touch') {
        costInput.value = Math.max(450, Math.round(qty * 0.45));
    }
}

function updateVisitingCardSpecialCost() {
    const effect = document.getElementById('vc_specialEffect').value;
    const qty = parseInt(document.getElementById('vc_totalQty').value) || 1000;
    const costInput = document.getElementById('vc_specialCost');
    if (effect === 'none') {
        costInput.value = 0;
    } else if (effect === 'spot_uv') {
        costInput.value = Math.max(500, Math.round(qty * 0.50));
    } else if (effect === 'foil') {
        costInput.value = Math.max(600, Math.round(qty * 0.60));
    } else if (effect === 'emboss') {
        costInput.value = Math.max(400, Math.round(qty * 0.40));
    }
}

function calculateVisitingCardCosting() {
    const sheetPrice = parseFloat(document.getElementById('vc_sheetPrice').value) || 12;
    const cutL = parseFloat(document.getElementById('vc_cutLength').value) || 3.25;
    const cutW = parseFloat(document.getElementById('vc_cutWidth').value) || 2;
    const totalQty = parseInt(document.getElementById('vc_totalQty').value) || 0;
    const pType = document.getElementById('vc_plateType').value;

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[2];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('vc_resultBox');
    const errBox = document.getElementById('vc_resultError');
    const contentBox = document.getElementById('vc_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে ভিজিটিং কার্ড প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার কার্ডের সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('vc', '${minComp.id}'); calculateVisitingCardCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    // আর্ট কার্ড / সুইডিশ বোর্ডের মাপ 22 × 28 ইঞ্চি
    const fullL = 22, fullW = 28;
    const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
    const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
    const outPerSheet = Math.max(out1, out2, 24);

    const totalSheets = Math.ceil(totalQty / outPerSheet);
    const boardCost = totalSheets * sheetPrice;

    const plateCost = parseFloat(document.getElementById('vc_plateCost').value) || 0;
    const printCost = parseFloat(document.getElementById('vc_printCost').value) || 0;
    const laminationCost = parseFloat(document.getElementById('vc_laminationAndCutCost').value) || 0;
    const specialCost = parseFloat(document.getElementById('vc_specialCost').value) || 0;

    const grandTotal = boardCost + plateCost + printCost + laminationCost + specialCost;
    const totalBoxes = totalQty / 100;
    const perBoxCost = totalBoxes > 0 ? (grandTotal / totalBoxes) : 0;

    document.getElementById('vc_resOutPerSheet').textContent = `${outPerSheet} পিস`;
    document.getElementById('vc_resTotalSheets').textContent = `${totalSheets} শিট`;
    document.getElementById('vc_resBoardCost').textContent = `৳ ${boardCost.toFixed(2)}`;
    document.getElementById('vc_resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('vc_resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('vc_resLaminationCost').textContent = `৳ ${laminationCost.toFixed(2)}`;
    document.getElementById('vc_resSpecialCost').textContent = `৳ ${specialCost.toFixed(2)}`;
    document.getElementById('vc_resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;
    document.getElementById('vc_resPerBoxCost').textContent = `৳ ${perBoxCost.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('vc', { itemLabel: 'পিস কার্ড' });

    document.getElementById('vc_resultBox').style.display = 'block';
}

// ==========================================
// 6. ক্যালেন্ডার ছাপার হিসাব (Calendar Costing)
// ==========================================
function updateCalendarLeaves() {
    const type = document.getElementById('cal_calendarType')?.value || '1_wall';
    const leavesInput = document.getElementById('cal_leavesCount');
    const bindingSelect = document.getElementById('cal_bindingType');
    const presetSize = document.getElementById('cal_presetSize');
    const paperCat = document.getElementById('cal_paperCategory');

    if (!leavesInput) return;

    if (type === '1_wall') {
        leavesInput.value = 1;
        if (bindingSelect) bindingSelect.value = 'tin_pipe';
        if (presetSize && (presetSize.value.startsWith('8.5') || presetSize.value.startsWith('6x') || presetSize.value.startsWith('9x') || presetSize.value.startsWith('7x') || presetSize.value.startsWith('8.25'))) {
            presetSize.value = '18x23';
            applyCalendarPresetSize();
        }
    } else if (type === '2_wall') {
        leavesInput.value = 2;
        if (bindingSelect) bindingSelect.value = 'tin_pipe';
        if (presetSize && (presetSize.value.startsWith('8.5') || presetSize.value.startsWith('6x') || presetSize.value.startsWith('9x') || presetSize.value.startsWith('7x') || presetSize.value.startsWith('8.25'))) {
            presetSize.value = '18x23';
            applyCalendarPresetSize();
        }
    } else if (type === '3_wall') {
        leavesInput.value = 3;
        if (bindingSelect) bindingSelect.value = 'tin_pipe';
        if (presetSize && (presetSize.value.startsWith('8.5') || presetSize.value.startsWith('6x') || presetSize.value.startsWith('9x') || presetSize.value.startsWith('7x') || presetSize.value.startsWith('8.25'))) {
            presetSize.value = '18x23';
            applyCalendarPresetSize();
        }
    } else if (type === '6_wall') {
        leavesInput.value = 6;
        if (bindingSelect) bindingSelect.value = 'spiral_wall';
        if (presetSize && (presetSize.value.startsWith('8.5') || presetSize.value.startsWith('6x') || presetSize.value.startsWith('9x') || presetSize.value.startsWith('7x') || presetSize.value.startsWith('8.25'))) {
            presetSize.value = '15x20';
            applyCalendarPresetSize();
        }
    } else if (type === '12_wall') {
        leavesInput.value = 12;
        if (bindingSelect) bindingSelect.value = 'spiral_wall';
        if (presetSize && (presetSize.value.startsWith('8.5') || presetSize.value.startsWith('6x') || presetSize.value.startsWith('9x') || presetSize.value.startsWith('7x') || presetSize.value.startsWith('8.25'))) {
            presetSize.value = '15x20';
            applyCalendarPresetSize();
        }
    } else if (type.startsWith('desk')) {
        if (type === 'desk_6') leavesInput.value = 6;
        else if (type === 'desk_7') leavesInput.value = 7;
        else if (type === 'desk_12') leavesInput.value = 12;
        else if (type === 'desk_13') leavesInput.value = 13;
        else leavesInput.value = 7;

        if (bindingSelect) bindingSelect.value = 'desk_stand_standard';
        if (presetSize && (!presetSize.value.startsWith('8.5') && !presetSize.value.startsWith('6x') && !presetSize.value.startsWith('9x') && !presetSize.value.startsWith('7x') && !presetSize.value.startsWith('8.25'))) {
            presetSize.value = '8.5x5.5';
            applyCalendarPresetSize();
        }
        if (paperCat && (paperCat.value === 'art_2336' || paperCat.value === 'offset_2336')) {
            paperCat.value = 'card_art_2228';
            updateCalendarPaperOptions();
        }
    }
    updateCalendarBindingRate();
    updateCalendarPlateDetails();
    checkMachineCapacityWarningFor('cal');
}

function updateCalendarPaperOptions() {
    const cat = document.getElementById('cal_paperCategory')?.value || 'art_2336';
    const select = document.getElementById('cal_paperGsmRate');
    if (!select) return;
    select.innerHTML = "";

    const db = getPaperDatabase();
    if (db[cat] && db[cat].items) {
        db[cat].items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.sheet;
            if (item.type === 'sheet') {
                opt.textContent = `${item.gsm} (৳${item.sheet.toFixed(2)}/পাতা)`;
            } else {
                opt.textContent = `${item.gsm} (৳${item.ream}/রিম - ৳${item.sheet.toFixed(2)}/পাতা)`;
            }
            select.appendChild(opt);
        });
    }
}

function applyCalendarPresetSize() {
    const preset = document.getElementById('cal_presetSize')?.value;
    const l = document.getElementById('cal_cutLength');
    const w = document.getElementById('cal_cutWidth');
    if (!preset || preset === 'custom') return;
    const parts = preset.split('x');
    if (parts.length === 2 && l && w) {
        l.value = parts[0];
        w.value = parts[1];
    }
    updateCalendarPlateDetails();
    checkMachineCapacityWarningFor('cal');
}

function autoSelectCalendarPresetSize() {
    const l = parseFloat(document.getElementById('cal_cutLength')?.value) || 0;
    const w = parseFloat(document.getElementById('cal_cutWidth')?.value) || 0;
    const preset = document.getElementById('cal_presetSize');
    if (!preset) return;
    const val = `${l}x${w}`;
    let match = false;
    for (let opt of preset.options) {
        if (opt.value === val) {
            preset.value = val;
            match = true;
            break;
        }
    }
    if (!match) preset.value = 'custom';
    updateCalendarPlateDetails();
    checkMachineCapacityWarningFor('cal');
}

function updateCalendarBindingRate() {
    const type = document.getElementById('cal_bindingType')?.value;
    const rateInput = document.getElementById('cal_bindingPerRate');
    if (!rateInput) return;

    if (type === 'tin_pipe') {
        const leaves = parseInt(document.getElementById('cal_leavesCount')?.value) || 1;
        if (leaves <= 1) rateInput.value = 6;
        else if (leaves <= 3) rateInput.value = 8;
        else rateInput.value = 12;
    } else if (type === 'spiral_wall') {
        const leaves = parseInt(document.getElementById('cal_leavesCount')?.value) || 1;
        if (leaves <= 3) rateInput.value = 16;
        else if (leaves <= 6) rateInput.value = 22;
        else rateInput.value = 28;
    } else if (type === 'desk_stand_standard') {
        rateInput.value = 35; // স্ট্যান্ড + ওয়্যার-ও স্পাইরাল + পাঞ্চিং
    } else if (type === 'desk_stand_premium') {
        rateInput.value = 48; // হেভি রিজিড হার্ডবোর্ড + ম্যাট/গ্লস পেস্টিং + মেটালিক ওয়্যার-ও
    } else if (type === 'none') {
        rateInput.value = 0;
    }
}

function updateCalendarPlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('cal');
    }
    checkMachineCapacityWarningFor('cal');
}

function calculateCalendarCosting() {
    const cat = document.getElementById('cal_paperCategory')?.value || 'art_2336';
    const paperPricePerSheet = parseFloat(document.getElementById('cal_paperGsmRate')?.value) || 0;
    const cutL = parseFloat(document.getElementById('cal_cutLength')?.value) || 1;
    const cutW = parseFloat(document.getElementById('cal_cutWidth')?.value) || 1;
    const leaves = parseInt(document.getElementById('cal_leavesCount')?.value) || 1;
    const totalQty = parseInt(document.getElementById('cal_totalQty')?.value) || 0;
    const pType = document.getElementById('cal_plateType')?.value || 'demi';

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[4];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('cal_resultBox');
    const errBox = document.getElementById('cal_resultError');
    const contentBox = document.getElementById('cal_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে ক্যালেন্ডার প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার ক্যালেন্ডারের পাতার সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('cal', '${minComp.id}'); calculateCalendarCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    let fullL = 23, fullW = 36;
    if (cat.includes('2030')) { fullL = 20; fullW = 30; }
    else if (cat.includes('2228')) { fullL = 22; fullW = 28; }

    const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
    const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
    const outPerSheet = Math.max(out1, out2, 1);

    const totalPrintedSheets = totalQty * leaves;
    const totalFullSheets = Math.ceil(totalPrintedSheets / outPerSheet);
    const isSheetType = cat.includes('2228');
    const totalReamsOrSheets = isSheetType ? `${totalFullSheets} শিট বোর্ড` : `${totalFullSheets} শিট (${(totalFullSheets / 500).toFixed(2)} রিম)`;
    const paperCost = totalFullSheets * paperPricePerSheet;

    const plateCost = parseFloat(document.getElementById('cal_plateCost')?.value) || 0;
    const printCost = parseFloat(document.getElementById('cal_printCost')?.value) || 0;
    const bindingPerRate = parseFloat(document.getElementById('cal_bindingPerRate')?.value) || 0;
    const bindingCost = totalQty * bindingPerRate;

    const grandTotal = paperCost + plateCost + printCost + bindingCost;
    const perCalendarCost = totalQty > 0 ? (grandTotal / totalQty) : 0;

    document.getElementById('cal_resOutPerSheet').textContent = `${outPerSheet} পিস পাতা`;
    document.getElementById('cal_resTotalSheets').textContent = totalReamsOrSheets;
    document.getElementById('cal_resPaperCost').textContent = `৳ ${paperCost.toFixed(2)}`;
    document.getElementById('cal_resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('cal_resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('cal_resBindingCost').textContent = `৳ ${bindingCost.toFixed(2)}`;
    document.getElementById('cal_resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;
    document.getElementById('cal_resPerUnitCost').textContent = `৳ ${perCalendarCost.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('cal', { itemLabel: 'পিস ক্যালেন্ডার' });

    document.getElementById('cal_resultBox').style.display = 'block';
}

// ==========================================
// 7. প্যাড / স্লিপ ছাপার হিসাব (Pad / Slip Costing)
// ==========================================
function updatePadSlipPaperOptions() {
    const cat = document.getElementById('pad_paperCategory')?.value || 'offset_2336';
    const select = document.getElementById('pad_paperGsmRate');
    if (select) {
        select.innerHTML = "";
        const db = getPaperDatabase();
        if (db[cat]) {
            db[cat].items.forEach(item => {
                const opt = document.createElement('option');
                opt.value = item.sheet;
                if (item.type === 'sheet') {
                    opt.textContent = `${item.gsm} (৳${item.sheet.toFixed(2)}/পাতা)`;
                } else {
                    opt.textContent = `${item.gsm} (৳${item.ream}/রিম - ৳${item.sheet.toFixed(2)}/পাতা)`;
                }
                select.appendChild(opt);
            });
        }
    }

    // প্যাড ও স্লিপের সাইজ প্রিসেট ফিল্টার
    const is2030 = (cat === 'offset_2030' || cat === 'art_2030');
    const presetSelect = document.getElementById('pad_presetSize');
    if (presetSelect) {
        const prevVal = presetSelect.value;
        if (is2030) {
            presetSelect.innerHTML = `
                <option value="5x7.5" selected>5" × 7.5" (1/8 ক্রাউন প্যাড / হাফ সাইজ)</option>
                <option value="3.76x10">3.76" × 10" (ক্রাউন স্লিপ / লম্বা ভাউচার)</option>
                <option value="7.5x10">7.5" × 10" (1/4 ক্রাউন প্যাড / বড় সাইজ)</option>
                <option value="3.75x5">3.75" × 5" (1/16 ক্রাউন - পকেট স্লিপ)</option>
                <option value="custom">কাস্টম সাইজ (Custom)</option>
            `;
        } else {
            presetSelect.innerHTML = `
                <option value="3x5.75" selected>3" × 5.75" (পকেট স্লিপ / মানি রসিদ)</option>
                <option value="3x11.5">3" × 11.5" (লম্বা চিকন স্লিপ/ভাউচার)</option>
                <option value="4.5x5.75">4.5" × 5.75" (স্ট্যান্ডার্ড প্রেসক্রিপশন প্যাড - 1/16 ডিমাই)</option>
                <option value="4.5x11.5">4.5" × 11.5" (লম্বা প্রেসক্রিপশন / বড় স্লিপ)</option>
                <option value="5.75x9">5.75" × 9" (1/8 ডিমাই প্যাড / হাফ সাইজ)</option>
                <option value="8.5x11">8.5" × 11" (লেটারহেড প্যাড / ফুল সাইজ)</option>
                <option value="custom">কাস্টম সাইজ (Custom)</option>
            `;
        }
        applyPadSlipPresetSize();
    }

    updatePadPlateDetails();
    checkMachineCapacityWarningFor('pad');
}

function applyPadSlipPresetSize() {
    const preset = document.getElementById('pad_presetSize')?.value;
    const l = document.getElementById('pad_cutLength');
    const w = document.getElementById('pad_cutWidth');
    if (!preset || preset === 'custom') return;
    const parts = preset.split('x');
    if (parts.length === 2 && l && w) {
        l.value = parts[0];
        w.value = parts[1];
    }
    updatePadBindingRate();
    updatePadPlateDetails();
    checkMachineCapacityWarningFor('pad');
}

function handlePadCustomSizeChange() {
    const l = parseFloat(document.getElementById('pad_cutLength')?.value) || 0;
    const w = parseFloat(document.getElementById('pad_cutWidth')?.value) || 0;
    const preset = document.getElementById('pad_presetSize');
    if (!preset) return;
    const val = `${l}x${w}`;
    let match = false;
    for (let opt of preset.options) {
        if (opt.value === val) {
            preset.value = val;
            match = true;
            break;
        }
    }
    if (!match) preset.value = 'custom';
    updatePadBindingRate();
    updatePadPlateDetails();
    checkMachineCapacityWarningFor('pad');
}

function updatePadBindingRate() {
    const bType = document.getElementById('pad_bindingType')?.value || 'pad_gum_standard';
    const rateInput = document.getElementById('pad_bindingPerRate');
    const leaves = parseInt(document.getElementById('pad_leavesCount')?.value) || 100;
    const cutL = parseFloat(document.getElementById('pad_cutLength')?.value) || 3;
    const cutW = parseFloat(document.getElementById('pad_cutWidth')?.value) || 5.75;
    const area = cutL * cutW;

    if (!rateInput) return;

    if (bType === 'pad_gum_standard') {
        // স্ট্যান্ডার্ড আঠা বাঁধাই (3 থেকে 5 টাকা)
        if (leaves <= 50) rateInput.value = 3;
        else if (leaves <= 100) rateInput.value = (area > 50 ? 5 : 4);
        else if (leaves <= 150) rateInput.value = 5;
        else rateInput.value = 6;
    } else if (bType === 'pad_gum_economic') {
        // ছোট স্লিপ (3 টাকা)
        rateInput.value = (leaves <= 100 ? 3 : 4);
    } else if (bType === 'pad_gum_heavy') {
        // হেভি / বড় সাইজ প্যাড (5 থেকে 7 টাকা)
        if (leaves <= 100) rateInput.value = 5;
        else if (leaves <= 200) rateInput.value = 6;
        else rateInput.value = 7;
    } else if (bType === 'pad_perforation') {
        // পারফোরেশন + প্যাড বাঁধাই
        rateInput.value = (leaves <= 100 ? 7 : 8);
    } else if (bType === 'none') {
        rateInput.value = 0;
    }
}

function updatePadPlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('pad');
    }
    checkMachineCapacityWarningFor('pad');
}

function calculatePadSlipCosting() {
    const cat = document.getElementById('pad_paperCategory')?.value || 'offset_2336';
    const paperPricePerSheet = parseFloat(document.getElementById('pad_paperGsmRate')?.value) || 0;
    const cutL = parseFloat(document.getElementById('pad_cutLength')?.value) || 1;
    const cutW = parseFloat(document.getElementById('pad_cutWidth')?.value) || 1;
    const leavesPerPad = parseInt(document.getElementById('pad_leavesCount')?.value) || 100;
    const totalPads = parseInt(document.getElementById('pad_totalQty')?.value) || 0;
    const pType = document.getElementById('pad_plateType')?.value || 'demi';

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[4];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('pad_resultBox');
    const errBox = document.getElementById('pad_resultError');
    const contentBox = document.getElementById('pad_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে প্যাড/স্লিপ প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার প্যাড সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('pad', '${minComp.id}'); calculatePadSlipCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    let fullL = 23, fullW = 36;
    if (cat.includes('2030')) { fullL = 20; fullW = 30; }

    const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
    const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
    const outPerSheet = Math.max(out1, out2, 1);

    const totalPrintedLeaves = totalPads * leavesPerPad;
    const totalFullSheets = Math.ceil(totalPrintedLeaves / outPerSheet);
    const totalReams = (totalFullSheets / 500).toFixed(2);
    const paperCost = totalFullSheets * paperPricePerSheet;

    const plateCost = parseFloat(document.getElementById('pad_plateCost')?.value) || 0;
    const printCost = parseFloat(document.getElementById('pad_printCost')?.value) || 0;
    const bindingPerRate = parseFloat(document.getElementById('pad_bindingPerRate')?.value) || 0;
    const bindingCost = totalPads * bindingPerRate;

    const grandTotal = paperCost + plateCost + printCost + bindingCost;
    const perPadCost = totalPads > 0 ? (grandTotal / totalPads) : 0;

    document.getElementById('pad_resOutPerSheet').textContent = `${outPerSheet} পিস পাতা`;
    document.getElementById('pad_resTotalSheets').textContent = `${totalFullSheets} শিট (${totalReams} রিম)`;
    document.getElementById('pad_resPaperCost').textContent = `৳ ${paperCost.toFixed(2)}`;
    document.getElementById('pad_resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('pad_resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('pad_resBindingCost').textContent = `৳ ${bindingCost.toFixed(2)}`;
    document.getElementById('pad_resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;
    document.getElementById('pad_resPerPadCost').textContent = `৳ ${perPadCost.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('pad', { itemLabel: 'টি প্যাড/বই' });

    document.getElementById('pad_resultBox').style.display = 'block';
}

// ==========================================
// ==========================================
// 8. অটো কার্বন মেমো ছাপার হিসাব (Auto Carbon Memo Costing)
// ==========================================
function updateAutoCarbonPaperOptions() {
    const cat = document.getElementById('auto_paperCategory')?.value || 'auto_bash_2336';
    const select = document.getElementById('auto_paperGsmRate');
    if (select) {
        select.innerHTML = "";

        const bashRate = masterRates.auto_bash || 2500;
        const chinaRate = masterRates.auto_china || 3200;

        let items = [];
        if (cat === 'auto_bash_2336') {
            items = [
                { label: `বসুন্ধরা অটোকার্বন (৳${bashRate}/রিম - ৳${(bashRate / 500).toFixed(2)}/পাতা)`, sheet: bashRate / 500 }
            ];
        } else {
            items = [
                { label: `চায়না অটোকার্বন (৳${chinaRate}/রিম - ৳${(chinaRate / 500).toFixed(2)}/পাতা)`, sheet: chinaRate / 500 }
            ];
        }

        items.forEach(it => {
            const opt = document.createElement('option');
            opt.value = it.sheet;
            opt.textContent = it.label;
            select.appendChild(opt);
        });
    }

    updateAutoCarbonLeavesAndParts();
    updateAutoCarbonPlateDetails();
    checkMachineCapacityWarningFor('auto');
}

function applyAutoCarbonPresetSize() {
    const preset = document.getElementById('auto_presetSize')?.value;
    const l = document.getElementById('auto_cutLength');
    const w = document.getElementById('auto_cutWidth');
    const cuttingInfo = document.getElementById('auto_cuttingFormulaInfo');
    if (!preset || preset === 'custom') {
        if (cuttingInfo) cuttingInfo.style.display = 'none';
        return;
    }

    if (preset === '7.5x10') {
        if (l) l.value = 7.5;
        if (w) w.value = 10;
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>২৩×৩৬" ফুল শিট কাটিং হিসাব:</strong> ৩৬" এর দিকে ৩ পিস ১০" = ৩০" এবং ২৩" এর দিকে ৩ পিস ৭.৫" = ২২.৫" কাটিং হবে। অর্থাৎ ১টি ২৩×৩৬" ফুল শিট থেকে মোট <strong>৩ × ৩ = ৯ টুকরা (৯ পাতা)</strong> বের হবে।`;
        }
    } else if (preset === '5.7x9') {
        if (l) l.value = 5.75;
        if (w) w.value = 9;
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>ডিমাই ফুল শিট কাটিং:</strong> ১টি ডিমাই ফুল শিট থেকে মোট <strong>৮ পিস</strong> (1/8 ডিমাই) বের হবে।`;
        }
    } else if (preset === '6x11.5') {
        if (l) l.value = 6;
        if (w) w.value = 11.5;
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>ডিমাই ফুল শিট কাটিং:</strong> ১টি ডিমাই ফুল শিট থেকে মোট <strong>৬ পিস</strong> (1/6 ডিমাই) বের হবে।`;
        }
    } else if (preset === '9x11.5') {
        if (l) l.value = 9;
        if (w) w.value = 11.5;
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>ডিমাই ফুল শিট কাটিং:</strong> ১টি ডিমাই ফুল শিট থেকে মোট <strong>৪ পিস</strong> (1/4 ডিমাই) বের হবে।`;
        }
    } else if (preset === '4.5x5.75') {
        if (l) l.value = 4.5;
        if (w) w.value = 5.75;
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>ডিমাই ফুল শিট কাটিং:</strong> ১টি ডিমাই ফুল শিট থেকে মোট <strong>১৬ পিস</strong> (1/16 ডিমাই) বের হবে।`;
        }
    }

    updateAutoCarbonBindingRate();
    updateAutoCarbonPlateDetails();
    checkMachineCapacityWarningFor('auto');
}

function handleAutoCarbonCustomSizeChange() {
    const l = parseFloat(document.getElementById('auto_cutLength')?.value) || 0;
    const w = parseFloat(document.getElementById('auto_cutWidth')?.value) || 0;
    const preset = document.getElementById('auto_presetSize');
    const cuttingInfo = document.getElementById('auto_cuttingFormulaInfo');
    if (!preset) return;

    if ((Math.abs(l - 7.5) < 0.25 && Math.abs(w - 10) < 0.25) || (Math.abs(l - 10) < 0.25 && Math.abs(w - 7.5) < 0.25)) {
        preset.value = '7.5x10';
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>২৩×৩৬" ফুল শিট কাটিং হিসাব:</strong> ৩৬" এর দিকে ৩ পিস ১০" = ৩০" এবং ২৩" এর দিকে ৩ পিস ৭.৫" = ২২.৫" কাটিং হবে। অর্থাৎ ১টি ২৩×৩৬" ফুল শিট থেকে মোট <strong>৩ × ৩ = ৯ টুকরা (৯ পাতা)</strong> বের হবে।`;
        }
    } else if ((Math.abs(l - 5.7) < 0.15 || Math.abs(l - 5.75) < 0.15) && Math.abs(w - 9) < 0.2) {
        preset.value = '5.7x9';
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>ডিমাই ফুল শিট কাটিং:</strong> ১টি ডিমাই ফুল শিট থেকে মোট <strong>৮ পিস</strong> বের হবে।`;
        }
    } else if (Math.abs(l - 6) < 0.2 && Math.abs(w - 11.5) < 0.2) {
        preset.value = '6x11.5';
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>ডিমাই ফুল শিট কাটিং:</strong> ১টি ডিমাই ফুল শিট থেকে মোট <strong>৬ পিস</strong> বের হবে।`;
        }
    } else if (Math.abs(l - 9) < 0.2 && Math.abs(w - 11.5) < 0.2) {
        preset.value = '9x11.5';
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>ডিমাই ফুল শিট কাটিং:</strong> ১টি ডিমাই ফুল শিট থেকে মোট <strong>৪ পিস</strong> বের হবে।`;
        }
    } else if (Math.abs(l - 4.5) < 0.2 && Math.abs(w - 5.75) < 0.2) {
        preset.value = '4.5x5.75';
        if (cuttingInfo) {
            cuttingInfo.style.display = 'block';
            cuttingInfo.innerHTML = `✂️ <strong>ডিমাই ফুল শিট কাটিং:</strong> ১টি ডিমাই ফুল শিট থেকে মোট <strong>১৬ পিস</strong> বের হবে।`;
        }
    } else {
        preset.value = 'custom';
        if (cuttingInfo) cuttingInfo.style.display = 'none';
    }

    updateAutoCarbonBindingRate();
    updateAutoCarbonPlateDetails();
    checkMachineCapacityWarningFor('auto');
}

function getAutoCarbonBindingRate(leavesCount, cutL, cutW) {
    const is75x10 = (Math.abs(cutL - 7.5) < 0.25 && Math.abs(cutW - 10) < 0.25) || (Math.abs(cutL - 10) < 0.25 && Math.abs(cutW - 7.5) < 0.25);
    const is9x115 = (Math.abs(cutL - 9) < 0.3 && Math.abs(cutW - 11.5) < 0.3) || (Math.abs(cutL - 11.5) < 0.3 && Math.abs(cutW - 9) < 0.3);
    const is6x115 = (Math.abs(cutL - 6) < 0.3 && Math.abs(cutW - 11.5) < 0.3) || (Math.abs(cutL - 11.5) < 0.3 && Math.abs(cutW - 6) < 0.3);
    const is575x9 = (Math.abs(cutL - 5.75) < 0.3 && Math.abs(cutW - 9) < 0.3) || (Math.abs(cutL - 9) < 0.3 && Math.abs(cutW - 5.75) < 0.3);

    // সাইজ অনুযায়ী ২০০ পাতার ডিফল্ট মাস্টার রেট নির্বাচন:
    let rate200 = 15;
    if (is75x10) {
        rate200 = (masterRates.bind_auto_75x10 !== undefined) ? masterRates.bind_auto_75x10 : 21;
    } else if (is9x115) {
        rate200 = (masterRates.bind_auto_9x115 !== undefined) ? masterRates.bind_auto_9x115 : 24;
    } else if (is6x115) {
        rate200 = (masterRates.bind_auto_6x115 !== undefined) ? masterRates.bind_auto_6x115 : 18;
    } else if (is575x9) {
        rate200 = (masterRates.bind_auto_575x9 !== undefined) ? masterRates.bind_auto_575x9 : 15;
    } else {
        const area = cutL * cutW;
        if (area >= 95) rate200 = (masterRates.bind_auto_9x115 !== undefined) ? masterRates.bind_auto_9x115 : 24;
        else if (area >= 60) rate200 = (masterRates.bind_auto_6x115 !== undefined) ? masterRates.bind_auto_6x115 : 18;
        else rate200 = (masterRates.bind_auto_575x9 !== undefined) ? masterRates.bind_auto_575x9 : 15;
    }

    // ২০০ পাতা বেস রেট থেকে পাতা অনুযায়ী স্কেলিং:
    if (leavesCount <= 100) return Math.round((rate200 * (10 / 15)) * 2) / 2;
    if (leavesCount <= 150) return Math.round((rate200 * (12.5 / 15)) * 2) / 2;
    if (leavesCount <= 200) return rate200; // ডিফল্ট রেট ২০০ পাতার জন্য
    return Math.round((rate200 * (20 / 15)) * 2) / 2; // ৩০০ পাতা
}

function updateAutoCarbonBindingAndRates() {
    if (typeof updateAutoCarbonPaperOptions === 'function') updateAutoCarbonPaperOptions();
    if (typeof updateAutoCarbonBindingRate === 'function') updateAutoCarbonBindingRate();
    if (typeof updateAutoCarbonPlateDetails === 'function') updateAutoCarbonPlateDetails();
}

function updateAutoCarbonLeavesAndParts() {
    const leavesVal = document.getElementById('auto_leavesCount')?.value || '100';
    const leavesCount = parseInt(leavesVal) || 100;
    const totalBooks = parseInt(document.getElementById('auto_totalQty')?.value) || 20;
    const totalLeaves = totalBooks * leavesCount;

    let partDesc = '50 পাতার 2 সেট (মূল + ডুপ্লিকেট)';
    if (leavesCount === 100) partDesc = '50 পাতার 2 সেট (মূল + ডুপ্লিকেট)';
    else if (leavesCount === 150) partDesc = '50 পাতার 3 সেট (মূল + ডুপ্লিকেট + ট্রিপ্লিকেট)';
    else if (leavesCount === 200) partDesc = '100 পাতার 2 সেট (মূল + ডুপ্লিকেট)';
    else if (leavesCount === 300) partDesc = '100 পাতার 3 সেট (মূল + ডুপ্লিকেট + ট্রিপ্লিকেট)';

    const infoEl = document.getElementById('auto_memoSetsInfo');
    if (infoEl) {
        infoEl.innerHTML = `📌 মোট <strong>${totalBooks.toLocaleString('bn-BD')}টি</strong> মেমো বই (${partDesc}, সর্বমোট <strong>${totalLeaves.toLocaleString('bn-BD')} পাতা</strong>)`;
    }

    updateAutoCarbonBindingRate();
    updateAutoCarbonPlateDetails();
    checkMachineCapacityWarningFor('auto');
}

function updateAutoCarbonBindingRate() {
    const leavesVal = document.getElementById('auto_leavesCount')?.value || '100';
    const leavesCount = parseInt(leavesVal) || 100;
    const cutL = parseFloat(document.getElementById('auto_cutLength')?.value) || 7.5;
    const cutW = parseFloat(document.getElementById('auto_cutWidth')?.value) || 10;

    // বাঁধাই রেট (অটো কার্বন পিন বাঁধাই রেট হিসাব অনুযায়ী)
    const bindInput = document.getElementById('auto_bindingPerRate');
    if (bindInput) {
        bindInput.value = getAutoCarbonBindingRate(leavesCount, cutL, cutW);
    }
}

function updateAutoCarbonPlateDetails(skipAutoDetect = false) {
    if (!skipAutoDetect && typeof autoDetectOptimalMachine === 'function') {
        autoDetectOptimalMachine('auto');
    }
    checkMachineCapacityWarningFor('auto');
}

function calculateAutoCarbonCosting() {
    const paperPricePerSheet = parseFloat(document.getElementById('auto_paperGsmRate')?.value) || 5.00;
    const cutL = parseFloat(document.getElementById('auto_cutLength')?.value) || 7.5;
    const cutW = parseFloat(document.getElementById('auto_cutWidth')?.value) || 10;
    const leavesCount = parseInt(document.getElementById('auto_leavesCount')?.value) || 100;
    const totalBooks = parseInt(document.getElementById('auto_totalQty')?.value) || 0;
    const pType = document.getElementById('auto_plateType')?.value || 'hasi';

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[1];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('auto_resultBox');
    const errBox = document.getElementById('auto_resultError');
    const contentBox = document.getElementById('auto_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে অটো কার্বন মেমো প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার মেমো সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('auto', '${minComp.id}'); calculateAutoCarbonCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    const fullL = 23;
    const fullW = 36;
    const is75x10 = (Math.abs(cutL - 7.5) < 0.25 && Math.abs(cutW - 10) < 0.25) || (Math.abs(cutL - 10) < 0.25 && Math.abs(cutW - 7.5) < 0.25);
    
    let outPerSheet = 1;
    if (is75x10) {
        outPerSheet = 9; // ২৩×৩৬ পেপারে ৩৬" এর দিকে ৩টি ১০" ও ২৩" এর দিকে ৩টি ৭.৫" = ৯ টুকরা
    } else {
        const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
        const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
        outPerSheet = Math.max(out1, out2, 1);
    }

    const totalPrintedLeaves = totalBooks * leavesCount;
    const totalFullSheets = Math.ceil(totalPrintedLeaves / outPerSheet);
    const totalReams = (totalFullSheets / 500).toFixed(2);
    const paperCost = totalFullSheets * paperPricePerSheet;

    const plateCost = parseFloat(document.getElementById('auto_plateCost')?.value) || 0;
    const printCost = parseFloat(document.getElementById('auto_printCost')?.value) || 0;
    const bindingPerRate = parseFloat(document.getElementById('auto_bindingPerRate')?.value) || 0;
    const bindingCost = totalBooks * bindingPerRate;

    const grandTotal = paperCost + plateCost + printCost + bindingCost;
    const perBookCost = totalBooks > 0 ? (grandTotal / totalBooks) : 0;

    let partSummaryName = '';
    if (leavesCount === 100) partSummaryName = '২-পার্ট ৫০ সেট';
    else if (leavesCount === 150) partSummaryName = '৩-পার্ট ৫০ সেট';
    else if (leavesCount === 200) partSummaryName = '৪-পার্ট ৫০ সেট / ২-পার্ট ১০০ সেট';
    else if (leavesCount === 300) partSummaryName = '৩-পার্ট ১০০ সেট';

    if (is75x10) {
        document.getElementById('auto_resOutPerSheet').innerHTML = `<strong>9 পিস পাতা</strong> <span style="font-size:12px; color:#0369a1; display:block; margin-top:2px;">(২৩×৩৬" ফুল শিটে ৩৬" এ ৩টি ১০" ও ২৩" এ ৩টি ৭.৫" = ৩×৩=৯ টুকরা)</span>`;
    } else {
        document.getElementById('auto_resOutPerSheet').textContent = `${outPerSheet} পিস পাতা`;
    }
    
    document.getElementById('auto_resTotalSheets').textContent = `${totalFullSheets} শিট (${totalReams} রিম ২৩×৩৬" অটো কার্বন পেপার)`;
    document.getElementById('auto_resTotalBooks').textContent = `${totalBooks.toLocaleString('bn-BD')} টি বই (${leavesCount} পাতা - ${partSummaryName})`;
    document.getElementById('auto_resPaperCost').textContent = `৳ ${paperCost.toFixed(2)}`;
    document.getElementById('auto_resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('auto_resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('auto_resBindingCost').textContent = `৳ ${bindingCost.toFixed(2)}`;
    document.getElementById('auto_resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;
    document.getElementById('auto_resPerBookCost').textContent = `৳ ${perBookCost.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('auto', { itemLabel: 'টি মেমো বই' });

    document.getElementById('auto_resultBox').style.display = 'block';
}

// ==========================================
// 9. অন্যান্য ছাপার হিসাব (Other Printing Costing)
// ==========================================
function calculateOtherPrintingCosting() {
    const fullL = parseFloat(document.getElementById('oth_sheetLength').value) || 23;
    const fullW = parseFloat(document.getElementById('oth_sheetWidth').value) || 36;
    const sheetPrice = parseFloat(document.getElementById('oth_sheetPrice').value) || 0;
    const cutL = parseFloat(document.getElementById('oth_cutLength').value) || 1;
    const cutW = parseFloat(document.getElementById('oth_cutWidth').value) || 1;
    const totalQty = parseInt(document.getElementById('oth_totalQty').value) || 0;
    const pType = document.getElementById('oth_plateType').value;

    const currentMachine = ALL_PRINT_MACHINES.find(m => m.id === pType) || ALL_PRINT_MACHINES[4];
    const currentUps = getMachineUpsForSize(currentMachine, cutL, cutW);

    const resBox = document.getElementById('oth_resultBox');
    const errBox = document.getElementById('oth_resultError');
    const contentBox = document.getElementById('oth_resultContent');

    if (currentUps === 0) {
        const compatibleMachines = ALL_PRINT_MACHINES.filter(m => {
            return getMachineUpsForSize(m, cutL, cutW) > 0;
        });

        const minComp = compatibleMachines.length > 0 ? compatibleMachines[0] : null;

        if (resBox && errBox && contentBox) {
            errBox.innerHTML = `
                <div style="font-size:15px; font-weight:bold; margin-bottom:6px; color:#b91c1c;">
                    ⛔ ভুল মেশিন নির্বাচন: এই মেশিনে কাজ প্রিন্ট করা সম্ভব নয়!
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#7f1d1d;">
                    আপনার কাজের সাইজ <strong>${cutL}" × ${cutW}"</strong> যা নির্বাচিত <strong>${currentMachine.name}</strong> মেশিনের মাপের চেয়ে বড়।<br>
                    ${minComp ? `👉 কাজটি প্রিন্ট করতে আপনাকে অবশ্যই <strong>${minComp.name}</strong> অথবা তার উপরের মেশিন (${compatibleMachines.map(m => m.shortName).join(', ')}) সিলেক্ট করতে হবে।` : 'কাজের সাইজ চেক করুন।'}
                </div>
                ${minComp ? `
                    <button type="button" onclick="selectMachineFor('oth', '${minComp.id}'); calculateOtherPrintingCosting();" style="margin-top:10px; background:#dc2626; color:#fff; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">
                        🚀 ${minComp.shortName} মেশিনে সেট করে পুনরায় হিসাব করুন
                    </button>
                ` : ''}
            `;
            errBox.style.display = 'block';
            contentBox.style.display = 'none';
            resBox.style.display = 'block';
            resBox.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (contentBox) contentBox.style.display = 'block';

    const out1 = Math.floor(fullL / cutL) * Math.floor(fullW / cutW);
    const out2 = Math.floor(fullL / cutW) * Math.floor(fullW / cutL);
    const outPerSheet = Math.max(out1, out2, 1);

    const totalSheets = Math.ceil(totalQty / outPerSheet);
    const paperCost = totalSheets * sheetPrice;

    const plateCost = parseFloat(document.getElementById('oth_plateCost').value) || 0;
    const printCost = parseFloat(document.getElementById('oth_printCost').value) || 0;
    const laminationCost = parseFloat(document.getElementById('oth_laminationCost').value) || 0;
    const otherCost = parseFloat(document.getElementById('oth_otherCost').value) || 0;

    const grandTotal = paperCost + plateCost + printCost + laminationCost + otherCost;
    const perUnitCost = totalQty > 0 ? (grandTotal / totalQty) : 0;

    document.getElementById('oth_resOutPerSheet').textContent = `${outPerSheet} পিস`;
    document.getElementById('oth_resTotalSheets').textContent = `${totalSheets} শিট`;
    document.getElementById('oth_resPaperCost').textContent = `৳ ${paperCost.toFixed(2)}`;
    document.getElementById('oth_resPlateCost').textContent = `৳ ${plateCost.toFixed(2)}`;
    document.getElementById('oth_resPrintCost').textContent = `৳ ${printCost.toFixed(2)}`;
    document.getElementById('oth_resLaminationCost').textContent = `৳ ${laminationCost.toFixed(2)}`;
    document.getElementById('oth_resOtherCost').textContent = `৳ ${otherCost.toFixed(2)}`;
    document.getElementById('oth_resGrandTotal').textContent = `৳ ${grandTotal.toFixed(2)}`;
    document.getElementById('oth_resPerUnitCost').textContent = `৳ ${perUnitCost.toFixed(2)}`;

    // 📌 মেশিন সেটআপ ও সাশ্রয়ী ছাপা হিসাবের বিস্তারিত নোট
    renderDetailedMachineNote('oth', { itemLabel: 'পিস' });

    document.getElementById('oth_resultBox').style.display = 'block';
}

// ===================================================
// 🧮 ফ্লোটিং কুইক ক্যালকুলেটর (Quick Floating Calculator)
// ===================================================
let calcCurrentExpr = '';
let calcCurrentVal = '0';
let calcIsResultShown = false;
let calcHistory = [];

function openQuickCalc() {
    const launcher = document.getElementById('floatingCalcLauncher');
    const pill = document.getElementById('calcMinimizedPill');
    const widget = document.getElementById('floatingCalcWidget');

    if (launcher) launcher.style.display = 'none';
    if (pill) pill.style.display = 'none';
    if (widget) {
        widget.style.display = 'flex';
        updateCalcDisplay();
    }
}

function closeQuickCalc() {
    const launcher = document.getElementById('floatingCalcLauncher');
    const pill = document.getElementById('calcMinimizedPill');
    const widget = document.getElementById('floatingCalcWidget');

    if (widget) widget.style.display = 'none';
    if (pill) pill.style.display = 'none';
    if (launcher) launcher.style.display = 'flex';
}

function minimizeQuickCalc() {
    const launcher = document.getElementById('floatingCalcLauncher');
    const pill = document.getElementById('calcMinimizedPill');
    const widget = document.getElementById('floatingCalcWidget');
    const pillVal = document.getElementById('calcPillValue');

    if (widget) widget.style.display = 'none';
    if (launcher) launcher.style.display = 'none';
    if (pill) {
        if (pillVal) pillVal.textContent = calcCurrentVal || '0';
        pill.style.display = 'flex';
    }
}

function restoreQuickCalc() {
    openQuickCalc();
}

function updateCalcDisplay() {
    const exprEl = document.getElementById('calcExprDisplay');
    const valEl = document.getElementById('calcMainDisplay');
    const pillVal = document.getElementById('calcPillValue');

    let mainText = '0';
    let topText = '&nbsp;';

    if (calcIsResultShown) {
        // ফলাফল দেখানো হচ্ছে: উপরে পুরো হিসাব (যেমন: 123 + 456 =), নিচে ফলাফল (579)
        topText = calcCurrentExpr ? formatCalcExpr(calcCurrentExpr) : '&nbsp;';
        mainText = calcCurrentVal || '0';
    } else {
        // টাইপ করার সময়: নিচে পুরো চলমান রাশি দেখা যাবে (যেমন: 123 + 45 বা 123 + )
        let liveExpression = '';
        if (calcCurrentExpr) {
            liveExpression = calcCurrentExpr + (calcCurrentVal !== '0' ? calcCurrentVal : '');
        } else {
            liveExpression = calcCurrentVal || '0';
        }
        mainText = formatCalcExpr(liveExpression);

        // লাইভ সম্ভাব্য ফলাফল উপরে প্রিভিউ দেখানো (যদি একাধিক সংখ্যা ও অপারেটর থাকে)
        if (calcCurrentExpr && /[+\-*/]/.test(calcCurrentExpr) && calcCurrentVal !== '0') {
            const cleanExpr = (calcCurrentExpr + calcCurrentVal).replace(/[+\-*/]+$/, '');
            const preview = safeMathEval(cleanExpr);
            if (preview !== null && !isNaN(preview) && isFinite(preview)) {
                topText = `≈ ${Number.isInteger(preview) ? preview : parseFloat(preview.toFixed(4))}`;
            }
        }
    }

    if (exprEl) {
        exprEl.innerHTML = topText;
    }
    if (valEl) {
        valEl.textContent = mainText;
        valEl.scrollLeft = valEl.scrollWidth; // দীর্ঘ হিসাব হলে ডানে স্ক্রল
    }
    if (pillVal) {
        pillVal.textContent = calcCurrentVal || '0';
    }
}

function formatCalcExpr(expr) {
    if (!expr) return '';
    return expr
        .replace(/\*/g, ' × ')
        .replace(/\//g, ' ÷ ')
        .replace(/\+/g, ' + ')
        .replace(/-/g, ' − ');
}

function calcInput(digit) {
    if (calcIsResultShown) {
        if (digit === '.') {
            calcCurrentVal = '0.';
        } else {
            calcCurrentVal = digit;
        }
        calcCurrentExpr = '';
        calcIsResultShown = false;
    } else {
        if (calcCurrentVal === '0' && digit !== '.') {
            calcCurrentVal = digit;
        } else if (digit === '.' && calcCurrentVal.includes('.')) {
            return;
        } else {
            calcCurrentVal += digit;
        }
    }
    updateCalcDisplay();
}

function calcAction(action) {
    if (action === 'clear') {
        calcCurrentExpr = '';
        calcCurrentVal = '0';
        calcIsResultShown = false;
        updateCalcDisplay();
        return;
    }

    if (action === 'backspace') {
        if (calcIsResultShown) {
            calcCurrentExpr = '';
            calcIsResultShown = false;
            updateCalcDisplay();
            return;
        }
        if (calcCurrentVal.length > 1) {
            calcCurrentVal = calcCurrentVal.slice(0, -1);
        } else if (calcCurrentVal !== '0') {
            calcCurrentVal = '0';
        } else if (calcCurrentExpr.length > 0) {
            // যদি কারেন্ট ভ্যালু 0 হয় কিন্তু পূর্ববর্তী রাশিতে অপারেটর থাকে
            calcCurrentExpr = calcCurrentExpr.slice(0, -1).trim();
            // শেষ সংখ্যাটি কারেন্ট ভ্যালুতে ফিরিয়ে নেওয়া
            const match = calcCurrentExpr.match(/(\d+\.?\d*)$/);
            if (match) {
                calcCurrentVal = match[1];
                calcCurrentExpr = calcCurrentExpr.slice(0, -match[1].length);
            }
        }
        updateCalcDisplay();
        return;
    }

    if (action === 'brackets') {
        const openCount = (calcCurrentExpr.match(/\(/g) || []).length;
        const closeCount = (calcCurrentExpr.match(/\)/g) || []).length;

        if (openCount > closeCount && calcCurrentVal !== '0') {
            calcCurrentExpr += calcCurrentVal + ')';
            calcCurrentVal = '0';
        } else {
            if (calcCurrentExpr && !/[+\-*/(]$/.test(calcCurrentExpr.trim())) {
                calcCurrentExpr += '*(';
            } else {
                calcCurrentExpr += '(';
            }
        }
        updateCalcDisplay();
        return;
    }

    if (['+', '-', '*', '/'].includes(action)) {
        if (calcIsResultShown) {
            calcCurrentExpr = calcCurrentVal + action;
            calcCurrentVal = '0';
            calcIsResultShown = false;
        } else {
            if (calcCurrentVal !== '0' || calcCurrentExpr === '' || calcCurrentExpr.endsWith(')')) {
                calcCurrentExpr += (calcCurrentVal !== '0' ? calcCurrentVal : '0') + action;
                calcCurrentVal = '0';
            } else if (calcCurrentExpr.length > 0 && /[+\-*/]$/.test(calcCurrentExpr)) {
                calcCurrentExpr = calcCurrentExpr.slice(0, -1) + action;
            }
        }
        updateCalcDisplay();
        return;
    }

    if (action === '%') {
        const num = parseFloat(calcCurrentVal);
        if (!isNaN(num)) {
            calcCurrentVal = String(num / 100);
            updateCalcDisplay();
        }
        return;
    }

    if (action === 'equals') {
        if (!calcCurrentExpr && !calcIsResultShown) return;

        let fullExpr = calcCurrentExpr + (calcCurrentVal !== '0' ? calcCurrentVal : '');
        // অতিরিক্ত ট্রেইলিং অপারেটর মুছে ফেলা
        fullExpr = fullExpr.replace(/[+\-*/]+$/, '');

        // অসমাপ্ত ব্র্যাকেট বন্ধ করা
        const openBrackets = (fullExpr.match(/\(/g) || []).length;
        const closeBrackets = (fullExpr.match(/\)/g) || []).length;
        if (openBrackets > closeBrackets) {
            fullExpr += ')'.repeat(openBrackets - closeBrackets);
        }

        try {
            const rawResult = safeMathEval(fullExpr);
            if (rawResult !== null && !isNaN(rawResult) && isFinite(rawResult)) {
                const formattedResult = Number.isInteger(rawResult)
                    ? rawResult.toString()
                    : parseFloat(rawResult.toFixed(4)).toString();

                addCalcHistory(fullExpr, formattedResult);
                calcCurrentExpr = fullExpr + ' =';
                calcCurrentVal = formattedResult;
                calcIsResultShown = true;
                updateCalcDisplay();
            } else {
                calcCurrentVal = 'Error';
                calcIsResultShown = true;
                updateCalcDisplay();
            }
        } catch (e) {
            calcCurrentVal = 'Error';
            calcIsResultShown = true;
            updateCalcDisplay();
        }
    }
}

function calcQuickAdd(amount) {
    const current = parseFloat(calcCurrentVal) || 0;
    calcCurrentVal = String(current + amount);
    calcIsResultShown = false;
    updateCalcDisplay();
}

function safeMathEval(expr) {
    // নিরাপত্তা চেক: শুধুমাত্র সংখ্যা, অপারেটর ও প্যারেন্থেসিস অনুমোদিত
    if (!/^[0-9+\-*/().\s%]+$/.test(expr)) return null;
    try {
        // Function constructor দিয়ে সুরক্ষিত গাণিতিক হিসাব
        const fn = new Function(`'use strict'; return (${expr});`);
        return fn();
    } catch {
        return null;
    }
}

function copyCalcResult() {
    const val = calcCurrentVal || '0';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(val).then(() => {
            showCalcCopyFeedback();
        }).catch(() => {
            fallbackCopyText(val);
        });
    } else {
        fallbackCopyText(val);
    }
}

function fallbackCopyText(text) {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showCalcCopyFeedback();
}

function showCalcCopyFeedback() {
    const btn = document.getElementById('calcCopyBtn');
    if (btn) {
        const origText = btn.textContent;
        btn.textContent = '✅ কপি!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = origText;
            btn.classList.remove('copied');
        }, 1400);
    }
}

function toggleCalcHistory() {
    const drawer = document.getElementById('calcHistoryDrawer');
    if (drawer) {
        drawer.classList.toggle('open');
    }
}

function addCalcHistory(expr, result) {
    calcHistory.unshift({ expr, result, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) });
    if (calcHistory.length > 25) calcHistory.pop();
    renderCalcHistory();
}

function clearCalcHistory() {
    calcHistory = [];
    renderCalcHistory();
}

function renderCalcHistory() {
    const listEl = document.getElementById('calcHistoryList');
    if (!listEl) return;

    if (calcHistory.length === 0) {
        listEl.innerHTML = '<div style="color:#94a3b8; font-size:11.5px; text-align:center; padding:8px 0;">কোন হিস্ট্রি নেই</div>';
        return;
    }

    listEl.innerHTML = calcHistory.map((item, idx) => `
        <div class="calc-history-item" onclick="loadCalcHistoryItem(${idx})">
            <span>${formatCalcExpr(item.expr)}</span>
            <strong style="color:#1d4ed8;">= ${item.result}</strong>
        </div>
    `).join('');
}

function loadCalcHistoryItem(idx) {
    if (calcHistory[idx]) {
        calcCurrentVal = calcHistory[idx].result;
        calcCurrentExpr = '';
        calcIsResultShown = false;
        updateCalcDisplay();
        const drawer = document.getElementById('calcHistoryDrawer');
        if (drawer) drawer.classList.remove('open');
    }
}

// কীবোর্ড শর্টকাট সাপোর্ট
document.addEventListener('keydown', (e) => {
    const widget = document.getElementById('floatingCalcWidget');
    if (!widget || widget.style.display !== 'flex') return;

    // ফর্ম ইনপুটে লিখার সময় ক্যালকুলেটর শর্টকাট ব্লক যেন না করে
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
    }

    if (e.key >= '0' && e.key <= '9') {
        calcInput(e.key);
    } else if (e.key === '.') {
        calcInput('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calcAction(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calcAction('equals');
    } else if (e.key === 'Backspace') {
        calcAction('backspace');
    } else if (e.key === 'Escape') {
        minimizeQuickCalc();
    }
});

// ড্র্যাগেবল ক্যালকুলেটর হেডার
(function initDraggableCalc() {
    const header = document.getElementById('calcHeader');
    const widget = document.getElementById('floatingCalcWidget');
    if (!header || !widget) return;

    let isDragging = false;
    let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

    header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.calc-hdr-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = widget.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        widget.style.bottom = 'auto';
        widget.style.right = 'auto';
        widget.style.left = initialLeft + 'px';
        widget.style.top = initialTop + 'px';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // স্ক্রিনের ভিতরে সীমাবদ্ধ রাখা
        newLeft = Math.max(10, Math.min(window.innerWidth - widget.offsetWidth - 10, newLeft));
        newTop = Math.max(10, Math.min(window.innerHeight - widget.offsetHeight - 10, newTop));

        widget.style.left = newLeft + 'px';
        widget.style.top = newTop + 'px';
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
})();

// ==========================================
// ⚡ গ্লোবাল লাইভ অটো-রিফ্রেশ ও রিক্যালকুলেশন ইঞ্জিন (Real-time Live Auto-Refresh)
// যেকোনো ফিল্ডে পরিবর্তন (মেশিন, কালার, সাইজ, কোয়ান্টিটি) সাথে সাথে রিয়েল-টাইমে রিফ্লেক্ট হবে
// ==========================================
(function initGlobalLiveAutoRefresh() {
    let debounceTimer = null;

    function getActiveModulePrefix() {
        const costingMode = document.getElementById('costingMode')?.value;
        switch (costingMode) {
            case 'memo_dual': return 'memo';
            case 'autocarbon_memo': return 'auto';
            case 'single_paper': return 'sp';
            case 'poster_handbill': return 'pos';
            case 'sticker_printing': return 'stk';
            case 'visiting_card': return 'vc';
            case 'calendar_printing': return 'cal';
            case 'pad_slip': return 'pad';
            case 'other_printing': return 'oth';
            default: return 'memo';
        }
    }

    function detectTargetPrefix(target) {
        if (!target || !target.id) return getActiveModulePrefix();
        const id = target.id;
        if (id.startsWith('sp_')) return 'sp';
        if (id.startsWith('pos_')) return 'pos';
        if (id.startsWith('stk_')) return 'stk';
        if (id.startsWith('vc_')) return 'vc';
        if (id.startsWith('cal_')) return 'cal';
        if (id.startsWith('pad_')) return 'pad';
        if (id.startsWith('auto_')) return 'auto';
        if (id.startsWith('oth_')) return 'oth';
        return 'memo';
    }

    function triggerModuleRecalculate(prefix, sourceElement) {
        const isManualMachineSelect = sourceElement && (
            sourceElement.id === 'plateType' || 
            sourceElement.id === `${prefix}_plateType` ||
            sourceElement.id.endsWith('_plateType')
        );

        // যদি ইউজার সরাসরি মেশিন পরিবর্তন না করে থাকেন (বরং কালার, সাইজ, কোয়ান্টিটি ইত্যাদি পরিবর্তন করেন),
        // তবে অপটিমাল মেশিন অটো-ডিটেক্ট হবে
        if (!isManualMachineSelect && typeof autoDetectOptimalMachine === 'function') {
            autoDetectOptimalMachine(prefix);
        }

        // প্লেট ও মেশিন ক্যাপাসিটি আপডেট
        if (typeof checkMachineCapacityWarningFor === 'function') {
            checkMachineCapacityWarningFor(prefix);
        }

        // সংশ্লিষ্ট মডিউলের হিসাব আপডেট
        switch (prefix) {
            case 'memo':
                if (typeof calculateCosting === 'function') calculateCosting();
                break;
            case 'auto':
                if (typeof calculateAutoCarbonCosting === 'function') calculateAutoCarbonCosting();
                break;
            case 'sp':
                if (typeof calculateSinglePaperCosting === 'function') calculateSinglePaperCosting();
                break;
            case 'pos':
                if (typeof calculatePosterCosting === 'function') calculatePosterCosting();
                break;
            case 'stk':
                if (!sourceElement || sourceElement.id !== 'stk_laminationCost') {
                    if (typeof updateStickerLaminationPreset === 'function') updateStickerLaminationPreset();
                }
                if (!sourceElement || sourceElement.id !== 'stk_cuttingCost') {
                    if (typeof updateStickerCuttingPreset === 'function') updateStickerCuttingPreset();
                }
                if (typeof calculateStickerCosting === 'function') calculateStickerCosting();
                break;
            case 'vc':
                if (typeof calculateVisitingCardCosting === 'function') calculateVisitingCardCosting();
                break;
            case 'cal':
                if (typeof calculateCalendarCosting === 'function') calculateCalendarCosting();
                break;
            case 'pad':
                if (typeof calculatePadSlipCosting === 'function') calculatePadSlipCosting();
                break;
            case 'oth':
                if (typeof calculateOtherPrintingCosting === 'function') calculateOtherPrintingCosting();
                break;
        }
    }

    function handleLiveInput(e) {
        const target = e.target;
        if (!target) return;

        // ক্যালকুলেটর উইজেট বা হিস্ট্রি ড্রয়ারের ভিতরের ইনপুট হলে উপেক্ষা করা
        if (target.closest && (target.closest('#floatingCalcWidget') || target.closest('#rateModal'))) return;

        // শুধু ফর্ম ইনপুট, সিলেক্ট বা টেক্সটএরিয়ার জন্য কাজ করবে
        const tag = target.tagName ? target.tagName.toLowerCase() : '';
        if (tag !== 'input' && tag !== 'select' && tag !== 'textarea') return;

        const prefix = detectTargetPrefix(target);

        // সিলেক্ট ড্রপডাউন, চেকবক্স বা রেডিও বাটন পরিবর্তনের ক্ষেত্রে সাথে সাথে (০ মিলিসেকেন্ড ল্যাগ ছাড়া) রিক্যালকুলেট হবে
        if (tag === 'select' || target.type === 'checkbox' || target.type === 'radio' || e.type === 'change') {
            clearTimeout(debounceTimer);
            triggerModuleRecalculate(prefix, target);
            return;
        }

        // টাইপিং ইনপুটের জন্য সুপার-ফাস্ট ৫০ মিলিসেকেন্ড ডিবউন্স
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            triggerModuleRecalculate(prefix, target);
        }, 50);
    }

    document.addEventListener('input', handleLiveInput, true);
    document.addEventListener('change', handleLiveInput, true);
})();



