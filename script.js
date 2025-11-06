/* =========================================================
   ShihTzuShop — Cards + Modal + Comparador Multilojas
   (Atual) — mantém todas as suas funções + adiciona comparador
   ========================================================= */

/* ========= CSS: +30% nos botões/logo (desktop/tablet/mobile) ========= */
(function injectFiltroCSS(){
  const id = 'filtros-logo-only';
  document.querySelector(`style[data-${id}]`)?.remove();

  const css = `
    /* Container */
    #filtroOrigem{
      display:flex; flex-wrap:wrap; gap:12px; width:100%; align-items:center;
    }

    /* Cápsula responsiva */
    #filtroOrigem label{
      display:inline-flex; align-items:center; justify-content:center;
      padding:12px 14px;
      border-radius:16px; border:1.5px solid #e5e7eb; background:#fff;
      cursor:pointer; user-select:none; overflow:hidden;
      max-width:182px; min-width:83px;
      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;
    }
    @media (min-width:1025px){
      #filtroOrigem label:hover{ transform: translateY(-2px) scale(1.02); box-shadow: 0 10px 18px rgba(0,0,0,.10); }
    }

    /* Logo */
    #filtroOrigem label img.filtro-logo{
      display:block; object-fit:contain; pointer-events:none;
      max-width:100%; height:auto; max-height:57px;
    }
    @media (max-width:1024px){
      #filtroOrigem{ gap:11px; }
      #filtroOrigem label{ padding:11px 12px; border-radius:14px; max-width:156px; min-width:78px; }
      #filtroOrigem label img.filtro-logo{ max-height:52px; }
    }
    @media (max-width:640px){
      #filtroOrigem{ gap:9px; }
      #filtroOrigem label{ padding:10px 11px; border-radius:12px; max-width:135px; min-width:73px; }
      #filtroOrigem label img.filtro-logo{ max-height:47px; }
    }

    /* Sem texto no botão */
    #filtroOrigem label .texto{ display:none !important; }

    /* Realce comum quando ATIVO (vale para todas as marcas) */
    #filtroOrigem label.ativo{
      border-width:2px;
      transform: translateY(-1px);
      box-shadow: 0 0 0 3px var(--ring, rgba(0,0,0,.08)), 0 6px 14px rgba(0,0,0,.12);
    }

    /* ===== Ativos por marca ===== */
    #filtroOrigem label.ativo[data-src="shopee"]{ --ring: rgba(238,77,45,.18); background: linear-gradient(145deg,#FFF0E6,#FFE5DA); color:#7A1A0F; border-color:#EE4D2D; }
    #filtroOrigem label.ativo[data-src="petlove"]{ --ring: rgba(0,174,239,.16); background: linear-gradient(145deg,#E6F7FF,#BDEBFF); color:#005C87; border-color:#00AEEF; }
    #filtroOrigem label.ativo[data-src="amazon"]{ --ring: rgba(58,69,83,.18); background: linear-gradient(145deg,#ECEFF1,#CFD8DC); color:#111; border-color:#3A4553; }
    #filtroOrigem label.ativo[data-src="mercadolivre"]{ --ring: rgba(255,230,0,.22); background: linear-gradient(145deg,#FFF9C8,#FFE600); color:#0B4EA2; border-color:#FFE600; }
    #filtroOrigem label.ativo[data-src="magalu"]{ --ring: rgba(25,118,210,.18); background: linear-gradient(145deg,#E5F2FF,#BFE0FF); color:#0D47A1; border-color:#1976D2; }
    #filtroOrigem label.ativo[data-src="petz"]{ --ring: rgba(0,178,255,.18); background: linear-gradient(145deg,#E9F6FF,#CDECFF); color:#004E92; border-color:#00B2FF; }
    #filtroOrigem label.ativo[data-src="cobasi"]{ --ring: rgba(0,119,190,.18); background: linear-gradient(145deg,#E6F2FF,#CFE6FF); color:#005A8C; border-color:#0077BE; }
    #filtroOrigem label.ativo[data-src="americanas"]{ --ring: rgba(213,0,0,.18); background: linear-gradient(145deg,#FFE1E1,#FFCACA); color:#8F1010; border-color:#D50000; }
    #filtroOrigem label.ativo[data-src="aliexpress"]{ --ring: rgba(255,90,0,.18); background: linear-gradient(145deg,#FFEEE2,#FFE0CC); color:#B33A12; border-color:#FF5A00; }
    #filtroOrigem label.ativo[data-src="carrefour"]{ --ring: rgba(0,94,184,.18); background: linear-gradient(145deg,#E7F1FF,#D7E9FF); color:#003B73; border-color:#005EB8; }
    #filtroOrigem label.ativo[data-src="casasbahia"]{ --ring: rgba(0,51,160,.18); background: linear-gradient(145deg,#E7EDFF,#D8E4FF); color:#001A66; border-color:#0033A0; }
    #filtroOrigem label.ativo[data-src="ponto"]{ --ring: rgba(255,106,42,.18); background: linear-gradient(145deg,#FFE8D9,#FFD8BF); color:#6B2E00; border-color:#FF6A2A; }
  `;
  const style = document.createElement('style');
  style.setAttribute(`data-${id}`,'true');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ================== IDENTIDADE POR LOJA ================== */
const STORE_META = {
  shopee: { nome:"Shopee", corBorda:"#EE4D2D", corTexto:"#8B1F0D", bgCard:"linear-gradient(to bottom,#FF8A70,#FFD3C9)", logo:"logos/shopee.svg", btn:["#EE4D2D","#FF7B5F"], off:"#7A1A0F" },
  petlove:{ nome:"Petlove", corBorda:"#00AEEF", corTexto:"#0070A8", bgCard:"linear-gradient(to bottom,#00AEEF,#B3ECFF)", logo:"logos/petlove.svg", btn:["#00AEEF","#4FC3F7"], off:"#0070A8" },
  amazon: { nome:"Amazon", corBorda:"#232F3E", corTexto:"#FF9900", bgCard:"linear-gradient(to bottom,#232F3E,#3A4553)", logo:"logos/amazon.svg", btn:["#232F3E","#3A4553"], off:"#FF9900" },
  mercadolivre:{ nome:"Mercado Livre", corBorda:"#FFE600", corTexto:"#0B4EA2", bgCard:"linear-gradient(to bottom,#FFF6A6,#FFE600)", logo:"logos/mercadolivre.svg", btn:["#FFE600","#FFE24A"], off:"#0B4EA2" },
  magalu: { nome:"Magalu", corBorda:"#1976D2", corTexto:"#0D47A1", bgCard:"linear-gradient(to bottom,#2196F3,#6EC6FF)", logo:"logos/magalu.svg", btn:["#1976D2","#64B5F6"], off:"#0D47A1" },
  petz:  { nome:"Petz", corBorda:"#00B2FF", corTexto:"#004E92", bgCard:"linear-gradient(to bottom,#B3E5FF,#E6F5FF)", logo:"logos/petz.svg", btn:["#00B2FF","#66CCFF"], off:"#004E92" },
  cobasi:{ nome:"Cobasi", corBorda:"#0077BE", corTexto:"#005A8C", bgCard:"linear-gradient(to bottom,#B3DBFF,#E8F3FF)", logo:"logos/cobasi.svg", btn:["#0077BE","#66AEE6"], off:"#005A8C" },
  americanas:{ nome:"Americanas", corBorda:"#D50000", corTexto:"#B71C1C", bgCard:"linear-gradient(to bottom,#FFCCCC,#FFE6E6)", logo:"logos/americanas.svg", btn:["#D50000","#FF5252"], off:"#B71C1C" },
  aliexpress:{ nome:"AliExpress", corBorda:"#FF5A00", corTexto:"#D84315", bgCard:"linear-gradient(to bottom,#FFD5BF,#FFF0E6)", logo:"logos/aliexpress.svg", btn:["#FF5A00","#FF8A50"], off:"#D84315" },
  carrefour:{ nome:"Carrefour", corBorda:"#005EB8", corTexto:"#003B73", bgCard:"linear-gradient(to bottom,#CFE8FF,#EAF3FF)", logo:"logos/carrefour.svg", btn:["#005EB8","#4EA3FF"], off:"#003B73" },
  casasbahia:{ nome:"Casas Bahia", corBorda:"#0033A0", corTexto:"#001A66", bgCard:"linear-gradient(to bottom,#D0DBFF,#EEF3FF)", logo:"logos/casasbahia.svg", btn:["#0033A0","#4D6DFF"], off:"#001A66" },
  ponto: { nome:"Ponto", corBorda:"#111111", corTexto:"#FF5500", bgCard:"linear-gradient(to bottom,#F0F0F0,#FFFFFF)", logo:"logos/ponto.svg", btn:["#111111","#444444"], off:"#FF5500" },
};

/* ===================== PRODUTOS (exemplos) ===================== */
const produtos = [
  { tipo:"shopee", nome:"Laços Premium — kit 20 un. (cores sortidas)", precoAntigo:69.90, precoAtual:39.90, desconto:"43% OFF", parcelas:"6x sem juros", detalhes:["Elástico macio","Não puxa o pelo","Cores vivas"], imagem:"https://images.unsplash.com/photo-1596495578065-8c1b2f6a3513?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"shopee", nome:"Peitoral Conforto X-Soft (PP/P) — Anti-puxão", precoAntigo:89.90, precoAtual:54.90, desconto:"39% OFF", parcelas:"6x sem juros", detalhes:["Ajuste rápido","Almofadado","Anel em metal"], imagem:"https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"petlove", nome:"Shampoo Hipoalergênico (300ml) — Pelos longos", precoAntigo:54.90, precoAtual:39.90, desconto:"27% OFF", parcelas:"3x sem juros", detalhes:["pH balanceado","Sem parabenos","Cheiro suave"], imagem:"https://images.unsplash.com/photo-1625314887424-9f189ffd40dc?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"petlove", nome:"Cama Donut Antiestresse (P) — Bege", precoAntigo:189.90, precoAtual:129.90, desconto:"32% OFF", parcelas:"6x sem juros", detalhes:["Tecido soft","Antiderrapante","Zíper para lavar"], imagem:"https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"amazon", nome:"Escova Slicker + Pente 2 em 1 — Anti-embolo", precoAntigo:59.90, precoAtual:39.90, desconto:"33% OFF", parcelas:"Em até 10x", detalhes:["Cerdas macias","Cabo ergonômico"], imagem:"https://images.unsplash.com/photo-1567359781514-3b964e06a3ab?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"amazon", nome:"Hidratante de Almofadinhas (50g) — Natural", precoAntigo:49.90, precoAtual:31.90, desconto:"36% OFF", parcelas:"Em até 10x", detalhes:["Manteiga de karité","Sem álcool"], imagem:"https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=800&auto=format&fit=crop", link:"#"},
  /* ====== Produto “igual” em várias lojas (para demo do comparador) ====== */
  { tipo:"magalu", nome:"Simparic Antipulgas 10,1 a 20kg (40mg) — 3 comprimidos", precoAntigo:298.90, precoAtual:251.01, desconto:"16% OFF", parcelas:"1x R$278,90 sem juros", detalhes:["Ação rápida por até 35 dias","Protege contra pulgas, carrapatos e sarna","Comprimido mastigável saborizado","Indicado para cães de 10,1 a 20kg","Fabricante: Zoetis"], imagem:"https://a-static.mlcdn.com.br/800x560/simparic-antipulgas-para-caes-de-101-a-20kg-40mg-cx-com-3-compr-zoetis/petcaoricica/230be688263311eebbb14201ac185049/b100a43bbc606eff93b937122c907436.jpeg", link:"https://divulgador.magalu.com/JSpImZ78"},
  { tipo:"americanas", nome:"Simparic Antipulgas 10,1 a 20kg (40mg) — 3 comprimidos", precoAntigo:309.90, precoAtual:259.90, desconto:"", parcelas:"Em até 10x", detalhes:["1 caixa com 3 comprimidos","Zoetis"], imagem:"https://a-static.mlcdn.com.br/800x560/simparic-antipulgas-para-caes-de-101-a-20kg-40mg-cx-com-3-compr-zoetis/petcaoricica/230be688263311eebbb14201ac185049/b100a43bbc606eff93b937122c907436.jpeg", link:"#"},
  { tipo:"amazon", nome:"Simparic Antipulgas 10,1 a 20kg (40mg) — 3 comprimidos", precoAntigo:299.90, precoAtual:247.50, desconto:"", parcelas:"Em até 10x", detalhes:["Zoetis • 3 comprimidos"], imagem:"https://a-static.mlcdn.com.br/800x560/simparic-antipulgas-para-caes-de-101-a-20kg-40mg-cx-com-3-compr-zoetis/petcaoricica/230be688263311eebbb14201ac185049/b100a43bbc606eff93b937122c907436.jpeg", link:"#"},
  { tipo:"mercadolivre", nome:"Simparic Antipulgas 10,1 a 20kg (40mg) — 3 comprimidos", precoAntigo:310.00, precoAtual:268.90, desconto:"", parcelas:"10x sem juros", detalhes:["Original Zoetis"], imagem:"https://a-static.mlcdn.com.br/800x560/simparic-antipulgas-para-caes-de-101-a-20kg-40mg-cx-com-3-compr-zoetis/petcaoricica/230be688263311eebbb14201ac185049/b100a43bbc606eff93b937122c907436.jpeg", link:"#"},
  /* ====== Fim do grupo de comparação ====== */
  { tipo:"mercadolivre", nome:"Conjunto Bandana + Gravata (3 peças) — Shih Tzu", precoAntigo:49.90, precoAtual:32.90, desconto:"34% OFF", parcelas:"10x sem juros", detalhes:["Tecido respirável","Lavável","Ajuste com velcro"], imagem:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"petz", nome:"Tapete Higiênico Premium p/ Cães (30 un.)", precoAntigo:119.90, precoAtual:89.90, parcelas:"3x sem juros", detalhes:["Gel superabsorvente","Adesivo antideslizante","Neutraliza odores"], imagem:"https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"petz", nome:"Escova Dupla — Macia & Pinos (p/ pelos longos)", precoAntigo:69.90, precoAtual:44.90, parcelas:"4x sem juros", detalhes:["Remoção de nós","Evita quebra do pelo","Cabo ergonômico"], imagem:"https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"cobasi", nome:"Bebedouro Portátil Retrátil — Passeios", precoAntigo:79.90, precoAtual:49.90, parcelas:"3x sem juros", detalhes:["Livre de BPA","Trava anti-vazamento","Ideal para viagens"], imagem:"https://images.unsplash.com/photo-1583511655867-9b681b2d7239?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"cobasi", nome:"Lenços Umedecidos p/ Patas e Focinho (100 un.)", precoAntigo:59.90, precoAtual:34.90, parcelas:"3x sem juros", detalhes:["Aloe vera","Sem álcool","Uso diário"], imagem:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"americanas", nome:"Kit Banho: Shampoo + Condicionador — Pelos Sedosos", precoAntigo:79.90, precoAtual:52.90, parcelas:"Em até 10x", detalhes:["Brilho e maciez","Sem parabenos","Aroma suave"], imagem:"https://images.unsplash.com/photo-1556229060-3f04231b39d0?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"americanas", nome:"Corta Unhas com Trava de Segurança — Shih Tzu", precoAntigo:49.90, precoAtual:29.90, parcelas:"Em até 10x", detalhes:["Lâmina afiada","Cabo antiderrapante","Uso doméstico"], imagem:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"aliexpress", nome:"Coleira com Plaquinha Personalizada — Anti-Perda", precoAntigo:69.90, precoAtual:35.90, parcelas:"Em até 6x", detalhes:["Gravação do nome","Ajuste macio","Várias cores"], imagem:"https://images.unsplash.com/photo-1543796076-2a4270f1502b?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"aliexpress", nome:"Macacão de Tricô para Inverno — Tamanho P", precoAntigo:89.90, precoAtual:49.90, parcelas:"Em até 6x", detalhes:["Quentinho","Confortável","Não prende os pelos"], imagem:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"carrefour", nome:"Comedouro Antivoracidade — Médio", precoAntigo:69.90, precoAtual:39.90, parcelas:"3x sem juros", detalhes:["Reduz ansiedade ao comer","Base antiderrapante","Fácil de lavar"], imagem:"https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"carrefour", nome:"Escova para Desembolar Nós — Uso Diário", precoAntigo:64.90, precoAtual:34.90, parcelas:"3x sem juros", detalhes:["Minimiza queda de pelos","Ideal para pelagem longa","Cabo confortável"], imagem:"https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"casasbahia", nome:"Kit Higiene Bucal — Pasta + Escova", precoAntigo:59.90, precoAtual:36.90, parcelas:"4x sem juros", detalhes:["Ação antitártaro","Sabor agradável","Uso fácil"], imagem:"https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"casasbahia", nome:"Toalha de Microfibra — Secagem Rápida", precoAntigo:49.90, precoAtual:27.90, parcelas:"4x sem juros", detalhes:["Superabsorvente","Antiodor","Tamanho P (50×90cm)"], imagem:"https://images.unsplash.com/photo-1543357530-d91dab30fa50?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"ponto", nome:"Caminha Retangular — Confort P", precoAntigo:159.90, precoAtual:109.90, parcelas:"6x sem juros", detalhes:["Espuma de alta densidade","Zíper para lavar","Tecido antialérgico"], imagem:"https://images.unsplash.com/photo-1620088809808-5850b89cd87a?q=80&w=800&auto=format&fit=crop", link:"#"},
  { tipo:"ponto", nome:"Escova Removedora de Pelos — Reutilizável", precoAntigo:79.90, precoAtual:39.90, parcelas:"6x sem juros", detalhes:["Remove pelos de sofás/roupas","Sem refis","Lavagem rápida"], imagem:"https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=800&auto=format&fit=crop", link:"#"}
];

/* ===================== UTILS ===================== */
const el  = (sel, root=document) => root.querySelector(sel);
const fmt = (n) => `R$ ${Number(n).toFixed(2)}`;

const IMG_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="220">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <g fill="#9ca3af" transform="translate(150 110)">
      <circle r="22" cx="-55" cy="-25"/><circle r="22" cx="-20" cy="-40"/>
      <circle r="22" cx="20" cy="-40"/><circle r="22" cx="55" cy="-25"/>
      <circle r="38"/>
    </g>
  </svg>`);

/* cria <img> com lazy, onload/onerror e esqueleto */
function buildImg(src, alt, className=""){
  const wrap = document.createElement("div");
  wrap.className = "card-img-wrap skel w-full h-24 sm:h-28 flex items-center justify-center";
  const img = document.createElement("img");
  img.loading = "lazy"; img.decoding = "async";
  img.referrerPolicy = "no-referrer";
  img.src = src || IMG_PLACEHOLDER;
  img.alt = alt || "";
  img.className = `card-img ${className}`;
  img.onerror = () => { img.src = IMG_PLACEHOLDER; };
  img.onload = () => { wrap.classList.remove("skel"); };
  wrap.appendChild(img);
  return wrap;
}

/* badge de desconto (opcional) */
function buildRibbon(desconto){
  if(!desconto) return null;
  const r = document.createElement("div");
  r.className = "ribbon";
  r.textContent = desconto;
  return r;
}

/* calcula % OFF se vier vazio mas houver preço antigo */
function autoFillDiscount(p){
  if ((!p.desconto || p.desconto.trim()==="") && p.precoAntigo && p.precoAntigo>p.precoAtual){
    const pct = Math.round((1 - (p.precoAtual / p.precoAntigo))*100);
    p.desconto = `${pct}% OFF`;
  }
  return p;
}

function attachLogoFallback(imgEl){
  if (!imgEl) return;
  imgEl.onerror = () => {
    const PAW =
      'data:image/svg+xml;utf8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
          <rect width="100%" height="100%" fill="#fff"/>
          <g fill="#9ca3af" transform="translate(48 50)">
            <circle r="10" cx="-22" cy="-10"/><circle r="10" cx="-8" cy="-18"/>
            <circle r="10" cx="8" cy="-18"/><circle r="10" cx="22" cy="-10"/>
            <circle r="18" cx="0" cy="8"/>
          </g>
        </svg>`);
    imgEl.src = PAW; imgEl.classList.add('filtro-logo');
    const label = imgEl.closest('label');
    if (label) label.style.visibility = 'visible';
  };
}

/* ===================== BANNERS ===================== */
function renderBanner(containerId, tipos) {
  const faixa = el(`#${containerId}`); if (!faixa) return;
  faixa.innerHTML = "";

  produtos.filter(p => tipos.includes(p.tipo)).forEach(obj => {
    const p = autoFillDiscount({...obj});
    const meta = STORE_META[p.tipo];
    const card = document.createElement("div");
    card.className = "relative rounded-lg flex-shrink-0 w-28 sm:w-36 p-1 cursor-pointer hover:scale-105 transition";
    card.style.border = `2px solid ${meta.corBorda}80`;
    card.style.boxShadow = `0 1px 4px rgba(0,0,0,.08)`;

    const imgWrap = buildImg(p.imagem, p.nome);
    imgWrap.style.background = meta.bgCard;
    card.appendChild(imgWrap);
    const ribbon = buildRibbon(p.desconto); if(ribbon) card.appendChild(ribbon);

    const seloWrap = document.createElement("div");
    seloWrap.className = "mt-1 card-selo";
    seloWrap.innerHTML = `<img src="${meta.logo}" class="card-logo" alt="${meta.nome}">`;
    card.appendChild(seloWrap);
    attachLogoFallback(seloWrap.querySelector("img"));

    card.insertAdjacentHTML("beforeend", `
      <h2 class="text-[10px] font-semibold text-center line-clamp-2 h-8 text-gray-800 mt-1">${p.nome}</h2>
      <p class="card-old">${p.precoAntigo ? fmt(p.precoAntigo) : ""}</p>
      <p class="card-price" style="color:${meta.corTexto}">${fmt(p.precoAtual)}</p>
      <span class="card-off" style="color:${meta.off}">${p.desconto || ""}</span>
    `);

    card.addEventListener("click", () => openModal(p));
    faixa.appendChild(card);
  });
}

/* ===================== NORMALIZAÇÃO p/ COMPARAÇÃO ===================== */
/* Prioridade: se existir p.sku ou p.key, usar; senão derivar do nome */
function normalizeKey(obj){
  if (obj.sku) return `sku:${String(obj.sku).trim().toLowerCase()}`;
  if (obj.key) return `key:${String(obj.key).trim().toLowerCase()}`;

  let name = (obj.nome || "").toLowerCase();

  // remove conteúdos entre parênteses (ex.: (40mg), (300ml))
  name = name.replace(/\([^)]*\)/g, " ");
  // remove travessões/dashes e variantes
  name = name.replace(/[—–\-]/g, " ");
  // remove tamanhos/cor comuns
  name = name.replace(/\b(pp|p|m|g|gg|xg|xl|xxl|preto|branco|bege|azul|rosa|vermelho)\b/g, " ");
  // remove números isolados sem contexto (deixa 10,1 a 20kg, 40mg, 3 comprimidos)
  // preserva padrões com kg, mg, ml e "comprimid" na mesma palavra
  name = name.replace(/\b(\d+(?:,\d+)?)\b(?!\s*(kg|mg|ml|comprimid))/g, " ");

  // colapsa espaços
  name = name.replace(/\s+/g, " ").trim();

  // pega até 6 tokens mais relevantes
  const tokens = name.split(" ").filter(Boolean);
  return "nm:" + tokens.slice(0, 6).join(" ");
}

