---
title: "Political Theta"
description: "Building a House-race allocation model on DCCC and FEC data and deriving Θ, a Bellman-equation measure of when a campaign should spend versus wait. A later rebuild didn't support the misallocation it seemed to find."
date: 2026-07-22
category: "Technical Research"
---

> **Update, November 2026.** The misallocation this post reports didn't survive a rebuild. Using only what a committee could know by September, returns that shrink with each added dollar rather than with share of spending, and DCCC's own money ($69M in 2024, not the much larger party budget used here), DCCC's spending comes within 0.05–0.19 expected seats of the best use of its budget. The long-shot allocation that led me to Θ most likely came from the problem in [The Persuasion Ceiling](/blog/persuasion-ceiling/), a question of where money goes, not when. Timing does still matter, but because persuasion fades within days, not because waiting brings new information: race forecasts don't get sharper through the fall. See [Campaign Allocation](/projects/political-modeling/).

I took it upon myself to do some independent research within the context of my job in the political field. Initially, I wanted to build a model that helped political consultants allocate money toward services my company provided in a way that maximized a client's chances of winning. The services could be anything from mailers to digital ads to TV commercials.

I imagined an elegant system: a consultant inputs basic information about the client, like their race, whether they're an incumbent, polling, and total bankroll. The output is a distribution of the client's funds across the services we offered. Paired with the consultant's own experience and intuition, I thought it would provide an edge.

It failed. The data either didn't exist or was locked behind a paywall.

I went back to square one and looked for data that existed, was free, and was centralized, so I wouldn't have to dig around the internet for it. That led me to Democratic Congressional Campaign Committee (DCCC) data and FEC data. As I looked at it, an idea began to emerge. The data was high-level spending, nothing granular. So the application had to be high-level too, something that encapsulated the whole objective of a two-party government. The framing became clear: what actually matters at the end of an election cycle? My answer: whoever gets the most House seats.

With that target set, I evaluated several allocation strategies against the same campaign budget. The first was the DCCC's actual 2024 spending. The second divided money equally across every congressional race. The third allocated money according to Cook Political Report race ratings. The fourth was a nonlinear optimizer that maximized expected House seats directly.

![Bar chart comparing expected Democratic House seats under DCCC observed spending, Cook-implied allocation, an equal-split null, and a nonlinear model optimizer](/images/allocator_comparison.png "Expected seats by allocation strategy, same total budget, 2024 House.")

Splitting the budget equally across every race outperformed the DCCC's historical allocation. The Cook-based strategy did slightly better still. My nonlinear optimizer performed best of all, projecting roughly 3 additional House seats over the DCCC's actual allocation, using the exact same amount of money.

I found something unexpected. The more money the DCCC historically spent in a race, the lower the marginal seat gain tended to be. Often, more money was dumped into races where little additional value was created.

This piqued my interest.

What naturally surfaced was that the model understood deterministic elections, like many districts in California, Maryland, and the like, should get little to no capital, while toss-ups, lean-right, and lean-left races should get the bulk of it. The model also identified races that received a lot of capital and still lost, and recommended pulling that money out and reallocating it to toss-ups and lean races instead.

![Dot plot comparing DCCC observed spending, Cook-implied spending, uniform spending, and model-optimizer spending across 53 competitive House races, sorted by how much the optimizer cuts or adds relative to DCCC](/images/allocator_spending_by_race.png "Competitive-race spending under each strategy, sorted by the optimizer's reallocation relative to DCCC's actual spend.")

This works in retrospect. But if you're astute, you'll realize it doesn't work when predicting where future capital should go, because it's built entirely from outcomes we already know.

I built a second model with the goal of extrapolating the findings from the first model to 2026. For clarity, I estimated total 2026 spend by averaging the 2018 and 2022 midterms, then adjusting for current inflation.

Immediately, I noticed something that didn't make intuitive sense. The model wasn't prioritizing competitive races anymore. Instead, it wanted to allocate roughly half of the budget to likely-Republican and safe-Republican districts, months before Election Day, while recommending almost no additional spending in safe Democratic districts.

This was troubling and suspicious. I checked the math, the parameters, all of it. Everything was functioning exactly as intended.

The model had found something I didn't anticipate. In already-safe Democratic seats, the probability of winning was essentially 100%, so another dollar produced almost no additional expected seats. But in Republican-leaning districts, even races with relatively low probabilities of victory still showed positive marginal gains under the model. Mathematically, it kept finding value in funding long-shot opportunities.

