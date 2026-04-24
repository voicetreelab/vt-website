---
title: "Two Trades on the Helium Crisis"
description: "Qatar's helium is offline for years. Two trades survive the research scrub: long the gas majors (LIN/APD) and long the upstream cryo pick-and-shovel (GTLS). Here's what got dropped — and why we were wrong about Siemens."
---

# Two Trades on the Helium Crisis

A strike on Ras Laffan in March 2026 took ~28% of global helium offline operationally, ~5% structurally, with a 3–5 year repair horizon. The instinctive cascade bet — short Korean memory, long Micron, short KRW — has lost money every week since. The trades that work are on the **capture mechanism**, not the cascade.

Two positions survive a serious research scrub. Here's the position sheet.

| # | Trade | Weight | Horizon | P(win) | E[return] | Fires on |
|---|---|---|---|---|---|---|
| 1 | **Long LIN / APD basket** (60 / 20 internal tilt) | 80% | 18–24mo | 0.80 | +22% | Contract repricing over 6–24mo |
| 2 | **Long GTLS** (Chart Industries) | 20% | 12–18mo | 0.55 | +18% | Upstream liquefaction / storage capex cycle |

Expected portfolio return: ~21% over 18 months. Hard exit Q1–Q2 2027 before NFE He-4 restart creates glut risk. No leverage on either leg.

The portfolio is deliberately narrow. Earlier drafts of this thesis included a long in Siemens Healthineers (MAGNETOM Free.Max, a helium-free MRI). A red-team pass demolished it — more on that below.

---

## Trade 1 — Long LIN / APD basket

**What it is:** A long basket in the two industrial gas majors that capture helium price rents through the contract-renegotiation cycle. 60% in Linde (LIN), 20% in Air Products (APD). Treat as one position with an internal tilt.

**Why the mechanism fires regardless of whether the cascade happens:**

When helium spot prices sit at 2–4× pre-crisis baselines for 18+ months, the gas majors capture that in three layers:

1. **Immediate (20–30%):** spot sales, force majeure declarations, inventory appreciation from pre-crisis storage fills.
2. **Lagged (70–80%):** long-term contracts reprice to the new spot level as they renew over 6–24 months. This is where the bulk of the P&L actually lives.
3. **Structural residual:** 2027+ contracts carry a "never again" premium because procurement teams overshoot after supply trauma.

Historical peak outperformance for gas majors during helium shortages lands **12–24 months after shortage onset**, not at onset. This shortage began March 2026. Peak window: Q3 2026 through Q2 2027. LIN is currently flat YTD (+1.1% vs S&P +8%) — the market hasn't started pricing the capture. That flatness is the entry.

### On the Beaumont cavern (honest version)

Earlier drafts of this thesis claimed Linde's Beaumont salt-dome helium storage (commissioned July 2025, ~3 Bcf) gave LIN a unique physical-inventory moat that APD lacked. That was wrong. Air Products partnered with Caliche Development Partners on the same Spindletop salt dome in 2021 — an earlier commercial storage cavern at essentially the same site. Both majors have Beaumont storage; the infrastructure is at rough parity.

What still distinguishes LIN from APD, and justifies the 60/20 tilt:

- **Pricing discipline.** Linde held price through 2022–23 when electricity costs fell. APD handed back price — their own Q4 2025 call admits it. In a contract-repricing trade, pricing discipline is the differentiator.
- **Narrative overhang.** APD guided a $49–60c helium EPS drag for 2023–25; sell-side is conditioned to be skeptical of APD helium stories. LIN doesn't carry that baggage.
- **Exposure ratio.** Helium is ~3–4% of LIN revenue vs ~7.5% at APD. Lower single-commodity risk, smoother downside path.

Hold APD at 20% as an infrastructural-parity satellite. If LIN fumbles management execution (a real idiosyncratic risk), APD catches the capture mechanism anyway. The basket is more robust than either leg alone.

### The tree (basket level)

```
Long LIN/APD basket
├── P=0.95  Helium elevated ≥6mo (Ras Laffan repair is years, war-independent)
│   ├── P=0.93  No regulatory cap (Korea MOTIE 2019 precedent = subsidies, not foreign-supplier caps)
│   │   ├── P=0.85  Three-layer capture fires
│   │   │   ├── P=0.75  Visible in 2026 earnings → FULL: 0.504
│   │   │   └── P=0.25  Visible only in 2027 contract cycle → DELAYED: 0.168
│   │   └── P=0.15  Pass-through only → LOSS: 0.133
│   └── P=0.07  Regulatory cap → LOSS: 0.062
└── P=0.05  Qatar full restart <6mo → LOSS: 0.050

P(win) ≈ 0.80, E[R] ≈ +22%
```

**Tailwind:** Russia's April 14, 2026 helium export controls remove Gazprom from Asian spot competition, channeling Korean demand toward Western gas majors. Quietly margin-positive for both LIN and APD.