function groupByKey(list){
  const map = new Map();
  list.forEach(p=>{
    const k = normalizeKey(p);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(p);
  });
  return map;
}

function comparablesFor(product, list=produtos){
  const key = normalizeKey(product);
  return groupByKey(list).get(key) || [];
}

/* ===================== LISTA PRINCIPAL ===================== */
function renderLista(lista) {
  const wrap = el("#listaProdutos"); if (!wrap) return;
  wrap.innerHTML = "";
  lista.forEach(obj => {
    const p = autoFillDiscount({...obj});
    const meta = STORE_META[p.tipo];

    const card = document.createElement("div");
    card.className = "relative card-geral p-1";
    card.style.border = `2px solid ${meta.corBorda}80`;

    const imgWrap = buildImg(p.imagem, p.nome);
    imgWrap.style.background = meta.bgCard;
    card.appendChild(imgWrap);

    const ribbon = buildRibbon(p.desconto); if(ribbon) card.appendChild(ribbon);

    const seloWrap = document.createElement("div");
    seloWrap.className = "card-selo mt-1";
    seloWrap.innerHTML = `<img src="${meta.logo}" class="card-logo" alt="${meta.nome}">`;
    card.appendChild(seloWrap);
    attachLogoFallback(seloWrap.querySelector("img"));

    card.insertAdjacentHTML("beforeend", `
      <div class="card-nome">${p.nome}</div>
      <div class="card-old">${p.precoAntigo ? fmt(p.precoAntigo) : ""}</div>
      <div class="card-price" style="color:${meta.corTexto}">${fmt(p.precoAtual)}</div>
      <div class="card-off" style="color:${meta.off}">${p.desconto || ""}</div>
    `);

    // ===== Botões de ação (Comparar + Ver) =====
    const actions = document.createElement("div");
    actions.className = "mt-1.5 flex items-center justify-center gap-1";
    const btnCmp = document.createElement("button");
    btnCmp.className = "px-2 py-1 rounded-md text-[10px] font-bold border border-gray-300 bg-white hover:bg-gray-50";
    btnCmp.textContent = "🔎 Comparar";
    btnCmp.addEventListener("click", (e)=>{ e.stopPropagation(); abrirComparador(p); });

    const btnVer = document.createElement("button");
    btnVer.className = "px-2 py-1 rounded-md text-[10px] font-bold border border-gray-300 bg-white hover:bg-gray-50";
    btnVer.textContent = "👁️ Ver";
    btnVer.addEventListener("click", (e)=>{ e.stopPropagation(); openModal(p); });

    actions.appendChild(btnCmp);
    actions.appendChild(btnVer);
    card.appendChild(actions);

    // abrir modal ao clicar no card (fora dos botões)
    card.addEventListener("click", () => openModal(p));
    wrap.appendChild(card);
  });
}

