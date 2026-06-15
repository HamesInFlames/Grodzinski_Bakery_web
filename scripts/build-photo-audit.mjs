/**
 * build-photo-audit.mjs — Product photo audit tool generator
 *
 * Builds a single self-contained `photo-audit.html` you can double-click to
 * open (no server, works offline). It shows every menu + holiday product in a
 * clickable tree, the photo currently linked to it, auto-flags photos that are
 * reused as stand-ins across products, and lets a reviewer set a status and
 * notes per item. Notes live in the browser (localStorage) and can be
 * exported/imported as JSON so several people can review and merge findings.
 *
 * Source of truth (read directly, so this stays in sync with the live site):
 *   - src/data/menuDisplay.ts     → MENU_GROUPS + HOLIDAY_SECTIONS
 *   - src/data/productPhotoMap.ts → PHOTO_BY_ID (item → photo filename)
 *   - public/images/products/     → which photo files actually exist on disk
 *
 * Run: npm run audit-photos   (or: node scripts/build-photo-audit.mjs)
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const MENU_PATH = resolve(ROOT, 'src/data/menuDisplay.ts');
const PHOTOMAP_PATH = resolve(ROOT, 'src/data/productPhotoMap.ts');
const PRODUCTS_DIR = resolve(ROOT, 'public/images/products');
const OUT_PATH = resolve(ROOT, 'photo-audit.html');
const PRODUCT_IMAGE_BASE = '/images/products';

// Keep identical to ProductShowcase.slugify / productPhotoMap.slugify.
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- Extract a JS array/object literal from a TS source file -----------------
//
// The three things we need (MENU_GROUPS, HOLIDAY_SECTIONS, PHOTO_BY_ID) are
// plain literals with no runtime references, so once we slice out the literal
// text we can eval it as JS. We scan from the `=` after the name to the first
// opening bracket, then walk to its matching close, respecting string quotes.

function extractLiteral(src, name) {
  const declIdx = src.indexOf(name);
  if (declIdx === -1) throw new Error(`Could not find ${name} in source`);
  const eqIdx = src.indexOf('=', declIdx);
  if (eqIdx === -1) throw new Error(`Could not find '=' after ${name}`);

  let i = eqIdx + 1;
  while (i < src.length && src[i] !== '[' && src[i] !== '{') i++;
  const open = src[i];
  const close = open === '[' ? ']' : '}';

  let depth = 0;
  let quote = null;
  let inLine = false;
  let inBlock = false;
  const start = i;
  for (; i < src.length; i++) {
    const c = src[i];
    const next = src[i + 1];
    if (inLine) { if (c === '\n') inLine = false; continue; }
    if (inBlock) { if (c === '*' && next === '/') { inBlock = false; i++; } continue; }
    if (quote) {
      if (c === '\\') { i++; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '/' && next === '/') { inLine = true; i++; continue; }
    if (c === '/' && next === '*') { inBlock = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) { i++; break; } }
  }
  const literal = src.slice(start, i);
  // eslint-disable-next-line no-eval
  return (0, eval)('(' + literal + ')');
}

// --- Load source data --------------------------------------------------------

const menuSrc = readFileSync(MENU_PATH, 'utf-8');
const photoSrc = readFileSync(PHOTOMAP_PATH, 'utf-8');

const MENU_GROUPS = extractLiteral(menuSrc, 'MENU_GROUPS');
const HOLIDAY_SECTIONS = extractLiteral(menuSrc, 'HOLIDAY_SECTIONS');
const PHOTO_BY_ID = extractLiteral(photoSrc, 'PHOTO_BY_ID');

// Files that actually exist on disk. Photos live in menu/ and holiday/
// sub-folders, so walk recursively and key by the path relative to
// PRODUCTS_DIR (posix-style), matching how PHOTO_BY_ID now stores filenames.
function walk(dir, prefix = '') {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...walk(resolve(dir, entry.name), rel));
    } else if (/\.(webp|png|jpe?g|avif|svg)$/i.test(entry.name)) {
      out.push(rel);
    }
  }
  return out;
}
const onDisk = new Set(walk(PRODUCTS_DIR));

// Flatten PHOTO_BY_ID into the same composite-key map getItemPhoto uses.
const photoMap = new Map();
for (const [id, items] of Object.entries(PHOTO_BY_ID)) {
  for (const [name, file] of Object.entries(items)) {
    photoMap.set(`${id}::${slugify(name)}`, file);
  }
}

function resolveFile(photoGroupId, name) {
  return photoMap.get(`${photoGroupId}::${slugify(name)}`); // filename or undefined
}

// --- Build the catalog (tree + flat item index) ------------------------------

const items = {}; // key -> { key, name, breadcrumb, file, exists, ... }
const fileUsage = new Map(); // filename -> [ {name, breadcrumb} ]

function addItem(key, name, breadcrumb, file) {
  if (!items[key]) {
    const exists = file ? onDisk.has(file) : false;
    items[key] = {
      key,
      name,
      breadcrumb,
      file: file || null,
      photoRel: file ? `public${PRODUCT_IMAGE_BASE}/${file}` : null,
      photoAbs: file ? `${PRODUCT_IMAGE_BASE}/${file}` : null,
      exists,
    };
  }
  if (file) {
    if (!fileUsage.has(file)) fileUsage.set(file, []);
    fileUsage.get(file).push({ key, name, breadcrumb });
  }
  return key;
}

const tree = [];

// Menu scope
const menuScope = { type: 'scope', label: 'Menu', children: [] };
for (const group of MENU_GROUPS) {
  const groupNode = { type: 'group', label: group.title, children: [] };
  for (const section of group.sections) {
    const photoGroupId = section.photoGroupId || group.id;
    const sectionNode = { type: 'section', label: section.heading, children: [] };
    for (const name of section.items) {
      const file = resolveFile(photoGroupId, name);
      const key = `${photoGroupId}::${slugify(name)}`;
      const breadcrumb = `${group.title} › ${section.heading}`;
      addItem(key, name, breadcrumb, file);
      sectionNode.children.push({ type: 'item', label: name, key });
    }
    groupNode.children.push(sectionNode);
  }
  menuScope.children.push(groupNode);
}
tree.push(menuScope);

// Holidays scope
const holidayScope = { type: 'scope', label: 'Holidays', children: [] };
for (const section of HOLIDAY_SECTIONS) {
  const sectionNode = { type: 'section', label: section.title, children: [] };
  for (const name of section.items) {
    const file = resolveFile(section.id, name);
    const key = `${section.id}::${slugify(name)}`;
    const breadcrumb = `Holidays › ${section.title}`;
    addItem(key, name, breadcrumb, file);
    sectionNode.children.push({ type: 'item', label: name, key });
  }
  holidayScope.children.push(sectionNode);
}
tree.push(holidayScope);

// Annotate each item with shared-stand-in info (same file used by >1 product).
for (const it of Object.values(items)) {
  if (!it.file) { it.shared = false; it.sharedWith = []; continue; }
  const users = fileUsage.get(it.file) || [];
  const others = users.filter((u) => u.key !== it.key).map((u) => `${u.name} (${u.breadcrumb})`);
  // de-dupe
  it.sharedWith = [...new Set(others)];
  it.shared = it.sharedWith.length > 0;
}

const totalItems = Object.keys(items).length;
const missingFiles = Object.values(items).filter((i) => !i.exists).length;
const sharedCount = Object.values(items).filter((i) => i.shared).length;

const DATA = { tree, items, totalItems, missingFiles, sharedCount };

// --- Emit the HTML -----------------------------------------------------------
//
// Client-side code below uses string concatenation (no backticks / ${}) so it
// passes through this generator's template literal untouched. The only
// interpolations are __DATA__ and __GENERATED__.

const jsonData = JSON.stringify(DATA);
const generatedAt = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' (regenerate with: npm run audit-photos)';

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Grodzinski — Product Photo Audit</title>
<style>
  :root {
    --gold: #b8902f; --gold-soft: #d8b75c; --ink: #1c1a17; --paper: #faf7f0;
    --line: #e7dec8; --muted: #8a8170;
    --good: #2e7d4f; --warn: #c9871f; --bad: #c0392b; --info: #2b6cb0;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font: 15px/1.5 -apple-system, "Segoe UI", Roboto, sans-serif;
         color: var(--ink); background: var(--paper); }
  header { padding: 18px 24px; border-bottom: 2px solid var(--gold);
           background: #fff; position: sticky; top: 0; z-index: 5; }
  header h1 { margin: 0; font: 600 20px/1 Georgia, "Times New Roman", serif; letter-spacing: .3px; }
  header h1 span { color: var(--gold); }
  .sub { color: var(--muted); font-size: 12.5px; margin-top: 4px; }
  .stats { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
  .stat { padding: 5px 11px; border-radius: 999px; font-size: 12.5px; font-weight: 600;
          border: 1px solid var(--line); background: #fff; cursor: pointer; user-select: none; }
  .stat .n { font-weight: 700; }
  .stat.active { outline: 2px solid var(--gold); }
  .stat .dot { display:inline-block; width:9px; height:9px; border-radius:50%; margin-right:6px; vertical-align:middle; }
  .toolbar { display:flex; gap:8px; align-items:center; margin-top:12px; flex-wrap:wrap; }
  .toolbar input[type=search] { flex: 1 1 220px; padding: 7px 11px; border:1px solid var(--line);
            border-radius: 8px; font-size: 14px; min-width: 180px; }
  button.act { padding: 7px 12px; border:1px solid var(--gold); background:#fff; color:var(--ink);
            border-radius: 8px; cursor:pointer; font-size:13px; font-weight:600; }
  button.act:hover { background: #fdf6e3; }
  .layout { display: grid; grid-template-columns: 380px 1fr; min-height: calc(100vh - 150px); }
  .tree { border-right: 1px solid var(--line); overflow-y: auto; padding: 10px 6px 60px; max-height: calc(100vh - 150px); }
  .node > .row { display:flex; align-items:center; gap:6px; padding:4px 8px; border-radius:7px; cursor:pointer; }
  .node > .row:hover { background:#f1ead8; }
  .twisty { width: 14px; display:inline-block; color: var(--muted); font-size: 11px; }
  .scope > .row { font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: .6px; color: var(--gold); }
  .group > .row { font-weight: 600; }
  .section > .row { color: #5a5444; }
  .children { margin-left: 16px; }
  .leaf { display:flex; align-items:center; gap:8px; padding:4px 8px; border-radius:7px; cursor:pointer; }
  .leaf:hover { background:#f1ead8; }
  .leaf.selected { background:#fbeec2; outline:1px solid var(--gold); }
  .leaf .sdot { width:9px; height:9px; border-radius:50%; flex:0 0 auto; border:1px solid rgba(0,0,0,.15); }
  .leaf .lbl { flex:1 1 auto; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .leaf .flag { font-size: 11px; }
  .hidden { display: none !important; }
  /* status colours */
  .s-unreviewed { background:#cfc9bb; } .s-good { background:var(--good); }
  .s-needs { background:var(--warn); } .s-missing { background:var(--bad); }
  /* detail */
  .detail { padding: 22px 26px; overflow-y:auto; max-height: calc(100vh - 150px); }
  .detail.empty { color: var(--muted); display:flex; align-items:center; justify-content:center; }
  .crumb { color: var(--muted); font-size: 12.5px; }
  .detail h2 { margin: 4px 0 14px; font: 600 24px/1.2 Georgia, serif; }
  .preview { display:flex; gap:22px; flex-wrap:wrap; align-items:flex-start; }
  .photoframe { width: 320px; height: 320px; border:1px solid var(--line); border-radius:12px;
                background:#fff repeating-linear-gradient(45deg,#fafafa,#fafafa 10px,#f3f3f3 10px,#f3f3f3 20px);
                display:flex; align-items:center; justify-content:center; overflow:hidden; }
  .photoframe img { max-width:100%; max-height:100%; object-fit:contain; }
  .noimg { color: var(--muted); font-size: 13px; text-align:center; padding: 0 16px; }
  .meta { flex:1 1 260px; min-width: 240px; }
  .badge { display:inline-block; padding:3px 9px; border-radius:999px; font-size:12px; font-weight:600;
           margin: 0 6px 6px 0; border:1px solid transparent; }
  .b-ok { background:#e6f4ec; color:var(--good); border-color:#bfe3cd; }
  .b-bad { background:#fbe9e7; color:var(--bad); border-color:#f3c4bd; }
  .b-warn { background:#fdf2dc; color:#9a6a12; border-color:#f1dca6; }
  .filename { font-family: ui-monospace, Consolas, monospace; font-size: 12.5px; color:#5a5444;
              background:#f3eedd; padding:2px 6px; border-radius:5px; }
  .sharedlist { font-size: 12.5px; color: var(--muted); margin-top:6px; }
  .sharedlist li { margin: 2px 0; }
  .field { margin-top: 22px; }
  .field label { display:block; font-weight:600; font-size:13px; margin-bottom:7px; }
  .statusbtns { display:flex; gap:8px; flex-wrap:wrap; }
  .sbtn { padding:7px 13px; border-radius:8px; border:1px solid var(--line); background:#fff;
          cursor:pointer; font-size:13px; font-weight:600; display:flex; align-items:center; gap:7px; }
  .sbtn .sdot { width:10px; height:10px; border-radius:50%; }
  .sbtn.on { color:#fff; border-color:transparent; }
  .sbtn.on.s-good { background:var(--good); } .sbtn.on.s-needs { background:var(--warn); }
  .sbtn.on.s-missing { background:var(--bad); } .sbtn.on.s-unreviewed { background:#8a8378; }
  textarea { width:100%; min-height:120px; padding:11px; border:1px solid var(--line); border-radius:8px;
             font: 14px/1.5 inherit; resize: vertical; }
  .saved { color: var(--good); font-size:12px; margin-left:8px; }
  footer { padding: 10px 24px; color: var(--muted); font-size:11.5px; border-top:1px solid var(--line); background:#fff; }
  @media (max-width: 820px){ .layout{ grid-template-columns:1fr; } .tree{ max-height:none; } }
</style>
</head>
<body>
<header>
  <h1><span>Grodzinski</span> — Product Photo Audit</h1>
  <div class="sub">Generated __GENERATED__ · <span id="genfacts"></span></div>
  <div class="stats" id="stats"></div>
  <div class="toolbar">
    <input type="search" id="search" placeholder="Search products…" />
    <button class="act" id="expandAll">Expand all</button>
    <button class="act" id="collapseAll">Collapse all</button>
    <button class="act" id="copyTodo">Copy to-do list</button>
    <button class="act" id="exportBtn">Export notes</button>
    <button class="act" id="importBtn">Import notes</button>
    <input type="file" id="importFile" accept="application/json" class="hidden" />
  </div>
</header>
<div class="layout">
  <div class="tree" id="tree"></div>
  <div class="detail empty" id="detail">Select a product on the left to review its photo.</div>
</div>
<footer id="footer"></footer>

<script>
var DATA = __DATA__;
var STORE_KEY = "grodzinski-photo-audit-v1";
var STATUS = {
  unreviewed: { label: "Unreviewed", cls: "s-unreviewed" },
  good:       { label: "Good", cls: "s-good" },
  needs:      { label: "Needs real photo", cls: "s-needs" },
  missing:    { label: "Missing / broken", cls: "s-missing" }
};
var STATUS_ORDER = ["unreviewed","good","needs","missing"];

function loadNotes(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch(e){ return {}; } }
function saveNotes(n){ localStorage.setItem(STORE_KEY, JSON.stringify(n)); }
var notes = loadNotes();

function getStatus(key){ return (notes[key] && notes[key].status) || "unreviewed"; }
function getNote(key){ return (notes[key] && notes[key].note) || ""; }

var selectedKey = null;
var activeFilter = null; // null = all, else a status key, or "shared"

// ---- Stats ----
function computeCounts(){
  var c = { total: DATA.totalItems, unreviewed:0, good:0, needs:0, missing:0, shared: DATA.sharedCount };
  for (var k in DATA.items){ c[getStatus(k)]++; }
  return c;
}
function renderStats(){
  var c = computeCounts();
  var defs = [
    { f:null, label:"All", n:c.total, dot:null },
    { f:"good", label:"Good", n:c.good, dot:"s-good" },
    { f:"needs", label:"Needs photo", n:c.needs, dot:"s-needs" },
    { f:"missing", label:"Missing", n:c.missing, dot:"s-missing" },
    { f:"unreviewed", label:"Unreviewed", n:c.unreviewed, dot:"s-unreviewed" },
    { f:"shared", label:"Shared stand-ins", n:c.shared, dot:null }
  ];
  var el = document.getElementById("stats");
  el.innerHTML = "";
  defs.forEach(function(d){
    var s = document.createElement("span");
    s.className = "stat" + (activeFilter === d.f ? " active" : "");
    s.innerHTML = (d.dot ? '<span class="dot '+d.dot+'"></span>' : "") + d.label + ' <span class="n">'+d.n+'</span>';
    s.onclick = function(){ activeFilter = (activeFilter === d.f ? null : d.f); renderStats(); applyFilter(); };
    el.appendChild(s);
  });
  document.getElementById("genfacts").textContent =
    DATA.totalItems + " products · " + DATA.sharedCount + " reuse a shared photo · " + DATA.missingFiles + " missing file(s)";
}

// ---- Tree ----
function itemMatchesFilter(key){
  if (!activeFilter) return true;
  if (activeFilter === "shared") return DATA.items[key].shared;
  return getStatus(key) === activeFilter;
}

function buildTree(){
  var root = document.getElementById("tree");
  root.innerHTML = "";
  DATA.tree.forEach(function(scope){ root.appendChild(renderNode(scope)); });
}

function renderNode(node){
  if (node.type === "item"){
    var leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.dataset.key = node.key;
    leaf.dataset.name = node.label.toLowerCase();
    var it = DATA.items[node.key];
    var flag = it.shared ? '<span class="flag" title="Photo shared with other products">♻︎</span>' : (it.exists ? "" : '<span class="flag" title="Photo file missing">⚠︎</span>');
    leaf.innerHTML = '<span class="sdot '+STATUS[getStatus(node.key)].cls+'"></span><span class="lbl">'+esc(node.label)+'</span>'+flag;
    leaf.onclick = function(){ selectItem(node.key); };
    return leaf;
  }
  var wrap = document.createElement("div");
  wrap.className = "node " + node.type;
  var row = document.createElement("div");
  row.className = "row";
  var collapsed = node.type === "section" ? false : false;
  row.innerHTML = '<span class="twisty">▾</span>' + esc(node.label);
  var kids = document.createElement("div");
  kids.className = "children";
  (node.children||[]).forEach(function(ch){ kids.appendChild(renderNode(ch)); });
  row.onclick = function(){
    var hide = kids.classList.toggle("hidden");
    row.querySelector(".twisty").textContent = hide ? "▸" : "▾";
  };
  wrap.appendChild(row);
  wrap.appendChild(kids);
  return wrap;
}

function applyFilter(){
  var q = (document.getElementById("search").value || "").toLowerCase().trim();
  var leaves = document.querySelectorAll(".leaf");
  leaves.forEach(function(leaf){
    var key = leaf.dataset.key;
    var okFilter = itemMatchesFilter(key);
    var okSearch = !q || leaf.dataset.name.indexOf(q) !== -1;
    leaf.classList.toggle("hidden", !(okFilter && okSearch));
  });
  // hide empty containers
  document.querySelectorAll(".node.section, .node.group, .node.scope").forEach(function(n){
    var anyVisible = n.querySelectorAll(".leaf:not(.hidden)").length > 0;
    n.classList.toggle("hidden", !anyVisible);
  });
}

function refreshLeafDot(key){
  document.querySelectorAll('.leaf[data-key="'+cssEsc(key)+'"] .sdot').forEach(function(d){
    d.className = "sdot " + STATUS[getStatus(key)].cls;
  });
}

// ---- Detail ----
function selectItem(key){
  selectedKey = key;
  document.querySelectorAll(".leaf").forEach(function(l){ l.classList.toggle("selected", l.dataset.key === key); });
  var it = DATA.items[key];
  var d = document.getElementById("detail");
  d.classList.remove("empty");

  var imgHtml;
  if (it.photoRel){
    imgHtml = '<img src="'+esc(it.photoRel)+'" alt="" data-fallback="'+esc(it.photoAbs)+'" '+
              'onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src=this.dataset.fallback;}else{this.style.display=\\'none\\';this.parentNode.innerHTML=\\'<div class=noimg>Image not found.<br>'+esc(it.file||"")+'</div>\\';}">';
  } else {
    imgHtml = '<div class="noimg">No photo linked to this product.</div>';
  }

  var badges = "";
  if (it.file){
    badges += it.exists ? '<span class="badge b-ok">✓ File on disk</span>' : '<span class="badge b-bad">✗ File missing</span>';
    if (it.shared) badges += '<span class="badge b-warn">♻︎ Shared stand-in</span>';
  } else {
    badges += '<span class="badge b-bad">No photo mapped</span>';
  }

  var sharedHtml = "";
  if (it.shared){
    sharedHtml = '<div class="sharedlist">This same photo is also used by:<ul>' +
      it.sharedWith.map(function(s){ return "<li>"+esc(s)+"</li>"; }).join("") +
      '</ul>Likely a placeholder — each probably needs its own photo.</div>';
  }

  var statusBtns = STATUS_ORDER.map(function(s){
    var on = getStatus(key) === s ? " on " + STATUS[s].cls : "";
    return '<button class="sbtn'+on+'" data-status="'+s+'"><span class="sdot '+STATUS[s].cls+'"></span>'+STATUS[s].label+'</button>';
  }).join("");

  d.innerHTML =
    '<div class="crumb">'+esc(it.breadcrumb)+'</div>' +
    '<h2>'+esc(it.name)+'</h2>' +
    '<div class="preview">' +
      '<div class="photoframe">'+imgHtml+'</div>' +
      '<div class="meta">' +
        '<div>'+badges+'</div>' +
        (it.file ? '<div style="margin-top:6px">Linked file: <span class="filename">'+esc(it.file)+'</span></div>' : "") +
        sharedHtml +
        '<div class="field"><label>Review status</label><div class="statusbtns">'+statusBtns+'</div></div>' +
      '</div>' +
    '</div>' +
    '<div class="field"><label>Notes <span class="saved" id="savedFlag"></span></label>' +
      '<textarea id="noteBox" placeholder="e.g. \\'Real Honey Cake photo needed — currently showing carrot cake.\\'">'+esc(getNote(key))+'</textarea></div>';

  d.querySelectorAll(".sbtn").forEach(function(b){
    b.onclick = function(){ setStatus(key, b.dataset.status); };
  });
  var box = document.getElementById("noteBox");
  var t;
  box.addEventListener("input", function(){
    clearTimeout(t);
    t = setTimeout(function(){ setNote(key, box.value); flashSaved(); }, 350);
  });
}

function flashSaved(){
  var f = document.getElementById("savedFlag");
  if (!f) return;
  f.textContent = "saved ✓";
  setTimeout(function(){ if(f) f.textContent = ""; }, 1400);
}

function ensure(key){ if (!notes[key]) notes[key] = { status:"unreviewed", note:"" }; return notes[key]; }
function setStatus(key, s){ ensure(key).status = s; ensure(key).updated = nowStr(); saveNotes(notes); refreshLeafDot(key); renderStats(); applyFilter(); if (selectedKey===key) selectItem(key); }
function setNote(key, v){ ensure(key).note = v; ensure(key).updated = nowStr(); saveNotes(notes); }

function nowStr(){ return new Date().toISOString().slice(0,16).replace("T"," "); }

// ---- Export / Import / To-do ----
function download(name, text){
  var blob = new Blob([text], {type:"application/json"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1000);
}
document.getElementById("exportBtn").onclick = function(){
  download("grodzinski-photo-notes.json", JSON.stringify(notes, null, 2));
};
document.getElementById("importBtn").onclick = function(){ document.getElementById("importFile").click(); };
document.getElementById("importFile").onchange = function(e){
  var file = e.target.files[0]; if (!file) return;
  var r = new FileReader();
  r.onload = function(){
    try {
      var incoming = JSON.parse(r.result);
      var added = 0;
      for (var k in incoming){
        // newest-wins merge by 'updated' timestamp when both present
        if (!notes[k] || ((incoming[k].updated||"") > (notes[k].updated||""))){ notes[k] = incoming[k]; added++; }
      }
      saveNotes(notes);
      buildTree(); renderStats(); applyFilter();
      if (selectedKey) selectItem(selectedKey);
      alert("Imported / merged " + added + " note(s).");
    } catch(err){ alert("Could not read that file: " + err.message); }
  };
  r.readAsText(file);
  e.target.value = "";
};
document.getElementById("copyTodo").onclick = function(){
  var lines = ["# Grodzinski photo to-do", ""];
  var groups = { needs:"## Needs a real photo", missing:"## Missing / broken", unreviewed:"## Not yet reviewed" };
  ["needs","missing","unreviewed"].forEach(function(st){
    var rows = [];
    for (var k in DATA.items){ if (getStatus(k)===st){ var it=DATA.items[k]; var note=getNote(k);
      rows.push("- [ ] " + it.name + " (" + it.breadcrumb + ")" + (it.file?" — "+it.file:"") + (note?" — "+note:"")); } }
    if (rows.length){ lines.push(groups[st]); lines = lines.concat(rows); lines.push(""); }
  });
  var text = lines.join("\\n");
  navigator.clipboard.writeText(text).then(
    function(){ alert("To-do list copied to clipboard ("+ (lines.length) +" lines)."); },
    function(){ prompt("Copy the to-do list:", text); }
  );
};

document.getElementById("search").addEventListener("input", applyFilter);
document.getElementById("expandAll").onclick = function(){
  document.querySelectorAll(".children").forEach(function(c){ c.classList.remove("hidden"); });
  document.querySelectorAll(".twisty").forEach(function(t){ t.textContent="▾"; });
};
document.getElementById("collapseAll").onclick = function(){
  document.querySelectorAll(".node.group .children, .node.section .children").forEach(function(c){ c.classList.add("hidden"); });
  document.querySelectorAll(".node.group > .row .twisty, .node.section > .row .twisty").forEach(function(t){ t.textContent="▸"; });
};

// ---- utils ----
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function cssEsc(s){ return String(s).replace(/"/g,'\\\\"'); }

// ---- boot ----
document.getElementById("footer").textContent =
  "Tip: open this file by double-clicking it. Notes are saved in this browser only — use Export to share, Import to merge a colleague's review.";
renderStats();
buildTree();
applyFilter();
</script>
</body>
</html>`;

const out = html.replace('__DATA__', jsonData).replace('__GENERATED__', generatedAt);
writeFileSync(OUT_PATH, out, 'utf-8');

// --- Report ------------------------------------------------------------------
console.log('photo-audit.html generated.');
console.log('  Products in catalog:        ' + totalItems);
console.log('  Photos reused (stand-ins):  ' + sharedCount);
console.log('  Mapped files missing on disk: ' + missingFiles);
console.log('  Output: ' + OUT_PATH);
