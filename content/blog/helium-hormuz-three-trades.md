---
title: "Three Trades on the Helium Crisis"
description: "Qatar's helium is offline for years. Here are three trades (LIN, SHL.DE, GTLS) that work — and why almost every other cascade bet failed."
---

# Three Trades on the Helium Crisis

A strike on Ras Laffan in March 2026 took ~28% of global helium offline operationally, ~5% structurally, with a 3–5 year repair horizon. The instinctive cascade bet — short Korean memory, long Micron, short KRW — has lost money every week since. The trades that work are on the **capture mechanism**, not the cascade.

Here's the position sheet.

| # | Trade | Weight | Horizon | P(win) | E[return] | Fires on |
|---|---|---|---|---|---|---|
| 1 | **Long LIN** (APD acceptable as secondary) | 60% | 18–24mo | 0.82 | +25% | Contract repricing over 6–24mo |
| 2 | **Long SHL.DE** (Siemens Healthineers) | 25% | 18mo | 0.63 | +18% | Hospital procurement pivot to He-free MRI |
| 3 | **Long GTLS** (Chart Industries) | 15% | 12mo | 0.60 | +20% | Cryo-recovery capex cycle |

Expected portfolio return: ~22% over 18 months. Hard exit Q1–Q2 2027 before NFE He-4 restart risks create a glut. No leverage on any leg.

---

## Trade 1 — Long Linde (LIN)

**What it is:** A long position in the gas major that captures helium price rents through the contract-renegotiation cycle.

**Why it fires regardless of whether the cascade happens:**

When helium spot prices sit at 2–4× pre-crisis baselines for 18+ months, Linde captures that in three layers:
1. **Immediate (20–30% of capture):** spot sales, force majeure declarations, inventory appreciation. Linde's Beaumont cavern (3 Bcf, commissioned July 2025, ~6 months of global demand) was filled at pre-crisis prices and can be sold at crisis prices. **APD has no equivalent.**
2. **Lagged (70–80% of capture):** long-term contracts reprice to the new spot level as they renew over 6–24 months. This is where the bulk of the P&L actually lives.
3. **Structural residual:** 2027+ contracts carry a "never again" premium because procurement teams overshoot after supply trauma.

Historical peak outperformance for gas majors during helium shortages lands **12–24 months after shortage onset**, not at onset. This shortage began March 2026. The peak window is Q3 2026 through Q2 2027. LIN is currently flat YTD (+1.1% vs S&P +8%) — the market hasn't started pricing the capture. That flatness is the entry.

**Why LIN, not APD:**
- **Beaumont inventory.** Unique to Linde.
- **Pricing discipline.** Linde held price when electricity costs fell in 2022–23. APD handed back price — their own Q4 2025 call admits this.
- **Less narrative overhang.** APD guided a $49–60c helium EPS drag for 2023–25; the sell-side is conditioned to be skeptical of APD helium stories. LIN doesn't carry that baggage.
- **Exposure ratio.** Helium is ~3–4% of LIN revenue vs ~7.5% at APD. Counterintuitively, that's good — lower single-commodity risk, less volatility on the downside path.

If you want pure-play exposure, APD can sit as a 10–15% satellite to this position. But LIN does every job APD does, better.

**The tree:**
```
Long LIN
├── P=0.95  Helium elevated ≥6mo (Ras Laffan repair is years, war-independent)
│   ├── P=0.93  No regulatory cap (Korea MOTIE precedent = subsidies, not foreign-supplier caps)
│   │   ├── P=0.85  Three-layer capture fires
│   │   │   ├── P=0.75  Visible in 2026 earnings → FULL: 0.521
│   │   │   └── P=0.25  Visible only in 2027 contract cycle → DELAYED: 0.174
│   │   └── P=0.15  Pass-through only → LOSS: 0.133
│   └── P=0.07  Regulatory cap → LOSS: 0.066
└── P=0.05  Qatar full restart <6mo → LOSS: 0.050

P(win) ≈ 0.82, E[R] ≈ +25%
```

**Tailwinds:** Russia's April 14, 2026 helium export controls remove Gazprom from Asian spot competition, channeling Korean demand to Western gas majors. Quietly margin-positive.

**Kill the trade if:**
- LIN Q2 2026 call (July) shows no helium-segment strength. If management doesn't cite pricing power, the Layer-2 lagged capture isn't firing.
- Helium spot prices collapse back below 1.5× pre-crisis by Q4 2026.
- Sell-side pivots from "helium is expensive" to "watch for NFE He-4 restart." That's the exit trigger — earlier than the physical glut arrival.

**Hard exit:** Q2 2028 regardless. Tighten to Q1–Q2 2027 if Q2–Q3 2026 earnings confirm capture.

