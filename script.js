const GAMES = [
  {
    id: 1,
    c: "moba",
    n: "Mobile Legends",
    s: "MOBILE LEGENDS",
    p: 22900,
    a: "#5b87ff",
    b: "#172152",
    d: "86 + 8 Diamonds",
    icon: "bi-controller",
    logo: "images/mobile-legends.png",
    badge: "TERPOPULER",
  },
  {
    id: 2,
    c: "battle",
    n: "Free Fire",
    s: "GARENA",
    p: 16500,
    a: "#f4c54b",
    b: "#6d4311",
    d: "100 Diamonds",
    icon: "bi-fire",
    logo: "images/free-fire.png",
    badge: "HOT",
  },
  {
    id: 3,
    c: "battle",
    n: "PUBG Mobile",
    s: "PUBG MOBILE",
    p: 24900,
    a: "#d9a541",
    b: "#3c3019",
    d: "325 UC",
    icon: "bi-crosshair",
    logo: "images/pubg-mobile.png",
    badge: "FAVORIT",
  },
  {
    id: 4,
    c: "fps",
    n: "Valorant",
    s: "RIOT GAMES",
    p: 59000,
    a: "#ff6b70",
    b: "#661e32",
    d: "1.000 V-Points",
    icon: "bi-bullseye",
    logo: "images/valorant.png",
    badge: "INSTANT",
  },
  {
    id: 5,
    c: "rpg",
    n: "Genshin Impact",
    s: "HOYOVERSE",
    p: 79900,
    a: "#73b8dd",
    b: "#26385d",
    d: "1.980 Genesis Crystals",
    icon: "bi-stars",
    logo: "images/genshin-impact.png",
    badge: "RECOMMENDED",
  },
  {
    id: 6,
    c: "moba",
    n: "Honor of Kings",
    s: "TENCENT",
    p: 18500,
    a: "#c8a45c",
    b: "#4c331b",
    d: "80 Tokens",
    icon: "bi-trophy",
    logo: "images/honor-of-kings.png",
    badge: "BARU",
  },
  {
    id: 7,
    c: "fps",
    n: "Call of Duty Mobile",
    s: "CALL OF DUTY",
    p: 15900,
    a: "#8aa45d",
    b: "#27351d",
    d: "320 CP",
    icon: "bi-badge-cc",
    logo: "images/call-of-duty-mobile.png",
    badge: "PROMO",
  },
  {
    id: 8,
    c: "rpg",
    n: "Honkai: Star Rail",
    s: "HOYOVERSE",
    p: 79900,
    a: "#9e7de1",
    b: "#33265c",
    d: "1.980 Oneiric Shards",
    icon: "bi-stars",
    logo: "images/honkai-star-rail.png",
    badge: "UPDATE",
  },
];

const $ = (s, r = document) => r.querySelector(s);
const rp = (n) => "Rp" + n.toLocaleString("id-ID");
const get = () => {
  try {
    return JSON.parse(localStorage.getItem("cheystore")) || {};
  } catch (e) {
    return {};
  }
};
const put = (c) => {
  try {
    localStorage.setItem("cheystore", JSON.stringify(c));
  } catch (e) {}
};
const cnt = () => Object.values(get()).reduce((a, b) => a + b, 0);
const badge = () => {
  const b = $("#bd");
  if (b) b.textContent = cnt();
};
badge();

const toast = (m) => {
  let t = $("#ts");
  if (!t) {
    t = document.createElement("div");
    t.id = "ts";
    t.className = "ts";
    document.body.append(t);
  }
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(t.h);
  t.h = setTimeout(() => t.classList.remove("on"), 1800);
};

const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
const obs = () =>
  document.querySelectorAll(".rv:not(.in)").forEach((x) => io.observe(x));

addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--mx", e.clientX + "px");
  document.documentElement.style.setProperty("--my", e.clientY + "px");
  const c = e.target.closest && e.target.closest(".cd,.gl");
  if (c) {
    const b = c.getBoundingClientRect();
    c.style.setProperty("--cx", e.clientX - b.left + "px");
    c.style.setProperty("--cy", e.clientY - b.top + "px");
  }
});

