(async function loadPropertyListings() {
  const container = document.querySelector("#listing-grid");
  if (!container) return;

  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[char]);

  const safeImageUrl = (value = "") => {
    const url = String(value).trim();
    if (url.startsWith("/")) return url;
    try {
      const parsed = new URL(url, window.location.href);
      return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : "";
    } catch {
      return "";
    }
  };

  try {
    const response = await fetch("/content/properties.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Listings could not be loaded");
    const data = await response.json();
    const listings = (Array.isArray(data.listings) ? data.listings : []).filter((listing) => listing.published);

    if (!listings.length) {
      container.innerHTML = '<div class="listing-empty"><strong>New properties are coming soon.</strong>Tell us what you’re looking for and we’ll help you find the right fit.</div>';
      return;
    }

    container.innerHTML = listings.map((listing) => {
      const image = safeImageUrl(listing.image);
      const title = escapeHtml(listing.title || "Property listing");
      const location = escapeHtml(listing.location || "Location on request");
      const status = escapeHtml(listing.status || "Available");
      const price = escapeHtml(listing.price || "Contact us for price");
      const description = escapeHtml(listing.description || "Contact us to learn more about this property.");
      const imageAlt = escapeHtml(listing.image_alt || listing.title || "Property for sale or rent");
      const facts = [
        listing.property_type && escapeHtml(listing.property_type),
        listing.bedrooms && `${escapeHtml(listing.bedrooms)} bedrooms`,
        listing.bathrooms && `${escapeHtml(listing.bathrooms)} bathrooms`,
        listing.size && escapeHtml(listing.size)
      ].filter(Boolean);
      const imageMarkup = image
        ? `<img src="${escapeHtml(image)}" alt="${imageAlt}" loading="lazy">`
        : '<div role="img" aria-label="Property photo coming soon"></div>';

      return `<article class="listing-card">
        <div class="listing-image">${imageMarkup}<span class="listing-status">${status}</span></div>
        <div class="listing-body">
          <span class="listing-location">${location}</span>
          <h3 class="listing-title">${title}</h3>
          <p class="listing-price">${price}</p>
          <p class="listing-description">${description}</p>
          ${facts.length ? `<div class="listing-facts">${facts.map((fact) => `<span>${fact}</span>`).join("")}</div>` : ""}
          <a class="listing-link" href="#contact"><span>Ask about this property</span><span aria-hidden="true">↗</span></a>
        </div>
      </article>`;
    }).join("");
  } catch (error) {
    container.innerHTML = '<div class="listing-empty"><strong>Listings are temporarily unavailable.</strong>Please contact our team and we’ll be glad to help.</div>';
  }
})();