/* ===================== MODAL ===================== */
function openModal(obj) {
  const p = autoFillDiscount({...obj});
  const meta = STORE_META[p.tipo];
  const modal = el("#productModal");
  const box   = el("#modalBox");
  if (!modal || !box) return;

  const modalImg = el("#modalImage");
  if (modalImg){
    modalImg.src = p.imagem || IMG_PLACEHOLDER;
    modalImg.onerror = () => { modalImg.src = IMG_PLACEHOLDER; };
  }

  const title = el("#modalTitle");
  if (title) title.textContent = p.nome || "";

  const oldP = el("#modalOldPrice");
  if (oldP) oldP.textContent = p.precoAntigo ? fmt(p.precoAntigo) : "";

  const price = el("#modalPrice");
  if (price){
    price.textContent = fmt(p.precoAtual);
    price.style.color = meta.corTexto;
  }

  const disc = el("#modalDiscount");
  if (disc){
    disc.textContent = p.desconto || "";
    disc.style.color = meta.off;
  }

  const parc = el("#modalParcelas");
  if (parc) parc.textContent = p.parcelas || "";

  const link = el("#modalLink");
  if (link){
    link.href = p.link || "#";
    link.style.background = `linear-gradient(90deg, ${meta.btn[0]}, ${meta.btn[1]})`;
    link.style.color = (p.tipo === "petlove" || p.tipo === "mercadolivre") ? "#0b1322" : "#fff";
    link.style.border = `1px solid ${meta.corBorda}88`;
  }

  const logo = el("#modalStoreLogo");
  if (logo){
    logo.src = meta.logo;
    attachLogoFallback(logo);
  }

  const sr = el("#modalStoreName");
  if (sr) sr.textContent = meta.nome;

  const ul = el("#modalDetails");
  if (ul){
    ul.innerHTML = "";
    (p.detalhes || []).forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
  }

  // ---- Botão "Comparar preços" dentro do modal (criado dinamicamente)
  let btnCmp = el("#btnModalComparar");
  if (!btnCmp){
    btnCmp = document.createElement("button");
    btnCmp.id = "btnModalComparar";
    btnCmp.className = "mt-2 bg-black text-white font-bold py-2.5 rounded-md shadow";
    btnCmp.textContent = "🔎 Comparar preços deste item";
    const linkRef = el("#modalLink");
    if (linkRef) linkRef.insertAdjacentElement("afterend", btnCmp);
  }
  btnCmp.onclick = ()=> abrirComparador(p);

  // exibe
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  requestAnimationFrame(()=> {
    box.classList.remove("scale-95","opacity-0");
    box.classList.add("scale-100","opacity-100");
  });
}

