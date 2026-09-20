(function () {
  "use strict";

  const data = window.PROFILE_DATA;
  if (!data) return;

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

  const externalAttrs = (url) =>
    url.startsWith("http") ? ' target="_blank" rel="noreferrer"' : "";

  document.querySelectorAll("[data-profile]").forEach((element) => {
    const key = element.dataset.profile;
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      element.textContent = data[key];
      if (!data[key] && element.classList.contains("native-name")) element.hidden = true;
    }
  });

  document.title = `${data.name} | Academic Homepage`;

  const photo = document.querySelector("#profile-photo");
  const photoPlaceholder = document.querySelector("#photo-placeholder");
  if (safeUrl(data.photo)) {
    photo.src = data.photo;
    photo.alt = `Portrait of ${data.name}`;
    photo.hidden = false;
    photoPlaceholder.hidden = true;
  }

  document.querySelector("#profile-links").innerHTML = data.links
    .filter((link) => safeUrl(link.url))
    .map(
      (link) => `
        <li><a href="${safeUrl(link.url)}"${externalAttrs(link.url)}>${escapeHtml(link.label)}</a></li>`,
    )
    .join("");

  document.querySelector("#interest-list").innerHTML = data.researchInterests
    .map((interest) => `<li>${escapeHtml(interest)}</li>`)
    .join("");

  document.querySelector("#education-list").innerHTML = data.education
    .map(
      (item) => `
        <article class="education-item">
          <h3>${escapeHtml(item.degree)}</h3>
          <p>${escapeHtml(item.institution)}</p>
          <time>${escapeHtml(item.period)}</time>
        </article>`,
    )
    .join("");

  document.querySelector("#bio").innerHTML = data.bio
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  document.querySelector("#news-list").innerHTML = data.news
    .map((item) => {
      const text = safeUrl(item.url)
        ? `<a href="${safeUrl(item.url)}"${externalAttrs(item.url)}>${escapeHtml(item.text)}</a>`
        : escapeHtml(item.text);
      return `<article class="news-item"><time>${escapeHtml(item.date)}</time><p>${text}</p></article>`;
    })
    .join("");

  document.querySelector("#research-list").innerHTML = data.research
    .map(
      (item, index) => `
        <article class="research-item">
          <span class="item-number">${String(index + 1).padStart(2, "0")}</span>
          <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>
        </article>`,
    )
    .join("");

  const allPublicationsLink = document.querySelector("#all-publications-link");
  if (safeUrl(data.publicationsUrl)) {
    allPublicationsLink.href = data.publicationsUrl;
    allPublicationsLink.hidden = false;
    allPublicationsLink.target = "_blank";
    allPublicationsLink.rel = "noreferrer";
  }

  document.querySelector("#publication-list").innerHTML = data.publications
    .map((item) => {
      const links = item.links
        .filter((link) => safeUrl(link.url))
        .map(
          (link) =>
            `<a href="${safeUrl(link.url)}"${externalAttrs(link.url)}>[${escapeHtml(link.label)}]</a>`,
        )
        .join(" ");

      return `
        <li class="publication-item">
          <div class="publication-year">${escapeHtml(item.year)}</div>
          <div class="publication-content">
            <h3>${escapeHtml(item.title)}</h3>
            <p class="publication-authors">${escapeHtml(item.authors)}</p>
            <p class="publication-venue"><em>${escapeHtml(item.venue)}</em>${item.details ? `, ${escapeHtml(item.details)}` : ""}.</p>
            <div class="publication-actions">
              ${item.status ? `<span class="status-label">${escapeHtml(item.status)}</span>` : ""}${links}
            </div>
          </div>
        </li>`;
    })
    .join("");

  document.querySelector("#project-list").innerHTML = data.projects
    .map((item) => {
      const title = safeUrl(item.url)
        ? `<a href="${safeUrl(item.url)}"${externalAttrs(item.url)}>${escapeHtml(item.title)}</a>`
        : escapeHtml(item.title);
      return `
        <article class="project-item">
          <div class="project-heading"><h3>${title}</h3><time>${escapeHtml(item.period)}</time></div>
          <p class="project-role">${escapeHtml(item.role)}</p>
          <p>${escapeHtml(item.description)}</p>
        </article>`;
    })
    .join("");

  document.querySelector("#experience-list").innerHTML = data.experience
    .map(
      (item) => `
        <article class="experience-item">
          <time>${escapeHtml(item.period)}</time>
          <div>
            <span class="experience-category">${escapeHtml(item.category)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="experience-organization">${escapeHtml(item.organization)}</p>
            <p>${escapeHtml(item.description)}</p>
          </div>
        </article>`,
    )
    .join("");

  document.querySelector("#email-link").href = `mailto:${data.email}`;
  const currentDate = new Date();
  document.querySelector("#current-year").textContent = currentDate.getFullYear();
  document.querySelector("#last-updated").textContent = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".site-nav");
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    navigation.classList.toggle("is-open", !open);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    });
  });
})();