---

## Trade 2 — Long Siemens Healthineers (SHL.DE)

**What it is:** The decoupled fear-driven play. Long the producer of helium-free MRIs, sized smaller because the historical base rate for the thesis is weaker.

**Why it fires:**

SHL's MAGNETOM Free.Max has been in-market since 2021 — helium-free (or near-free, ~1% of a conventional scanner's helium). GE and Philips are 3–5 years behind. In a shortage where hospital helium refill bills double year-on-year and procurement teams get board-level questions about supply risk, replacement-cycle decisions tilt toward the helium-free option.

The thesis doesn't need the cascade to happen. It needs hospital CFOs to **behave as if** helium prices will stay elevated — a much weaker condition than "Korean fabs cut production."

**Honest caveat:** In four prior helium shortages (2012–13, 2017, 2018–19, 2022), He-free MRI did *not* see major adoption acceleration. Three things argue this cycle is different:

1. **Size.** Combined with Russia's export controls, this is the largest single helium disruption on record.
2. **Product readiness.** In prior shocks no production-ready alternative existed. Now hospitals have a live option on the shelf.
3. **Institutional memory.** Enterprise procurement learned from COVID chip shortages to pay for supply optionality. "Never again" is now a budget line.

But the base rate is weak. That's why this is 25%, not 50%.

**Kill the trade if:**
- GE or Philips announces a competing He-free MRI product within 12 months. The first-mover moat is the whole thesis.
- SHL Q2/Q3 2026 order book shows no meaningful He-free MRI acceleration. If the procurement pivot isn't visible in orders by month 6, it's not happening.

---

## Trade 3 — Long Chart Industries (GTLS)

**What it is:** The cryo-equipment pick-and-shovel. Makes the tanks and recovery systems that fabs, hospitals, and research labs will buy as they harden their supply against the next shock.

**Why it fires:**

Helium at $500–1000/Mcf sustained for 12+ months inverts the payback math on helium-recovery systems (HeRS). Samsung has ~4.7 tons/yr deployed on select lines. SK Hynix has **zero** deployed recovery. Every other sub-7nm fab on the planet is running the same calculation right now. A fab spending $50–200/wafer on helium at 10× spot prices will sign a $5–20M HeRS purchase order without a second signature.

Same logic at healthcare systems, research cryogenics, and quantum computing dilution refrigerator programs. GTLS sells into all of it.

**Honest caveat — and this is important:**

GTLS is **not** scenario-robust. It requires downstream capex response. In the scenario where fabs just pay 10× for helium and keep running (which is ~82% of the posterior — see below), that capex spend might not materialize at scale. The bull case for GTLS needs either:
- **Fear-driven "never again" procurement** (active, but could fade if helium spot collapses),
- **Regulatory mandate** (Korean MOTIE-style subsidies for HeRS deployment — plausible but not confirmed), or
- **Sustained crisis pricing** that keeps HeRS payback <5 years.

If helium drops back to 1.5× pre-crisis in six months, GTLS gets less order flow than our thesis needs. That's why it's 15%, not 30%.

The upside convexity is real though. If even one of Korea's HeRS-subsidy programs goes live (and Blue House has flagged cryo-recovery as strategic), GTLS re-rates on the order book before the first shipment leaves the factory. That's the asymmetry we're paying for.

**Kill the trade if:**
- Helium spot drops below 1.5× pre-crisis for two consecutive months.
- GTLS Q3 2026 earnings show no helium-recovery-segment acceleration. Management would call it out if it were real.

---

## What we're explicitly **not** trading (and the lessons in each)

**Long Micron (MU).** The original cascade beneficiary thesis: Korean memory cuts → DRAM/HBM pricing power → Micron captures. Dropped because the cascade probability fell from 42% to 12% (see below). Deeper reason: helium is 5–8× more elastic than oil or LNG. The 1973-oil-shock / 2022-LNG analogs don't apply — helium is an elastic commodity with a well-functioning triage hierarchy, not an inelastic one. **Lesson:** if your thesis rests on a cascade analog, check the elasticity before sizing.

**Short Samsung / Long SK Hynix spread.** Killed by beta discipline. Even if we'd been right on the differential cut (we weren't), the Korean memory complex rallied +20–40% through April on risk-on flows. Short legs with high short-tenor beta to peace-deal headlines get stopped out before the thesis fires. **Lesson:** in a macro regime dominated by ceasefire-rumor whiplash, every trade's beta to "peace deal tomorrow" is the real position size.

**Short KRW / Long TWD.** Supposed to capture Korea's triple exposure (helium + crude + food) versus Taiwan's insulation. Instead USD/KRW fell 1.98% on April 8 — KRW *strengthened* on risk-on. **Lesson:** FX is single-factor dominated. If your thesis requires the FX market to price a second-order structural risk, you're almost always wrong.