function closeModal(){
  const modal = el("#productModal");
  const box   = el("#modalBox");
  if (!modal || !box) return;
  box.classList.add("scale-95","opacity-0");
  setTimeout(()=>{ modal.classList.add("hidden"); modal.classList.remove("flex"); },200);
}
(function bindModal(){
  const closeBtn = el("#closeModal");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  const modalBg = el("#productModal");
  if (modalBg) modalBg.addEventListener("click", (e)=>{ if(e.target.id==="productModal") closeModal(); });
})();

/* ===================== COMPARTILHAR ===================== */
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "btnCompartilhar") {
    const link = el("#modalLink")?.href || location.href;
    const titulo = el("#modalTitle")?.textContent || "Oferta";
    if (navigator.share) {
      navigator.share({ title: "Oferta ShihTzuShop", text: `Olha este item para Shih Tzu: ${titulo}`, url: link }).catch(()=>{});
    } else {
      navigator.clipboard.writeText(link).then(()=>alert("🔗 Link copiado!")).catch(()=>{});
    }
  }
});

/* ===================== FILTROS ===================== */
function aplicarFiltros(){
  const busca = (el("#buscaInput")?.value || "").toLowerCase();
  const categoria = (el("#filtroCategoria")?.value || "").toLowerCase();
  const preco = el("#filtroPreco")?.value || "";
  const origens = Array.from(document.querySelectorAll(".origemCheck:checked")).map(c=>c.value);

  const mapaCat = {
    "roupas": ["roupa","tricot","bandana","gravata"],
    "acessórios": ["laço","peitoral","gravata","bandana","escova","pente"],
    "higiene": ["shampoo","condicionador","perfume","hidratante"],
    "camas": ["cama","donut"],
    "rações": ["ração","racao"]
  };

  const filtrados = produtos.filter(p=>{
    if (origens.length && !origens.includes(p.tipo)) return false;
    if (busca && !p.nome.toLowerCase().includes(busca)) return false;
    if (categoria){
      const termos = mapaCat[categoria] || [];
      if (!termos.some(t=>p.nome.toLowerCase().includes(t))) return false;
    }
    if (preco === "0" && p.precoAtual > 50) return false;
    if (preco === "1" && (p.precoAtual < 50 || p.precoAtual > 150)) return false;
    if (preco === "2" && p.precoAtual < 150) return false;
    return true;
  });

  ativarFiltro(true);
  // ao filtrar, garantimos que o usuário está na lista (não no comparador)
  toggleComparador(false);
  renderLista(filtrados);

  const lista = el("#listaProdutos");
  if (lista && !filtrados.length){
    lista.innerHTML = `
      <div class="text-center text-gray-600 bg-white rounded-md p-4 shadow-sm mt-4 border border-gray-200 w-full">
        <span class="block text-lg font-semibold">😕 Nenhum item encontrado</span>
        <span class="text-sm text-gray-500">Tente mudar os filtros ou limpar a busca.</span>
      </div>`;
  }
}

