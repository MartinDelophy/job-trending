import { getDomainName, getRoleTitle } from "./roleCatalog.js";

let roles = [];

function text(value) {
  return String(value || "").toLowerCase();
}

function relevanceFor(query, titleFields, aliasFields) {
  if (!query) return 0;
  if (titleFields.some((value) => value === query)) return 100;
  if (aliasFields.some((value) => value === query)) return 96;
  if (titleFields.some((value) => value.startsWith(query))) return 92;
  if (titleFields.some((value) => value.includes(query))) return 78;
  if (aliasFields.some((value) => value.startsWith(query))) return 70;
  if (aliasFields.some((value) => value.includes(query))) return 62;
  return 20;
}

function balancedDefault(matches, visibleLimit) {
  const addUnique = (items, target, take) => {
    for (const item of items) {
      if (target.length >= take) break;
      if (!target.some((entry) => entry.title === item.title)) target.push(item);
    }
  };
  const growth = [...matches]
    .filter((item) => item.opportunity >= 78 && item.automationRisk < 70)
    .sort((a, b) => b.opportunity - a.opportunity);
  const pressure = [...matches]
    .filter((item) => item.automationRisk >= 70 && item.opportunity < 62)
    .sort((a, b) => b.automationRisk - a.automationRisk || a.opportunity - b.opportunity);
  const traditional = [...matches]
    .filter((item) => item.mode === "Human-Anchored" || (item.aiExposure < 55 && item.humanNecessity >= 75))
    .sort((a, b) => b.humanNecessity - a.humanNecessity || b.opportunity - a.opportunity);
  const reorganized = [...matches]
    .filter((item) => item.mode === "Reorganize")
    .sort((a, b) => b.aiExposure - a.aiExposure || b.skillMobility - a.skillMobility);
  const fallback = [...matches].sort((a, b) => b.opportunity - a.opportunity);
  const mixed = [];

  addUnique(growth, mixed, 5);
  addUnique(pressure, mixed, 10);
  addUnique(traditional, mixed, 15);
  addUnique(reorganized, mixed, visibleLimit);
  addUnique(fallback, mixed, visibleLimit);

  return mixed.slice(0, visibleLimit);
}

function searchRoles(payload) {
  const {
    id,
    query,
    locale,
    activeIndustry,
    activeModeFilter,
    labels,
    visibleLimit,
    expandedTitle,
  } = payload;
  const normalized = text(query).trim();
  const matches = [];
  let includesExpanded = false;

  for (const role of roles) {
    if (activeIndustry !== "All" && role.industry !== activeIndustry) continue;
    if (activeModeFilter !== "All" && role.mode !== activeModeFilter) continue;

    const titleFields = [role.title, getRoleTitle(role, locale)]
      .filter(Boolean)
      .map(text);
    const aliasFields = (role.aliases || []).filter(Boolean).map(text);
    const searchable = [
      ...titleFields,
      getDomainName(role, locale),
      role.industry,
      labels?.industry?.[role.industry],
      role.mode,
      labels?.mode?.[role.mode],
      role.summary,
      role.changes,
      role.why,
      ...(role.skills || []),
      ...(role.from || []),
      ...aliasFields,
    ]
      .join(" ")
      .toLowerCase();

    if (normalized && !searchable.includes(normalized)) continue;

    if (role.title === expandedTitle) includesExpanded = true;
    matches.push({
      title: role.title,
      opportunity: role.opportunity,
      automationRisk: role.automationRisk,
      humanNecessity: role.humanNecessity,
      aiExposure: role.aiExposure,
      skillMobility: role.skillMobility,
      mode: role.mode,
      relevance: relevanceFor(normalized, titleFields, aliasFields),
    });
  }

  if (normalized) {
    matches.sort((a, b) => b.relevance - a.relevance || b.opportunity - a.opportunity);
  } else if (activeModeFilter === "Automation Pressure") {
    matches.sort((a, b) => b.automationRisk - a.automationRisk || a.opportunity - b.opportunity);
  } else if (activeModeFilter === "Human-Anchored") {
    matches.sort((a, b) => b.humanNecessity - a.humanNecessity || b.opportunity - a.opportunity);
  } else if (activeModeFilter === "All" && activeIndustry === "All") {
    const balanced = balancedDefault(matches, visibleLimit);
    matches.splice(0, matches.length, ...balanced, ...matches.filter((item) => !balanced.some((entry) => entry.title === item.title)));
  } else {
    matches.sort((a, b) => b.opportunity - a.opportunity);
  }

  const visibleTitles = matches.slice(0, visibleLimit).map((item) => item.title);
  const comparisonTitles = matches.slice(0, 6).map((item) => item.title);

  self.postMessage({
    type: "results",
    id,
    total: matches.length,
    visibleTitles,
    comparisonTitles,
    includesExpanded,
    firstTitle: matches[0]?.title || "",
  });
}

self.onmessage = (event) => {
  const payload = event.data;

  if (payload.type === "init") {
    roles = payload.roles || [];
    self.postMessage({ type: "ready" });
    return;
  }

  if (payload.type === "search") {
    try {
      searchRoles(payload);
    } catch (error) {
      self.postMessage({
        type: "error",
        id: payload.id,
        message: error instanceof Error ? error.message : "Search worker failed",
      });
    }
  }
};