**Kill the basket if:**
- LIN Q2 2026 call (July) shows no helium-segment strength. If management doesn't cite pricing power, the Layer-2 lagged capture isn't firing.
- Helium spot prices collapse back below 1.5× pre-crisis by Q4 2026.
- Sell-side pivots from "helium is expensive" to "watch for NFE He-4 restart." That's the exit trigger — it lands 12–18 months ahead of physical glut arrival.

**Hard exit:** Q2 2028 regardless. Tighten to Q1–Q2 2027 if Q2–Q3 2026 earnings confirm capture.

---

## Trade 2 — Long Chart Industries (GTLS)

**What it is:** The upstream cryogenic pick-and-shovel. GTLS makes the large-scale liquefaction plants, nitrogen rejection units (NRUs), and bulk cryogenic storage that new helium projects need. This is a convex bet on the helium-infrastructure hardening cycle — sized smaller than the gas-major basket because it's more conditional.

**What it is NOT, and this matters:**

Earlier framings of this trade conflated upstream cryogenics with sub-fab helium recovery inside semiconductor fabs. That was sloppy. The two are separate markets with different incumbents:

- **Upstream** (new liquefaction, NRUs, bulk storage tanks, helium purification) — GTLS dominates. They were just selected by Blue Spruce Operating for the Dry Piney helium + carbon sequestration project in Wyoming (>800 Mcf/yr bulk liquid helium). Their 2021 acquisition of Cryo Technologies gave them deep cryogenic system design expertise.
- **Sub-fab** (vacuum pumps, leak detectors, helium recovery networks inside the fab) — Atlas Copco's Edwards Vacuum division owns this. ~25% of Atlas Copco group revenue (~SEK 43B), deeply integrated with semiconductor customers, and just acquired Korean semi valve maker Presys in 2024. Any fab that actually deploys HeRS at scale will likely source the integrated sub-fab work from Edwards, not GTLS.

So the GTLS thesis is specifically: **new helium-production and bulk-storage capex.** If helium sustains $500–1000/Mcf through 2026, every stalled upstream project on the planet gets greenlit — Tanzania's Helium One, US shale helium pilots, Canadian helium extraction, expansion at Cliffside, new storage at Spindletop. That's GTLS's order book.

**Why it's smaller than the gas-major basket:**

GTLS needs a downstream capex response to fire. The research-confirmed triage reference class (4 of 4 prior shocks, zero fab cuts) says the most likely scenario is that users absorb the price premium and keep running without heavy capex. In that world, GTLS gets some order flow from upstream producers but not the multi-year boom the bull case requires.