/* cria a barra de filtros logo abaixo do selo multimarcas */
function criarBarraFiltros(){
  const selo = document.querySelector(".ml-selo");
  const barra = document.createElement("div");
  barra.id = "barraFiltros";
  barra.className = "hidden rounded-xl mt-1.5 p-2 shadow-md flex flex-col items-center justify-center gap-2 max-w-6xl mx-auto";

  // origem com LOGO-only (sem texto visível)
  const origemHTML = Object.entries(STORE_META).map(([k,v])=>`
    <label data-src="${k}" class="ativo" aria-label="${v.nome}" title="${v.nome}">
      <input type="checkbox" class="origemCheck" value="${k}" checked />
      <img src="${v.logo}" alt="" class="filtro-logo" />
    </label>
  `).join("");

  barra.innerHTML = `
    <div class="f-controls w-full flex flex-wrap items-center justify-center gap-2">
      <!-- Busca com botão limpar (IDs preservados) -->
      <div class="search-wrap relative min-w-[240px] max-w-[680px] w-full">
        <svg class="icon absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="#6b7280" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input id="buscaInput" type="text" placeholder="Buscar (ex: laço, cama, shampoo)..." class="w-full h-10 rounded-full border px-9 pr-9" />
        <button id="clearBusca" type="button"
                class="clear hidden absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border grid place-items-center leading-none">×</button>
      </div>

      <!-- Selects (IDs preservados) -->
      <select id="filtroPreco" class="select-pill px-3 py-1.5 rounded-full border h-10">
        <option value="">Preço</option>
        <option value="0">Até R$ 50</option>
        <option value="1">R$ 50–R$ 150</option>
        <option value="2">+ R$ 150</option>
      </select>

      <select id="filtroCategoria" class="px-3 py-1.5 rounded-full border min-w-[180px] md:min-w-[160px] sm:min-w-[140px] h-10 font-semibold">
        <option value="">Categoria</option>
        <option>Roupas</option><option>Acessórios</option><option>Higiene</option><option>Camas</option><option>Rações</option>
      </select>
    </div>

    <div id="filtroOrigem" class="w-full">
      ${origemHTML}
    </div>
  `;

  if (selo) selo.insertAdjacentElement("afterend", barra);
  else document.body.insertBefore(barra, document.body.firstChild);

  // eventos (IDs preservados)
  const busca = barra.querySelector("#buscaInput");
  const clear = barra.querySelector("#clearBusca");
  const showClear = () => {
    if (!clear) return;
    clear.classList.toggle("hidden", !busca.value);
  };

  ["input","change"].forEach(evt=>{
    if (busca) busca.addEventListener(evt, ()=>{ showClear(); aplicarFiltros(); });
  });
  if (clear) clear.addEventListener("click", ()=>{
    busca.value = ""; showClear(); aplicarFiltros();
  });

  ["filtroPreco","filtroCategoria"].forEach(id=>{
    const elx = barra.querySelector(`#${id}`);
    if (elx) elx.addEventListener("change", aplicarFiltros);
  });

  barra.querySelectorAll(".origemCheck").forEach(chk=>{
    const label = chk.closest("label");
    chk.addEventListener("change", ()=>{
      label.classList.toggle("ativo", chk.checked);
      aplicarFiltros();
    });
  });

  // fallback para logos dos filtros
  barra.querySelectorAll("#filtroOrigem img").forEach(attachLogoFallback);

  barra.classList.add("hidden");
}