A good question to contextualize the problem: if you gave a professional campaign manager $400 million in July, would they really allocate most of it to long-shot Republican races?

So logically, either campaign managers have been systematically misallocating hundreds of millions of dollars for decades, or my model was exploiting a loophole. I suspected the latter.

The second model could only compare races against each other. That is the problem, there was no comparison between today's races and tomorrow's. It didn't understand the value of waiting, or patience. I had to answer a different question: should I spend today, or should I wait?

I sat with this for about a week, ruminating on how to introduce patience into the model. Funny enough, two books I'd read helped enormously: *Advanced Predictive Analytics* by Dean Abbott, and *Options, Futures, and Other Derivatives* by John Hull. There was a nuanced overlap between this problem and how financial markets price an option.

I recalled the Black-Scholes equation, a beautiful partial differential equation that solves a similar problem: how to price an option. My problem borrows the same intuition, not the actual equation.

Picture a scenario: you own the right to buy a stock for $100. Should you exercise today, or wait? The option has value precisely because you're allowed to buy, sell, or hold. Now suppose campaign money has the same property. Every campaign dollar sitting in the bank preserves the ability to react to polling, opponent spending, fundraising, and news. That raises the real question: how do you value optionality in campaign spending?

The naive approach to this problem would require calculating every possible allocation of capital across every point in time. The number of combinations explodes, and that isn't practical. I prefer reframing it as a recursive puzzle instead. We only need to know the value of the next allocation of capital given the initial state's optimal policy, following a sequence of optimal decisions before it. It's a chain of events that stems from the best rule at each link, iterating on the best initial state and decision down the chain.

This idea isn't new. It's the foundation of dynamic programming and reinforcement learning, and plenty of algorithms built on them.

I went down a rabbit hole of existing equations well-suited to adapt to my problem: the Hamilton–Jacobi–Bellman equation, the Shapley equation, the Kolmogorov backward equation, the Euler–Lagrange equation, and the Pontryagin maximum principle. All of them were eliminated because the core of my problem entailed sequential decisions, valuing uncertainty, optimization, discrete time, and campaign spending specifically. I needed something that paired well with how campaigns actually make decisions. This is a stochastic sequential decision problem.

I decided on the Bellman equation because it meets my problem's criteria: a finite time until Election Day, discrete decisions, stochastic transitions, and a Monte Carlo simulation. The Bellman equation is what I use to derive what I call Theta ($$\Theta$$).

Think of this as a branching tree. At every decision point there are only two possibilities: deploy now, or wait. The equation looks like this:

$$
V(X_t) = \max\big(V_{\text{deploy}},\ E[V(X_{t+1})]\big)
$$

$$X_t$$ is everything I know today: polling, fundraising, remaining budget, opponent spending, time until Election Day, and so on. $$V_{\text{deploy}}$$ is the expected value if the model spends immediately. $$E[V(X_{t+1})]$$ is the expected value if I wait, observe tomorrow's information, and then make the best possible decision.

It's beautifully simple: at every point in time, choose whichever decision is worth more and spend immediately, or keep the option to decide later.

The anatomy of the equation gives us two values: the value of spending now ($$V_{\text{deploy}}$$) and the value of waiting ($$E[V(X_{t+1})]$$). From those two, I can compute how much waiting is actually worth, which is $$\Theta$$.

$$
\Theta = V_{\text{wait}} - V_{\text{deploy}}
$$

$$\Theta$$ lets the model be patient, with three possible outcomes:

| Result | Interpretation |
| --- | --- |
| $$\Theta > 0$$ | Waiting is worth more than spending, so hold the money |
| $$\Theta < 0$$ | Waiting loses value, so spend now |
| $$\Theta = 0$$ | Timing is irrelevant |

With this, the model can finally distinguish between a race worth funding eventually and a race worth funding today.

Looping back to Black-Scholes: that model produces an option value, and traders derive the Greeks (delta, gamma, vega, theta) from it. The Greeks aren't inputs; they're quantities that emerge from the solution. The overlap is structural: deriving theta for my problem uses the same shape as deriving Theta for an option.

The Bellman equation produces a value function. From that value function, I derive $$\Theta$$ as the difference between the value of waiting and the value of acting immediately, and $$\Theta$$ measures whether time itself has economic value for a campaign. Where finance derives theta as a time-derivative, I derive $$\Theta$$ as the opportunity cost of acting now versus delaying. It serves, effectively, as my model's patience gauge.
