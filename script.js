(function () {
  "use strict";

  const data = window.PROFILE_DATA;

  if (!data) {
    console.error("未找到 PROFILE_DATA，请检查 profile-data.js 是否正确加载。");
    return;
  }

  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const safeUrl = (value = "") => {
    const url = String(value).trim();
    return /^(https?:\/\/|mailto:|\/|#)/i.test(url) ? escapeHtml(url) : "";
  };

  document.querySelectorAll("[data-profile]").forEach((element) => {
    const key = element.dataset.profile;
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      element.textContent = data[key];
    }
  });

  document.title = `${data.nameEn}｜学术主页`;

  const quickLinks = document.querySelector("#quick-links");
  const visibleLinks = data.links.filter((link) => safeUrl(link.url));
  quickLinks.innerHTML = visibleLinks
    .map(
      (link) => `
        <li>
          <a href="${safeUrl(link.url)}" target="_blank" rel="noreferrer">
            ${escapeHtml(link.label)} <span aria-hidden="true">↗</span>
          </a>
        </li>`,
    )
    .join("");

  document.querySelector("#about-copy").innerHTML = data.about
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  document.querySelector("#profile-facts").innerHTML = data.facts
    .map(
      (fact) => `
        <div class="fact-row">
          <dt>${escapeHtml(fact.label)}</dt>
          <dd>${escapeHtml(fact.value)}</dd>
        </div>`,
    )
    .join("");

  document.querySelector("#metrics").innerHTML = data.metrics
    .map(
      (metric) => `
        <div class="metric">
          <strong>${escapeHtml(metric.value)}</strong>
          <span>${escapeHtml(metric.label)}</span>
        </div>`,
    )
    .join("");

  document.querySelector("#research-grid").innerHTML = data.research
    .map(
      (item) => `
        <article class="research-card reveal">
          <div class="card-number">${escapeHtml(item.number)}</div>
          <p class="card-overline">${escapeHtml(item.titleEn)}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <ul class="tag-list">
            ${item.keywords.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join("")}
          </ul>
        </article>`,
    )
    .join("");

  document.querySelector("#publication-list").innerHTML = data.publications
    .map((publication, index) => {
      const links = publication.links
        .filter((link) => safeUrl(link.url))
        .map(
          (link) => `
            <a href="${safeUrl(link.url)}" target="_blank" rel="noreferrer">
              ${escapeHtml(link.label)} ↗
            </a>`,
        )
        .join("");

      return `
        <article class="publication-item reveal">
          <div class="publication-count">${String(index + 1).padStart(2, "0")}</div>
          <div class="publication-year">${escapeHtml(publication.year)}</div>
          <div class="publication-main">
            <div class="publication-meta">
              <span>${escapeHtml(publication.type)}</span>
              ${publication.note ? `<mark>${escapeHtml(publication.note)}</mark>` : ""}
            </div>
            <h3>${escapeHtml(publication.title)}</h3>
            <p class="publication-authors">${escapeHtml(publication.authors)}</p>
            <p class="publication-venue">${escapeHtml(publication.venue)}</p>
          </div>
          <div class="publication-links">${links}</div>
        </article>`;
    })
    .join("");

  document.querySelector("#project-grid").innerHTML = data.projects
    .map((project) => {
      const title = safeUrl(project.url)
        ? `<a href="${safeUrl(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(project.title)} ↗</a>`
        : escapeHtml(project.title);

      return `
        <article class="project-card reveal">
          <p class="project-period">${escapeHtml(project.period)}</p>
          <h3>${title}</h3>
          <p>${escapeHtml(project.description)}</p>
          <ul class="tag-list">
            ${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}
          </ul>
        </article>`;
    })
    .join("");

  document.querySelector("#timeline").innerHTML = data.timeline
    .map(
      (item) => `
        <article class="timeline-item reveal">
          <div class="timeline-year">${escapeHtml(item.year)}</div>
          <div class="timeline-dot" aria-hidden="true"></div>
          <div class="timeline-content">
            <h3>${escapeHtml(item.title)}</h3>
            <p class="timeline-organization">${escapeHtml(item.organization)}</p>
            <p>${escapeHtml(item.description)}</p>
          </div>
        </article>`,
    )
    .join("");

  const emailLink = document.querySelector("#email-link");
  emailLink.href = `mailto:${data.email}`;

  const copyButton = document.querySelector("#copy-email");
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      copyButton.textContent = "已复制 ✓";
    } catch (_error) {
      copyButton.textContent = data.email;
    }
    window.setTimeout(() => {
      copyButton.textContent = "复制邮箱";
    }, 2000);
  });

  document.querySelector("#current-year").textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });

  const themeButton = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("academic-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.dataset.theme = "dark";
  }

  themeButton.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("academic-theme", nextTheme);
  });

  const revealElements = [...document.querySelectorAll(".reveal")];
  const revealInViewport = () => {
    revealElements.forEach((element) => {
      if (
        !element.classList.contains("is-visible") &&
        element.getBoundingClientRect().top < window.innerHeight * 0.92
      ) {
        element.classList.add("is-visible");
      }
    });
  };

  window.addEventListener("scroll", revealInViewport, { passive: true });
  revealInViewport();

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...nav.querySelectorAll("a")];

  const updateActiveLink = () => {
    const marker = window.scrollY + window.innerHeight * 0.28;
    let currentId = sections[0]?.id;
    sections.forEach((section) => {
      if (section.offsetTop <= marker) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.hash === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
})();