/* mostra/oculta modo filtro e restaura listas */
function ativarFiltro(ativo){
  const body = document.body;
  const btn = document.getElementById("btnBuscaFlutuante");
  const barra = document.getElementById("barraFiltros");
  const header = document.querySelector("header.sticky");
  const selo = document.querySelector(".ml-selo");

  if (ativo){
    body.classList.add("modo-filtro");
    if (btn){ btn.classList.add("ativo"); btn.textContent = "⨯ Fechar Filtro"; }
    if (header) header.classList.add("hidden");
    if (selo) selo.classList.add("hidden");
    if (barra){
      barra.classList.remove("hidden");
      barra.style.opacity = "0"; barra.style.transform = "translateY(-10px)";
      requestAnimationFrame(()=>{
        barra.style.transition = "all .35s ease"; barra.style.opacity="1"; barra.style.transform="translateY(0)";
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    body.classList.remove("modo-filtro");
    if (btn){ btn.classList.remove("ativo"); btn.textContent = "🔍 Buscar / Filtrar"; }
    if (header) header.classList.remove("hidden");
    if (selo) selo.classList.remove("hidden");
    if (barra){
      barra.style.transition = "all .3s ease";
      barra.style.opacity="0"; barra.style.transform="translateY(-10px)";
      setTimeout(()=> barra.classList.add("hidden"), 280);
    }
    // restaurar conteúdo padrão
    renderBanner("bannerA", ["shopee","amazon","magalu","americanas","aliexpress"]);
    renderBanner("bannerB", ["petlove","mercadolivre","petz","cobasi","carrefour","casasbahia","ponto"]);
    toggleComparador(false);
    renderLista(produtos);
  }
}

/* =============== BOTÃO FLUTUANTE (toggle) =============== */
(function bindFloat(){
  const btnFloat = document.getElementById("btnBuscaFlutuante");
  if (!btnFloat) return;
  btnFloat.addEventListener("click", () => {
    const ativo = document.body.classList.contains("modo-filtro");
    ativarFiltro(!ativo);
  });
})();

/* =============== ROLAGEM AUTOMÁTICA BANNERS =============== */
function autoScroll(containerId){
  const faixa = document.getElementById(containerId);
  if (!faixa || !faixa.parentElement) return;
  const scroller = faixa.parentElement;
  let dir = 1;
  function loop(){
    scroller.scrollLeft += dir*0.5;
    if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1) dir = -1;
    else if (scroller.scrollLeft <= 0) dir = 1;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ===================== COMPARADOR (UI) ===================== */
function toggleComparador(show){
  const secList = el("#secListaProdutos");
  const secCmp  = el("#secComparador");
  if (!secList || !secCmp) return;

  if (show){
    secList.classList.add("hidden");
    secCmp.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    secCmp.classList.add("hidden");
    secList.classList.remove("hidden");
  }
}

function abrirComparador(baseProduct){
  closeModal(); // se estiver aberto, fecha
  const grupo = comparablesFor(baseProduct);
  renderComparador(grupo, baseProduct);
  toggleComparador(true);
}

function renderComparador(grupo, baseProduct){
  const cont = el("#listaComparativos");
  if (!cont) return;
  cont.innerHTML = "";

  if (!grupo || grupo.length <= 1){
    cont.innerHTML = `
      <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div class="text-center text-gray-700 font-semibold">Só encontramos este item em <b>${grupo?.length || 0}</b> loja no momento.</div>
        <div class="text-center mt-2">
          <button id="btnVoltarLista" class="px-3 py-2 rounded-md bg-black text-white text-sm font-bold">← Voltar para a lista</button>
        </div>
      </div>`;
    el("#btnVoltarLista")?.addEventListener("click", ()=> toggleComparador(false));
    return;
  }

  // ordena por preço atual
  const ordenados = [...grupo].sort((a,b)=> a.precoAtual - b.precoAtual);
  const menor = ordenados[0];
  const maior = ordenados[ordenados.length-1];
  const media = ordenados.reduce((acc,p)=>acc+p.precoAtual,0)/ordenados.length;

  // Header resumo (nome normalizado + métricas)
  const head = document.createElement("div");
  head.className = "col-span-full bg-white border border-gray-200 rounded-lg p-3 shadow-sm";
  head.innerHTML = `
    <div class="flex flex-col gap-2">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3 class="text-sm sm:text-base font-extrabold text-gray-800">
          🔎 Comparando: <span class="text-gray-900">${baseProduct?.nome || menor.nome}</span>
        </h3>
        <div class="flex gap-2">
          <button id="btnVoltarLista" class="px-3 py-2 rounded-md bg-black text-white text-xs sm:text-sm font-bold">← Voltar para a lista</button>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
        <div class="bg-green-50 border border-green-200 rounded-md p-2">
          <div class="font-bold text-green-700">Menor preço</div>
          <div class="text-green-800">${STORE_META[menor.tipo].nome} — <b>${fmt(menor.precoAtual)}</b></div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-md p-2">
          <div class="font-bold text-amber-700">Preço médio</div>
          <div class="text-amber-800"><b>${fmt(media)}</b> (entre ${grupo.length} lojas)</div>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-md p-2">
          <div class="font-bold text-red-700">Maior preço</div>
          <div class="text-red-800">${STORE_META[maior.tipo].nome} — <b>${fmt(maior.precoAtual)}</b></div>
        </div>
      </div>
    </div>
  `;
  cont.appendChild(head);
  el("#btnVoltarLista")?.addEventListener("click", ()=> toggleComparador(false));

  // Cards por loja
  ordenados.forEach(p=>{
    const meta = STORE_META[p.tipo];
    const card = document.createElement("div");
    card.className = "bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-2";
    const isBest = (p === menor);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="${meta.logo}" alt="${meta.nome}" class="h-6 w-auto" />
          <span class="text-xs font-bold text-gray-700">${meta.nome}</span>
        </div>
        ${isBest ? `<span class="text-[10px] font-black bg-green-600 text-white px-2 py-0.5 rounded">MENOR PREÇO</span>` : ""}
      </div>

      <div class="flex items-center justify-between">
        <div class="text-2xl sm:text-3xl font-extrabold" style="color:${meta.corTexto}">${fmt(p.precoAtual)}</div>
        <div class="text-xs text-gray-500">${p.parcelas || ""}</div>
      </div>

      <div class="flex flex-wrap gap-2 text-[11px]">
        ${p.precoAntigo ? `<span class="line-through text-gray-400">${fmt(p.precoAntigo)}</span>` : ""}
        ${p.desconto ? `<span class="font-bold text-green-700">${p.desconto}</span>` : ""}
        ${!isBest ? `<span class="ml-auto text-[11px] bg-gray-100 border border-gray-200 rounded px-1.5">+ ${fmt(p.precoAtual - menor.precoAtual)} vs melhor</span>` : ""}
      </div>

      <div class="mt-1 grid grid-cols-2 gap-2">
        <a href="${p.link || "#"}" target="_blank"
           class="text-center py-2 rounded-md font-extrabold text-white"
           style="background:linear-gradient(90deg, ${meta.btn[0]}, ${meta.btn[1]}); border:1px solid ${meta.corBorda}88">
          Abrir na loja
        </a>
        <button class="py-2 rounded-md font-bold border border-gray-300 hover:bg-gray-50 ver-btn">Detalhes</button>
      </div>
    `;

    // preview imagem + nome compacto
    const top = document.createElement("div");
    top.className = "flex items-center gap-2";
    const imgW = buildImg(p.imagem, p.nome, "h-14");
    imgW.classList.remove("h-24","sm:h-28");
    imgW.classList.add("h-16","sm:h-20");
    top.appendChild(imgW);

    const nm = document.createElement("div");
    nm.className = "text-[11px] leading-snug font-semibold text-gray-800 line-clamp-2";
    nm.textContent = p.nome;
    top.appendChild(nm);

    card.insertBefore(top, card.firstChild);
    card.querySelector(".ver-btn")?.addEventListener("click", ()=> openModal(p));

    cont.appendChild(card);
  });
}

/* ===================== INIT ===================== */
window.addEventListener("DOMContentLoaded", ()=>{
  // conteúdo padrão
  renderBanner("bannerA", ["shopee","amazon","magalu","americanas","aliexpress"]);
  renderBanner("bannerB", ["petlove","mercadolivre","petz","cobasi","carrefour","casasbahia","ponto"]);
  renderLista(produtos);
  criarBarraFiltros();
  autoScroll("bannerA");
  autoScroll("bannerB");
  document.body.classList.remove("modo-filtro");

  // toolbar (se quiser colocar botões fixos no topo)
  const tb = document.querySelector(".ml-toolbar");
  if (tb){
    const btnBack = document.createElement("button");
    btnBack.className = "hidden ml-auto px-3 py-1.5 rounded-md bg-black text-white text-xs font-bold";
    btnBack.id = "toolbarVoltar";
    btnBack.textContent = "← Voltar para a lista";
    btnBack.onclick = ()=> toggleComparador(false);
    tb.appendChild(btnBack);

    // Observa alternância do comparador p/ mostrar/ocultar
    const obs = new MutationObserver(()=>{
      const secCmp = el("#secComparador");
      if (secCmp && !secCmp.classList.contains("hidden")) btnBack.classList.remove("hidden");
      else btnBack.classList.add("hidden");
    });
    obs.observe(el("#secComparador"), { attributes:true, attributeFilter:["class"] });
  }
});
