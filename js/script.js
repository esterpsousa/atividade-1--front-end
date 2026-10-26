/* =========================================================
   EVERDEN — Interações (JavaScript puro)
   - Troca da imagem do produto conforme a variação escolhida
   - Menu responsivo
   - Formulário de contato simulado (sem backend)
   - Ano do rodapé e animações discretas de entrada
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. Ano atual no rodapé
     --------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------------------------------------------------
     2. Menu de navegação (mobile)
     --------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav-menu");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Fecha o menu ao clicar em um link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     3. Seleção de variações dos produtos
     Cada modelo possui 3 variações com imagem correspondente:
        Milho + Mandioca — Natural  -> "branca"
        Milho + Mandioca — Verde     -> "verde"
        Material à base de bambu     -> "bambu"
     A combinação "Bambu + Verde" NÃO existe, então as opções de
     cor ficam desativadas quando o material Bambu é selecionado.
     --------------------------------------------------------- */

  // Rótulo legível de cada variação, por modelo
  var LABELS = {
    branca: "Milho + Mandioca · Natural",
    verde: "Milho + Mandioca · Verde Everden",
    bambu: "Material à base de bambu · Bambu Natural"
  };

  function resolveVariant(material, color) {
    if (material === "bambu") return "bambu";
    return color === "verde" ? "verde" : "branca";
  }

  document.querySelectorAll("[data-product]").forEach(function (card) {
    var prod = card.getAttribute("data-product"); // tote | bag | caixa
    var img = card.querySelector("[data-gallery]");
    var note = card.querySelector("[data-selected]");
    var actionLink = card.querySelector("[data-action-link]");
    var materialChips = card.querySelectorAll("[data-material]");
    var colorChips = card.querySelectorAll("[data-color]");

    var state = { material: "milho", color: "natural" };

    function currentMaterial() {
      var found = card.querySelector('[data-material][aria-pressed="true"]');
      return found ? found.getAttribute("data-material") : "milho";
    }
    function currentColor() {
      var found = card.querySelector('[data-color][aria-pressed="true"]:not([disabled])');
      return found ? found.getAttribute("data-color") : "natural";
    }

    function render() {
      state.material = currentMaterial();
      var isBambu = state.material === "bambu";

      // Cor só se aplica ao biopolímero (milho + mandioca)
      colorChips.forEach(function (chip) {
        chip.disabled = isBambu;
        if (isBambu) chip.setAttribute("aria-pressed", "false");
      });
      if (!isBambu && !card.querySelector('[data-color][aria-pressed="true"]')) {
        // garante uma cor selecionada ao voltar do bambu
        var natural = card.querySelector('[data-color="natural"]');
        if (natural) natural.setAttribute("aria-pressed", "true");
      }

      state.color = isBambu ? "" : currentColor();
      var variant = resolveVariant(state.material, state.color);

      // Atualiza a imagem (mantém o arquivo original, só troca o src)
      var src = "imagens/" + prod + variant + ".png";
      if (img && img.getAttribute("src") !== src) {
        img.style.opacity = "0";
        var tmp = new Image();
        tmp.onload = function () {
          img.src = src;
          img.alt = "Everden " + card.getAttribute("data-name") + " — " + LABELS[variant];
          img.style.opacity = "1";
        };
        tmp.src = src;
      }

      // Atualiza a nota de variação selecionada
      if (note) note.innerHTML = "Variação selecionada: <b>" + LABELS[variant] + "</b>";

      // Passa a variação para a página de contato via URL (opcional)
      if (actionLink) {
        actionLink.href =
          "contato.html?produto=" + prod + "&variacao=" + variant +
          "&material=" + (state.material === "bambu" ? "bambu" : "milho");
      }
    }

    materialChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        materialChips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        render();
      });
    });
    colorChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        if (chip.disabled) return;
        colorChips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        render();
      });
    });

    render(); // estado inicial
  });

  /* ---------------------------------------------------------
     3b. Select personalizado (identidade Everden)
     Constrói uma lista estilizada a partir de um <select> nativo,
     que continua existindo (oculto) para guardar o valor e manter
     a acessibilidade. Suporta teclado (setas, Enter, Esc, Home/End).
     --------------------------------------------------------- */
  function enhanceSelect(select) {
    var wrap = document.createElement("div");
    wrap.className = "eselect";
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);
    select.classList.add("sr-only");
    select.setAttribute("tabindex", "-1");
    select.setAttribute("aria-hidden", "true");

    var labelEl = (select.labels && select.labels[0]) || null;
    var uid = select.id || "sel" + Math.random().toString(36).slice(2);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "eselect__btn";
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    var btnText = document.createElement("span");
    btnText.className = "eselect__label";
    btn.appendChild(btnText);
    btn.insertAdjacentHTML("beforeend",
      '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>');

    var menu = document.createElement("ul");
    menu.className = "eselect__menu";
    menu.setAttribute("role", "listbox");
    menu.tabIndex = -1;
    menu.id = uid + "-menu";
    btn.setAttribute("aria-controls", menu.id);
    if (labelEl) {
      if (!labelEl.id) labelEl.id = uid + "-label";
      btn.setAttribute("aria-labelledby", labelEl.id);
      menu.setAttribute("aria-label", labelEl.textContent.trim());
    }

    var optEls = Array.prototype.map.call(select.options, function (o, i) {
      var li = document.createElement("li");
      li.className = "eselect__opt";
      li.setAttribute("role", "option");
      li.id = menu.id + "-opt-" + i;
      li.textContent = o.textContent;
      if (o.value === "") li.setAttribute("data-placeholder", "true");
      li.addEventListener("click", function () { choose(i); });
      menu.appendChild(li);
      return li;
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);

    var open = false, active = -1;

    function sync() {
      var o = select.options[select.selectedIndex];
      btnText.textContent = (o && o.textContent) || "Selecione";
      btn.setAttribute("data-placeholder", (!o || o.value === "") ? "true" : "false");
      optEls.forEach(function (el, i) {
        el.setAttribute("aria-selected", i === select.selectedIndex ? "true" : "false");
      });
    }
    function paintActive() {
      optEls.forEach(function (el, i) { el.classList.toggle("is-active", i === active); });
      if (optEls[active]) {
        menu.setAttribute("aria-activedescendant", optEls[active].id);
        optEls[active].scrollIntoView({ block: "nearest" });
      }
    }
    function openMenu() {
      open = true; wrap.classList.add("is-open"); btn.setAttribute("aria-expanded", "true");
      active = select.selectedIndex < 0 ? 0 : select.selectedIndex; paintActive(); menu.focus();
    }
    function closeMenu(focusBtn) {
      open = false; wrap.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false");
      menu.removeAttribute("aria-activedescendant"); if (focusBtn) btn.focus();
    }
    function choose(i) {
      select.selectedIndex = i; sync();
      select.dispatchEvent(new Event("change", { bubbles: true }));
      closeMenu(true);
    }

    btn.addEventListener("click", function () { open ? closeMenu(true) : openMenu(); });
    btn.addEventListener("keydown", function (e) {
      if (["ArrowDown", "ArrowUp", "Enter", " ", "Spacebar"].indexOf(e.key) !== -1) { e.preventDefault(); openMenu(); }
    });
    menu.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); closeMenu(true); }
      else if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(optEls.length - 1, active + 1); paintActive(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(0, active - 1); paintActive(); }
      else if (e.key === "Home") { e.preventDefault(); active = 0; paintActive(); }
      else if (e.key === "End") { e.preventDefault(); active = optEls.length - 1; paintActive(); }
      else if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); if (active >= 0) choose(active); }
      else if (e.key === "Tab") { closeMenu(false); }
    });
    document.addEventListener("click", function (e) { if (open && !wrap.contains(e.target)) closeMenu(false); });

    sync();
    return { refresh: sync };
  }

  /* ---------------------------------------------------------
     4. Formulário de contato (simulação — sem backend)
     --------------------------------------------------------- */
  var form = document.getElementById("form-contato");
  if (form) {
    // Pré-seleciona o produto/material vindos da URL (?produto=tote&material=milho)
    var params = new URLSearchParams(window.location.search);
    var mapProduto = { tote: "Everden Tote", bag: "Everden Bag", caixa: "Everden Box" };
    var produtoParam = params.get("produto");
    var materialParam = params.get("material");

    var selProduto = form.querySelector("#produto");
    if (produtoParam && selProduto && mapProduto[produtoParam]) {
      selProduto.value = mapProduto[produtoParam];
    }
    var selMaterial = form.querySelector("#material");
    if (materialParam && selMaterial) {
      if (materialParam === "bambu") selMaterial.value = "Bambu";
      else if (materialParam === "milho") selMaterial.value = "Milho + Mandioca";
    }

    // Aplica o select personalizado (depois de definir os valores da URL)
    var enhanced = [];
    form.querySelectorAll("select").forEach(function (sel) {
      enhanced.push(enhanceSelect(sel));
    });
    // Ao limpar o formulário, atualiza também os selects personalizados
    form.addEventListener("reset", function () {
      window.setTimeout(function () { enhanced.forEach(function (s) { s.refresh(); }); }, 0);
    });

    var feedback = document.getElementById("form-feedback");
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // impede envio real (projeto acadêmico)
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var nome = (form.querySelector("#nome").value || "").trim();
      var primeiro = nome.split(" ")[0] || "";
      if (feedback) {
        feedback.innerHTML =
          "<strong>Solicitação registrada" + (primeiro ? ", " + primeiro : "") + "!</strong> " +
          "Este é um envio simulado para o projeto acadêmico Everden — nenhum dado foi enviado a um servidor. " +
          "Em um cenário real, nossa equipe entraria em contato com mais informações.";
        feedback.classList.add("is-visible");
        feedback.setAttribute("role", "status");
      }
      form.reset();
      if (feedback) feedback.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------------------------------------------------------
     5. Animações discretas de entrada
     --------------------------------------------------------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealables = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealables.forEach(function (el) { obs.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
