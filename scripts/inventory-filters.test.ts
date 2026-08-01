import assert from "node:assert/strict";
import {
  defaultFilters,
  filterBikes,
  filtersAreActive,
  filtersToSearchParams,
  parseFiltersFromSearchParams,
  sortBikes,
  type FilterableBike,
} from "../src/lib/inventory-filters";

const bikes: FilterableBike[] = [
  {
    id: "1",
    year: 2018,
    make: "Harley-Davidson",
    model: "Street Glide",
    category: null,
    price: 18000,
    mileage: 12000,
    status: "AVAILABLE",
    featuredRank: 0,
    firstSeenAt: new Date("2026-01-01"),
    stockNumber: "UG2018SG",
  },
  {
    id: "2",
    year: 2021,
    make: "Harley-Davidson",
    model: "Iron 883",
    category: null,
    price: 9000,
    mileage: 4000,
    status: "AVAILABLE",
    featuredRank: 2,
    firstSeenAt: new Date("2026-06-01"),
    stockNumber: "00IRON21",
  },
  {
    id: "3",
    year: 2019,
    make: "Harley-Davidson",
    model: "Tri Glide Ultra",
    category: null,
    price: null,
    mileage: 8000,
    status: "AVAILABLE",
    featuredRank: 0,
    firstSeenAt: new Date("2026-03-01"),
  },
];

assert.equal(filterBikes(bikes, { ...defaultFilters, q: "iron" }).length, 1);
assert.equal(filterBikes(bikes, { ...defaultFilters, q: "ug2018" }).length, 1);
assert.equal(filterBikes(bikes, { ...defaultFilters, q: "00iron" }).length, 1);
assert.equal(filterBikes(bikes, { ...defaultFilters, family: "Touring" }).length, 1);
assert.equal(filterBikes(bikes, { ...defaultFilters, yearMin: 2020 }).length, 1);
assert.equal(filterBikes(bikes, { ...defaultFilters, priceMax: 10000 }).length, 1);
assert.equal(filterBikes(bikes, { ...defaultFilters, priceMin: 10000 }).length, 1); // null price excluded
assert.equal(filterBikes(bikes, { ...defaultFilters, milesMax: 5000 }).length, 1);

const byPrice = sortBikes(bikes, "price-asc");
assert.equal(byPrice[0].id, "2");
assert.equal(byPrice[2].id, "3"); // null price last

const featured = sortBikes(bikes, "featured");
assert.equal(featured[0].id, "2");

const parsed = parseFiltersFromSearchParams(
  new URLSearchParams("q=glide&yearMin=2015&family=Touring&sort=price-asc"),
);
assert.equal(parsed.q, "glide");
assert.equal(parsed.yearMin, 2015);
assert.equal(parsed.family, "Touring");
assert.equal(parsed.sort, "price-asc");
assert.equal(filtersAreActive(parsed), true);
assert.equal(filtersAreActive(defaultFilters), false);

const serialized = filtersToSearchParams(parsed).toString();
assert.ok(serialized.includes("q=glide"));
assert.ok(serialized.includes("family=Touring"));

console.log("inventory-filters tests passed");