The convexity is in the tail. If even one large HeRS-subsidy program goes live (and Korea's Blue House has flagged cryogenic recovery as strategic), GTLS re-rates on the order book before the first shipment leaves the factory. If two or three fire in parallel (Korea + Japan + EU Critical Raw Materials follow-on), the trade is a multi-bagger. That asymmetry is what the 20% weight is paying for.

**Kill the trade if:**
- Helium spot drops below 1.5× pre-crisis for two consecutive months.
- GTLS Q3 2026 earnings show no acceleration in helium-related order book. Management calls this out if it's real.
- No Asian-government HeRS subsidy program announced by end-2026. The convexity tail needs a policy catalyst to fire.

---

## What we're explicitly **not** trading

**Long SHL.DE (Siemens Healthineers, MAGNETOM Free.Max).** Earlier drafts of this thesis had SHL sized at 25–30%. The rationale was that SHL had a 3–5 year lead on helium-free MRI and would capture hospital procurement pivots. That rationale was wrong. Philips launched BlueSeal in 2018 and has installed 1,000–2,000 units globally through 2024–25; GE HealthCare received FDA 510(k) clearance for SIGNA Sprint with Freelium in Feb/April 2026. The "first-mover moat" is Philips's, not Siemens's. SHL's MAGNETOM Free.Max is a legitimate 0.55T niche (pulmonary imaging, metallic-implant patients, wide bore) but it's not the dominant helium-free MRI play. Killing the position. **Lesson: inherited claims about competitive positioning need fresh verification before they size into a portfolio.**

**Long Micron (MU).** The original cascade beneficiary thesis — Korean memory cuts → DRAM/HBM pricing power → Micron captures. Dropped because cascade probability fell from 42% to 12%. Deeper reason: helium is 5–8× more elastic than oil or LNG. The 1973-oil-shock / 2022-LNG analogs don't apply. **Lesson: check elasticity before sizing a cascade analog.**

**Short Samsung / Long SK Hynix spread.** Killed by beta discipline. The Korean memory complex rallied +20–40% through April on risk-on flows. Short legs with high short-tenor beta to peace-deal headlines get stopped out before the thesis fires. **Lesson: in a ceasefire-rumor regime, every trade's peace-deal beta is the real position size.**

**Short KRW / Long TWD.** USD/KRW fell 1.98% on April 8 — KRW *strengthened* on risk-on. The macro pair was supposed to capture Korea's triple exposure (helium + crude + food) versus Taiwan's insulation. Instead the FX market priced the peace-deal tape and ignored the structural layer entirely. **Lesson: FX is single-factor dominated. If your thesis requires FX to price a second-order structural risk, you're usually wrong.**

**Long tankers (FRO / DHT / INSW).** Hostilities continued in the Gulf but day rates *fell* because oil wasn't actually moving. The FFA curve priced Q4 2026 normalization. **Lesson: geopolitical risk ≠ freight demand. If the ships aren't sailing, the day rate collapses even as the "war premium" narrative intensifies.**

---

## How we got here (the short version)

First-pass conjunction for the cascade — war persists × Korea can't diversify × fabs run dry × no substitute × market re-rates — came out at **42%**. Three weeks of research pulled it to **12%**.

The three updates that did the work:

1. **The triage reference class.** In 4 of 4 prior helium shocks (2012–13, 2017, 2018–19, 2022), *zero* semiconductor fabs cut output. Prices spiked 100%+, Tier 3 (party balloons) got cut first, Tier 2 (welding, research) shifted to argon, fabs paid premiums and kept running. Helium is 0.1–2% of wafer cost even at 10× spot.

2. **The signed-deal disclosure.** Samsung and SK Hynix both signed long-term US-sourced helium contracts with Linde and APD in early April. "Mainly from the US" per Reuters. Additive baseload on top of existing Qatar LTAs. Combined with Korea's MOTIE ~4-month strategic cover, it pushes diversification volume into the "meaningful-to-sufficient" band.

3. **The SK Hynix earnings tell.** Q1 call, April 22–23: "limited impact expected on production." Management doesn't pre-guide no-cut if they're actually going to cut.

**Posterior:** P(Korean memory fab cuts ≥5% Jul–Dec 2026 due to helium) = **12%** (range 7–22%).

**The trade portfolio survives the downgrade because the capture mechanism is decoupled from the cascade mechanism.** LIN/APD fires on price pass-through, which happens at P ≈ 0.80 whether or not any fab cuts a single wafer. GTLS fires on upstream capex response, which is more conditional — and sized accordingly.

---

## What to watch

1. **Samsung Q1 call, April 30 KST.** Biggest near-term resolver. Echo of SK Hynix "limited impact" → posterior grinds toward 8–10%. Flag helium as concern → posterior jumps to 16–20%.
2. **Linde Q1 earnings, May 1.** First read on the Layer-2 capture. Asia-segment inflection with pricing-power commentary = trade confirmed.
3. **Hormuz posture.** Blockade extending past August pulls cascade posterior to 18–25%.
4. **Gazprom Amur 2.** Korean supply deal (P = 0.16) would weaken the cascade leg. Wouldn't collapse the LIN/APD basket.
5. **Asian HeRS subsidy programs.** A Korea or Japan announcement before end-2026 is the key GTLS catalyst.
6. **First helium-specific sell-side note.** Publication starts closing the window. P(no such note before June) ≈ 0.65.

---

## Falsifiable predictions

| # | Claim | P | Resolve |
|---|---|---:|---|
| 1 | Korean memory fab cuts ≥5% output Jul–Dec 2026 attributable to helium | **0.12** | 2027-01-31 |
| 2 | LIN outperforms S&P 500 by ≥10% over 12mo | 0.70 | 2027-04-24 |
| 3 | APD outperforms S&P 500 by ≥5% over 12mo (lower bar reflects narrative overhang) | 0.60 | 2027-04-24 |
| 4 | GTLS outperforms industrials index by ≥15% over 12mo | 0.55 | 2027-04-24 |
| 5 | Helium spot stays ≥2× pre-crisis through Dec 2026 | 0.75 | 2026-12-31 |
| 6 | Samsung Apr 30 call echoes "limited impact" language | 0.70 | 2026-04-30 |
| 7 | No peer fab discloses He-attributed cut through Q3 2026 | 0.80 | 2026-10-31 |
| 8 | NFE He-4 restarts before end-2027 | 0.25 | 2027-12-31 |
| 9 | Korea or another Asian govt announces HeRS subsidy program by end-2026 | 0.40 | 2026-12-31 |

---

## The one-line thesis

> Helium spot stays elevated for 18+ months regardless of whether Korean fabs cut. **The gas-major basket (LIN/APD) captures** the contract-renegotiation surplus. **GTLS captures** the upstream liquefaction and bulk-storage response. Portfolio 80/20, hard exit before NFE He-4 restart creates glut risk.

The cascade is 12% likely. The capture mechanism fires at 0.80. Trade the one you're more confident in.