**Long tankers (FRO/DHT/INSW).** Hostilities continued in the Gulf but rates *fell* because oil wasn't actually moving. The FFA curve priced Q4 2026 normalization. **Lesson:** geopolitical risk ≠ freight demand. If the ships aren't sailing, the day rate collapses even as the "war premium" narrative intensifies.

---

## How we got here (the short version)

Our first-pass conjunction for the cascade — war persists × Korea can't diversify × fabs run dry × no substitute × market re-rates — came out at **42%**. Three weeks of research pulled it to **12%**.

The three updates that did the work:

1. **The triage reference class.** In 4 of 4 prior helium shocks (2012–13, 2017, 2018–19, 2022), *zero* semiconductor fabs cut output. Prices spiked 100%+, Tier 3 (party balloons) got cut first, Tier 2 (welding, research) shifted to argon, fabs paid premiums and kept running. Helium is 0.1–2% of wafer cost even at 10× spot. The triage hierarchy is the historical base rate.

2. **The signed-deal disclosure.** Samsung and SK Hynix both signed long-term US-sourced helium contracts with Linde and APD in early April. "Mainly from the US." It's additive baseload on top of existing Qatar LTAs, not a replacement — but combined with Korea's MOTIE ~4-month strategic cover, it moves diversification volume from "unknown" into the "meaningful-to-sufficient" band.

3. **The SK Hynix earnings tell.** Q1 call, April 22–23: "limited impact expected on production." Management doesn't pre-guide no-cut if they're actually going to cut.

**Posterior:** P(Korean memory fab cuts ≥5% Jul–Dec 2026 due to helium) = **12%** (range 7–22%).

**The trade portfolio survives the downgrade because the capture mechanism is decoupled from the cascade mechanism.** LIN fires on price pass-through, which happens at P≈0.82 whether or not any fab cuts a single wafer. SHL.DE fires on procurement-team behavior, which is looser still. GTLS fires on capex response, which is the most conditional of the three — and sized accordingly.

---

## What to watch (6 observables, ranked)

1. **Samsung Q1 call, April 30 KST.** Biggest near-term resolver. Echo of SK Hynix "limited impact" → posterior grinds toward 8–10%. Flag helium as concern → posterior jumps to 16–20%.
2. **Linde Q1 earnings, May 1.** First read on the Layer-2 capture. Asia-segment inflection with pricing-power commentary = trade confirmed.
3. **Hormuz posture.** Blockade extending past August pulls cascade posterior to 18–25% and puts Micron / cascade-dependent expressions back on the table as options.
4. **Gazprom Amur 2.** Korean supply deal (P=0.16) would kill the SK Hynix-specific cascade leg. Wouldn't collapse LIN.
5. **Peer fab disclosures.** Any single peer (TSMC / Intel / Kioxia / Micron) disclosing a helium-attributed cut in Q2–Q3 earnings pulls posterior to 20–25%.
6. **First helium-specific sell-side note.** Publication starts closing the trade window. P(no such note before June) ≈ 0.65.

---

## Falsifiable predictions

| # | Claim | P | Resolve |
|---|---|---:|---|
| 1 | Korean memory fab cuts ≥5% output Jul–Dec 2026 attributable to helium | **0.12** | 2027-01-31 |
| 2 | LIN outperforms S&P 500 by ≥10% over 12mo | 0.70 | 2027-04-24 |
| 3 | SHL.DE Q2/Q3 2026 order book shows meaningful He-free MRI acceleration | 0.55 | 2026-10-31 |
| 4 | GTLS outperforms industrials index by ≥20% over 12mo | 0.60 | 2027-04-24 |
| 5 | Helium spot stays ≥2× pre-crisis through Dec 2026 | 0.75 | 2026-12-31 |
| 6 | Samsung Apr 30 call echoes "limited impact" language | 0.70 | 2026-04-30 |
| 7 | No peer fab discloses He-attributed cut through Q3 2026 | 0.80 | 2026-10-31 |
| 8 | NFE He-4 restarts before end-2027 | 0.25 | 2027-12-31 |
| 9 | Korea or another Asian govt announces HeRS subsidy program by end-2026 | 0.40 | 2026-12-31 |

---

## The one-line thesis

> Helium spot stays elevated for 18+ months regardless of whether Korean fabs cut. **Linde captures** the contract-renegotiation surplus. **SHL.DE captures** hospital procurement anxiety. **GTLS captures** the recovery-capex response. Portfolio 60/25/15, hard exit before NFE He-4 restart creates glut risk.

The cascade is 12% likely. The capture mechanism fires at 0.82. Trade the one you're more confident in.