const card = (
  m,
) => `<div class="col-sm-6 col-lg-3 rv"><div class="game-card h-100" style="--c1:${m.a};--c2:${m.b}">
  <div class="game-cover"><span class="game-badge">${m.badge}</span><div class="game-icon">${m.logo ? `<img src="${m.logo}" alt="Logo ${m.n}" onerror="this.remove();this.parentElement.innerHTML='<i class=&quot;bi ${m.icon}&quot;></i>'">` : `<i class="bi ${m.icon}"></i>`}</div></div>
  <div class="game-info"><div class="hud mb-2">${m.s}</div><h3>${m.n}</h3><p class="text-secondary small mb-3">${m.d}</p>
  <div class="d-flex justify-content-between align-items-center"><span class="dsp price">${rp(m.p)}</span><button class="add-btn" data-id="${m.id}" aria-label="Tambah ${m.n}"><i class="bi bi-plus-lg"></i></button></div></div>
</div></div>`;
const draw = (el, list) => {
  el.innerHTML = list.map(card).join("");
  obs();
};
const ft = $("#ft"),
  mg = $("#mg");
if (ft) draw(ft, GAMES.slice(0, 4));
if (mg) {
  draw(mg, GAMES);
  document.querySelectorAll("[data-f]").forEach(
    (b) =>
      (b.onclick = () => {
        document
          .querySelectorAll("[data-f]")
          .forEach((x) => x.classList.toggle("on", x == b));
        draw(
          mg,
          b.dataset.f == "all"
            ? GAMES
            : GAMES.filter((m) => m.c == b.dataset.f),
        );
      }),
  );
}

function cart() {
  const c = get(),
    ids = Object.keys(c);
  let t = 0;
  $("#cb").innerHTML = ids.length
    ? ids
        .map((i) => {
          const m = GAMES.find((x) => x.id == i),
            s = m.p * c[i];
          t += s;
          return `<tr><td><span class="dsp game-row-name">${m.n}</span><small class="d-block text-secondary">${m.d}</small></td><td>${rp(m.p)}</td><td><button class="q" data-q="${i}" data-d="-1">−</button><span class="mx-3">${c[i]}</span><button class="q" data-q="${i}" data-d="1">+</button></td><td class="text-end mn">${rp(s)}</td></tr>`;
        })
        .join("")
    : '<tr><td colspan="4" class="text-center py-5 text-secondary"><i class="bi bi-bag fs-1 d-block mb-2"></i>Belum ada pesanan. <a href="#game" class="mn">Pilih game</a></td></tr>';
  $("#tt").textContent = rp(t);
  const uid = $("#uid") ? $("#uid").value : "",
    server = $("#server") ? $("#server").value : "";
  $("#wal").href =
    "https://wa.me/6281234567890?text=" +
    encodeURIComponent(
      "Halo cheystore, saya mau top up:\n" +
        ids
          .map(
            (i) =>
              "- " +
              GAMES.find((x) => x.id == i).n +
              " — " +
              GAMES.find((x) => x.id == i).d +
              " x" +
              c[i],
          )
          .join("\n") +
        "\nTotal: " +
        rp(t) +
        "\nUser ID: " +
        (uid || "-") +
        "\nServer: " +
        (server || "-"),
    );
}
if ($("#cb")) cart();

document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-id]");
  if (a) {
    const c = get(),
      i = a.dataset.id;
    c[i] = (c[i] || 0) + 1;
    put(c);
    badge();
    toast("Ditambahkan ke pesanan");
  }
  const q = e.target.closest("[data-q]");
  if (q) {
    const c = get(),
      i = q.dataset.q;
    c[i] = (c[i] || 0) + Number(q.dataset.d);
    if (c[i] <= 0) delete c[i];
    put(c);
    cart();
    badge();
  }
  if (e.target.id == "clr") {
    put({});
    cart();
    badge();
  }
});

document.addEventListener("input", () => {
  if ($("#cb")) cart();
});

const PAGES = ["beranda", "game", "promo", "bantuan", "pesanan"];
function route() {
  const id = PAGES.includes(location.hash.slice(1))
    ? location.hash.slice(1)
    : "beranda";
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.toggle("on", v.id == "v-" + id));
  document
    .querySelectorAll(".nv .nav-link")
    .forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") == "#" + id),
    );
  document.querySelectorAll("#v-" + id + " .rv").forEach((x) => {
    x.classList.remove("in");
    io.observe(x);
  });
  if (id == "pesanan") cart();
  document.title = "cheystore | " + id.charAt(0).toUpperCase() + id.slice(1);
  const m = bootstrap.Collapse.getInstance($("#m"));
  if (m) m.hide();
  window.scrollTo(0, 0);
}
addEventListener("hashchange", route);
route();
obs();
