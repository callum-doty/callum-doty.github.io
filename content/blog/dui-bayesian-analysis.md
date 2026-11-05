---
title: "DUI: Drinking, Driving, and Bayesian Analysis"
description: "What if I told you that based on a positive breathalyzer test, the probability that you were driving drunk is less than 2%?"
date: 2025-06-28
category: "Data & Quantitative Methods"
---

You've just hit a milestone — you're 16 and finally have your driver's license in hand. The freedom and independence you feel are exhilarating. Eager to enjoy your newfound autonomy, you hop into your car for an evening drive. But as luck would have it, your adventure takes an unexpected turn when a police officer flags you down for a routine traffic stop.

The officer's demeanor is stern, and you sense their suspicion as they request to conduct a few tests. Despite feeling nervous, you comply, and take a breathalyzer test to determine if you're under the influence of alcohol. You test positive and are promptly arrested.

**Keep in mind:**

- The breathalyzer indicates false drunkenness in only 5% of cases when the driver is sober
- The breathalyzers never fail to detect a truly drunk person
- One in a thousand drivers in your region drive drunk

Fast forward to the trial, and the situation feels dire. Despite your protests of innocence, the breathalyzer test results are presented as evidence against you. The prosecutor paints a grim picture, arguing that there's a mere 5% chance of your innocence, citing the breathalyzer's supposed accuracy rate of 95%.

**What if I told you that based on the positive breathalyzer test, the probability that you were driving drunk is less than 2%...**

To explain this, I'll introduce Bayes' theorem — named after the Reverend Thomas Bayes — a fundamental concept in probability theory. It describes the probability of an event based on prior knowledge of conditions that might be related to the event:

$$
P(A \mid B) = \frac{P(B \mid A) \times P(A)}{P(B)}
$$

Translated:

- $$P(A \mid B)$$ — probability of A given B has occurred
- $$P(B \mid A)$$ — probability of B given A has occurred
- $$P(A)$$ and $$P(B)$$ — independent probabilities of A and B

Applying Bayes' Theorem to your situation. Let:

- $$D$$ = You are drunk
- $$S$$ = You are sober
- $$t_D$$ = The test indicates you are drunk

$$
P(D \mid t_D) = \frac{P(t_D \mid D) \times P(D)}{P(t_D)}
$$

We have all but one piece: $$P(t_D)$$. To find it, consider all scenarios where a positive result could occur:

$$
\Pr(t_D) = \Pr(t_D \mid D) \times \Pr(D) + \Pr(t_D \mid S) \times \Pr(S)
$$

Plugging in our numbers:

- $$\Pr(D) = 0.001$$
- $$\Pr(S) = 0.999$$
- $$\Pr(t_D \mid D) = 1$$
- $$\Pr(t_D \mid S) = 0.05$$

$$
(1 \times 0.001) + (0.05 \times 0.999) = 0.05095
$$

Now the final calculation:

$$
\Pr(D \mid t_D) = \frac{1 \times 0.001}{0.05095} = 0.01963
$$

The probability that you were driving drunk, based on the positive breathalyzer test alone, is **1.96%**.

**Life changing right?**

When we think about the quality of a test, what we're testing for, and how we make sense of the results, it is easy to make mistakes. The evidence of a 95% accurate breathalyzer appears convincing, but the line is not clearly cut. Base rates matter enormously.
